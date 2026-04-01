import type { CompanySlug } from "./companies"

// ── Raw data imports ──
import propelloData from "../../data/propello/financial-summary.json"
import maisonNordiqueData from "../../data/maison-nordique/financial-summary.json"
import mecaformData from "../../data/mecaform/financial-summary.json"

// ── Types ──

export type PeriodType = "actual" | "forecast"

/** Normalized KPIs common across all company types */
export type SynthesisKPIs = {
  period: string
  type: PeriodType
  cash: number
  revenue: number
  expenses: number
  netResult: number
  headcount: number
}

export type CashKPIs = {
  period: string
  type: PeriodType
  cash: number
  runway: number | null
  burnRate: number | null
  netBurn: number | null
}

export type SaaSKPIs = {
  period: string
  type: PeriodType
  mrr: number
  arr: number
  newMrr: number
  churnedMrr: number
  expansionMrr: number
  churnRate: number
  nrr: number
  activeCustomers: number
  cac: number
  ltv: number
}

export type InvoiceKPIs = {
  totalReceivable: number
  overdue: number
  collectedThisMonth: number
  dso: number
  totalPayable: number
  dueSoon: number
  paidThisMonth: number
  dpo: number
}

// ── Raw period types ──

type PropelloPeriod = (typeof propelloData.data)[number]
type MaisonNordiquePeriod = (typeof maisonNordiqueData.data)[number]
type MecaformPeriod = (typeof mecaformData.data)[number]

// ── Data access ──

function getRawData(slug: CompanySlug) {
  switch (slug) {
    case "propello":
      return propelloData
    case "maison-nordique":
      return maisonNordiqueData
    case "mecaform":
      return mecaformData
  }
}

export function getCompanyType(slug: CompanySlug): string {
  return getRawData(slug).type
}

export function getCompanyNotes(slug: CompanySlug) {
  return getRawData(slug).notes
}

/** Get all periods for a company */
export function getAllPeriods(slug: CompanySlug) {
  return getRawData(slug).data
}

/** Get the latest actual period */
export function getLatestActual(slug: CompanySlug) {
  const data = getRawData(slug).data
  const actuals = data.filter((p) => p.type === "actual")
  return actuals[actuals.length - 1]
}

/** Get the period before the latest actual (for variation) */
export function getPreviousActual(slug: CompanySlug) {
  const data = getRawData(slug).data
  const actuals = data.filter((p) => p.type === "actual")
  return actuals.length >= 2 ? actuals[actuals.length - 2] : null
}

/** Get the same month from previous year */
export function getSameMonthLastYear(slug: CompanySlug) {
  const latest = getLatestActual(slug)
  if (!latest) return null
  const [year, month] = latest.period.split("-")
  const targetPeriod = `${parseInt(year) - 1}-${month}`
  const data = getRawData(slug).data
  return data.find((p) => p.period === targetPeriod) ?? null
}

// ── Normalization ──

/** Normalize any company period into common synthesis KPIs */
export function normalizeSynthesis(slug: CompanySlug, period: Record<string, unknown>): SynthesisKPIs {
  switch (slug) {
    case "propello": {
      const p = period as PropelloPeriod
      const revenue = p.mrr
      const expenses = p.payroll + Math.abs(p.net_burn) - p.mrr + p.payroll * 0.1 // approximate non-payroll opex
      return {
        period: p.period,
        type: p.type as PeriodType,
        cash: p.cash_available,
        revenue: p.mrr,
        expenses: p.payroll,
        netResult: revenue - expenses,
        headcount: p.headcount_fte,
      }
    }
    case "maison-nordique": {
      const p = period as MaisonNordiquePeriod
      const totalCogs = Object.values(p.categories).reduce(
        (sum, cat) => sum + cat.cogs + cat.logistics_costs,
        0
      )
      return {
        period: p.period,
        type: p.type as PeriodType,
        cash: p.cash_available,
        revenue: p.revenue_total,
        expenses: totalCogs + p.payroll,
        netResult: p.revenue_total - totalCogs - p.payroll,
        headcount: 15, // from company.json
      }
    }
    case "mecaform": {
      const p = period as MecaformPeriod
      return {
        period: p.period,
        type: p.type as PeriodType,
        cash: p.cash_available,
        revenue: p.revenue,
        expenses: p.cogs + p.fixed_costs,
        netResult: p.ebitda,
        headcount: p.headcount_fte,
      }
    }
  }
}

