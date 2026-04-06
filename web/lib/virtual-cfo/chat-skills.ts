/**
 * Virtual CFO — Deterministic Chat Skills (Module 9a)
 *
 * MVP RAG replacement : matches user questions against a catalog of
 * financial "skills" (DSO, runway, marge, cash, etc.) and returns a
 * templated answer pulled from the normalized demo data.
 *
 * No external LLM calls — purely deterministic so that unit tests can
 * assert exact answers. The Anthropic API integration will replace this
 * layer in Phase 4 without changing the API contract.
 */

import type { CompanySlug } from "../companies"
import {
  getLatestActual,
  getPreviousActual,
  normalizeCash,
  normalizeSynthesis,
  getSaaSKPIs,
  getInvoiceKPIs,
  getCompanyType,
} from "../demo-data"
import {
  formatCurrency,
  formatPercent,
  formatRunway,
  formatPeriod,
} from "../format"
import { computeRiskScore } from "./risk-scoring"
import type { ChatSkillResponse, ChatSource } from "./types"

type Skill = {
  id: string
  keywords: string[]
  handler: (slug: CompanySlug) => ChatSkillResponse
}

function source(label: string, module: string, href: string): ChatSource {
  return { label, module, moduleHref: href }
}

function cashSkill(slug: CompanySlug): ChatSkillResponse {
  const latest = getLatestActual(slug)
  if (!latest) {
    return { content: "Aucune donnée disponible.", sources: [] }
  }
  const cash = normalizeCash(slug, latest as Record<string, unknown>)
  const runwayStr = cash.runway !== null ? ` Runway estimé : ${formatRunway(cash.runway)}.` : ""
  return {
    content: `Au ${formatPeriod(cash.period)}, la trésorerie disponible s'élève à ${formatCurrency(cash.cash)}.${runwayStr}`,
    sources: [source(`Trésorerie ${cash.period}`, "Trésorerie", "/app/tresorerie")],
  }
}

function runwaySkill(slug: CompanySlug): ChatSkillResponse {
  const latest = getLatestActual(slug)
  if (!latest) return { content: "Aucune donnée disponible.", sources: [] }
  const cash = normalizeCash(slug, latest as Record<string, unknown>)
  if (cash.runway === null) {
    return {
      content: `Cette entreprise est profitable (pas de burn) — la notion de runway ne s'applique pas. Trésorerie actuelle : ${formatCurrency(cash.cash)}.`,
      sources: [source(`Trésorerie ${cash.period}`, "Trésorerie", "/app/tresorerie")],
    }
  }
  return {
    content: `Le runway actuel est de ${formatRunway(cash.runway)} (cash ${formatCurrency(cash.cash)}, burn net ${formatCurrency(cash.netBurn ?? 0)}/mois).`,
    sources: [source(`Cash ${cash.period}`, "Trésorerie", "/app/tresorerie")],
  }
}

function dsoSkill(slug: CompanySlug): ChatSkillResponse {
  const inv = getInvoiceKPIs(slug)
  return {
    content: `Le DSO moyen est de ${inv.dso} jours. Total à encaisser : ${formatCurrency(inv.totalReceivable)} dont ${formatCurrency(inv.overdue)} en retard.`,
    sources: [source("Factures clients", "Comptabilité", "/app/factures")],
  }
}

function dpoSkill(slug: CompanySlug): ChatSkillResponse {
  const inv = getInvoiceKPIs(slug)
  return {
    content: `Le DPO moyen est de ${inv.dpo} jours. Total à payer : ${formatCurrency(inv.totalPayable)}, dont ${formatCurrency(inv.dueSoon)} à moins de 7 jours.`,
    sources: [source("Factures fournisseurs", "Comptabilité", "/app/factures")],
  }
}

function margeSkill(slug: CompanySlug): ChatSkillResponse {
  const latestRaw = getLatestActual(slug)
  const prevRaw = getPreviousActual(slug)
  if (!latestRaw) return { content: "Aucune donnée.", sources: [] }
  const latest = normalizeSynthesis(slug, latestRaw as Record<string, unknown>)
  const margin = latest.revenue > 0 ? (latest.netResult / latest.revenue) * 100 : 0
  let variationTxt = ""
  if (prevRaw) {
    const prev = normalizeSynthesis(slug, prevRaw as Record<string, unknown>)
    const prevMargin = prev.revenue > 0 ? (prev.netResult / prev.revenue) * 100 : 0
    const delta = margin - prevMargin
    variationTxt = ` Variation vs mois précédent : ${formatPercent(delta, { showSign: true })}.`
  }
  return {
    content: `Sur ${formatPeriod(latest.period)}, la marge nette ressort à ${formatPercent(margin)} (CA ${formatCurrency(latest.revenue)}, résultat net ${formatCurrency(latest.netResult)}).${variationTxt}`,
    sources: [source(`P&L ${latest.period}`, "Comptabilité", "/app/comptabilite")],
  }
}

function churnSkill(slug: CompanySlug): ChatSkillResponse {
  if (getCompanyType(slug) !== "startup-saas") {
    return {
      content: "Cette entreprise n'est pas un SaaS — la notion de churn récurrent ne s'applique pas directement.",
      sources: [],
    }
  }
  const latest = getLatestActual(slug)
  if (!latest) return { content: "Aucune donnée.", sources: [] }
  const saas = getSaaSKPIs(latest as Record<string, unknown>)
  return {
    content: `Churn mensuel : ${saas.churnRate.toFixed(2)} %, NRR : ${saas.nrr.toFixed(1)} %, MRR : ${formatCurrency(saas.mrr)} (${saas.activeCustomers} clients actifs).`,
    sources: [source(`KPIs SaaS ${saas.period}`, "KPIs SaaS", "/app/kpis-saas")],
  }
}

