"use client"

import { useCompany } from "@/lib/company-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CloturePage() {
  const { company } = useCompany()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Progression de la clôture — {company.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">0 / 12 étapes complétées</span>
            <span className="font-medium text-[#1E3A5F]">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Checklist de clôture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-[#64748B] text-sm">
            Checklist des tâches de clôture à venir
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
