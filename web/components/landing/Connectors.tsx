"use client"

import { useLocale } from "@/lib/locale-context"
import Image from "next/image"

const connectors = [
  { name: "Pennylane", logo: "https://logo.clearbit.com/pennylane.com", domain: "pennylane.com" },
  { name: "Sage", logo: "https://logo.clearbit.com/sage.com", domain: "sage.com" },
  { name: "Cegid", logo: "https://logo.clearbit.com/cegid.com", domain: "cegid.com" },
  { name: "Qonto", logo: "https://logo.clearbit.com/qonto.com", domain: "qonto.com" },
  { name: "Revolut", logo: "https://logo.clearbit.com/revolut.com", domain: "revolut.com" },
  { name: "Silae", logo: "https://logo.clearbit.com/silae.fr", domain: "silae.fr" },
  { name: "PayFit", logo: "https://logo.clearbit.com/payfit.com", domain: "payfit.com" },
  { name: "Lucca", logo: "https://logo.clearbit.com/lucca.fr", domain: "lucca.fr" },
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com", domain: "stripe.com" },
  { name: "Bridge", logo: "https://logo.clearbit.com/bridgeapi.io", domain: "bridgeapi.io" },
  { name: "GoCardless", logo: "https://logo.clearbit.com/gocardless.com", domain: "gocardless.com" },
  { name: "Ledgy", logo: "https://logo.clearbit.com/ledgy.com", domain: "ledgy.com" },
]

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
              className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-2.5 shadow-card"
            >
              <Image
                src={connector.logo}
                alt={`${connector.name} logo`}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
                unoptimized
              />
              <span className="text-sm font-semibold text-primary/70">
                {connector.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
