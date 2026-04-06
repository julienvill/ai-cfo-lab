"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Loader2, AlertTriangle } from "lucide-react"
import type { ClotureStep, ClotureStepStatus } from "@/lib/comptabilite-data"

type ClotureChecklistProps = {
  steps: ClotureStep[]
  progress: { done: number; total: number; percentage: number }
  companyName: string
  period?: string
}

const statusIcon: Record<ClotureStepStatus, React.ReactNode> = {
  done: <CheckCircle2 className="h-5 w-5 text-[#059669]" strokeWidth={1.5} />,
  in_progress: <Loader2 className="h-5 w-5 text-[#3B82F6] animate-spin" strokeWidth={1.5} />,
  todo: <Circle className="h-5 w-5 text-[#CBD5E1]" strokeWidth={1.5} />,
}

const statusBadge: Record<ClotureStepStatus, { label: string; className: string }> = {
  done: { label: "Fait", className: "bg-[#059669]/10 text-[#059669]" },
  in_progress: { label: "En cours", className: "bg-[#3B82F6]/10 text-[#3B82F6]" },
  todo: { label: "A faire", className: "bg-[#F1F5F9] text-[#64748B]" },
}

export function ClotureChecklist({ steps, progress, companyName, period }: ClotureChecklistProps) {
  return (
    <div className="space-y-6">
      {/* Progress card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              Progression de la cloture {period ? `— ${period}` : ""}
            </CardTitle>
            <span className="text-sm text-[#64748B]">{companyName}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">
              {progress.done} / {progress.total} etapes completees
            </span>
            <span className="font-semibold text-[#1E3A5F] tabular-nums">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-3" />
          <div className="flex gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              {steps.filter((s) => s.status === "done").length} terminee(s)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              {steps.filter((s) => s.status === "in_progress").length} en cours
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
              {steps.filter((s) => s.status === "todo").length} a faire
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Checklist de cloture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                step.status === "in_progress"
                  ? "bg-[#3B82F6]/5 border border-[#3B82F6]/20"
                  : step.status === "done"
                    ? "bg-[#059669]/5"
                    : "hover:bg-[#F1F5F9]"
              }`}
            >
              <div className="mt-0.5 shrink-0">{statusIcon[step.status]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-sm font-medium ${
                      step.status === "done" ? "text-[#64748B] line-through" : "text-[#1E3A5F]"
                    }`}
                  >
                    {step.order}. {step.label}
                  </span>
                  <Badge className={`text-[10px] ${statusBadge[step.status].className}`}>
                    {statusBadge[step.status].label}
                  </Badge>
                  <span className="text-[10px] text-[#94A3B8]">{step.deadline}</span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5">{step.description}</p>
                {step.completedDate && (
                  <p className="text-[10px] text-[#059669] mt-1">
                    Complete le {step.completedDate}
                  </p>
                )}
                {step.alerts.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {step.alerts.map((alert, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-[#D97706] bg-[#FFFBEB] rounded px-2 py-1.5"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>{alert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
