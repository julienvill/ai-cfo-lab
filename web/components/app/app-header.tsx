"use client"

import { usePathname } from "next/navigation"
import { useLocale } from "@/lib/locale-context"
import { LocaleToggle } from "./locale-toggle"

const pageKeys: Record<string, string> = {
  "/app/synthese": "synthese",
  "/app/tresorerie": "tresorerie",
  "/app/factures/clients": "facturesClients",
  "/app/factures/fournisseurs": "facturesFournisseurs",
  "/app/kpis-saas": "kpisSaas",
  "/app/cloture": "cloture",
}

export function AppHeader() {
  const pathname = usePathname()
  const { t } = useLocale()
  const key = pageKeys[pathname]

  const title = key ? t(`app.header.${key}.title`) : "AI CFO Lab"
  const subtitle = key ? t(`app.header.${key}.subtitle`) : ""

  return (
    <header className="flex items-center justify-between h-[72px] px-8 bg-white border-b border-[#E2E8F0] shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-[#1E3A5F]">{title}</h1>
        <p className="text-sm text-[#64748B]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <LocaleToggle />
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] rounded">
          ⌘K
        </kbd>
      </div>
    </header>
  )
}
