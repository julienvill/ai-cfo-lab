import { test, expect } from '@playwright/test'

test.describe('Landing page', () => {
  test('should load without errors', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/AI CFO Lab/)
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })
})
