"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { formatVariation } from "@/lib/format"
import type { SyntheseHeroKPI } from "@/lib/synthese-data"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

function VariationBadge({
  pct,
  favorableWhenPositive,
}: {
  pct: number | null
  favorableWhenPositive: boolean
}) {
  const { text, color: rawColor } = formatVariation(pct)

  if (rawColor === "gray")
    return <span className="text-xs text-[#94A3B8]">{text}</span>

  // Determine actual favorable/unfavorable color
  const isFavorable = favorableWhenPositive
    ? pct !== null && pct >= 0
    : pct !== null && pct <= 0

  const Icon =
    pct !== null && pct > 0
      ? TrendingUp
      : pct !== null && pct < 0
        ? TrendingDown
        : Minus

  const colorClasses = isFavorable
    ? "text-[#059669] bg-[#059669]/10"
    : "text-[#DC2626] bg-[#DC2626]/10"

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded ${colorClasses}`}
    >
      <Icon className="h-3 w-3" />
      {text}
    </span>
  )
}

function MiniSparkline({ data }: { data: number[] }) {
  const chartData = data.map((value, i) => ({ i, value }))
  return (
    <div className="h-[40px] w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={1.5}
            fill="url(#sparkGrad)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function HeroKPIs({ kpis }: { kpis: SyntheseHeroKPI[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">
              {kpi.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F] tabular-nums">
              {kpi.value}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <VariationBadge
                pct={kpi.variation}
                favorableWhenPositive={kpi.favorableWhenPositive}
              />
              {kpi.variation !== null && (
                <span className="text-[10px] text-[#94A3B8]">vs N-1</span>
              )}
            </div>
            {kpi.sparkline && <MiniSparkline data={kpi.sparkline} />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
