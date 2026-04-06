"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import {
  getFacturesClients,
  getARKPIs,
  getAgingBucketsAR,
} from "@/lib/comptabilite-data"
import { formatCurrency } from "@/lib/format"
import { KPICards } from "@/components/app/comptabilite/kpi-cards"
import { AgingChart } from "@/components/app/comptabilite/aging-chart"
import { InvoiceTable } from "@/components/app/comptabilite/invoice-table"

export default function FacturesClientsPage() {
  const { company } = useCompany()
  const { locale } = useLocale()

  const kpiData = getARKPIs(company.slug)
  const aging = getAgingBucketsAR(company.slug)
  const factures = getFacturesClients(company.slug)

  const kpis = [
    {
      label: locale === "fr" ? "CA facture" : "Invoiced revenue",
      value: formatCurrency(kpiData.caFacture / 100, { compact: true }),
    },
    {
      label: locale === "fr" ? "Encaisse" : "Collected",
      value: formatCurrency(kpiData.encaisse / 100, { compact: true }),
    },
    {
      label: locale === "fr" ? "En attente" : "Pending",
      value: formatCurrency(kpiData.enAttente / 100, { compact: true }),
    },
    {
      label: locale === "fr" ? "En retard" : "Overdue",
      value: formatCurrency(kpiData.enRetard / 100, { compact: true }),
      alert: kpiData.enRetard > 0,
    },
    {
      label: "DSO",
      value: `${kpiData.dso} ${locale === "fr" ? "jours" : "days"}`,
    },
  ]

  const invoiceRows = factures.map((f) => ({
    id: f.id,
    counterpart: f.client,
    compteAux: f.compteAux,
    amount: f.amount,
    amountPaid: f.amountPaid,
    dateIssued: f.issued,
    dateDue: f.due,
    status: f.status,
    category: f.category,
  }))

  return (
    <div className="space-y-6">
      <KPICards kpis={kpis} companyName={company.name} />
      <AgingChart
        data={aging}
        title={locale === "fr" ? "Balance agee clients" : "Accounts receivable aging"}
      />
      <InvoiceTable
        title={locale === "fr" ? "Factures clients" : "Client invoices"}
        invoices={invoiceRows}
        counterpartLabel="Client"
        dateIssuedLabel={locale === "fr" ? "Emission" : "Issued"}
      />
    </div>
  )
}
