import { test, expect, type Page } from "@playwright/test"

const COMPANIES = [
  { slug: "propello", name: "Propello" },
  { slug: "mecaform", name: "Mécaform" },
  { slug: "maison-nordique", name: "Maison Nordique" },
] as const

/** Navigate to synthese page for a given company */
async function gotoSynthese(page: Page, companySlug?: string) {
  const url = companySlug
    ? `/app/synthese?company=${companySlug}`
    : "/app/synthese"
  await page.goto(url, { waitUntil: "networkidle" })
}

// ──────────────────────────────────────────────
// 1. Page loads correctly
// ──────────────────────────────────────────────

test.describe("Synthese — Page load", () => {
  test("should load /app/synthese without errors", async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text())
    })

    await gotoSynthese(page)
    await expect(page.locator("main")).toBeVisible()

    // No JS errors in console (filter out known noise)
    const realErrors = consoleErrors.filter(
      (e) => !e.includes("favicon") && !e.includes("hydrat")
    )
    expect(realErrors).toEqual([])
  })

  test("should display the page title in browser", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page).toHaveTitle(/AI CFO Lab/)
  })
})

// ──────────────────────────────────────────────
// 2. Morning Brief (Briefing du matin)
// ──────────────────────────────────────────────

test.describe("Synthese — Morning Brief", () => {
  test("should display morning brief with company name", async ({ page }) => {
    await gotoSynthese(page, "propello")

    const brief = page.locator("text=Briefing du matin")
    await expect(brief).toBeVisible()

    // The brief should mention the company name
    const briefSection = page.locator("text=Briefing du matin — Propello")
    await expect(briefSection).toBeVisible()
  })

  test("should display AI badge on the brief", async ({ page }) => {
    await gotoSynthese(page)

    // The AI badge is near the briefing
    const briefCard = page.locator("text=Briefing du matin").locator("..")
    const aiBadge = briefCard.locator("text=AI")
    await expect(aiBadge).toBeVisible()
  })

  test("should display brief text content", async ({ page }) => {
    await gotoSynthese(page)

    // The brief card contains italic text with financial content
    const briefCard = page
      .locator("text=Briefing du matin")
      .locator("../..")
    const italicText = briefCard.locator("p.italic")
    await expect(italicText).toBeVisible()
    const text = await italicText.textContent()
    expect(text!.length).toBeGreaterThan(20)
  })
})

// ──────────────────────────────────────────────
// 3. Hero KPIs
// ──────────────────────────────────────────────

test.describe("Synthese — Hero KPIs", () => {
  test("should display at least 4 KPI cards", async ({ page }) => {
    await gotoSynthese(page)

    // KPI cards are in a grid, each is a Card with a 2xl bold value
    const kpiValues = page.locator(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .text-2xl.font-bold"
    )
    await expect(kpiValues.first()).toBeVisible()
    const count = await kpiValues.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test("should display KPI labels", async ({ page }) => {
    await gotoSynthese(page)

    // Each KPI card has a label in the CardHeader
    const kpiGrid = page.locator(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4"
    )
    const labels = kpiGrid.locator(".text-sm.font-medium.text-\\[\\#64748B\\]")
    const count = await labels.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test("KPI values should contain numbers or currency symbols", async ({
    page,
  }) => {
    await gotoSynthese(page)

    const kpiValues = page.locator(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .text-2xl.font-bold"
    )
    const count = await kpiValues.count()
    for (let i = 0; i < count; i++) {
      const text = await kpiValues.nth(i).textContent()
      // Should contain at least one digit
      expect(text).toMatch(/\d/)
    }
  })

  test("should display variation badges (vs N-1)", async ({ page }) => {
    await gotoSynthese(page)

    const vsLabels = page.locator("text=vs N-1")
    const count = await vsLabels.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

// ──────────────────────────────────────────────
// 4. Health Score
// ──────────────────────────────────────────────

test.describe("Synthese — Health Score", () => {
  test("should display health score title", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page.locator("text=Sante financiere")).toBeVisible()
  })

  test("should display a numeric score out of 100", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page.locator("text=/100")).toBeVisible()
  })

  test("should display the 4 axes", async ({ page }) => {
    await gotoSynthese(page)

    // The health score section should show axis scores with status labels
    // Check that Bon, Attention, or Alerte status labels appear on the page
    const bon = page.locator("text=Bon")
    const attention = page.locator("text=Attention")
    const alerte = page.locator("text=Alerte")

    const total =
      (await bon.count()) +
      (await attention.count()) +
      (await alerte.count())
    expect(total).toBeGreaterThanOrEqual(3) // at least 3 axes visible
  })

  test("should display AI badge", async ({ page }) => {
    await gotoSynthese(page)

    const healthCard = page.locator("text=Sante financiere").locator("..")
    const aiBadge = healthCard.locator("text=AI")
    await expect(aiBadge).toBeVisible()
  })
})

// ──────────────────────────────────────────────
// 5. Alerts
// ──────────────────────────────────────────────

test.describe("Synthese — Alerts", () => {
  test("should display alerts section title", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page.locator("text=Alertes prioritaires")).toBeVisible()
  })

  test("should display at least one alert", async ({ page }) => {
    await gotoSynthese(page)

    // Alerts have severity badges: Critique, Attention, or Info
    // They also have border-l-[3px] styling for each alert item
    const critique = page.locator("text=Critique")
    const info = page.locator("text=Info")

    // Count alert severity badges (excluding "Attention" which appears in health score too)
    const total = (await critique.count()) + (await info.count())
    expect(total).toBeGreaterThanOrEqual(1)
  })

  test("should display active count badge", async ({ page }) => {
    await gotoSynthese(page)

    // The badge shows "N active(s)"
    const countBadge = page.locator("text=/\\d+ actives?/")
    await expect(countBadge).toBeVisible()
  })
})

// ──────────────────────────────────────────────
// 6. Recommended Actions
// ──────────────────────────────────────────────

test.describe("Synthese — Recommended Actions", () => {
  test("should display actions section title", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page.locator("text=Actions recommandees")).toBeVisible()
  })

  test("should display at least 2 numbered actions", async ({ page }) => {
    await gotoSynthese(page)

    // Actions have priority numbers (1, 2, 3) in circular badges
    const actionsCard = page.locator("text=Actions recommandees").locator("../..")
    const actionItems = actionsCard.locator(".rounded-full.bg-\\[\\#2563EB\\]\\/10")
    const count = await actionItems.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})

// ──────────────────────────────────────────────
// 7. Calendar Events
// ──────────────────────────────────────────────

test.describe("Synthese — Calendar", () => {
  test("should display calendar title", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page.locator("text=Calendrier financier")).toBeVisible()
  })

  test("should display today and this week sections", async ({ page }) => {
    await gotoSynthese(page)
    await expect(page.locator("text=Aujourd'hui")).toBeVisible()
    await expect(page.locator("text=Cette semaine")).toBeVisible()
  })
})

