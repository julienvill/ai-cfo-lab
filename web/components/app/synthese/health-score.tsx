"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import type { HealthScore } from "@/lib/synthese-data"

const STATUS_CONFIG = {
  good: {
    icon: CheckCircle2,
    label: "Bon",
    color: "text-[#059669]",
    bg: "bg-[#059669]/10",
  },
  warning: {
    icon: AlertTriangle,
    label: "Attention",
    color: "text-[#D97706]",
    bg: "bg-[#D97706]/10",
  },
  critical: {
    icon: XCircle,
    label: "Alerte",
    color: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10",
  },
} as const

function ScoreBar({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 70) return "bg-[#059669]"
    if (score >= 50) return "bg-[#D97706]"
    return "bg-[#DC2626]"
  }

  return (
    <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${getColor()}`}
        style={{ width: `${score}%` }}
      />
    </div>
  )
}

export function HealthScoreCard({ data }: { data: HealthScore }) {
  const getGlobalColor = () => {
    if (data.global >= 70) return "text-[#059669]"
    if (data.global >= 50) return "text-[#D97706]"
    return "text-[#DC2626]"
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-[#1E3A5F]">
            Sante financiere
          </CardTitle>
          <Badge className="bg-[#7C3AED] text-white text-[10px] px-1.5 gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Global score */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getGlobalColor()}`}>
            {data.global}
            <span className="text-lg font-normal text-[#94A3B8]">/100</span>
          </div>
          <ScoreBar score={data.global} />
        </div>

        {/* Axes breakdown */}
        <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0]">
          {data.axes.map((axis) => {
            const config = STATUS_CONFIG[axis.status]
            const Icon = config.icon
            return (
              <div key={axis.label} className="flex items-center justify-between">
                <span className="text-sm text-[#475569]">{axis.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#64748B] tabular-nums">
                    {axis.score}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${config.color} ${config.bg}`}
                  >
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
