"use client"

import { useState, useMemo } from "react"
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
import { formatCurrency } from "@/lib/format"
import type { InvoiceStatus } from "@/lib/comptabilite-data"

type InvoiceRow = {
  id: string
  counterpart: string
  compteAux: string
  amount: number
  amountPaid: number
  dateIssued: string
  dateDue: string
  status: InvoiceStatus
  category: string
}

type InvoiceTableProps = {
  title: string
  invoices: InvoiceRow[]
  counterpartLabel: string
  dateIssuedLabel: string
}

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: { label: "Encaissee", className: "bg-[#059669]/10 text-[#059669]" },
  pending: { label: "En attente", className: "bg-[#F59E0B]/10 text-[#F59E0B]" },
  overdue: { label: "En retard", className: "bg-[#DC2626]/10 text-[#DC2626]" },
  partial: { label: "Partiel", className: "bg-[#3B82F6]/10 text-[#3B82F6]" },
}

type StatusFilter = InvoiceStatus | "all"

export function InvoiceTable({ title, invoices, counterpartLabel, dateIssuedLabel }: InvoiceTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false
      if (searchTerm && !inv.counterpart.toLowerCase().includes(searchTerm.toLowerCase()) && !inv.id.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
  }, [invoices, statusFilter, searchTerm])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: invoices.length }
    for (const inv of invoices) {
      counts[inv.status] = (counts[inv.status] ?? 0) + 1
    }
    return counts
  }, [invoices])

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] w-[180px]"
            />
          </div>
        </div>
        {/* Status filter pills */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {(["all", "pending", "overdue", "partial", "paid"] as StatusFilter[]).map((status) => {
            const count = statusCounts[status] ?? 0
            if (status !== "all" && count === 0) return null
            const isActive = statusFilter === status
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                }`}
              >
                {status === "all" ? "Toutes" : statusConfig[status].label} ({count})
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">N&#176; Facture</TableHead>
                <TableHead className="text-xs">{counterpartLabel}</TableHead>
                <TableHead className="text-xs">Compte</TableHead>
                <TableHead className="text-xs">Categorie</TableHead>
                <TableHead className="text-xs text-right">Montant</TableHead>
                <TableHead className="text-xs text-right">Paye</TableHead>
                <TableHead className="text-xs">{dateIssuedLabel}</TableHead>
                <TableHead className="text-xs">Echeance</TableHead>
                <TableHead className="text-xs">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="text-sm font-mono">{inv.id}</TableCell>
                  <TableCell className="text-sm font-medium">{inv.counterpart}</TableCell>
                  <TableCell className="text-xs font-mono text-[#64748B]">{inv.compteAux}</TableCell>
                  <TableCell className="text-xs text-[#64748B]">{inv.category}</TableCell>
                  <TableCell className="text-sm text-right font-medium tabular-nums">
                    {formatCurrency(inv.amount / 100, { compact: inv.amount > 10000000 })}
                  </TableCell>
                  <TableCell className="text-sm text-right tabular-nums text-[#64748B]">
                    {inv.amountPaid > 0
                      ? formatCurrency(inv.amountPaid / 100, { compact: inv.amountPaid > 10000000 })
                      : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-[#64748B]">{inv.dateIssued}</TableCell>
                  <TableCell className="text-sm text-[#64748B]">{inv.dateDue}</TableCell>
                  <TableCell>
                    <Badge className={`text-[10px] ${statusConfig[inv.status].className}`}>
                      {statusConfig[inv.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-sm text-[#64748B] py-8">
                    Aucune facture ne correspond aux filtres
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-3 text-xs text-[#94A3B8]">
          {filtered.length} facture{filtered.length > 1 ? "s" : ""} affichee{filtered.length > 1 ? "s" : ""}
        </div>
      </CardContent>
    </Card>
  )
}
