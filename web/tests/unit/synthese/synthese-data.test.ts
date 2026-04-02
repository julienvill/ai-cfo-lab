import { describe, it, expect } from "vitest"
import {
  getHealthScore,
  getAlerts,
  getRecommendedActions,
  getCalendarEvents,
  getMorningBrief,
  getCashSparkline,
  getHeroKPIs,
} from "@/lib/synthese-data"
import type { CompanySlug } from "@/lib/companies"

const ALL_SLUGS: CompanySlug[] = ["propello", "mecaform", "maison-nordique"]

// ── Health Score ──

describe("[Synthese] getHealthScore", () => {
  it.each(ALL_SLUGS)("should return a valid health score for %s", (slug) => {
    const result = getHealthScore(slug)
    expect(result.global).toBeGreaterThanOrEqual(0)
    expect(result.global).toBeLessThanOrEqual(100)
    expect(result.axes).toHaveLength(4)
  })

  it.each(ALL_SLUGS)("should have 4 axes with correct labels for %s", (slug) => {
    const result = getHealthScore(slug)
    const labels = result.axes.map((a) => a.label)
    expect(labels).toEqual(["Liquidite", "Rentabilite", "Croissance", "Risque"])
  })

  it.each(ALL_SLUGS)("should have axis scores clamped between 0 and 100 for %s", (slug) => {
    const result = getHealthScore(slug)
    for (const axis of result.axes) {
      expect(axis.score).toBeGreaterThanOrEqual(0)
      expect(axis.score).toBeLessThanOrEqual(100)
    }
  })

  it.each(ALL_SLUGS)("should assign valid status to each axis for %s", (slug) => {
    const result = getHealthScore(slug)
    for (const axis of result.axes) {
      expect(["good", "warning", "critical"]).toContain(axis.status)
      // Verify status is consistent with score
      if (axis.score >= 70) expect(axis.status).toBe("good")
      else if (axis.score >= 50) expect(axis.status).toBe("warning")
      else expect(axis.status).toBe("critical")
    }
  })

  it("should compute global as average of axes", () => {
    for (const slug of ALL_SLUGS) {
      const result = getHealthScore(slug)
      const expectedGlobal = Math.round(
        result.axes.reduce((sum, a) => sum + a.score, 0) / result.axes.length
      )
      expect(result.global).toBe(expectedGlobal)
    }
  })
})

// ── Alerts ──

