"use client"

import { useCompany } from "@/lib/company-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function KpisSaasPage() {
  const { company } = useCompany()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["MRR", "ARR", "Churn rate", "NRR"].map((label) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E3A5F]">—</div>
              <p className="text-xs text-[#64748B] mt-1">{company.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Évolution MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-[#64748B] text-sm">
              Graphique MRR à venir
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Churn & Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-[#64748B] text-sm">
              Graphique churn à venir
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
