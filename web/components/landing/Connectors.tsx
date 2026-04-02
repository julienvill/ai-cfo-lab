"use client"

import { useLocale } from "@/lib/locale-context"

const connectors = [
  { name: "Pennylane", domain: "pennylane.com" },
  { name: "Sage", domain: "sage.com" },
  { name: "Cegid", domain: "cegid.com" },
  { name: "Qonto", domain: "qonto.com" },
  { name: "Revolut", domain: "revolut.com" },
  { name: "Silae", domain: "silae.fr" },
  { name: "PayFit", domain: "payfit.com" },
  { name: "Lucca", domain: "lucca.fr" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "Bridge", domain: "bridgeapi.io" },
  { name: "GoCardless", domain: "gocardless.com" },
  { name: "Ledgy", domain: "ledgy.com" },
]

function getLogoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

export function Connectors() {
  const { t } = useLocale()

  return (
    <section className="border-y border-border bg-background py-10">
      <p className="text-center text-sm font-medium tracking-wide text-muted uppercase">
        {t("landing.connectors.title")}
      </p>

      <div className="relative mt-6 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-scroll gap-10 whitespace-nowrap">
          {[...connectors, ...connectors].map((connector, i) => (
            <span
              key={`${connector.name}-${i}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-2.5 shadow-card h-11"
            >
              <img
                src={getLogoUrl(connector.domain)}
                alt={`${connector.name} logo`}
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 object-contain"
              />
              <span className="text-sm font-semibold text-primary/70 leading-none">
                {connector.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
