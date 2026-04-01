"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import {
  getAllPeriods,
  getLatestActual,
  getSaaSKPIs,
  getCompanyType,
} from "@/lib/demo-data"
import { formatCurrency, formatPercent, formatNumber, formatPeriod } from "@/lib/format"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"

function MrrTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-lg p-3 text-sm">
      <p className="font-medium text-[#1E3A5F] mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value, { compact: true })}
        </p>
      ))}
    </div>
  )
}

function ChurnTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-lg p-3 text-sm">
      <p className="font-medium text-[#1E3A5F] mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatPercent(entry.value)}
        </p>
      ))}
    </div>
  )
}

export default function KpisSaasPage() {
  const { company } = useCompany()
  const { t, locale } = useLocale()

  const companyType = getCompanyType(company.slug)
  const isSaaS = companyType === "startup-saas"

  // Non-SaaS companies: show a message
  if (!isSaaS) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertTriangle className="h-12 w-12 text-[#F59E0B] mb-4" />
        <h2 className="text-lg font-semibold text-[#1E3A5F] mb-2">
          {locale === "fr" ? "Module SaaS non applicable" : "SaaS module not applicable"}
        </h2>
        <p className="text-sm text-[#64748B] max-w-md">
          {locale === "fr"
            ? `${company.name} est une ${company.sector}. Les KPIs SaaS (MRR, ARR, Churn) ne s'appliquent pas. Consultez la Synthèse pour les KPIs adaptés.`
            : `${company.name} is a ${company.sector}. SaaS KPIs (MRR, ARR, Churn) don't apply. Check the Dashboard for relevant KPIs.`}
        </p>
      </div>
    )
  }

  const latestRaw = getLatestActual(company.slug)
  const latest = latestRaw ? getSaaSKPIs(latestRaw as Record<string, unknown>) : null

  const allPeriods = getAllPeriods(company.slug)
  const chartData = allPeriods.map((p) => {
    const kpis = getSaaSKPIs(p as Record<string, unknown>)
    return {
      period: formatPeriod(kpis.period, locale),
      mrr: kpis.mrr,
      newMrr: kpis.newMrr,
      churnedMrr: -kpis.churnedMrr,
      expansionMrr: kpis.expansionMrr,
      churnRate: kpis.churnRate,
      nrr: kpis.nrr,
      type: p.type,
    }
  })

  const forecastStartIndex = allPeriods.findIndex((p) => p.type === "forecast")
  const forecastStartPeriod = forecastStartIndex > 0
    ? formatPeriod(allPeriods[forecastStartIndex].period, locale)
    : null

  const kpiCards = latest
    ? [
        {
          label: "MRR",
          value: formatCurrency(latest.mrr, { compact: true }),
          sub: `${formatNumber(latest.activeCustomers)} clients`,
        },
        {
          label: "ARR",
          value: formatCurrency(latest.arr, { compact: true }),
          sub: `LTV ${formatCurrency(latest.ltv, { compact: true })}`,
        },
        {
          label: "Churn rate",
          value: formatPercent(latest.churnRate),
          sub: `${formatCurrency(latest.churnedMrr, { compact: true })}/mois`,
          alert: latest.churnRate > 1.5,
        },
        {
          label: "NRR",
          value: formatPercent(latest.nrr),
          sub: latest.nrr >= 100
            ? locale === "fr" ? "Expansion nette" : "Net expansion"
            : locale === "fr" ? "Contraction nette" : "Net contraction",
          alert: latest.nrr < 100,
        },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Period */}
      {latest && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal text-[#64748B] border-[#E2E8F0]">
            {latest.period}
          </Badge>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} className={kpi.alert ? "border-[#F59E0B]/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B] flex items-center gap-1.5">
                {kpi.label}
                {kpi.alert && <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B]" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.alert ? "text-[#F59E0B]" : "text-[#1E3A5F]"}`}>
                {kpi.value}
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MRR Evolution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("app.kpisSaas.evolutionMrr")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    tickLine={false}
                    axisLine={{ stroke: "#E2E8F0" }}
                    interval={3}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${Math.round(v / 1000)}K`}
                    width={45}
                  />
                  <Tooltip content={<MrrTooltip />} />
                  {forecastStartPeriod && (
                    <ReferenceLine x={forecastStartPeriod} stroke="#94A3B8" strokeDasharray="4 4" />
                  )}
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    name="MRR"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fill="url(#mrrGradient)"
                    dot={false}
                    activeDot={{ r: 3, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Churn & NRR */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("app.kpisSaas.churnRetention")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    tickLine={false}
                    axisLine={{ stroke: "#E2E8F0" }}
                    interval={3}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                    width={45}
                    domain={["auto", "auto"]}
                  />
                  <Tooltip content={<ChurnTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    iconType="line"
                    wrapperStyle={{ fontSize: 11, color: "#64748B" }}
                  />
                  {forecastStartPeriod && (
                    <ReferenceLine x={forecastStartPeriod} stroke="#94A3B8" strokeDasharray="4 4" />
                  )}
                  <ReferenceLine y={100} stroke="#16A34A" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <Line
                    type="monotone"
                    dataKey="churnRate"
                    name="Churn %"
                    stroke="#DC2626"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nrr"
                    name="NRR %"
                    stroke="#16A34A"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
