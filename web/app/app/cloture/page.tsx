"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CloturePage() {
  const { company } = useCompany()
  const { t } = useLocale()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t("app.cloture.progression")} — {company.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">0 / 12 {t("app.cloture.steps")}</span>
            <span className="font-medium text-[#1E3A5F]">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("app.cloture.checklist")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-[#64748B] text-sm">
            {t("app.cloture.checklistPlaceholder")}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
