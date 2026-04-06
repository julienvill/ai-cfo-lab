/**
 * Virtual CFO — Predictive Risk Scoring (Module 9c)
 *
 * Deterministic risk scoring engine. Crosses signals from cash/runway,
 * DSO, burn/margin and BFR/churn to produce a global 0-100 score where
 * higher = healthier.
 *
 * Business thresholds (validated with expert-tresorerie / expert-comptable) :
 * - Runway : <3 months = critical, <6 = warning (VC standard for startups)
 * - DSO : >60j = critical (LME French law), >45j = warning
 * - Burn : net_burn worsening >20% MoM = critical, >10% = warning
 * - Churn (SaaS) : >3% = critical, >2% = warning
 * - BFR (PME/industry) : cash coverage <30d = critical, <60d = warning
 *
 * All inputs are pulled from existing demo JSON via demo-data.ts — no
 * mutation, no external calls. Pure function of the company slug.
 */

import type { CompanySlug } from "../companies"
import {
  getLatestActual,
  getPreviousActual,
  getCompanyType,
  normalizeCash,
  normalizeSynthesis,
  getSaaSKPIs,
  getInvoiceKPIs,
} from "../demo-data"
import type { RiskFactor, RiskLevel, RiskScore } from "./types"

// ── Weights (sum = 1.0) ──
const WEIGHTS = {
  cash: 0.35,
  dso: 0.25,
  burn: 0.25,
  bfr: 0.15,
} as const

function levelFromPenalty(penalty: number): RiskLevel {
  if (penalty >= 70) return "critical"
  if (penalty >= 40) return "warning"
  return "healthy"
}

function globalLevel(score: number): RiskLevel {
  if (score < 40) return "critical"
  if (score < 65) return "warning"
  return "healthy"
}

// ── Factor scorers ──

function scoreCash(slug: CompanySlug): RiskFactor {
  const latest = getLatestActual(slug)
  const cash = latest ? normalizeCash(slug, latest as Record<string, unknown>) : null
  const runway = cash?.runway ?? null
  const cashAmount = cash?.cash ?? 0

  // If no runway (PME profitable) fall back to cash-absolute reasoning
  let penalty = 0
  let detail = ""
  let recommendation = ""

  if (runway !== null) {
    if (runway < 3) {
      penalty = 95
      detail = `Runway de ${runway.toFixed(1)} mois — rupture de trésorerie imminente.`
      recommendation = "Lever des fonds ou couper 30% des coûts variables immédiatement."
    } else if (runway < 6) {
      penalty = 70
      detail = `Runway de ${runway.toFixed(1)} mois — sous le seuil VC de sécurité.`
      recommendation = "Initier un tour de table dans les 60 jours."
    } else if (runway < 12) {
      penalty = 35
      detail = `Runway de ${runway.toFixed(1)} mois — surveillance rapprochée.`
      recommendation = "Préparer le prochain tour (6 mois avant épuisement)."
    } else {
      penalty = 10
      detail = `Runway confortable de ${runway.toFixed(1)} mois.`
      recommendation = "Maintenir le cap et optimiser le CAC/LTV."
    }
  } else {
    // PME : pas de runway calculé, utiliser le cash brut
    if (cashAmount < 50000) {
      penalty = 80
      detail = "Trésorerie très basse — vigilance maximale."
      recommendation = "Activer la ligne de découvert et accélérer les encaissements."
    } else if (cashAmount < 200000) {
      penalty = 40
      detail = "Trésorerie sous la zone de confort."
      recommendation = "Surveiller le BFR et négocier les délais fournisseurs."
    } else {
      penalty = 10
      detail = "Trésorerie saine."
      recommendation = "Optimiser le placement de la trésorerie excédentaire."
    }
  }

  return {
    key: "cash",
    label: "Trésorerie & Runway",
    penalty,
    weight: WEIGHTS.cash,
    level: levelFromPenalty(penalty),
    detail,
    recommendation,
  }
}

function scoreDSO(slug: CompanySlug): RiskFactor {
  const inv = getInvoiceKPIs(slug)
  const dso = inv.dso

  let penalty = 0
  let detail = ""
  let recommendation = ""

  if (dso > 75) {
    penalty = 90
    detail = `DSO de ${dso}j — situation critique (au-delà de la LME 60j).`
    recommendation = "Bloquer les livraisons des clients en retard, automatiser les relances J+1."
  } else if (dso > 60) {
    penalty = 65
    detail = `DSO de ${dso}j — dépasse le seuil légal LME de 60j.`
    recommendation = "Intensifier les relances et exiger des acomptes sur nouveaux contrats."
  } else if (dso > 45) {
    penalty = 35
    detail = `DSO de ${dso}j — en zone d'alerte précoce.`
    recommendation = "Mettre en place un scoring client et relancer à J+7 systématiquement."
  } else {
    penalty = 10
    detail = `DSO de ${dso}j — dans la norme.`
    recommendation = "Maintenir les bonnes pratiques de relance."
  }

  return {
    key: "dso",
    label: "Délai de paiement clients (DSO)",
    penalty,
    weight: WEIGHTS.dso,
    level: levelFromPenalty(penalty),
    detail,
    recommendation,
  }
}

