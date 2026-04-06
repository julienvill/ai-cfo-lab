"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import {
  getFacturesFournisseurs,
  getAPKPIs,
  getAgingBucketsAP,
  getSpendCategories,
} from "@/lib/comptabilite-data"
import { formatCurrency } from "@/lib/format"
import { KPICards } from "@/components/app/comptabilite/kpi-cards"
import { AgingChart } from "@/components/app/comptabilite/aging-chart"
import { InvoiceTable } from "@/components/app/comptabilite/invoice-table"
import { SpendChart } from "@/components/app/comptabilite/spend-chart"

export default function FacturesFournisseursPage() {
  const { company } = useCompany()
  const { locale } = useLocale()

  const kpiData = getAPKPIs(company.slug)
  const aging = getAgingBucketsAP(company.slug)
  const factures = getFacturesFournisseurs(company.slug)
  const spendCategories = getSpendCategories(company.slug)

  const kpis = [
    {
      label: locale === "fr" ? "Total charges" : "Total expenses",
      value: formatCurrency(kpiData.totalCharges / 100, { compact: true }),
    },
    {
      label: locale === "fr" ? "Paye" : "Paid",
      value: formatCurrency(kpiData.paye / 100, { compact: true }),
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
      label: "DPO",
      value: `${kpiData.dpo} ${locale === "fr" ? "jours" : "days"}`,
    },
  ]

  const invoiceRows = factures.map((f) => ({
    id: f.id,
    counterpart: f.supplier,
    compteAux: f.compteAux,
    amount: f.amount,
    amountPaid: f.amountPaid,
    dateIssued: f.received,
    dateDue: f.due,
    status: f.status,
    category: f.category,
  }))

  return (
    <div className="space-y-6">
      <KPICards kpis={kpis} companyName={company.name} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgingChart
          data={aging}
          title={locale === "fr" ? "Balance agee fournisseurs" : "Accounts payable aging"}
        />
        <SpendChart
          categories={spendCategories}
          title={locale === "fr" ? "Repartition des depenses" : "Spend analytics"}
        />
      </div>

      <InvoiceTable
        title={locale === "fr" ? "Factures fournisseurs" : "Supplier invoices"}
        invoices={invoiceRows}
        counterpartLabel={locale === "fr" ? "Fournisseur" : "Supplier"}
        dateIssuedLabel={locale === "fr" ? "Reception" : "Received"}
      />
    </div>
  )
}
