"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getInvoiceKPIs } from "@/lib/demo-data"
import { formatCurrency } from "@/lib/format"

function generateSupplierInvoices(companySlug: string) {
  const suppliers: Record<string, Array<{ id: string; supplier: string; amount: number; received: string; due: string; status: "paid" | "pending" | "overdue" }>> = {
    propello: [
      { id: "FF-2025-041", supplier: "OVHcloud", amount: 450000, received: "2025-11-01", due: "2025-11-30", status: "paid" },
      { id: "FF-2025-042", supplier: "AWS", amount: 380000, received: "2025-11-01", due: "2025-12-01", status: "paid" },
      { id: "FF-2025-043", supplier: "Figma", amount: 28000, received: "2025-12-01", due: "2025-12-31", status: "pending" },
      { id: "FF-2025-044", supplier: "Notion", amount: 15000, received: "2025-12-01", due: "2025-12-31", status: "pending" },
      { id: "FF-2025-045", supplier: "Cabinet Mazars", amount: 850000, received: "2025-11-15", due: "2025-12-15", status: "pending" },
      { id: "FF-2025-046", supplier: "WeWork", amount: 520000, received: "2025-12-01", due: "2025-12-15", status: "pending" },
    ],
    "maison-nordique": [
      { id: "FF-2025-178", supplier: "Nordic Design AB", amount: 12500000, received: "2025-11-05", due: "2025-12-05", status: "paid" },
      { id: "FF-2025-179", supplier: "Colissimo", amount: 380000, received: "2025-11-10", due: "2025-12-10", status: "paid" },
      { id: "FF-2025-180", supplier: "Hay Denmark", amount: 8200000, received: "2025-11-20", due: "2025-12-20", status: "pending" },
      { id: "FF-2025-181", supplier: "Chronopost", amount: 290000, received: "2025-12-01", due: "2025-12-31", status: "pending" },
      { id: "FF-2025-182", supplier: "Google Ads", amount: 180000, received: "2025-12-01", due: "2025-12-15", status: "pending" },
    ],
    mecaform: [
      { id: "FF-2025-312", supplier: "ArcelorMittal", amount: 18500000, received: "2025-11-01", due: "2025-12-01", status: "paid" },
      { id: "FF-2025-313", supplier: "Sandvik Coromant", amount: 4200000, received: "2025-11-10", due: "2025-12-10", status: "paid" },
      { id: "FF-2025-314", supplier: "EDF Entreprises", amount: 3800000, received: "2025-12-01", due: "2025-12-31", status: "pending" },
      { id: "FF-2025-315", supplier: "Linde Gas", amount: 1200000, received: "2025-11-15", due: "2025-12-15", status: "pending" },
      { id: "FF-2025-316", supplier: "KUKA Robotics", amount: 9500000, received: "2025-10-20", due: "2025-11-20", status: "overdue" },
      { id: "FF-2025-317", supplier: "Manpower", amount: 2800000, received: "2025-12-01", due: "2025-12-31", status: "pending" },
    ],
  }
  return suppliers[companySlug] ?? []
}

const statusColors = {
  paid: "bg-[#16A34A]/10 text-[#16A34A]",
  pending: "bg-[#F59E0B]/10 text-[#F59E0B]",
  overdue: "bg-[#DC2626]/10 text-[#DC2626]",
}

const statusLabels = {
  fr: { paid: "Payée", pending: "En attente", overdue: "En retard" },
  en: { paid: "Paid", pending: "Pending", overdue: "Overdue" },
}

export default function FacturesFournisseursPage() {
  const { company } = useCompany()
  const { t, locale } = useLocale()

  const invoiceKPIs = getInvoiceKPIs(company.slug)
  const invoices = generateSupplierInvoices(company.slug)

  const kpis = [
    { label: t("app.facturesFournisseurs.totalPayer"), value: formatCurrency(invoiceKPIs.totalPayable, { compact: true }) },
    { label: t("app.facturesFournisseurs.echeance"), value: formatCurrency(invoiceKPIs.dueSoon, { compact: true }), alert: true },
    { label: t("app.facturesFournisseurs.payeMois"), value: formatCurrency(invoiceKPIs.paidThisMonth, { compact: true }) },
    { label: t("app.facturesFournisseurs.dpo"), value: `${invoiceKPIs.dpo} ${locale === "fr" ? "jours" : "days"}` },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E3A5F]">{kpi.value}</div>
              <p className="text-xs text-[#94A3B8] mt-1">{company.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("app.facturesFournisseurs.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">{locale === "fr" ? "N° Facture" : "Invoice #"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Fournisseur" : "Supplier"}</TableHead>
                <TableHead className="text-xs text-right">{locale === "fr" ? "Montant" : "Amount"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Réception" : "Received"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Échéance" : "Due"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Statut" : "Status"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="text-sm font-mono">{inv.id}</TableCell>
                  <TableCell className="text-sm">{inv.supplier}</TableCell>
                  <TableCell className="text-sm text-right font-medium">
                    {formatCurrency(inv.amount / 100, { compact: inv.amount > 10000000 })}
                  </TableCell>
                  <TableCell className="text-sm text-[#64748B]">{inv.received}</TableCell>
                  <TableCell className="text-sm text-[#64748B]">{inv.due}</TableCell>
                  <TableCell>
                    <Badge className={`text-[10px] ${statusColors[inv.status]}`}>
                      {statusLabels[locale][inv.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
