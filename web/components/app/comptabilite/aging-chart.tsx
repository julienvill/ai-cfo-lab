"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { AgingBucket } from "@/lib/comptabilite-data"
import { formatCurrency } from "@/lib/format"

type AgingChartProps = {
  data: AgingBucket
  title: string
}

const COLORS = {
  current: "#059669",
  days1_30: "#3B82F6",
  days31_60: "#F59E0B",
  days61_90: "#D97706",
  days90plus: "#DC2626",
}

const LABELS: Record<string, string> = {
  current: "Courant",
  days1_30: "1-30 j",
  days31_60: "31-60 j",
  days61_90: "61-90 j",
  days90plus: "90+ j",
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }> }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-3 shadow-md">
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[#64748B]">{LABELS[entry.name] ?? entry.name}</span>
          <span className="font-medium text-[#1E3A5F] ml-auto">
            {formatCurrency(entry.value / 100, { compact: entry.value > 10000000 })}
          </span>
        </div>
      ))}
    </div>
  )
}

export function AgingChart({ data, title }: AgingChartProps) {
  const chartData = [
    {
      name: "Encours",
      current: data.current,
      days1_30: data.days1_30,
      days31_60: data.days31_60,
      days61_90: data.days61_90,
      days90plus: data.days90plus,
    },
  ]

  const total = data.current + data.days1_30 + data.days31_60 + data.days61_90 + data.days90plus
  const overdueTotal = data.days1_30 + data.days31_60 + data.days61_90 + data.days90plus

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="text-right">
            <p className="text-xs text-[#64748B]">Encours total</p>
            <p className="text-sm font-semibold text-[#1E3A5F] tabular-nums">
              {formatCurrency(total / 100, { compact: total > 10000000 })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary badges */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {[
            { label: "Courant", value: data.current, color: COLORS.current },
            { label: "1-30 j", value: data.days1_30, color: COLORS.days1_30 },
            { label: "31-60 j", value: data.days31_60, color: COLORS.days31_60 },
            { label: "61-90 j", value: data.days61_90, color: COLORS.days61_90 },
            { label: "90+ j", value: data.days90plus, color: COLORS.days90plus },
          ].map((bucket) => (
            <div
              key={bucket.label}
              className="flex items-center gap-1.5 text-xs"
            >
              <span
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: bucket.color }}
              />
              <span className="text-[#64748B]">{bucket.label} :</span>
              <span className="font-medium text-[#1E3A5F] tabular-nums">
                {formatCurrency(bucket.value / 100, { compact: bucket.value > 10000000 })}
              </span>
            </div>
          ))}
        </div>

        {/* Stacked bar chart */}
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barSize={32}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="current" stackId="a" fill={COLORS.current} radius={[4, 0, 0, 4]} />
              <Bar dataKey="days1_30" stackId="a" fill={COLORS.days1_30} />
              <Bar dataKey="days31_60" stackId="a" fill={COLORS.days31_60} />
              <Bar dataKey="days61_90" stackId="a" fill={COLORS.days61_90} />
              <Bar dataKey="days90plus" stackId="a" fill={COLORS.days90plus} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {overdueTotal > 0 && (
          <p className="text-xs text-[#DC2626] mt-2">
            {formatCurrency(overdueTotal / 100, { compact: overdueTotal > 10000000 })} en retard
          </p>
        )}
      </CardContent>
    </Card>
  )
}
