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
import { CheckCircle2, XCircle, AlertTriangle, FileText, Download } from "lucide-react"
import type { FECEntry, FECStats, FECTest } from "@/lib/comptabilite-data"
import { formatCurrency, formatNumber } from "@/lib/format"

type FECViewerProps = {
  entries: FECEntry[]
  stats: FECStats
  tests: FECTest[]
}

const PAGE_SIZE = 10

function formatFECDate(d: string): string {
  if (d.length !== 8) return d
  return `${d.slice(6, 8)}/${d.slice(4, 6)}/${d.slice(0, 4)}`
}

export function FECViewer({ entries, stats, tests }: FECViewerProps) {
  const [page, setPage] = useState(0)
  const [journalFilter, setJournalFilter] = useState<string>("all")

  const filtered = useMemo(() => {
    if (journalFilter === "all") return entries
    return entries.filter((e) => e.JournalCode === journalFilter)
  }, [entries, journalFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageEntries = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const passCount = tests.filter((t) => t.status === "pass").length
  const failCount = tests.filter((t) => t.status === "fail").length
  const warnCount = tests.filter((t) => t.status === "warning").length

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Ecritures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F] tabular-nums">{formatNumber(stats.totalEntries)}</div>
            <p className="text-xs text-[#94A3B8] mt-1">
              {stats.periodeDebut ? `${formatFECDate(stats.periodeDebut)} — ${formatFECDate(stats.periodeFin)}` : "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Total debit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F] tabular-nums">
              {formatCurrency(stats.totalDebit / 100, { compact: stats.totalDebit > 100000000 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Total credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F] tabular-nums">
              {formatCurrency(stats.totalCredit / 100, { compact: stats.totalCredit > 100000000 })}
            </div>
          </CardContent>
        </Card>
        <Card className={stats.isBalanced ? "border-[#059669]/30" : "border-[#DC2626]/30"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">Equilibre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.isBalanced ? "text-[#059669]" : "text-[#DC2626]"}`}>
              {stats.isBalanced ? "OK" : "Ecart"}
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">
              Journaux : {stats.journaux.join(", ")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conformity tests */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Tests de conformite FEC</CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-[#059669]/10 text-[#059669] text-xs">{passCount} OK</Badge>
              {warnCount > 0 && <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs">{warnCount} Alerte</Badge>}
              {failCount > 0 && <Badge className="bg-[#DC2626]/10 text-[#DC2626] text-xs">{failCount} Echec</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {tests.map((test) => (
            <div
              key={test.id}
              className={`flex items-start gap-3 p-2.5 rounded-lg ${
                test.status === "fail"
                  ? "bg-[#FEF2F2]"
                  : test.status === "warning"
                    ? "bg-[#FFFBEB]"
                    : "bg-[#ECFDF5]"
              }`}
            >
              {test.status === "pass" && <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={1.5} />}
              {test.status === "fail" && <XCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />}
              {test.status === "warning" && <AlertTriangle className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={1.5} />}
              <div>
                <p className="text-sm font-medium text-[#1E3A5F]">{test.label}</p>
                <p className="text-xs text-[#64748B]">{test.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FEC table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#64748B]" strokeWidth={1.5} />
              Fichier des Ecritures Comptables
            </CardTitle>
            <div className="flex items-center gap-2">
              <select
                value={journalFilter}
                onChange={(e) => {
                  setJournalFilter(e.target.value)
                  setPage(0)
                }}
                className="px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              >
                <option value="all">Tous les journaux</option>
                {stats.journaux.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F1F5F9] text-[#64748B] transition-colors">
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                Export
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Journal</TableHead>
                  <TableHead className="text-[10px]">N&#176; Ecriture</TableHead>
                  <TableHead className="text-[10px]">Date</TableHead>
                  <TableHead className="text-[10px]">Compte</TableHead>
                  <TableHead className="text-[10px]">Libelle compte</TableHead>
                  <TableHead className="text-[10px]">Aux.</TableHead>
                  <TableHead className="text-[10px]">Piece</TableHead>
                  <TableHead className="text-[10px]">Libelle</TableHead>
                  <TableHead className="text-[10px] text-right">Debit</TableHead>
                  <TableHead className="text-[10px] text-right">Credit</TableHead>
                  <TableHead className="text-[10px]">Let.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageEntries.map((entry, i) => (
                  <TableRow key={`${entry.EcritureNum}-${entry.CompteNum}-${i}`}>
                    <TableCell className="text-xs font-mono">{entry.JournalCode}</TableCell>
                    <TableCell className="text-xs font-mono">{entry.EcritureNum}</TableCell>
                    <TableCell className="text-xs text-[#64748B]">{formatFECDate(entry.EcritureDate)}</TableCell>
                    <TableCell className="text-xs font-mono">{entry.CompteNum}</TableCell>
                    <TableCell className="text-xs text-[#64748B] max-w-[120px] truncate">{entry.CompteLib}</TableCell>
                    <TableCell className="text-xs font-mono text-[#64748B]">{entry.CompAuxNum || "—"}</TableCell>
                    <TableCell className="text-xs font-mono">{entry.PieceRef}</TableCell>
                    <TableCell className="text-xs text-[#64748B] max-w-[160px] truncate">{entry.EcritureLib}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums font-medium">
                      {entry.Debit > 0 ? formatCurrency(entry.Debit / 100, { decimals: 2 }) : ""}
                    </TableCell>
                    <TableCell className="text-xs text-right tabular-nums font-medium">
                      {entry.Credit > 0 ? formatCurrency(entry.Credit / 100, { decimals: 2 }) : ""}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-[#64748B]">{entry.EcrtureLet || ""}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-[#94A3B8]">
                Page {page + 1} sur {totalPages} ({filtered.length} ecritures)
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-3 py-1 text-xs border border-[#E2E8F0] rounded-md disabled:opacity-40 hover:bg-[#F1F5F9] transition-colors"
                >
                  Precedent
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1 text-xs border border-[#E2E8F0] rounded-md disabled:opacity-40 hover:bg-[#F1F5F9] transition-colors"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
