/**
 * Synthese Dashboard — Data layer
 *
 * Provides health score, alerts, recommended actions, calendar events,
 * and morning brief for each demo company. Data is computed from the
 * existing financial-summary JSON files to stay consistent.
 */

import type { CompanySlug } from "./companies"
import {
  getLatestActual,
  getSameMonthLastYear,
  getAllPeriods,
  normalizeSynthesis,
  normalizeCash,
  computeVariation,
  getCompanyNotes,
  getCompanyType,
  type SynthesisKPIs,
} from "./demo-data"
import { formatCurrency, formatPercent, formatRunway } from "./format"

// ── Types ──

export type AlertSeverity = "critical" | "warning" | "info"

export type Alert = {
  id: string
  severity: AlertSeverity
  title: string
  description: string
  module: string
  moduleHref: string
}

export type RecommendedAction = {
  id: string
  priority: number
  title: string
  description: string
  module: string
  moduleHref: string
}

export type CalendarEvent = {
  id: string
  date: string
  label: string
  amount?: number
  type: "fiscal" | "payment" | "internal" | "deadline"
}

export type HealthAxis = {
  label: string
  score: number
  status: "good" | "warning" | "critical"
}

export type HealthScore = {
  global: number
  axes: HealthAxis[]
}

export type MorningBrief = {
  text: string
  generatedAt: string
}

// ── Health Score ──

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function getHealthScore(slug: CompanySlug): HealthScore {
  const latestRaw = getLatestActual(slug)
  const prevYearRaw = getSameMonthLastYear(slug)
  if (!latestRaw) return { global: 50, axes: [] }

  const latest = normalizeSynthesis(slug, latestRaw as Record<string, unknown>)
  const prevYear = prevYearRaw
    ? normalizeSynthesis(slug, prevYearRaw as Record<string, unknown>)
    : null
  const cashData = normalizeCash(slug, latestRaw as Record<string, unknown>)

  // Liquidity score: based on cash level and runway
  let liquidityScore = 70
  if (slug === "propello") {
    const runway = cashData.runway ?? 0
    if (runway >= 18) liquidityScore = 90
    else if (runway >= 12) liquidityScore = 80
    else if (runway >= 6) liquidityScore = 60
    else liquidityScore = 35
  } else {
    // For PME/ecommerce, cash ratio
    if (latest.cash > latest.expenses * 3) liquidityScore = 85
    else if (latest.cash > latest.expenses * 1.5) liquidityScore = 70
    else liquidityScore = 45
  }

  // Profitability score
  let profitScore = 60
  const margin = latest.revenue > 0 ? (latest.netResult / latest.revenue) * 100 : 0
  if (margin > 15) profitScore = 90
  else if (margin > 8) profitScore = 75
  else if (margin > 0) profitScore = 60
  else profitScore = 35

  // Growth score
  let growthScore = 65
  if (prevYear) {
    const revGrowth = computeVariation(latest.revenue, prevYear.revenue)
    if (revGrowth !== null) {
      if (revGrowth > 20) growthScore = 90
      else if (revGrowth > 10) growthScore = 80
      else if (revGrowth > 0) growthScore = 65
      else growthScore = 40
    }
  }

  // Risk score — company-specific
  let riskScore = 70
  const companyType = getCompanyType(slug)
  if (slug === "propello") {
    // Churn risk
    const raw = latestRaw as Record<string, unknown>
    const churnRate = (raw as { churn_rate_pct?: number }).churn_rate_pct ?? 0
    if (churnRate > 2.5) riskScore = 30
    else if (churnRate > 1.5) riskScore = 55
    else riskScore = 80
  } else if (slug === "mecaform") {
    // Client concentration risk
    const raw = latestRaw as Record<string, unknown>
    const dso = (raw as { dso_days?: number }).dso_days ?? 0
    if (dso > 75) riskScore = 35
    else if (dso > 60) riskScore = 55
    else riskScore = 80
  } else {
    // Maison Nordique — margin risk on lighting category
    riskScore = 55
  }

  const axes: HealthAxis[] = [
    {
      label: "Liquidite",
      score: clamp(liquidityScore, 0, 100),
      status: liquidityScore >= 70 ? "good" : liquidityScore >= 50 ? "warning" : "critical",
    },
    {
      label: "Rentabilite",
      score: clamp(profitScore, 0, 100),
      status: profitScore >= 70 ? "good" : profitScore >= 50 ? "warning" : "critical",
    },
    {
      label: "Croissance",
      score: clamp(growthScore, 0, 100),
      status: growthScore >= 70 ? "good" : growthScore >= 50 ? "warning" : "critical",
    },
    {
      label: "Risque",
      score: clamp(riskScore, 0, 100),
      status: riskScore >= 70 ? "good" : riskScore >= 50 ? "warning" : "critical",
    },
  ]

  const global = Math.round(
    axes.reduce((sum, a) => sum + a.score, 0) / axes.length
  )

  return { global, axes }
}

