"use client"

import { useCompany } from "@/lib/company-context"
import {
  getFECEntries,
  getFECStats,
  getFECTests,
} from "@/lib/comptabilite-data"
import { FECViewer } from "@/components/app/comptabilite/fec-viewer"

export default function FECPage() {
  const { company } = useCompany()

  const entries = getFECEntries(company.slug)
  const stats = getFECStats(company.slug)
  const tests = getFECTests(company.slug)

  return (
    <div className="space-y-6">
      <FECViewer entries={entries} stats={stats} tests={tests} />
    </div>
  )
}
