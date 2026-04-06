"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { useCompany } from "@/lib/company-context"
import { ChatPanel } from "@/components/app/virtual-cfo/chat-panel"
import { getSuggestedQuestions } from "@/lib/virtual-cfo/chat-skills"

type Props = {
  open: boolean
  onClose: () => void
}

export function AskCfoDrawer({ open, onClose }: Props) {
  const { t } = useLocale()
  const { company } = useCompany()
  const suggestions = getSuggestedQuestions(company.slug)

  // Fermer sur Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  // Lock scroll body quand ouvert
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-cfo-drawer-title"
      data-testid="ask-cfo-drawer"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label={t("app.header.askCfo.close")}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        data-testid="ask-cfo-overlay"
      />

      {/* Drawer panel */}
      <div
        className="absolute top-0 right-0 h-full w-full sm:w-[440px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#7C3AED]/5 to-[#2563EB]/5">
          <h2
            id="ask-cfo-drawer-title"
            className="text-base font-semibold text-[#1E3A5F]"
          >
            {t("app.header.askCfo.drawerTitle")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("app.header.askCfo.close")}
            className="p-2 rounded-md text-[#64748B] hover:text-[#1E3A5F] hover:bg-[#F1F5F9] transition-colors"
            data-testid="ask-cfo-close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Chat body */}
        <div className="flex-1 overflow-y-auto p-4">
          <ChatPanel company={company.slug} suggestedQuestions={suggestions} />
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2E8F0] px-5 py-3 shrink-0 bg-[#F8FAFC]">
          <Link
            href="/app/virtual-cfo"
            onClick={onClose}
            className="text-sm font-medium text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
            data-testid="ask-cfo-view-full"
          >
            {t("app.header.askCfo.viewFull")}
          </Link>
        </div>
      </div>
    </div>
  )
}