function mrrSkill(slug: CompanySlug): ChatSkillResponse {
  if (getCompanyType(slug) !== "startup-saas") {
    return {
      content: "Cette entreprise n'a pas de MRR (non-SaaS).",
      sources: [],
    }
  }
  const latest = getLatestActual(slug)
  if (!latest) return { content: "Aucune donnée.", sources: [] }
  const saas = getSaaSKPIs(latest as Record<string, unknown>)
  return {
    content: `MRR ${formatPeriod(saas.period)} : ${formatCurrency(saas.mrr)} (ARR ${formatCurrency(saas.arr)}). New MRR : ${formatCurrency(saas.newMrr)}, Expansion : ${formatCurrency(saas.expansionMrr)}, Churned : ${formatCurrency(saas.churnedMrr)}.`,
    sources: [source(`KPIs SaaS ${saas.period}`, "KPIs SaaS", "/app/kpis-saas")],
  }
}

function riskSkill(slug: CompanySlug): ChatSkillResponse {
  const score = computeRiskScore(slug)
  const top = score.factors
    .filter((f) => f.level !== "healthy")
    .slice(0, 2)
    .map((f) => `• ${f.label} : ${f.detail}`)
    .join("\n")
  const body = top ? `\n\nFacteurs à surveiller :\n${top}` : ""
  return {
    content: `${score.summary}${body}\n\n${score.horizon90d}`,
    sources: [source("Scoring Risque", "Virtual CFO", "/app/virtual-cfo")],
  }
}

function healthSkill(slug: CompanySlug): ChatSkillResponse {
  const latest = getLatestActual(slug)
  if (!latest) return { content: "Aucune donnée.", sources: [] }
  const synth = normalizeSynthesis(slug, latest as Record<string, unknown>)
  const cash = normalizeCash(slug, latest as Record<string, unknown>)
  const margin = synth.revenue > 0 ? (synth.netResult / synth.revenue) * 100 : 0
  return {
    content: `Synthèse ${formatPeriod(synth.period)} : CA ${formatCurrency(synth.revenue)}, résultat net ${formatCurrency(synth.netResult)} (marge ${formatPercent(margin)}), trésorerie ${formatCurrency(cash.cash)}, effectif ${synth.headcount} ETP.`,
    sources: [source(`Synthèse ${synth.period}`, "Synthèse", "/app/synthese")],
  }
}

// ── Skill catalog ──

const SKILLS: Skill[] = [
  { id: "risk", keywords: ["risque", "crise", "alerte", "danger", "risk"], handler: riskSkill },
  { id: "runway", keywords: ["runway", "piste", "combien de mois"], handler: runwaySkill },
  { id: "cash", keywords: ["tréso", "treso", "cash", "trésorerie"], handler: cashSkill },
  { id: "dso", keywords: ["dso", "encaisse", "retard client", "créance", "creance"], handler: dsoSkill },
  { id: "dpo", keywords: ["dpo", "fournisseur", "paye mes", "payer"], handler: dpoSkill },
  { id: "marge", keywords: ["marge", "rentabilité", "rentabilite", "ebitda", "résultat", "resultat"], handler: margeSkill },
  { id: "churn", keywords: ["churn", "attrition", "nrr", "rétention", "retention"], handler: churnSkill },
  { id: "mrr", keywords: ["mrr", "arr", "revenu récurrent", "recurrent"], handler: mrrSkill },
  { id: "health", keywords: ["santé", "sante", "synthèse", "synthese", "résumé", "resume", "overview"], handler: healthSkill },
]

// ── Matcher ──

export function matchSkill(question: string): Skill | null {
  const q = question.toLowerCase().trim()
  if (!q) return null
  // Try each skill, first match wins (order = priority)
  for (const skill of SKILLS) {
    if (skill.keywords.some((k) => q.includes(k))) {
      return skill
    }
  }
  return null
}

export function answerQuestion(slug: CompanySlug, question: string): ChatSkillResponse {
  const skill = matchSkill(question)
  if (!skill) {
    return {
      content:
        "Je n'ai pas encore la compétence pour répondre à cette question. Essayez par exemple : \"Quel est mon runway ?\", \"Quel est mon DSO ?\", \"Quelle est ma marge ?\" ou \"Y a-t-il des risques à 90 jours ?\".",
      sources: [],
    }
  }
  return skill.handler(slug)
}

export const SUGGESTED_QUESTIONS: Record<"saas" | "pme", string[]> = {
  saas: [
    "Quel est mon runway ?",
    "Où en est mon MRR ?",
    "Mon churn est-il maîtrisé ?",
    "Y a-t-il des risques à 90 jours ?",
    "Quel est mon DSO ?",
  ],
  pme: [
    "Quelle est ma trésorerie ?",
    "Quel est mon DSO ?",
    "Quelle est ma marge ce mois ?",
    "Y a-t-il des risques à 90 jours ?",
    "Quel est mon DPO ?",
  ],
}

export function getSuggestedQuestions(slug: CompanySlug): string[] {
  return getCompanyType(slug) === "startup-saas"
    ? SUGGESTED_QUESTIONS.saas
    : SUGGESTED_QUESTIONS.pme
}
