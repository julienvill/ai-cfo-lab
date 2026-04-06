import { describe, it, expect } from "vitest"
import {
  getFacturesClients,
  getFacturesFournisseurs,
  getARKPIs,
  getAPKPIs,
  getAgingBucketsAR,
  getAgingBucketsAP,
  getSpendCategories,
  getClotureSteps,
  getClotureProgress,
  getCloturePL,
  getFECEntries,
  getFECStats,
  getFECTests,
  getImmobilisations,
  getImmoKPIs,
} from "@/lib/comptabilite-data"
import type { CompanySlug } from "@/lib/companies"

const SLUGS: CompanySlug[] = ["propello", "mecaform", "maison-nordique"]

// ── AR Tests ──

describe("[Comptabilite] Accounts Receivable", () => {
  for (const slug of SLUGS) {
    describe(`${slug}`, () => {
      it("should return non-empty factures clients", () => {
        const factures = getFacturesClients(slug)
        expect(factures.length).toBeGreaterThan(0)
      })

      it("should have valid amounts in centimes (integers)", () => {
        const factures = getFacturesClients(slug)
        for (const f of factures) {
          expect(Number.isInteger(f.amount)).toBe(true)
          expect(f.amount).toBeGreaterThan(0)
          expect(Number.isInteger(f.amountPaid)).toBe(true)
          expect(f.amountPaid).toBeGreaterThanOrEqual(0)
          expect(f.amountPaid).toBeLessThanOrEqual(f.amount)
        }
      })

      it("should have 411xxx auxiliary accounts", () => {
        const factures = getFacturesClients(slug)
        for (const f of factures) {
          expect(f.compteAux).toMatch(/^411/)
        }
      })

      it("should return coherent AR KPIs", () => {
        const kpis = getARKPIs(slug)
        expect(kpis.caFacture).toBeGreaterThan(0)
        expect(kpis.dso).toBeGreaterThan(0)
        expect(kpis.encaisse).toBeGreaterThanOrEqual(0)
        expect(kpis.enRetard).toBeGreaterThanOrEqual(0)
      })

      it("should have aging buckets that sum to total outstanding", () => {
        const aging = getAgingBucketsAR(slug)
        const factures = getFacturesClients(slug)
        const totalOutstanding = factures.reduce((sum, f) => sum + (f.amount - f.amountPaid), 0)
        const agingTotal = aging.current + aging.days1_30 + aging.days31_60 + aging.days61_90 + aging.days90plus
        // Should equal since aging is computed from same data
        expect(agingTotal).toBe(totalOutstanding)
      })
    })
  }
})

// ── AP Tests ──

describe("[Comptabilite] Accounts Payable", () => {
  for (const slug of SLUGS) {
    describe(`${slug}`, () => {
      it("should return non-empty factures fournisseurs", () => {
        const factures = getFacturesFournisseurs(slug)
        expect(factures.length).toBeGreaterThan(0)
      })

      it("should have 401xxx auxiliary accounts", () => {
        const factures = getFacturesFournisseurs(slug)
        for (const f of factures) {
          expect(f.compteAux).toMatch(/^401/)
        }
      })

      it("should return coherent AP KPIs", () => {
        const kpis = getAPKPIs(slug)
        expect(kpis.totalCharges).toBeGreaterThan(0)
        expect(kpis.dpo).toBeGreaterThan(0)
      })

      it("should return spend categories that sum to total", () => {
        const categories = getSpendCategories(slug)
        const factures = getFacturesFournisseurs(slug)
        const totalFactures = factures.reduce((sum, f) => sum + f.amount, 0)
        const totalCategories = categories.reduce((sum, c) => sum + c.amount, 0)
        expect(totalCategories).toBe(totalFactures)
      })

      it("should have percentages summing to ~100", () => {
        const categories = getSpendCategories(slug)
        const totalPct = categories.reduce((sum, c) => sum + c.percentage, 0)
        // Allow rounding tolerance
        expect(totalPct).toBeGreaterThanOrEqual(95)
        expect(totalPct).toBeLessThanOrEqual(105)
      })
    })
  }
})

// ── Cloture Tests ──

