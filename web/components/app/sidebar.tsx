"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  ArrowRightLeft,
  Receipt,
  BarChart3,
  CheckSquare,
  Sparkles,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { CompanySelector } from "./company-selector"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useLocale } from "@/lib/locale-context"

const navItems = [
  { href: "/app/synthese", labelKey: "app.sidebar.synthese", icon: LayoutDashboard },
  { href: "/app/tresorerie", labelKey: "app.sidebar.tresorerie", icon: TrendingUp },
  { href: "/app/factures/clients", labelKey: "app.sidebar.facturesClients", icon: ArrowRightLeft },
  { href: "/app/factures/fournisseurs", labelKey: "app.sidebar.facturesFournisseurs", icon: Receipt },
  { href: "/app/kpis-saas", labelKey: "app.sidebar.kpisSaas", icon: BarChart3 },
  { href: "/app/cloture", labelKey: "app.sidebar.cloture", icon: CheckSquare },
]

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0F1C2E] text-white shadow-lg"
      aria-label="Ouvrir le menu"
    >
      <Menu className="h-5 w-5" strokeWidth={1.5} />
    </button>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Fermer la sidebar mobile quand on change de page
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Bouton hamburger mobile */}
      {!mobileOpen && <SidebarToggle onClick={() => setMobileOpen(true)} />}

      <aside className={cn(
        "flex flex-col w-60 h-screen bg-[#0F1C2E] text-white shrink-0",
        "fixed lg:relative z-40",
        "transition-transform duration-200 ease-in-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      {/* Logo + close button mobile */}
      <div className="flex items-center justify-between px-5 h-[72px]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#7C3AED]" strokeWidth={1.5} />
          <span className="font-semibold text-lg tracking-tight">AI CFO Lab</span>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-white/10"
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Company Selector */}
      <div className="px-4 pb-4">
        <CompanySelector />
      </div>

      <Separator className="bg-white/10" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-[#2563EB]/15 text-white border-l-[3px] border-[#3B82F6] -ml-px"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive && "text-[#3B82F6]")} strokeWidth={1.5} />
              {t(item.labelKey)}
            </Link>
          )
        })}
      </nav>

      <Separator className="bg-white/10" />

      {/* Bottom */}
      <div className="px-3 py-4 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 w-full">
          <Settings className="h-4 w-4" strokeWidth={1.5} />
          {t("app.sidebar.settings")}
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 w-full">
          <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
          {t("app.sidebar.support")}
        </button>
      </div>
    </aside>
    </>
  )
}
