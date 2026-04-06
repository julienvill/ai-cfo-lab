"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { AskCfoDrawer } from "./ask-cfo-drawer"

export function AskCfoButton() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("app.header.askCfo.button")}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6D28D9] hover:to-[#1D4ED8] shadow-sm hover:shadow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
        data-testid="ask-cfo-button"
      >
        <Sparkles className="h-4 w-4" strokeWidth={1.75} />
        <span>{t("app.header.askCfo.button")}</span>
      </button>
      <AskCfoDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
