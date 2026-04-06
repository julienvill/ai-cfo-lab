"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, AlertTriangle, XCircle, CheckCircle2, ShieldAlert } from "lucide-react"
import type { RiskScore, RiskLevel } from "@/lib/virtual-cfo/types"

const LEVEL_CONFIG: Record<RiskLevel, { color: string; bg: string; border: string; label: string; icon: typeof CheckCircle2 }> = {
  healthy: {
    color: "text-[#059669]",
    bg: "bg-[#059669]/10",
    border: "border-[#059669]/20",
    label: "Sain",
    icon: CheckCircle2,
  },
  warning: {
    color: "text-[#D97706]",
    bg: "bg-[#D97706]/10",
    border: "border-[#D97706]/20",
    label: "Vigilance",
    icon: AlertTriangle,
  },
  critical: {
    color: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10",
    border: "border-[#DC2626]/20",
    label: "Critique",
    icon: XCircle,
  },
}

function ScoreGauge({ score, level }: { score: number; level: RiskLevel }) {
  const cfg = LEVEL_CONFIG[level]
  const barColor =
    level === "critical" ? "bg-[#DC2626]" : level === "warning" ? "bg-[#D97706]" : "bg-[#059669]"
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div className={`text-5xl font-bold ${cfg.color}`}>
          {score}
          <span className="text-xl font-normal text-[#94A3B8]">/100</span>
        </div>
        <Badge className={`${cfg.bg} ${cfg.color} border ${cfg.border} gap-1`}>
          <cfg.icon className="h-3.5 w-3.5" />
          {cfg.label}
        </Badge>
      </div>
      <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export function RiskDashboard({ score }: { score: RiskScore }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-[#1E3A5F] flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-[#7C3AED]" strokeWidth={1.5} />
            Scoring de risque prédictif
          </CardTitle>
          <Badge className="bg-[#7C3AED] text-white text-[10px] px-1.5 gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <ScoreGauge score={score.global} level={score.level} />

        <p className="text-sm text-[#475569] leading-relaxed">{score.summary}</p>

        <div className="space-y-2.5 pt-3 border-t border-[#E2E8F0]">
          {score.factors.map((f) => {
            const cfg = LEVEL_CONFIG[f.level]
            const Icon = cfg.icon
            return (
              <div key={f.key} className="rounded-md border border-[#E2E8F0] p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1E3A5F]">{f.label}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${cfg.color} ${cfg.bg}`}
                  >
                    <Icon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">{f.detail}</p>
                {f.level !== "healthy" && (
                  <p className="text-xs text-[#475569] italic">→ {f.recommendation}</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="rounded-md bg-[#F1F5F9] p-3">
          <p className="text-xs font-medium text-[#1E3A5F] mb-1">Horizon 90 jours</p>
          <p className="text-xs text-[#475569]">{score.horizon90d}</p>
        </div>
      </CardContent>
    </Card>
  )
}
