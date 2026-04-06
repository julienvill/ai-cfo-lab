"use client"

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
import type { Immobilisation, ImmoKPIs } from "@/lib/comptabilite-data"
import { formatCurrency, formatNumber } from "@/lib/format"

type ImmobilisationsTableProps = {
  immobilisations: Immobilisation[]
  kpis: ImmoKPIs
}

export function ImmobilisationsKPIs({ kpis }: { kpis: ImmoKPIs }) {
  const items = [
    { label: "Valeur brute totale", value: formatCurrency(kpis.totalBrut / 100, { compact: kpis.totalBrut > 100000000 }) },
    { label: "Amortissements cumules", value: formatCurrency(kpis.totalAmortissements / 100, { compact: kpis.totalAmortissements > 100000000 }) },
    { label: "VNC totale", value: formatCurrency(kpis.totalVNC / 100, { compact: kpis.totalVNC > 100000000 }) },
    { label: "Dotations mensuelles", value: formatCurrency(kpis.dotationsMensuelles / 100, { compact: kpis.dotationsMensuelles > 10000000 }) },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#64748B]">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F] tabular-nums">{item.value}</div>
            <p className="text-xs text-[#94A3B8] mt-1">{kpis.nbImmobilisations} immobilisations</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ImmobilisationsTable({ immobilisations, kpis }: ImmobilisationsTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Registre des immobilisations</CardTitle>
          <span className="text-xs text-[#94A3B8]">{immobilisations.length} actifs</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Designation</TableHead>
                <TableHead className="text-xs">Compte</TableHead>
                <TableHead className="text-xs">Acquisition</TableHead>
                <TableHead className="text-xs">Mode</TableHead>
                <TableHead className="text-xs">Duree</TableHead>
                <TableHead className="text-xs text-right">Valeur brute</TableHead>
                <TableHead className="text-xs text-right">Amort. cumule</TableHead>
                <TableHead className="text-xs text-right">VNC</TableHead>
                <TableHead className="text-xs text-right">Dotation /mois</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {immobilisations.map((immo) => {
                const pctAmorti = Math.round((immo.amortissementCumule / immo.valeurBrute) * 100)
                return (
                  <TableRow key={immo.id}>
                    <TableCell className="text-sm font-medium max-w-[200px]">
                      <div className="truncate">{immo.designation}</div>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-[#64748B]">{immo.compteNum}</TableCell>
                    <TableCell className="text-xs text-[#64748B]">{immo.dateAcquisition}</TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] ${
                        immo.mode === "lineaire"
                          ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                          : "bg-[#8B5CF6]/10 text-[#8B5CF6]"
                      }`}>
                        {immo.mode === "lineaire" ? "Lineaire" : "Degressif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-[#64748B]">
                      {Math.round(immo.dureeAmortissement / 12)} ans
                    </TableCell>
                    <TableCell className="text-sm text-right tabular-nums">
                      {formatCurrency(immo.valeurBrute / 100, { compact: immo.valeurBrute > 10000000 })}
                    </TableCell>
                    <TableCell className="text-sm text-right tabular-nums text-[#64748B]">
                      {formatCurrency(immo.amortissementCumule / 100, { compact: immo.amortissementCumule > 10000000 })}
                      <span className="text-[10px] ml-1">({pctAmorti}%)</span>
                    </TableCell>
                    <TableCell className="text-sm text-right tabular-nums font-medium">
                      {formatCurrency(immo.vnc / 100, { compact: immo.vnc > 10000000 })}
                    </TableCell>
                    <TableCell className="text-xs text-right tabular-nums text-[#64748B]">
                      {formatCurrency(immo.dotationMensuelle / 100)}
                    </TableCell>
                  </TableRow>
                )
              })}
              {/* Totals row */}
              <TableRow className="border-t-2 border-[#1E3A5F] font-semibold">
                <TableCell className="text-sm font-semibold" colSpan={5}>Total</TableCell>
                <TableCell className="text-sm text-right tabular-nums font-semibold">
                  {formatCurrency(kpis.totalBrut / 100, { compact: kpis.totalBrut > 100000000 })}
                </TableCell>
                <TableCell className="text-sm text-right tabular-nums font-semibold text-[#64748B]">
                  {formatCurrency(kpis.totalAmortissements / 100, { compact: kpis.totalAmortissements > 100000000 })}
                </TableCell>
                <TableCell className="text-sm text-right tabular-nums font-semibold">
                  {formatCurrency(kpis.totalVNC / 100, { compact: kpis.totalVNC > 100000000 })}
                </TableCell>
                <TableCell className="text-xs text-right tabular-nums font-semibold text-[#64748B]">
                  {formatCurrency(kpis.dotationsMensuelles / 100, { compact: kpis.dotationsMensuelles > 10000000 })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
