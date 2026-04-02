"use client"

import { useCompany } from "@/lib/company-context"
import { useLocale } from "@/lib/locale-context"
import { Badge } from "@/components/ui/badge"
import {
  getLatestActual,
  normalizeSynthesis,
} from "@/lib/demo-data"
import {
  getHeroKPIs,
  getHealthScore,
  getAlerts,
  getRecommendedActions,
  getCalendarEvents,
  getMorningBrief,
} from "@/lib/synthese-data"

import { HeroKPIs } from "@/components/app/synthese/hero-kpis"
import { HealthScoreCard } from "@/components/app/synthese/health-score"
import { AlertsList } from "@/components/app/synthese/alerts-list"
import { ActionsList } from "@/components/app/synthese/actions-list"
import { CalendarEvents } from "@/components/app/synthese/calendar-events"
import { MorningBriefCard } from "@/components/app/synthese/morning-brief"

export default function SynthesePage() {
  const { company } = useCompany()
  const { locale } = useLocale()

  const latestRaw = getLatestActual(company.slug)
  const latest = latestRaw
    ? normalizeSynthesis(company.slug, latestRaw as Record<string, unknown>)
    : null

  // Data
  const heroKPIs = getHeroKPIs(company.slug, locale)
  const healthScore = getHealthScore(company.slug)
  const alerts = getAlerts(company.slug)
  const actions = getRecommendedActions(company.slug)
  const calendar = getCalendarEvents(company.slug)
  const brief = getMorningBrief(company.slug)

  return (
    <div className="space-y-6">
      {/* Period indicator */}
      {latest && (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs font-normal text-[#64748B] border-[#E2E8F0]"
          >
            {latest.period}
          </Badge>
          <span className="text-xs text-[#94A3B8]">
            {latest.type === "actual"
              ? locale === "fr"
                ? "Dernieres donnees reelles"
                : "Latest actual data"
              : locale === "fr"
                ? "Previsionnel"
                : "Forecast"}
          </span>
        </div>
      )}

      {/* Row 1 — Morning Brief (full width) */}
      <MorningBriefCard brief={brief} companyName={company.name} />

      {/* Row 2 — Hero KPI Cards */}
      <HeroKPIs kpis={heroKPIs} />

      {/* Row 3 — Two columns: Calendar + Alerts (left 2/3) | Health Score (right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alerts */}
          <AlertsList alerts={alerts} />

          {/* Calendar */}
          <CalendarEvents today={calendar.today} week={calendar.week} />
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-6">
          {/* Health Score */}
          <HealthScoreCard data={healthScore} />

          {/* Recommended Actions */}
          <ActionsList actions={actions} />
        </div>
      </div>
    </div>
  )
}
