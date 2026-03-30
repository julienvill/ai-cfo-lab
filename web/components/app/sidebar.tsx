"use client"

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
} from "lucide-react"
import { CompanySelector } from "./company-selector"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/app/synthese", label: "Synthèse du jour", icon: LayoutDashboard },
  { href: "/app/tresorerie", label: "Trésorerie", icon: TrendingUp },
  { href: "/app/factures/clients", label: "Factures clients", icon: ArrowRightLeft },
  { href: "/app/factures/fournisseurs", label: "Factures fournisseurs", icon: Receipt },
  { href: "/app/kpis-saas", label: "KPIs SaaS", icon: BarChart3 },
  { href: "/app/cloture", label: "Clôture mensuelle", icon: CheckSquare },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-60 h-screen bg-[#0F1C2E] text-white shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 h-[72px]">
        <Sparkles className="h-5 w-5 text-[#7C3AED]" strokeWidth={1.5} />
        <span className="font-semibold text-lg tracking-tight">AI CFO Lab</span>
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
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Separator className="bg-white/10" />

      {/* Bottom */}
      <div className="px-3 py-4 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 w-full">
          <Settings className="h-4 w-4" strokeWidth={1.5} />
          Paramètres
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 w-full">
          <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
          Support
        </button>
      </div>
    </aside>
  )
}
