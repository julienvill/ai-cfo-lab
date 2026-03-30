"use client"

import { useCompany } from "@/lib/company-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function SynthesePage() {
  const { company } = useCompany()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Trésorerie", "CA du mois", "Charges", "Résultat net"].map((label) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E3A5F]">—</div>
              <p className="text-xs text-[#64748B] mt-1">Données à venir</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-l-[3px] border-l-[#7C3AED] bg-[#EDE9FE]/30">
        <CardContent className="flex items-start gap-3 pt-6">
          <Sparkles className="h-5 w-5 text-[#7C3AED] shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-[#7C3AED] text-white text-[10px] px-1.5">AI</Badge>
              <span className="text-sm font-medium text-[#1E3A5F]">Analyse du jour — {company.name}</span>
            </div>
            <p className="text-sm text-[#64748B]">
              L&apos;analyse quotidienne sera générée ici par l&apos;IA pour {company.name} ({company.sector}).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
