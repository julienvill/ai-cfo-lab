export type CompanySlug = "propello" | "mecaform" | "maison-nordique"

export type Company = {
  slug: CompanySlug
  name: string
  sector: string
}

export const COMPANIES: Company[] = [
  { slug: "propello", name: "Propello", sector: "SaaS B2B" },
  { slug: "mecaform", name: "Mécaform", sector: "PME Industrielle" },
  { slug: "maison-nordique", name: "Maison Nordique", sector: "E-commerce B2C" },
]

export const DEFAULT_COMPANY: CompanySlug = "propello"
