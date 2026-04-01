"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  getCashHistory,
  getLatestActual,
  normalizeCash,
  getCompanyType,
} from "@/lib/demo-data"
import { formatCurrency, formatRunway, formatPeriod } from "@/lib/format"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

function CashTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: { type: string } }>; label?: string }) {
  if (!active || !payload?.length) return null
  const data = payload[0]
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-lg p-3 text-sm">
      <p className="font-medium text-[#1E3A5F]">{label}</p>
      <p className="text-[#2563EB]">
        {formatCurrency(data.value, { compact: true })}
      </p>
      {data.payload.type === "forecast" && (
        <p className="text-[10px] text-[#94A3B8] mt-1">Prévisionnel</p>
      )}
    </div>
  )
}

export default function TresoreriePage() {
  const { company } = useCompany()
  const { t, locale } = useLocale()

  const latestRaw = getLatestActual(company.slug)
  const latest = latestRaw
    ? normalizeCash(company.slug, latestRaw as Record<string, unknown>)
    : null

  const companyType = getCompanyType(company.slug)
  const isSaaS = companyType === "startup-saas"

  const cashHistory = getCashHistory(company.slug)
  const chartData = cashHistory.map((p) => ({
    period: formatPeriod(p.period, locale),
    cash: p.cash,
    type: p.type,
  }))

  // Find the index where forecast starts
  const forecastStartIndex = cashHistory.findIndex((p) => p.type === "forecast")
  const forecastStartPeriod = forecastStartIndex > 0
    ? formatPeriod(cashHistory[forecastStartIndex].period, locale)
    : null

  const kpis = latest
    ? [
        {
          label: t("app.tresorerie.solde"),
          value: formatCurrency(latest.cash, { compact: true }),
        },
        {
          label: t("app.tresorerie.runway"),
          value: isSaaS
            ? formatRunway(latest.runway, locale)
            : locale === "fr" ? "N/A (rentable)" : "N/A (profitable)",
        },
        {
          label: t("app.tresorerie.burnRate"),
          value: isSaaS && latest.netBurn !== null
            ? formatCurrency(latest.netBurn, { compact: true })
            : "—",
        },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Period indicator */}
      {latest && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal text-[#64748B] border-[#E2E8F0]">
            {latest.period}
          </Badge>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E3A5F]">{kpi.value}</div>
              <p className="text-xs text-[#94A3B8] mt-1">{company.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cash Projection Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t("app.tresorerie.projection")}</CardTitle>
            <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#2563EB] rounded" />
                {locale === "fr" ? "Réalisé" : "Actual"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#2563EB]/40 rounded border border-dashed border-[#2563EB]" />
                {locale === "fr" ? "Prévisionnel" : "Forecast"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8F0" }}
                  interval={2}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}K`}
                  width={50}
                />
                <Tooltip content={<CashTooltip />} />
                {forecastStartPeriod && (
                  <ReferenceLine
                    x={forecastStartPeriod}
                    stroke="#94A3B8"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="cash"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#cashGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