// ── Alerts ──

export function getAlerts(slug: CompanySlug): Alert[] {
  const alerts: Alert[] = []
  const notes = getCompanyNotes(slug)

  switch (slug) {
    case "propello": {
      const latestRaw = getLatestActual(slug) as Record<string, unknown> | undefined
      const churnRate = latestRaw ? (latestRaw as { churn_rate_pct?: number }).churn_rate_pct ?? 0 : 0
      const nrr = latestRaw ? (latestRaw as { nrr_pct?: number }).nrr_pct ?? 100 : 100

      if (nrr < 100) {
        alerts.push({
          id: "propello-nrr",
          severity: "critical",
          title: "NRR sous les 100%",
          description: `Net Revenue Retention a ${formatPercent(nrr, { decimals: 1 })} — la base client s'erode.`,
          module: "KPIs SaaS",
          moduleHref: "/app/kpis-saas",
        })
      }
      if (churnRate > 2) {
        alerts.push({
          id: "propello-churn",
          severity: "warning",
          title: "Churn en hausse",
          description: `Taux de churn a ${formatPercent(churnRate, { decimals: 1 })} — tendance haussiere depuis 4 mois.`,
          module: "KPIs SaaS",
          moduleHref: "/app/kpis-saas",
        })
      }
      alerts.push({
        id: "propello-runway",
        severity: "info",
        title: "Runway stable",
        description: "Le runway reste au-dessus de 12 mois grace au controle des depenses.",
        module: "Tresorerie",
        moduleHref: "/app/tresorerie",
      })
      break
    }
    case "mecaform": {
      const latestRaw = getLatestActual(slug) as Record<string, unknown> | undefined
      const dso = latestRaw ? (latestRaw as { dso_days?: number }).dso_days ?? 0 : 0
      const ar = latestRaw ? (latestRaw as { accounts_receivable?: number }).accounts_receivable ?? 0 : 0

      if (dso > 70) {
        alerts.push({
          id: "mecaform-dso",
          severity: "critical",
          title: "DSO en forte degradation",
          description: `Le DSO atteint ${dso} jours — un client majeur retarde systematiquement ses paiements.`,
          module: "Factures clients",
          moduleHref: "/app/factures-clients",
        })
      }
      if (ar > 1_500_000) {
        alerts.push({
          id: "mecaform-ar",
          severity: "warning",
          title: "Creances clients elevees",
          description: `${formatCurrency(ar, { compact: true })} de creances — concentration sur un seul client (30% du CA).`,
          module: "Factures clients",
          moduleHref: "/app/factures-clients",
        })
      }
      alerts.push({
        id: "mecaform-margin",
        severity: "info",
        title: "Marge brute stable",
        description: "La marge brute se maintient autour de 43-44%, conforme aux previsions.",
        module: "Synthese",
        moduleHref: "/app/synthese",
      })
      break
    }
    case "maison-nordique": {
      alerts.push({
        id: "mn-lighting",
        severity: "critical",
        title: "Luminaires vendus a perte",
        description: "La categorie Luminaires affiche une marge nette negative (-2% a -5%) une fois retours et logistique integres.",
        module: "Synthese",
        moduleHref: "/app/synthese",
      })
      alerts.push({
        id: "mn-returns",
        severity: "warning",
        title: "Taux de retour Luminaires eleve",
        description: "22% de retours sur les luminaires — produits fragiles, emballages a revoir.",
        module: "Factures clients",
        moduleHref: "/app/factures-clients",
      })
      alerts.push({
        id: "mn-season",
        severity: "info",
        title: "Preparation Noel",
        description: "Nov-Dec representent 35% du CA annuel. Verifier les stocks et la logistique.",
        module: "Synthese",
        moduleHref: "/app/synthese",
      })
      break
    }
  }

  // Sort: critical first, then warning, then info
  const order: Record<AlertSeverity, number> = { critical: 0, warning: 1, info: 2 }
  alerts.sort((a, b) => order[a.severity] - order[b.severity])

  return alerts
}

