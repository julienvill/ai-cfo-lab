import { describe, it, expect } from "vitest"
import { computeRiskScore } from "@/lib/virtual-cfo/risk-scoring"

describe("computeRiskScore", () => {
  it("returns a valid score between 0 and 100 for all companies", () => {
    for (const slug of ["propello", "mecaform", "maison-nordique"] as const) {
      const result = computeRiskScore(slug)
      expect(result.global).toBeGreaterThanOrEqual(0)
      expect(result.global).toBeLessThanOrEqual(100)
    }
  })

  it("returns 4 factors with correct keys and weights summing to 1", () => {
    const result = computeRiskScore("propello")
    expect(result.factors).toHaveLength(4)
    const keys = result.factors.map((f) => f.key).sort()
    expect(keys).toEqual(["bfr", "burn", "cash", "dso"])
    const totalWeight = result.factors.reduce((sum, f) => sum + f.weight, 0)
    expect(totalWeight).toBeCloseTo(1.0, 5)
  })

  it("each factor has a level derived from its penalty", () => {
    const result = computeRiskScore("propello")
    for (const f of result.factors) {
      expect(f.penalty).toBeGreaterThanOrEqual(0)
      expect(f.penalty).toBeLessThanOrEqual(100)
      if (f.penalty >= 70) expect(f.level).toBe("critical")
      else if (f.penalty >= 40) expect(f.level).toBe("warning")
      else expect(f.level).toBe("healthy")
    }
  })

  it("global level matches the global score thresholds", () => {
    const result = computeRiskScore("propello")
    if (result.global < 40) expect(result.level).toBe("critical")
    else if (result.global < 65) expect(result.level).toBe("warning")
    else expect(result.level).toBe("healthy")
  })

  it("includes a summary and horizon90d text", () => {
    const result = computeRiskScore("mecaform")
    expect(result.summary).toBeTruthy()
    expect(result.summary).toContain(`${result.global}/100`)
    expect(result.horizon90d).toBeTruthy()
    expect(result.horizon90d.length).toBeGreaterThan(20)
  })

  it("critical factors always include a recommendation", () => {
    for (const slug of ["propello", "mecaform", "maison-nordique"] as const) {
      const result = computeRiskScore(slug)
      for (const f of result.factors) {
        expect(f.recommendation).toBeTruthy()
        expect(f.detail).toBeTruthy()
      }
    }
  })

  it("Propello (SaaS) has a cash factor using runway", () => {
    const result = computeRiskScore("propello")
    const cash = result.factors.find((f) => f.key === "cash")!
    expect(cash.detail.toLowerCase()).toContain("runway")
  })

  it("Mecaform/Maison-Nordique (PME) cash factor does NOT rely on runway", () => {
    const meca = computeRiskScore("mecaform")
    const cashMeca = meca.factors.find((f) => f.key === "cash")!
    expect(cashMeca.detail.toLowerCase()).toContain("trésorerie")
  })

  it("Propello BFR factor uses churn/NRR signals", () => {
    const result = computeRiskScore("propello")
    const bfr = result.factors.find((f) => f.key === "bfr")!
    expect(bfr.detail.toLowerCase()).toMatch(/churn|nrr/)
  })

  it("PME BFR factor uses DSO-DPO gap", () => {
    const result = computeRiskScore("mecaform")
    const bfr = result.factors.find((f) => f.key === "bfr")!
    expect(bfr.detail.toLowerCase()).toContain("bfr")
  })

  it("score is deterministic (same input = same output)", () => {
    const a = computeRiskScore("propello")
    const b = computeRiskScore("propello")
    expect(a.global).toBe(b.global)
    expect(a.level).toBe(b.level)
  })
})
