"use client"

import { useLocale } from "@/lib/locale-context"
import { cn } from "@/lib/utils"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center rounded-md border border-[#E2E8F0] text-xs overflow-hidden">
      <button
        onClick={() => setLocale("fr")}
        className={cn(
          "px-2 py-1 transition-colors",
          locale === "fr"
            ? "bg-[#1E3A5F] text-white"
            : "text-[#64748B] hover:bg-[#F1F5F9]"
        )}
      >
        FR
      </button>
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "px-2 py-1 transition-colors",
          locale === "en"
            ? "bg-[#1E3A5F] text-white"
            : "text-[#64748B] hover:bg-[#F1F5F9]"
        )}
      >
        EN
      </button>
    </div>
  )
}
