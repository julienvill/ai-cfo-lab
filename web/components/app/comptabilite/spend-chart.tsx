"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { SpendCategory } from "@/lib/comptabilite-data"
import { formatCurrency } from "@/lib/format"

type SpendChartProps = {
  categories: SpendCategory[]
  title: string
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: SpendCategory }> }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-3 shadow-md">
      <p className="text-sm font-medium text-[#1E3A5F]">{data.category}</p>
      <p className="text-sm text-[#64748B]">
        {formatCurrency(data.amount / 100, { compact: data.amount > 10000000 })} ({data.percentage}%)
      </p>
    </div>
  )
}

export function SpendChart({ categories, title }: SpendChartProps) {
  const total = categories.reduce((sum, c) => sum + c.amount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <span className="text-sm font-medium text-[#1E3A5F] tabular-nums">
            {formatCurrency(total / 100, { compact: total > 10000000 })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Pie chart */}
          <div className="h-[180px] w-[180px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {categories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2 w-full">
            {categories.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm text-[#64748B]">{cat.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm tabular-nums font-medium text-[#1E3A5F]">
                    {formatCurrency(cat.amount / 100, { compact: cat.amount > 10000000 })}
                  </span>
                  <span className="text-xs text-[#94A3B8] w-8 text-right tabular-nums">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
