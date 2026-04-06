"use client"

import { useCompany } from "@/lib/company-context"
import {
  getImmobilisations,
  getImmoKPIs,
} from "@/lib/comptabilite-data"
import {
  ImmobilisationsKPIs,
  ImmobilisationsTable,
} from "@/components/app/comptabilite/immobilisations-table"

export default function ImmobilisationsPage() {
  const { company } = useCompany()

  const immos = getImmobilisations(company.slug)
  const kpis = getImmoKPIs(company.slug)

  return (
    <div className="space-y-6">
      <ImmobilisationsKPIs kpis={kpis} />
      <ImmobilisationsTable immobilisations={immos} kpis={kpis} />
    </div>
  )
}
