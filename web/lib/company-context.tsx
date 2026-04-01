"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import { COMPANIES, DEFAULT_COMPANY, type Company, type CompanySlug } from "./companies"

type CompanyContextType = {
  company: Company
  setCompany: (slug: CompanySlug) => void
  companies: Company[]
}

const CompanyContext = createContext<CompanyContextType | null>(null)

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<CompanySlug>(DEFAULT_COMPANY)

  const searchParams = useSearchParams()

  useEffect(() => {
    const fromUrl = searchParams.get("company") as CompanySlug | null
    if (fromUrl && COMPANIES.some((c) => c.slug === fromUrl)) {
      setSlug(fromUrl)
      localStorage.setItem("ai-cfo-company", fromUrl)
      return
    }
    const saved = localStorage.getItem("ai-cfo-company") as CompanySlug | null
    if (saved && COMPANIES.some((c) => c.slug === saved)) {
      setSlug(saved)
    }
  }, [searchParams])

  const setCompany = (newSlug: CompanySlug) => {
    setSlug(newSlug)
    localStorage.setItem("ai-cfo-company", newSlug)
  }

  const company = COMPANIES.find((c) => c.slug === slug) ?? COMPANIES[0]

  return (
    <CompanyContext.Provider value={{ company, setCompany, companies: COMPANIES }}>
      {children}
    </CompanyContext.Provider>
  )
}

export function useCompany() {
  const context = useContext(CompanyContext)
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider")
  }
  return context
}