// ── Recommended Actions ──

export function getRecommendedActions(slug: CompanySlug): RecommendedAction[] {
  switch (slug) {
    case "propello":
      return [
        {
          id: "propello-action-1",
          priority: 1,
          title: "Analyser le churn par cohorte",
          description: "Identifier les segments clients qui churnent le plus pour cibler les actions de retention.",
          module: "KPIs SaaS",
          moduleHref: "/app/kpis-saas",
        },
        {
          id: "propello-action-2",
          priority: 2,
          title: "Revoir la strategie d'expansion revenue",
          description: "Le NRR sous 100% indique un probleme d'upsell. Evaluer les offres de tier superieur.",
          module: "KPIs SaaS",
          moduleHref: "/app/kpis-saas",
        },
        {
          id: "propello-action-3",
          priority: 3,
          title: "Preparer le board deck Q4",
          description: "Compiler les metriques SaaS pour la prochaine reunion investisseurs.",
          module: "Synthese",
          moduleHref: "/app/synthese",
        },
      ]
    case "mecaform":
      return [
        {
          id: "mecaform-action-1",
          priority: 1,
          title: "Relancer le client en retard",
          description: "Le client representant 30% du CA accumule les retards. Envoi d'une relance formelle.",
          module: "Factures clients",
          moduleHref: "/app/factures-clients",
        },
        {
          id: "mecaform-action-2",
          priority: 2,
          title: "Diversifier le portefeuille client",
          description: "Reduire la dependance au client principal — objectif < 20% du CA par client.",
          module: "Synthese",
          moduleHref: "/app/synthese",
        },
        {
          id: "mecaform-action-3",
          priority: 3,
          title: "Verifier la cloture T1 2026",
          description: "L'echeance de cloture trimestrielle approche. Preparer les ecritures de cut-off.",
          module: "Cloture mensuelle",
          moduleHref: "/app/cloture",
        },
      ]
    case "maison-nordique":
      return [
        {
          id: "mn-action-1",
          priority: 1,
          title: "Auditer la marge nette Luminaires",
          description: "Inclure retours et logistique dans l'analyse de rentabilite par categorie.",
          module: "Synthese",
          moduleHref: "/app/synthese",
        },
        {
          id: "mn-action-2",
          priority: 2,
          title: "Renegocier le fournisseur Luminaires",
          description: "La marge brute de 38% est insuffisante avec 22% de retours. Negocier des conditions ou changer de fournisseur.",
          module: "Factures fournisseurs",
          moduleHref: "/app/factures-fournisseurs",
        },
        {
          id: "mn-action-3",
          priority: 3,
          title: "Anticiper les stocks Noel",
          description: "Commander les stocks Mobilier et Textiles pour le pic nov-dec (35% du CA annuel).",
          module: "Synthese",
          moduleHref: "/app/synthese",
        },
      ]
  }
}

// ── Calendar Events ──

