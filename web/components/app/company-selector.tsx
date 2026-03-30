"use client"

import { useCompany } from "@/lib/company-context"
import type { CompanySlug } from "@/lib/companies"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CompanySelector() {
  const { company, setCompany, companies } = useCompany()

  return (
    <Select value={company.slug} onValueChange={(v) => setCompany(v as CompanySlug)}>
      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/15">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {companies.map((c) => (
          <SelectItem key={c.slug} value={c.slug}>
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.sector}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