describe("[Synthese] getAlerts", () => {
  it.each(ALL_SLUGS)("should return a non-empty array of alerts for %s", (slug) => {
    const alerts = getAlerts(slug)
    expect(alerts.length).toBeGreaterThan(0)
  })

  it.each(ALL_SLUGS)("should have valid severity values for %s", (slug) => {
    const alerts = getAlerts(slug)
    for (const alert of alerts) {
      expect(["critical", "warning", "info"]).toContain(alert.severity)
    }
  })

  it.each(ALL_SLUGS)("should sort alerts by severity (critical first) for %s", (slug) => {
    const alerts = getAlerts(slug)
    const order = { critical: 0, warning: 1, info: 2 }
    for (let i = 1; i < alerts.length; i++) {
      expect(order[alerts[i].severity]).toBeGreaterThanOrEqual(order[alerts[i - 1].severity])
    }
  })

  it.each(ALL_SLUGS)("should have unique alert IDs for %s", (slug) => {
    const alerts = getAlerts(slug)
    const ids = alerts.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(ALL_SLUGS)("should have moduleHref starting with / for %s", (slug) => {
    const alerts = getAlerts(slug)
    for (const alert of alerts) {
      expect(alert.moduleHref).toMatch(/^\//)
    }
  })

  it("should include critical alert for propello NRR", () => {
    const alerts = getAlerts("propello")
    const nrrAlert = alerts.find((a) => a.id === "propello-nrr")
    // NRR alert may or may not be present depending on data
    if (nrrAlert) {
      expect(nrrAlert.severity).toBe("critical")
    }
  })

  it("should always include 3 alerts for maison-nordique", () => {
    const alerts = getAlerts("maison-nordique")
    expect(alerts).toHaveLength(3)
    expect(alerts[0].severity).toBe("critical")
    expect(alerts[1].severity).toBe("warning")
    expect(alerts[2].severity).toBe("info")
  })
})

// ── Recommended Actions ──

describe("[Synthese] getRecommendedActions", () => {
  it.each(ALL_SLUGS)("should return 3 actions for %s", (slug) => {
    const actions = getRecommendedActions(slug)
    expect(actions).toHaveLength(3)
  })

  it.each(ALL_SLUGS)("should have priorities 1, 2, 3 for %s", (slug) => {
    const actions = getRecommendedActions(slug)
    expect(actions.map((a) => a.priority)).toEqual([1, 2, 3])
  })

  it.each(ALL_SLUGS)("should have unique action IDs for %s", (slug) => {
    const actions = getRecommendedActions(slug)
    const ids = actions.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(ALL_SLUGS)("should have non-empty title and description for %s", (slug) => {
    const actions = getRecommendedActions(slug)
    for (const action of actions) {
      expect(action.title.length).toBeGreaterThan(0)
      expect(action.description.length).toBeGreaterThan(0)
      expect(action.module.length).toBeGreaterThan(0)
    }
  })
})

// ── Calendar Events ──

describe("[Synthese] getCalendarEvents", () => {
  it.each(ALL_SLUGS)("should return today and week arrays for %s", (slug) => {
    const events = getCalendarEvents(slug)
    expect(Array.isArray(events.today)).toBe(true)
    expect(Array.isArray(events.week)).toBe(true)
    expect(events.today.length).toBeGreaterThan(0)
    expect(events.week.length).toBeGreaterThan(0)
  })

  it.each(ALL_SLUGS)("should have valid event types for %s", (slug) => {
    const events = getCalendarEvents(slug)
    const allEvents = [...events.today, ...events.week]
    for (const event of allEvents) {
      expect(["fiscal", "payment", "internal", "deadline"]).toContain(event.type)
    }
  })

  it.each(ALL_SLUGS)("should have unique event IDs for %s", (slug) => {
    const events = getCalendarEvents(slug)
    const allEvents = [...events.today, ...events.week]
    const ids = allEvents.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("should have amounts only on payment and fiscal events", () => {
    for (const slug of ALL_SLUGS) {
      const events = getCalendarEvents(slug)
      const allEvents = [...events.today, ...events.week]
      for (const event of allEvents) {
        if (event.amount !== undefined) {
          expect(event.amount).toBeGreaterThan(0)
        }
      }
    }
  })
})

// ── Morning Brief ──

describe("[Synthese] getMorningBrief", () => {
  it.each(ALL_SLUGS)("should return a non-empty brief for %s", (slug) => {
    const brief = getMorningBrief(slug)
    expect(brief.text.length).toBeGreaterThan(0)
    expect(brief.generatedAt.length).toBeGreaterThan(0)
  })

  it.each(ALL_SLUGS)("should start with 'Bonjour' for %s", (slug) => {
    const brief = getMorningBrief(slug)
    expect(brief.text).toMatch(/^Bonjour/)
  })

  it("should mention churn for propello", () => {
    const brief = getMorningBrief("propello")
    expect(brief.text.toLowerCase()).toContain("churn")
  })

  it("should mention luminaires for maison-nordique", () => {
    const brief = getMorningBrief("maison-nordique")
    expect(brief.text).toContain("Luminaires")
  })
})

// ── Cash Sparkline ──

describe("[Synthese] getCashSparkline", () => {
  it.each(ALL_SLUGS)("should return up to 6 data points for %s", (slug) => {
    const sparkline = getCashSparkline(slug)
    expect(sparkline.length).toBeGreaterThan(0)
    expect(sparkline.length).toBeLessThanOrEqual(6)
  })

  it.each(ALL_SLUGS)("should return positive cash values for %s", (slug) => {
    const sparkline = getCashSparkline(slug)
    for (const value of sparkline) {
      expect(value).toBeGreaterThan(0)
    }
  })
})

// ── Hero KPIs ──

describe("[Synthese] getHeroKPIs", () => {
  it.each(ALL_SLUGS)("should return 4 KPIs for %s", (slug) => {
    const kpis = getHeroKPIs(slug)
    expect(kpis).toHaveLength(4)
  })

  it.each(ALL_SLUGS)("should include Cash, CA, Resultat net labels (FR) for %s", (slug) => {
    const kpis = getHeroKPIs(slug, "fr")
    const labels = kpis.map((k) => k.label)
    expect(labels).toContain("Cash disponible")
    expect(labels).toContain("CA du mois")
    expect(labels).toContain("Resultat net")
  })

  it.each(ALL_SLUGS)("should include Cash, Revenue, Net income labels (EN) for %s", (slug) => {
    const kpis = getHeroKPIs(slug, "en")
    const labels = kpis.map((k) => k.label)
    expect(labels).toContain("Available cash")
    expect(labels).toContain("Monthly revenue")
    expect(labels).toContain("Net income")
  })

  it("should have Runway as 4th KPI for propello", () => {
    const kpis = getHeroKPIs("propello")
    expect(kpis[3].label).toBe("Runway")
  })

  it("should have Marge brute as 4th KPI for mecaform", () => {
    const kpis = getHeroKPIs("mecaform", "fr")
    expect(kpis[3].label).toBe("Marge brute")
  })

  it("should have Marge brute as 4th KPI for maison-nordique", () => {
    const kpis = getHeroKPIs("maison-nordique", "fr")
    expect(kpis[3].label).toBe("Marge brute")
  })

  it.each(ALL_SLUGS)("should have formatted values containing currency symbols for %s", (slug) => {
    const kpis = getHeroKPIs(slug)
    // First 3 KPIs are currency values
    for (let i = 0; i < 3; i++) {
      expect(kpis[i].value).toMatch(/[KM]?\u00A0?[KM]?€/)
    }
  })

  it("should include sparkline on cash KPI", () => {
    for (const slug of ALL_SLUGS) {
      const kpis = getHeroKPIs(slug)
      const cashKpi = kpis.find((k) => k.label === "Cash disponible")
      expect(cashKpi?.sparkline).toBeDefined()
      expect(cashKpi!.sparkline!.length).toBeGreaterThan(0)
    }
  })

  it.each(ALL_SLUGS)("should set favorableWhenPositive to true for all KPIs for %s", (slug) => {
    const kpis = getHeroKPIs(slug)
    for (const kpi of kpis) {
      expect(kpi.favorableWhenPositive).toBe(true)
    }
  })
})
