"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import {
  getClotureSteps,
  getClotureProgress,
  getCloturePL,
} from "@/lib/comptabilite-data"
import { ClotureChecklist } from "@/components/app/comptabilite/cloture-checklist"
import { PLTable } from "@/components/app/comptabilite/pl-table"

export default function CloturePage() {
  const { company } = useCompany()
  const { locale } = useLocale()

  const steps = getClotureSteps(company.slug)
  const progress = getClotureProgress(company.slug)
  const plLines = getCloturePL(company.slug)

  const showPL = progress.percentage === 100

  return (
    <div className="space-y-6">
      <ClotureChecklist
        steps={steps}
        progress={progress}
        companyName={company.name}
        period={locale === "fr" ? "Mars 2026" : "March 2026"}
      />

      {showPL ? (
        <PLTable
          lines={plLines}
          title={locale === "fr" ? "P&L mensuel — Mars 2026" : "Monthly P&L — March 2026"}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center">
          <p className="text-sm text-[#64748B]">
            {locale === "fr"
              ? "Le P&L mensuel sera disponible une fois la cloture validee (12/12 etapes)."
              : "The monthly P&L will be available once the close is validated (12/12 steps)."}
          </p>
          <p className="text-xs text-[#94A3B8] mt-2">
            {progress.done}/{progress.total} {locale === "fr" ? "etapes completees" : "steps completed"}
          </p>
        </div>
      )}
    </div>
  )
}