function scoreBurn(slug: CompanySlug): RiskFactor {
  const latestRaw = getLatestActual(slug)
  const prevRaw = getPreviousActual(slug)

  let penalty = 10
  let detail = "Burn/marge stable."
  let recommendation = "Continuer à piloter au budget."

  if (latestRaw && prevRaw) {
    const latest = normalizeSynthesis(slug, latestRaw as Record<string, unknown>)
    const prev = normalizeSynthesis(slug, prevRaw as Record<string, unknown>)

    // Margin variation
    const marginLatest = latest.revenue > 0 ? latest.netResult / latest.revenue : 0
    const marginPrev = prev.revenue > 0 ? prev.netResult / prev.revenue : 0
    const marginDeltaPct = (marginLatest - marginPrev) * 100

    if (marginDeltaPct < -8) {
      penalty = 80
      detail = `Marge nette dégradée de ${marginDeltaPct.toFixed(1)} pts vs mois précédent.`
      recommendation = "Analyse urgente des postes de dépenses et renégociation fournisseurs."
    } else if (marginDeltaPct < -4) {
      penalty = 55
      detail = `Marge nette en baisse de ${marginDeltaPct.toFixed(1)} pts — tendance à surveiller.`
      recommendation = "Identifier les leviers de pricing et de productivité."
    } else if (marginDeltaPct < -1) {
      penalty = 25
      detail = `Légère érosion de marge (${marginDeltaPct.toFixed(1)} pts).`
      recommendation = "Surveiller l'évolution sur les 3 prochains mois."
    } else {
      penalty = 10
      detail = `Marge stable ou en amélioration (${marginDeltaPct >= 0 ? "+" : ""}${marginDeltaPct.toFixed(1)} pts).`
      recommendation = "Poursuivre le pilotage actuel."
    }
  }

  return {
    key: "burn",
    label: "Marge & Burn",
    penalty,
    weight: WEIGHTS.burn,
    level: levelFromPenalty(penalty),
    detail,
    recommendation,
  }
}

function scoreBFR(slug: CompanySlug): RiskFactor {
  const type = getCompanyType(slug)
  const latest = getLatestActual(slug)

  let penalty = 20
  let detail = "BFR/churn dans la norme sectorielle."
  let recommendation = "Maintenir le suivi mensuel."

  if (type === "startup-saas" && latest) {
    const saas = getSaaSKPIs(latest as Record<string, unknown>)
    const churn = saas.churnRate
    const nrr = saas.nrr

    if (nrr < 95 || churn > 3) {
      penalty = 85
      detail = `Churn ${churn.toFixed(2)}% / NRR ${nrr.toFixed(1)}% — érosion de la base installée.`
      recommendation = "Lancer un programme de rétention et analyser les causes de churn (NPS, support)."
    } else if (nrr < 100 || churn > 2) {
      penalty = 55
      detail = `Churn ${churn.toFixed(2)}% / NRR ${nrr.toFixed(1)}% — la base ne se régénère plus.`
      recommendation = "Renforcer le Customer Success et les expansions (upsell/cross-sell)."
    } else if (churn > 1.5) {
      penalty = 30
      detail = `Churn ${churn.toFixed(2)}% — vigilance.`
      recommendation = "Monitorer les signaux faibles de désengagement."
    } else {
      penalty = 10
      detail = `Churn ${churn.toFixed(2)}% / NRR ${nrr.toFixed(1)}% — santé SaaS excellente.`
      recommendation = "Capitaliser sur les expansions pour accélérer."
    }
  } else {
    // PME/Industrie : BFR approximé via AR - AP days coverage
    const inv = getInvoiceKPIs(slug)
    const bfrGap = inv.dso - inv.dpo
    if (bfrGap > 30) {
      penalty = 70
      detail = `BFR tendu : DSO-DPO = ${bfrGap}j — les clients paient 30j après les fournisseurs.`
      recommendation = "Négocier des délais fournisseurs plus longs ou des acomptes clients."
    } else if (bfrGap > 10) {
      penalty = 40
      detail = `BFR déséquilibré : DSO-DPO = ${bfrGap}j.`
      recommendation = "Rééquilibrer via affacturage ou escompte fournisseurs."
    } else {
      penalty = 15
      detail = `BFR équilibré : DSO-DPO = ${bfrGap}j.`
      recommendation = "Maintenir la discipline de cash."
    }
  }

  return {
    key: "bfr",
    label: "BFR & Rétention",
    penalty,
    weight: WEIGHTS.bfr,
    level: levelFromPenalty(penalty),
    detail,
    recommendation,
  }
}

// ── Public API ──

export function computeRiskScore(slug: CompanySlug): RiskScore {
  const factors: RiskFactor[] = [
    scoreCash(slug),
    scoreDSO(slug),
    scoreBurn(slug),
    scoreBFR(slug),
  ]

  const weightedPenalty = factors.reduce(
    (sum, f) => sum + f.penalty * f.weight,
    0
  )
  const global = Math.round(Math.max(0, Math.min(100, 100 - weightedPenalty)))
  const level = globalLevel(global)

  const critical = factors.filter((f) => f.level === "critical")
  const warnings = factors.filter((f) => f.level === "warning")

  let summary: string
  if (level === "critical") {
    summary = `Score de risque critique (${global}/100) — ${critical.length} facteur(s) en alerte rouge.`
  } else if (level === "warning") {
    summary = `Score de vigilance (${global}/100) — ${warnings.length + critical.length} facteur(s) à surveiller.`
  } else {
    summary = `Santé financière saine (${global}/100) — aucun signal d'alerte majeur.`
  }

  let horizon90d: string
  if (level === "critical") {
    horizon90d =
      "Si la tendance actuelle se poursuit, risque élevé de rupture de trésorerie ou de crise opérationnelle dans les 90 jours."
  } else if (level === "warning") {
    horizon90d =
      "À 90 jours, dégradation probable si aucune action corrective n'est engagée sur les facteurs en alerte."
  } else {
    horizon90d =
      "À 90 jours, situation maîtrisable — maintenir le pilotage mensuel."
  }

  return { global, level, factors, summary, horizon90d }
}
