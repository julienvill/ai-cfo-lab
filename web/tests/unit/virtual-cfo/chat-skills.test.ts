import { describe, it, expect } from "vitest"
import {
  matchSkill,
  answerQuestion,
  getSuggestedQuestions,
} from "@/lib/virtual-cfo/chat-skills"

describe("matchSkill", () => {
  it("matches runway question", () => {
    expect(matchSkill("Quel est mon runway ?")?.id).toBe("runway")
  })

  it("matches cash/trésorerie question", () => {
    expect(matchSkill("Quelle est ma trésorerie ?")?.id).toBe("cash")
    expect(matchSkill("combien de cash me reste-t-il")?.id).toBe("cash")
  })

  it("matches DSO question", () => {
    expect(matchSkill("Quel est mon DSO ce mois ?")?.id).toBe("dso")
  })

  it("matches DPO question", () => {
    expect(matchSkill("Quel est mon DPO ?")?.id).toBe("dpo")
  })

  it("matches marge question", () => {
    expect(matchSkill("Quelle est ma marge ?")?.id).toBe("marge")
  })

  it("matches churn question", () => {
    expect(matchSkill("Mon churn augmente ?")?.id).toBe("churn")
  })

  it("matches MRR question", () => {
    expect(matchSkill("Où en est le MRR")?.id).toBe("mrr")
  })

  it("matches risque question", () => {
    expect(matchSkill("Y a-t-il des risques à 90 jours ?")?.id).toBe("risk")
  })

  it("matches santé question", () => {
    expect(matchSkill("Quelle est la santé de l'entreprise ?")?.id).toBe("health")
  })

  it("returns null for empty or unknown question", () => {
    expect(matchSkill("")).toBeNull()
    expect(matchSkill("quel est le nom de mon chien ?")).toBeNull()
  })

  it("case-insensitive matching", () => {
    expect(matchSkill("RUNWAY")?.id).toBe("runway")
    expect(matchSkill("Dso")?.id).toBe("dso")
  })
})

describe("answerQuestion", () => {
  it("returns a default response for unknown question", () => {
    const r = answerQuestion("propello", "blabla")
    expect(r.content).toContain("pas encore la compétence")
    expect(r.sources).toEqual([])
  })

  it("returns runway answer with source for Propello", () => {
    const r = answerQuestion("propello", "Quel est mon runway ?")
    expect(r.content.toLowerCase()).toContain("runway")
    expect(r.sources.length).toBeGreaterThan(0)
    expect(r.sources[0].moduleHref).toBe("/app/tresorerie")
  })

  it("explains runway N/A for PME (Mecaform)", () => {
    const r = answerQuestion("mecaform", "Quel est mon runway ?")
    expect(r.content.toLowerCase()).toContain("profitable")
  })

  it("returns DSO answer with currency amounts", () => {
    const r = answerQuestion("propello", "Quel est mon DSO ?")
    expect(r.content).toMatch(/\d+ jours/)
    expect(r.content).toContain("€")
  })

  it("returns churn answer only for SaaS (Propello)", () => {
    const r = answerQuestion("propello", "Quel est mon churn ?")
    expect(r.content.toLowerCase()).toMatch(/churn|nrr/)
    expect(r.sources[0].moduleHref).toBe("/app/kpis-saas")
  })

  it("rejects churn question for non-SaaS companies", () => {
    const r = answerQuestion("mecaform", "Quel est mon churn ?")
    expect(r.content.toLowerCase()).toContain("saas")
  })

  it("risk answer contains score summary", () => {
    const r = answerQuestion("propello", "Y a-t-il un risque ?")
    expect(r.content).toMatch(/\d+\/100/)
    expect(r.content.toLowerCase()).toContain("90 jours")
  })

  it("health answer mentions CA and marge", () => {
    const r = answerQuestion("mecaform", "Synthèse de l'entreprise")
    expect(r.content).toContain("CA")
    expect(r.content.toLowerCase()).toContain("marge")
  })
})

describe("getSuggestedQuestions", () => {
  it("returns SaaS-specific questions for Propello", () => {
    const qs = getSuggestedQuestions("propello")
    expect(qs.some((q) => q.toLowerCase().includes("mrr"))).toBe(true)
    expect(qs.some((q) => q.toLowerCase().includes("churn"))).toBe(true)
  })

  it("returns PME questions for Mecaform", () => {
    const qs = getSuggestedQuestions("mecaform")
    expect(qs.some((q) => q.toLowerCase().includes("trésorerie"))).toBe(true)
    expect(qs.some((q) => q.toLowerCase().includes("mrr"))).toBe(false)
  })

  it("always returns at least 3 suggestions", () => {
    for (const slug of ["propello", "mecaform", "maison-nordique"] as const) {
      expect(getSuggestedQuestions(slug).length).toBeGreaterThanOrEqual(3)
    }
  })
})
