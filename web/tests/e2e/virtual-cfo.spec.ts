import { test, expect, type Page } from "@playwright/test"

const COMPANIES = [
  { slug: "propello", name: "Propello" },
  { slug: "mecaform", name: "Mécaform" },
  { slug: "maison-nordique", name: "Maison Nordique" },
] as const

async function gotoVirtualCfo(page: Page, companySlug?: string) {
  const url = companySlug
    ? `/app/virtual-cfo?company=${companySlug}`
    : "/app/virtual-cfo"
  await page.goto(url, { waitUntil: "networkidle" })
}

test.describe("Virtual CFO — Page load", () => {
  test("loads /app/virtual-cfo without console errors", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })
    await gotoVirtualCfo(page)
    await expect(page.locator("main")).toBeVisible()
    const real = errors.filter((e) => !e.includes("favicon") && !e.includes("hydrat"))
    expect(real).toEqual([])
  })

  test("shows chat panel and risk dashboard", async ({ page }) => {
    await gotoVirtualCfo(page)
    await expect(page.getByText("Chat Virtual CFO")).toBeVisible()
    await expect(page.getByText("Scoring de risque prédictif")).toBeVisible()
  })

  test("shows suggested questions initially", async ({ page }) => {
    await gotoVirtualCfo(page)
    const suggestions = page.getByTestId("suggested-question")
    await expect(suggestions.first()).toBeVisible()
    const count = await suggestions.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })
})

test.describe("Virtual CFO — Risk scoring", () => {
  for (const { slug } of COMPANIES) {
    test(`displays risk score for ${slug}`, async ({ page }) => {
      await gotoVirtualCfo(page, slug)
      // Score value (number/100)
      await expect(page.locator("text=/\\d+/100/").first()).toBeVisible()
      // 4 factors
      await expect(page.getByText("Trésorerie & Runway")).toBeVisible()
      await expect(page.getByText("Délai de paiement clients (DSO)")).toBeVisible()
      await expect(page.getByText("Marge & Burn")).toBeVisible()
      await expect(page.getByText("BFR & Rétention")).toBeVisible()
      // Horizon 90d
      await expect(page.getByText("Horizon 90 jours")).toBeVisible()
    })
  }
})

test.describe("Virtual CFO — Chat interaction", () => {
  test("sending a question returns an assistant answer", async ({ page }) => {
    await gotoVirtualCfo(page, "propello")
    await page.getByTestId("chat-input").fill("Quel est mon runway ?")
    await page.getByTestId("chat-send").click()

    // User message rendered
    await expect(page.getByTestId("message-user")).toBeVisible()
    // Assistant answer arrives
    await expect(page.getByTestId("message-assistant")).toBeVisible({ timeout: 5000 })
    const answer = await page.getByTestId("message-assistant").textContent()
    expect(answer?.toLowerCase()).toContain("runway")
  })

  test("clicking a suggested question triggers the chat flow", async ({ page }) => {
    await gotoVirtualCfo(page, "propello")
    await page.getByTestId("suggested-question").first().click()
    await expect(page.getByTestId("message-assistant")).toBeVisible({ timeout: 5000 })
  })

  test("assistant answer includes clickable source link", async ({ page }) => {
    await gotoVirtualCfo(page, "propello")
    await page.getByTestId("chat-input").fill("Quel est mon DSO ?")
    await page.getByTestId("chat-send").click()
    const assistant = page.getByTestId("message-assistant")
    await expect(assistant).toBeVisible({ timeout: 5000 })
    // Source link
    await expect(assistant.getByRole("link")).toBeVisible()
  })

  test("unknown question returns a helpful fallback", async ({ page }) => {
    await gotoVirtualCfo(page, "propello")
    await page.getByTestId("chat-input").fill("Quelle est la météo aujourd'hui ?")
    await page.getByTestId("chat-send").click()
    const assistant = page.getByTestId("message-assistant")
    await expect(assistant).toBeVisible({ timeout: 5000 })
    const content = await assistant.textContent()
    expect(content?.toLowerCase()).toContain("compétence")
  })
})

test.describe("Virtual CFO — Sidebar navigation", () => {
  test("sidebar has a Virtual CFO link", async ({ page }) => {
    await page.goto("/app/synthese", { waitUntil: "networkidle" })
    const link = page.locator("aside").getByRole("link", { name: /Virtual CFO/i })
    await expect(link).toBeVisible()
    await link.click()
    await expect(page).toHaveURL(/\/app\/virtual-cfo/)
  })
})