/** Normalize cash KPIs */
export function normalizeCash(slug: CompanySlug, period: Record<string, unknown>): CashKPIs {
  switch (slug) {
    case "propello": {
      const p = period as PropelloPeriod
      return {
        period: p.period,
        type: p.type as PeriodType,
        cash: p.cash_available,
        runway: p.runway_months,
        burnRate: p.net_burn,
        netBurn: p.net_burn,
      }
    }
    case "maison-nordique": {
      const p = period as MaisonNordiquePeriod
      return {
        period: p.period,
        type: p.type as PeriodType,
        cash: p.cash_available,
        runway: null,
        burnRate: null,
        netBurn: null,
      }
    }
    case "mecaform": {
      const p = period as MecaformPeriod
      return {
        period: p.period,
        type: p.type as PeriodType,
        cash: p.cash_available,
        runway: null,
        burnRate: null,
        netBurn: null,
      }
    }
  }
}

/** Get SaaS KPIs (only for Propello) */
export function getSaaSKPIs(period: Record<string, unknown>): SaaSKPIs {
  const p = period as PropelloPeriod
  return {
    period: p.period,
    type: p.type as PeriodType,
    mrr: p.mrr,
    arr: p.arr,
    newMrr: p.new_mrr,
    churnedMrr: p.churned_mrr,
    expansionMrr: p.expansion_mrr,
    churnRate: p.churn_rate_pct,
    nrr: p.nrr_pct,
    activeCustomers: p.active_customers,
    cac: p.cac,
    ltv: p.ltv_estimated,
  }
}

/** Generate invoice KPIs from financial data */
export function getInvoiceKPIs(slug: CompanySlug): InvoiceKPIs {
  const latest = getLatestActual(slug)
  if (!latest) {
    return { totalReceivable: 0, overdue: 0, collectedThisMonth: 0, dso: 0, totalPayable: 0, dueSoon: 0, paidThisMonth: 0, dpo: 0 }
  }

  switch (slug) {
    case "propello": {
      const p = latest as PropelloPeriod
      const monthlyRevenue = p.mrr
      return {
        totalReceivable: Math.round(monthlyRevenue * 1.8),
        overdue: Math.round(monthlyRevenue * 0.15),
        collectedThisMonth: Math.round(monthlyRevenue * 0.85),
        dso: 42,
        totalPayable: Math.round(p.payroll * 1.3),
        dueSoon: Math.round(p.payroll * 0.4),
        paidThisMonth: Math.round(p.payroll * 1.1),
        dpo: 35,
      }
    }
    case "maison-nordique": {
      const p = latest as MaisonNordiquePeriod
      return {
        totalReceivable: Math.round(p.revenue_total * 0.3),
        overdue: Math.round(p.revenue_total * 0.05),
        collectedThisMonth: Math.round(p.revenue_total * 0.9),
        dso: 12,
        totalPayable: Math.round(p.stock_value * 0.25),
        dueSoon: Math.round(p.stock_value * 0.08),
        paidThisMonth: Math.round(p.stock_value * 0.2),
        dpo: 38,
      }
    }
    case "mecaform": {
      const p = latest as MecaformPeriod
      return {
        totalReceivable: p.accounts_receivable,
        overdue: Math.round(p.accounts_receivable * 0.18),
        collectedThisMonth: Math.round(p.revenue * 0.85),
        dso: p.dso_days,
        totalPayable: p.accounts_payable,
        dueSoon: Math.round(p.accounts_payable * 0.3),
        paidThisMonth: Math.round(p.cogs * 0.8),
        dpo: p.dpo_days,
      }
    }
  }
}

/** Get cash history for chart (last 12 actuals + forecasts) */
export function getCashHistory(slug: CompanySlug): CashKPIs[] {
  const data = getRawData(slug).data
  return data.map((p) => normalizeCash(slug, p as Record<string, unknown>))
}

/** Get synthesis history for chart */
export function getSynthesisHistory(slug: CompanySlug): SynthesisKPIs[] {
  const data = getRawData(slug).data
  return data.map((p) => normalizeSynthesis(slug, p as Record<string, unknown>))
}

/** Compute variation between two values */
export function computeVariation(current: number, previous: number): number | null {
  if (previous === 0) return null
  return ((current - previous) / Math.abs(previous)) * 100
}