export function getCalendarEvents(slug: CompanySlug): { today: CalendarEvent[]; week: CalendarEvent[] } {
  switch (slug) {
    case "propello":
      return {
        today: [
          { id: "p-t1", date: "09:00", label: "Encaissement Stripe — abonnements mensuels", amount: 142000, type: "payment" },
          { id: "p-t2", date: "14:00", label: "Echeance TVA CA3 — mars 2026", amount: 28400, type: "fiscal" },
        ],
        week: [
          { id: "p-w1", date: "Mer.", label: "Paiement salaires", amount: 135000, type: "payment" },
          { id: "p-w2", date: "Jeu.", label: "Board meeting mensuel", type: "internal" },
          { id: "p-w3", date: "Ven.", label: "Date limite declaration URSSAF", type: "deadline" },
        ],
      }
    case "mecaform":
      return {
        today: [
          { id: "m-t1", date: "10:00", label: "Virement recu — client Aeroparts SA", amount: 95000, type: "payment" },
          { id: "m-t2", date: "14:00", label: "Echeance TVA CA3 — mars 2026", amount: 45200, type: "fiscal" },
          { id: "m-t3", date: "16:00", label: "Relance planifiee — client en retard", type: "deadline" },
        ],
        week: [
          { id: "m-w1", date: "Mar.", label: "Paiement fournisseur acier", amount: 128000, type: "payment" },
          { id: "m-w2", date: "Mer.", label: "Paiement salaires + charges", amount: 320000, type: "payment" },
          { id: "m-w3", date: "Ven.", label: "Cloture comptable T1 2026", type: "deadline" },
        ],
      }
    case "maison-nordique":
      return {
        today: [
          { id: "n-t1", date: "09:30", label: "Rapprochement bancaire Shopify", amount: 45000, type: "payment" },
          { id: "n-t2", date: "11:00", label: "Facture transporteur a valider", amount: 8200, type: "payment" },
        ],
        week: [
          { id: "n-w1", date: "Mar.", label: "Echeance TVA CA3 — mars 2026", amount: 18500, type: "fiscal" },
          { id: "n-w2", date: "Mer.", label: "Paiement salaires", amount: 55000, type: "payment" },
          { id: "n-w3", date: "Jeu.", label: "Point stock avec fournisseur scandinave", type: "internal" },
          { id: "n-w4", date: "Ven.", label: "Cloture mensuelle mars", type: "deadline" },
        ],
      }
  }
}

// ── Morning Brief ──

export function getMorningBrief(slug: CompanySlug): MorningBrief {
  const latestRaw = getLatestActual(slug)
  if (!latestRaw) return { text: "", generatedAt: "" }

  const latest = normalizeSynthesis(slug, latestRaw as Record<string, unknown>)
  const cashData = normalizeCash(slug, latestRaw as Record<string, unknown>)
  const prevYearRaw = getSameMonthLastYear(slug)
  const prevYear = prevYearRaw
    ? normalizeSynthesis(slug, prevYearRaw as Record<string, unknown>)
    : null

  const cashVar = prevYear ? computeVariation(latest.cash, prevYear.cash) : null
  const revVar = prevYear ? computeVariation(latest.revenue, prevYear.revenue) : null

  let text = ""

  switch (slug) {
    case "propello": {
      const raw = latestRaw as Record<string, unknown>
      const churnRate = (raw as { churn_rate_pct?: number }).churn_rate_pct ?? 0
      const nrr = (raw as { nrr_pct?: number }).nrr_pct ?? 100
      const runway = cashData.runway ?? 0

      text = `Bonjour. Votre tresorerie disponible est de ${formatCurrency(latest.cash, { compact: true })}${cashVar !== null ? `, ${cashVar >= 0 ? "en hausse" : "en baisse"} de ${formatPercent(Math.abs(cashVar))} vs N-1` : ""}. `
      text += `Le MRR atteint ${formatCurrency(latest.revenue, { compact: true })}${revVar !== null ? ` (${revVar >= 0 ? "+" : ""}${formatPercent(revVar)} vs N-1)` : ""}. `

      if (nrr < 100) {
        text += `Point d'attention : le NRR est passe sous 100% a ${formatPercent(nrr, { decimals: 1 })}, ce qui signifie que votre base installee s'erode. `
        text += `Le churn a ${formatPercent(churnRate, { decimals: 1 })} masque la croissance du MRR brut. `
      }
      text += `Votre runway est de ${formatRunway(runway)} — confortable mais a surveiller si le churn continue sa progression.`
      break
    }
    case "mecaform": {
      const raw = latestRaw as Record<string, unknown>
      const dso = (raw as { dso_days?: number }).dso_days ?? 0
      const ar = (raw as { accounts_receivable?: number }).accounts_receivable ?? 0

      text = `Bonjour. Tresorerie a ${formatCurrency(latest.cash, { compact: true })}${cashVar !== null ? ` (${cashVar >= 0 ? "+" : ""}${formatPercent(Math.abs(cashVar))} vs N-1)` : ""}. `
      text += `Le CA du mois est de ${formatCurrency(latest.revenue, { compact: true })}${revVar !== null ? ` (${revVar >= 0 ? "+" : ""}${formatPercent(revVar)} vs N-1)` : ""}. `

      if (dso > 65) {
        text += `Alerte : le DSO atteint ${dso} jours, en degradation constante depuis septembre. Un client representant 30% du CA accumule ${formatCurrency(ar * 0.3, { compact: true })} de creances impayees. `
        text += `Si ce retard persiste, la tresorerie sera sous pression d'ici 2 mois. Relance recommandee aujourd'hui.`
      } else {
        text += `Le DSO est a ${dso} jours, dans la norme sectorielle.`
      }
      break
    }
    case "maison-nordique": {
      text = `Bonjour. Tresorerie a ${formatCurrency(latest.cash, { compact: true })}${cashVar !== null ? ` (${cashVar >= 0 ? "+" : ""}${formatPercent(Math.abs(cashVar))} vs N-1)` : ""}. `
      text += `Le CA du mois est de ${formatCurrency(latest.revenue, { compact: true })}${revVar !== null ? ` (${revVar >= 0 ? "+" : ""}${formatPercent(revVar)} vs N-1)` : ""}. `
      text += `Point critique : la categorie Luminaires est vendue a perte nette depuis 6 mois (-2% a -5% de marge nette reelle). `
      text += `Le taux de retour de 22% et les frais logistiques specifiques (produits fragiles) annulent la marge brute apparente de 38%. `
      text += `Action recommandee : auditer la rentabilite reelle par categorie et renegocier avec le fournisseur.`
      break
    }
  }

  return {
    text,
    generatedAt: "Il y a 8 min",
  }
}

