"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Alert, AlertSeverity } from "@/lib/synthese-data"

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { icon: typeof AlertCircle; label: string; badgeClass: string; borderClass: string }
> = {
  critical: {
    icon: AlertCircle,
    label: "Critique",
    badgeClass: "bg-[#DC2626] text-white",
    borderClass: "border-l-[#DC2626] bg-[#FEF2F2]/50",
  },
  warning: {
    icon: AlertTriangle,
    label: "Attention",
    badgeClass: "bg-[#D97706] text-white",
    borderClass: "border-l-[#D97706] bg-[#FFFBEB]/50",
  },
  info: {
    icon: Info,
    label: "Info",
    badgeClass: "bg-[#3B82F6] text-white",
    borderClass: "border-l-[#3B82F6] bg-[#EFF6FF]/50",
  },
}

export function AlertsList({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-[#1E3A5F]">
            Alertes prioritaires
          </CardTitle>
          <Badge variant="outline" className="text-xs text-[#64748B] border-[#E2E8F0]">
            {alerts.length} active{alerts.length > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert) => {
          const config = SEVERITY_CONFIG[alert.severity]
          const Icon = config.icon
          return (
            <div
              key={alert.id}
              className={`rounded-lg border-l-[3px] p-3 ${config.borderClass}`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={`h-4 w-4 shrink-0 mt-0.5 ${
                    alert.severity === "critical"
                      ? "text-[#DC2626]"
                      : alert.severity === "warning"
                        ? "text-[#D97706]"
                        : "text-[#3B82F6]"
                  }`}
                  strokeWidth={1.5}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-[#1E3A5F]">
                      {alert.title}
                    </span>
                    <Badge className={`text-[10px] px-1.5 ${config.badgeClass}`}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {alert.description}
                  </p>
                  <Link
                    href={alert.moduleHref}
                    className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline mt-1"
                  >
                    {alert.module}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