describe("[Comptabilite] Cloture mensuelle", () => {
  for (const slug of SLUGS) {
    describe(`${slug}`, () => {
      it("should return 12 cloture steps", () => {
        const steps = getClotureSteps(slug)
        expect(steps).toHaveLength(12)
      })

      it("should have steps ordered 1-12", () => {
        const steps = getClotureSteps(slug)
        for (let i = 0; i < steps.length; i++) {
          expect(steps[i].order).toBe(i + 1)
        }
      })

      it("should have coherent progress", () => {
        const progress = getClotureProgress(slug)
        expect(progress.total).toBe(12)
        expect(progress.done).toBeGreaterThanOrEqual(0)
        expect(progress.done).toBeLessThanOrEqual(12)
        expect(progress.percentage).toBe(Math.round((progress.done / 12) * 100))
      })

      it("done steps should have completedDate, todo steps should not", () => {
        const steps = getClotureSteps(slug)
        for (const step of steps) {
          if (step.status === "done") {
            expect(step.completedDate).not.toBeNull()
          }
          if (step.status === "todo") {
            expect(step.completedDate).toBeNull()
          }
        }
      })

      it("should return a non-empty P&L", () => {
        const pl = getCloturePL(slug)
        expect(pl.length).toBeGreaterThan(5)
        // Should end with Resultat net as total
        const lastLine = pl[pl.length - 1]
        expect(lastLine.isTotal).toBe(true)
        expect(lastLine.label).toContain("Resultat net")
      })

      it("P&L should have CA > 0 as first line", () => {
        const pl = getCloturePL(slug)
        expect(pl[0].label).toContain("Chiffre d'affaires")
        expect(pl[0].amount).toBeGreaterThan(0)
      })
    })
  }
})

// ── FEC Tests ──

describe("[Comptabilite] FEC", () => {
  for (const slug of SLUGS) {
    describe(`${slug}`, () => {
      it("should return non-empty FEC entries", () => {
        const entries = getFECEntries(slug)
        expect(entries.length).toBeGreaterThan(0)
      })

      it("should have all 18 mandatory fields populated", () => {
        const entries = getFECEntries(slug)
        for (const e of entries) {
          expect(e.JournalCode).toBeTruthy()
          expect(e.JournalLib).toBeTruthy()
          expect(e.EcritureNum).toBeTruthy()
          expect(e.EcritureDate).toMatch(/^\d{8}$/)
          expect(e.CompteNum).toBeTruthy()
          expect(e.CompteLib).toBeTruthy()
          expect(e.PieceRef).toBeTruthy()
          expect(e.PieceDate).toMatch(/^\d{8}$/)
          expect(e.EcritureLib).toBeTruthy()
          expect(e.ValidDate).toMatch(/^\d{8}$/)
          // Debit or Credit must be > 0
          expect(e.Debit + e.Credit).toBeGreaterThan(0)
          // But not both
          expect(e.Debit === 0 || e.Credit === 0).toBe(true)
        }
      })

      it("should have balanced debit/credit in stats", () => {
        const stats = getFECStats(slug)
        expect(stats.isBalanced).toBe(true)
        expect(stats.totalDebit).toBe(stats.totalCredit)
      })

      it("should pass all conformity tests", () => {
        const tests = getFECTests(slug)
        const failures = tests.filter((t) => t.status === "fail")
        expect(failures).toHaveLength(0)
      })

      it("should have at least 2 journal codes", () => {
        const stats = getFECStats(slug)
        expect(stats.journaux.length).toBeGreaterThanOrEqual(2)
      })
    })
  }
})

// ── Immobilisations Tests ──

describe("[Comptabilite] Immobilisations", () => {
  for (const slug of SLUGS) {
    describe(`${slug}`, () => {
      it("should return non-empty immobilisations", () => {
        const immos = getImmobilisations(slug)
        expect(immos.length).toBeGreaterThan(0)
      })

      it("should have valid 2xx account numbers", () => {
        const immos = getImmobilisations(slug)
        for (const immo of immos) {
          expect(immo.compteNum).toMatch(/^2/)
        }
      })

      it("should have VNC = valeurBrute - amortissementCumule", () => {
        const immos = getImmobilisations(slug)
        for (const immo of immos) {
          expect(immo.vnc).toBe(immo.valeurBrute - immo.amortissementCumule)
        }
      })

      it("should have coherent KPI totals", () => {
        const kpis = getImmoKPIs(slug)
        const immos = getImmobilisations(slug)
        const computedBrut = immos.reduce((s, i) => s + i.valeurBrute, 0)
        const computedAmort = immos.reduce((s, i) => s + i.amortissementCumule, 0)
        const computedVNC = immos.reduce((s, i) => s + i.vnc, 0)
        expect(kpis.totalBrut).toBe(computedBrut)
        expect(kpis.totalAmortissements).toBe(computedAmort)
        expect(kpis.totalVNC).toBe(computedVNC)
        expect(kpis.nbImmobilisations).toBe(immos.length)
      })

      it("amortissementCumule should not exceed valeurBrute", () => {
        const immos = getImmobilisations(slug)
        for (const immo of immos) {
          expect(immo.amortissementCumule).toBeLessThanOrEqual(immo.valeurBrute)
        }
      })

      it("should have valid amortissement mode", () => {
        const immos = getImmobilisations(slug)
        for (const immo of immos) {
          expect(["lineaire", "degressif"]).toContain(immo.mode)
        }
      })
    })
  }
})