// ── Sparkline Data (last 6 months of cash) ──

export function getCashSparkline(slug: CompanySlug): number[] {
  const data = getAllPeriods(slug)
  const actuals = data.filter((p) => p.type === "actual")
  const last6 = actuals.slice(-6)
  return last6.map((p) => {
    const norm = normalizeCash(slug, p as Record<string, unknown>)
    return norm.cash
  })
}

// ── KPI with runway (extended) ──

export type SyntheseHeroKPI = {
  label: string
  value: string
  variation: number | null
  favorableWhenPositive: boolean
  sparkline?: number[]
}

export function getHeroKPIs(slug: CompanySlug, locale: "fr" | "en" = "fr"): SyntheseHeroKPI[] {
  const latestRaw = getLatestActual(slug)
  const prevYearRaw = getSameMonthLastYear(slug)
  if (!latestRaw) return []

  const latest = normalizeSynthesis(slug, latestRaw as Record<string, unknown>)
  const cashData = normalizeCash(slug, latestRaw as Record<string, unknown>)
  const prevYear = prevYearRaw
    ? normalizeSynthesis(slug, prevYearRaw as Record<string, unknown>)
    : null

  const cashSparkline = getCashSparkline(slug)

  const kpis: SyntheseHeroKPI[] = [
    {
      label: locale === "fr" ? "Cash disponible" : "Available cash",
      value: formatCurrency(latest.cash, { compact: true }),
      variation: prevYear ? computeVariation(latest.cash, prevYear.cash) : null,
      favorableWhenPositive: true,
      sparkline: cashSparkline,
    },
    {
      label: locale === "fr" ? "CA du mois" : "Monthly revenue",
      value: formatCurrency(latest.revenue, { compact: true }),
      variation: prevYear ? computeVariation(latest.revenue, prevYear.revenue) : null,
      favorableWhenPositive: true,
    },
    {
      label: locale === "fr" ? "Resultat net" : "Net income",
      value: formatCurrency(latest.netResult, { compact: true }),
      variation: prevYear ? computeVariation(latest.netResult, prevYear.netResult) : null,
      favorableWhenPositive: true,
    },
  ]

  // Add runway for SaaS, or margin for others
  if (slug === "propello" && cashData.runway) {
    kpis.push({
      label: "Runway",
      value: formatRunway(cashData.runway),
      variation: null,
      favorableWhenPositive: true,
    })
  } else {
    // Gross margin for industrial/ecommerce
    const marginPct = latest.revenue > 0
      ? ((latest.revenue - latest.expenses) / latest.revenue) * 100
      : 0
    const prevMarginPct = prevYear && prevYear.revenue > 0
      ? ((prevYear.revenue - prevYear.expenses) / prevYear.revenue) * 100
      : null
    kpis.push({
      label: locale === "fr" ? "Marge brute" : "Gross margin",
      value: formatPercent(marginPct, { decimals: 1 }),
      variation: prevMarginPct !== null ? marginPct - prevMarginPct : null,
      favorableWhenPositive: true,
    })
  }

  return kpis
}