// ──────────────────────────────────────────────
// 8. Company switching
// ──────────────────────────────────────────────

test.describe("Synthese — Company switching", () => {
  for (const company of COMPANIES) {
    test(`should load data for ${company.name}`, async ({ page }) => {
      await gotoSynthese(page, company.slug)

      // The morning brief should mention the company name
      const briefTitle = page.locator(
        `text=Briefing du matin — ${company.name}`
      )
      await expect(briefTitle).toBeVisible()

      // KPIs should be visible
      const kpiValues = page.locator(
        ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .text-2xl.font-bold"
      )
      await expect(kpiValues.first()).toBeVisible()
    })
  }

  test("switching company should change KPI values", async ({ page }) => {
    // Load Propello
    await gotoSynthese(page, "propello")
    const kpiValues = page.locator(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .text-2xl.font-bold"
    )
    await expect(kpiValues.first()).toBeVisible()

    const propelloValues: string[] = []
    for (let i = 0; i < await kpiValues.count(); i++) {
      propelloValues.push((await kpiValues.nth(i).textContent()) ?? "")
    }

    // Load Mecaform
    await gotoSynthese(page, "mecaform")
    await expect(kpiValues.first()).toBeVisible()

    const mecaformValues: string[] = []
    for (let i = 0; i < await kpiValues.count(); i++) {
      mecaformValues.push((await kpiValues.nth(i).textContent()) ?? "")
    }

    // Values should differ between companies
    const allSame = propelloValues.every(
      (v, i) => v === mecaformValues[i]
    )
    expect(allSame).toBe(false)
  })
})

// ──────────────────────────────────────────────
// 9. Responsive — Mobile viewport
// ──────────────────────────────────────────────

test.describe("Synthese — Responsive (mobile 375px)", () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test("should display all 6 blocks on mobile", async ({ page }) => {
    await gotoSynthese(page)

    // Brief
    await expect(page.locator("text=Briefing du matin")).toBeVisible()

    // KPIs (stacked on mobile)
    const kpiValues = page.locator(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .text-2xl.font-bold"
    )
    await expect(kpiValues.first()).toBeVisible()

    // Health score
    await expect(page.locator("text=Sante financiere")).toBeVisible()

    // Alerts
    await expect(page.locator("text=Alertes prioritaires")).toBeVisible()

    // Actions
    await expect(page.locator("text=Actions recommandees")).toBeVisible()

    // Calendar
    await expect(page.locator("text=Calendrier financier")).toBeVisible()
  })

  test("should take mobile screenshot", async ({ page }) => {
    await gotoSynthese(page)
    await page.screenshot({
      path: "tests/e2e/screenshots/synthese-mobile.png",
      fullPage: true,
    })
  })
})

// ──────────────────────────────────────────────
// 10. Screenshots (desktop)
// ──────────────────────────────────────────────

test.describe("Synthese — Screenshots", () => {
  test("should capture desktop screenshots for each company", async ({
    page,
  }) => {
    for (const company of COMPANIES) {
      await gotoSynthese(page, company.slug)
      await expect(page.locator("text=Briefing du matin")).toBeVisible()

      await page.screenshot({
        path: `tests/e2e/screenshots/synthese-${company.slug}-desktop.png`,
        fullPage: true,
      })
    }
  })
})
