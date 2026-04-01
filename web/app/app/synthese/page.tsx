"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react"
import {
  getLatestActual,
  getSameMonthLastYear,
  normalizeSynthesis,
  computeVariation,
  getCompanyNotes,
} from "@/lib/demo-data"
import { formatCurrency, formatVariation } from "@/lib/format"

function VariationBadge({ pct }: { pct: number | null }) {
  const { text, color } = formatVariation(pct)
  if (color === "gray") return <span className="text-xs text-[#94A3B8]">{text}</span>

  const Icon = pct !== null && pct > 0 ? TrendingUp : pct !== null && pct < 0 ? TrendingDown : Minus
  const colorClasses = color === "green" ? "text-[#16A34A] bg-[#16A34A]/10" : "text-[#DC2626] bg-[#DC2626]/10"

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded ${colorClasses}`}>
      <Icon className="h-3 w-3" />
      {text}
    </span>
  )
}

export default function SynthesePage() {
  const { company } = useCompany()
  const { t, locale } = useLocale()

  const latestRaw = getLatestActual(company.slug)
  const prevYearRaw = getSameMonthLastYear(company.slug)

  const latest = latestRaw
    ? normalizeSynthesis(company.slug, latestRaw as Record<string, unknown>)
    : null
  const prevYear = prevYearRaw
    ? normalizeSynthesis(company.slug, prevYearRaw as Record<string, unknown>)
    : null

  const notes = getCompanyNotes(company.slug)

  const kpis = latest
    ? [
        {
          label: t("app.synthese.tresorerie"),
          value: formatCurrency(latest.cash, { compact: true }),
          variation: prevYear ? computeVariation(latest.cash, prevYear.cash) : null,
          favorableWhenPositive: true,
        },
        {
          label: t("app.synthese.caMois"),
          value: formatCurrency(latest.revenue, { compact: true }),
          variation: prevYear ? computeVariation(latest.revenue, prevYear.revenue) : null,
          favorableWhenPositive: true,
        },
        {
          label: t("app.synthese.charges"),
          value: formatCurrency(latest.expenses, { compact: true }),
          variation: prevYear ? computeVariation(latest.expenses, prevYear.expenses) : null,
          favorableWhenPositive: false,
        },
        {
          label: t("app.synthese.resultatNet"),
          value: formatCurrency(latest.netResult, { compact: true }),
          variation: prevYear ? computeVariation(latest.netResult, prevYear.netResult) : null,
          favorableWhenPositive: true,
        },
      ]
    : []

  const aiInsight = locale === "fr"
    ? `${notes.latent_issue}`
    : `${notes.latent_issue}`

  return (
    <div className="space-y-6">
      {/* Period indicator */}
      {latest && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal text-[#64748B] border-[#E2E8F0]">
            {latest.period}
          </Badge>
          <span className="text-xs text-[#94A3B8]">
            {latest.type === "actual"
              ? locale === "fr" ? "Dernières données réelles" : "Latest actual data"
              : locale === "fr" ? "Prévisionnel" : "Forecast"}
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const variationColor =
            kpi.variation === null
              ? "gray"
              : kpi.favorableWhenPositive
                ? kpi.variation >= 0 ? "green" : "red"
                : kpi.variation <= 0 ? "green" : "red"

          const adjustedVariation = kpi.favorableWhenPositive
            ? kpi.variation
            : kpi.variation !== null ? -kpi.variation : null

          return (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#64748B]">{kpi.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1E3A5F]">{kpi.value}</div>
                <div className="mt-1">
                  <VariationBadge pct={kpi.variation} />
                  {kpi.variation !== null && (
                    <span className="text-[10px] text-[#94A3B8] ml-1.5">
                      {locale === "fr" ? "vs N-1" : "vs PY"}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Analysis Card */}
      <Card className="border-l-[3px] border-l-[#7C3AED] bg-[#EDE9FE]/30">
        <CardContent className="flex items-start gap-3 pt-6">
          <Sparkles className="h-5 w-5 text-[#7C3AED] shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-[#7C3AED] text-white text-[10px] px-1.5">AI</Badge>
              <span className="text-sm font-medium text-[#1E3A5F]">
                {t("app.synthese.aiAnalysis")} — {company.name}
              </span>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">
              {aiInsight}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
