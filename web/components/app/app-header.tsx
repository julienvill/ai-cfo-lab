"use client"

import { usePathname } from "next/navigation"

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/app/synthese": {
    title: "Synthèse du jour",
    subtitle: "Vue d'ensemble de votre situation financière",
  },
  "/app/tresorerie": {
    title: "Trésorerie & Runway",
    subtitle: "Pilotage de la trésorerie et projections",
  },
  "/app/factures/clients": {
    title: "Factures clients",
    subtitle: "Suivi des encaissements et relances",
  },
  "/app/factures/fournisseurs": {
    title: "Factures fournisseurs",
    subtitle: "Traitement et validation des factures",
  },
  "/app/kpis-saas": {
    title: "KPIs SaaS",
    subtitle: "Métriques de performance SaaS",
  },
  "/app/cloture": {
    title: "Clôture mensuelle",
    subtitle: "Checklist et suivi de la clôture comptable",
  },
}

export function AppHeader() {
  const pathname = usePathname()
  const page = pageTitles[pathname] ?? { title: "AI CFO Lab", subtitle: "" }

  return (
    <header className="flex items-center justify-between h-[72px] px-8 bg-white border-b border-[#E2E8F0] shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-[#1E3A5F]">{page.title}</h1>
        <p className="text-sm text-[#64748B]">{page.subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] rounded">
          ⌘K
        </kbd>
      </div>
    </header>
  )
}
