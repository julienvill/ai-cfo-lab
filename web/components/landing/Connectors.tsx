"use client"

import { useLocale } from "@/lib/locale-context"

const connectors = [
  "Pennylane", "Sage", "Cegid", "Qonto", "Revolut", "Silae",
  "PayFit", "Lucca", "Stripe", "Bridge", "GoCardless", "Ledgy",
]

export function Connectors() {
  const { t } = useLocale()

  return (
    <section className="border-y border-border bg-background py-10">
      <p className="text-center text-sm font-medium tracking-wide text-muted uppercase">
        {t("landing.connectors.title")}
      </p>

      <div className="relative mt-6 overflow-hidden">
        <div className="flex animate-scroll gap-12 whitespace-nowrap">
          {[...connectors, ...connectors].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-primary/70 shadow-card"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
