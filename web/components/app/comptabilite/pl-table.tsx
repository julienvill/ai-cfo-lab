"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CloturePLLine } from "@/lib/comptabilite-data"
import { formatCurrency } from "@/lib/format"

type PLTableProps = {
  lines: CloturePLLine[]
  title: string
}

export function PLTable({ lines, title }: PLTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {lines.map((line, i) => {
            const isPositive = line.amount >= 0
            return (
              <div
                key={i}
                className={`flex items-center justify-between py-2 ${
                  line.isTotal
                    ? "border-t border-[#E2E8F0] font-semibold"
                    : ""
                } ${i === lines.length - 1 ? "border-t-2 border-[#1E3A5F]" : ""}`}
              >
                <span
                  className={`text-sm ${
                    line.isTotal ? "text-[#1E3A5F] font-semibold" : "text-[#64748B]"
                  }`}
                  style={{ paddingLeft: (line.indent ?? 0) * 20 }}
                >
                  {line.label}
                </span>
                <span
                  className={`text-sm tabular-nums font-medium ${
                    line.isTotal
                      ? isPositive
                        ? "text-[#059669]"
                        : "text-[#DC2626]"
                      : isPositive
                        ? "text-[#1E3A5F]"
                        : "text-[#DC2626]"
                  }`}
                >
                  {line.amount < 0 ? "(" : ""}
                  {formatCurrency(Math.abs(line.amount) / 100)}
                  {line.amount < 0 ? ")" : ""}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
