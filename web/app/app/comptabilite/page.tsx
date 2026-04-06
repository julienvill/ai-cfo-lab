"use client"

import Link from "next/link"
import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRightLeft,
  Receipt,
  CheckSquare,
  FileText,
  Building2,
  ChevronRight,
} from "lucide-react"

const sections = [
  {
    href: "/app/factures/clients",
    titleKey: "app.comptabilite.ar.title",
    descKey: "app.comptabilite.ar.desc",
    icon: ArrowRightLeft,
  },
  {
    href: "/app/factures/fournisseurs",
    titleKey: "app.comptabilite.ap.title",
    descKey: "app.comptabilite.ap.desc",
    icon: Receipt,
  },
  {
    href: "/app/cloture",
    titleKey: "app.comptabilite.cloture.title",
    descKey: "app.comptabilite.cloture.desc",
    icon: CheckSquare,
  },
  {
    href: "/app/fec",
    titleKey: "app.comptabilite.fec.title",
    descKey: "app.comptabilite.fec.desc",
    icon: FileText,
  },
  {
    href: "/app/immobilisations",
    titleKey: "app.comptabilite.immo.title",
    descKey: "app.comptabilite.immo.desc",
    icon: Building2,
  },
]

export default function ComptabilitePage() {
  const { company } = useCompany()
  const { t } = useLocale()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E3A5F]">
          {t("app.comptabilite.title")}
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          {t("app.comptabilite.subtitle")} — {company.name}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full hover:shadow-md hover:border-[#3B82F6]/30 transition-all cursor-pointer group">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-[#2563EB]" strokeWidth={1.5} />
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A5F]">
                    {t(section.titleKey)}
                  </h3>
                  <p className="text-sm text-[#64748B] mt-1">
                    {t(section.descKey)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
