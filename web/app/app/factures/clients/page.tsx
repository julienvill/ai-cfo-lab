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
import { formatCurrency, formatNumber } from "@/lib/format"

// Demo invoice data generator
function generateClientInvoices(companySlug: string, locale: "fr" | "en") {
  const clients: Record<string, Array<{ id: string; client: string; amount: number; issued: string; due: string; status: "paid" | "pending" | "overdue" }>> = {
    propello: [
      { id: "FAC-2025-087", client: "Groupe Renault", amount: 4500000, issued: "2025-11-05", due: "2025-12-05", status: "paid" },
      { id: "FAC-2025-088", client: "BNP Paribas", amount: 3200000, issued: "2025-11-12", due: "2025-12-12", status: "paid" },
      { id: "FAC-2025-089", client: "Doctolib", amount: 2800000, issued: "2025-11-18", due: "2025-12-18", status: "pending" },
      { id: "FAC-2025-090", client: "Alan", amount: 1500000, issued: "2025-11-22", due: "2025-12-22", status: "pending" },
      { id: "FAC-2025-091", client: "Swile", amount: 2100000, issued: "2025-10-15", due: "2025-11-15", status: "overdue" },
      { id: "FAC-2025-092", client: "Payfit", amount: 1800000, issued: "2025-10-20", due: "2025-11-20", status: "overdue" },
      { id: "FAC-2025-093", client: "Qonto", amount: 3600000, issued: "2025-12-01", due: "2025-12-31", status: "pending" },
      { id: "FAC-2025-094", client: "Spendesk", amount: 900000, issued: "2025-12-05", due: "2026-01-05", status: "pending" },
    ],
    "maison-nordique": [
      { id: "FAC-2025-412", client: "Leroy Merlin", amount: 8500000, issued: "2025-11-10", due: "2025-12-10", status: "paid" },
      { id: "FAC-2025-413", client: "Maisons du Monde", amount: 4200000, issued: "2025-11-15", due: "2025-12-15", status: "pending" },
      { id: "FAC-2025-414", client: "La Redoute", amount: 2800000, issued: "2025-11-20", due: "2025-12-20", status: "pending" },
      { id: "FAC-2025-415", client: "Particulier (web)", amount: 12000, issued: "2025-12-01", due: "2025-12-01", status: "paid" },
      { id: "FAC-2025-416", client: "AM.PM", amount: 3100000, issued: "2025-10-25", due: "2025-11-25", status: "overdue" },
    ],
    mecaform: [
      { id: "FAC-2025-198", client: "Safran Aerospace", amount: 28500000, issued: "2025-10-01", due: "2025-11-30", status: "overdue" },
      { id: "FAC-2025-199", client: "Stellantis", amount: 15200000, issued: "2025-11-05", due: "2025-12-05", status: "paid" },
      { id: "FAC-2025-200", client: "Airbus", amount: 18700000, issued: "2025-11-15", due: "2026-01-15", status: "pending" },
      { id: "FAC-2025-201", client: "Renault Trucks", amount: 9800000, issued: "2025-11-20", due: "2026-01-20", status: "pending" },
      { id: "FAC-2025-202", client: "Alstom", amount: 12300000, issued: "2025-12-01", due: "2026-01-31", status: "pending" },
      { id: "FAC-2025-203", client: "Safran Aerospace", amount: 32000000, issued: "2025-11-01", due: "2025-12-31", status: "pending" },
    ],
  }
  return clients[companySlug] ?? []
}

const statusColors = {
  paid: "bg-[#16A34A]/10 text-[#16A34A]",
  pending: "bg-[#F59E0B]/10 text-[#F59E0B]",
  overdue: "bg-[#DC2626]/10 text-[#DC2626]",
}

const statusLabels = {
  fr: { paid: "Encaissée", pending: "En attente", overdue: "En retard" },
  en: { paid: "Paid", pending: "Pending", overdue: "Overdue" },
}

export default function FacturesClientsPage() {
  const { company } = useCompany()
  const { t, locale } = useLocale()

  const invoiceKPIs = getInvoiceKPIs(company.slug)
  const invoices = generateClientInvoices(company.slug, locale)

  const kpis = [
    { label: t("app.facturesClients.totalEncaisser"), value: formatCurrency(invoiceKPIs.totalReceivable, { compact: true }) },
    { label: t("app.facturesClients.enRetard"), value: formatCurrency(invoiceKPIs.overdue, { compact: true }), alert: invoiceKPIs.overdue > 0 },
    { label: t("app.facturesClients.encaisseMois"), value: formatCurrency(invoiceKPIs.collectedThisMonth, { compact: true }) },
    { label: t("app.facturesClients.dso"), value: `${invoiceKPIs.dso} ${locale === "fr" ? "jours" : "days"}` },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className={kpi.alert ? "border-[#DC2626]/30" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.alert ? "text-[#DC2626]" : "text-[#1E3A5F]"}`}>
                {kpi.value}
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">{company.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("app.facturesClients.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">{locale === "fr" ? "N° Facture" : "Invoice #"}</TableHead>
                <TableHead className="text-xs">Client</TableHead>
                <TableHead className="text-xs text-right">{locale === "fr" ? "Montant" : "Amount"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Émission" : "Issued"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Échéance" : "Due"}</TableHead>
                <TableHead className="text-xs">{locale === "fr" ? "Statut" : "Status"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="text-sm font-mono">{inv.id}</TableCell>
                  <TableCell className="text-sm">{inv.client}</TableCell>
                  <TableCell className="text-sm text-right font-medium">
                    {formatCurrency(inv.amount / 100, { compact: inv.amount > 10000000 })}
                  </TableCell>
                  <TableCell className="text-sm text-[#64748B]">{inv.issued}</TableCell>
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
