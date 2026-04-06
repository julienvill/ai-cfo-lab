"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type KPIItem = {
  label: string
  value: string
  alert?: boolean
  subtitle?: string
}

type KPICardsProps = {
  kpis: KPIItem[]
  companyName: string
}

export function KPICards({ kpis, companyName }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className={kpi.alert ? "border-[#DC2626]/30" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">{kpi.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tabular-nums ${kpi.alert ? "text-[#DC2626]" : "text-[#1E3A5F]"}`}>
              {kpi.value}
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">{kpi.subtitle ?? companyName}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
