"use client"

import { useLocale } from "@/lib/locale-context"

const rowKeys = [
  "visibility", "closing", "declarations", "cash", "questions", "tools",
] as const

export function Comparison() {
  const { t } = useLocale()

  return (
    <section className="bg-background px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("landing.comparison.title")}
        </h2>

        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border bg-background text-sm font-semibold">
            <div className="p-4" />
            <div className="border-l border-border p-4 text-critical/80">
              {t("landing.comparison.before")}
            </div>
            <div className="border-l border-border p-4 text-success">
              {t("landing.comparison.after")}
            </div>
          </div>

          {rowKeys.map((key, i) => (
            <div
              key={key}
              className={`grid grid-cols-[1fr_1fr_1fr] text-sm ${
                i < rowKeys.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-4 font-semibold">
                {t(`landing.comparison.${key}.label`)}
              </div>
              <div className="border-l border-border p-4 text-muted">
                {t(`landing.comparison.${key}.before`)}
              </div>
              <div className="border-l border-border bg-success-bg/50 p-4 font-medium text-primary/90">
                {t(`landing.comparison.${key}.after`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
