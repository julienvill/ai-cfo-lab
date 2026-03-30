"use client"

import { useLocale } from "@/lib/locale-context"

export function Hero() {
  const { t } = useLocale()

  return (
    <section className="relative overflow-hidden bg-surface px-6 pt-32 pb-20 sm:px-12 lg:px-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background to-surface" />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ai-border/30 bg-ai-bg px-4 py-1.5 text-sm font-medium text-ai">
          <span className="inline-block h-2 w-2 rounded-full bg-ai animate-pulse" />
          {t("landing.hero.badge")}
        </div>

        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          {t("landing.hero.title1")}
          <br />
          <span className="text-accent">{t("landing.hero.title2")}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {t("landing.hero.subtitle")}
        </p>

        <p className="mt-4 text-sm font-medium tracking-wide text-muted/70 uppercase">
          {t("landing.hero.target")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#demo"
            className="inline-flex items-center rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover"
          >
            {t("landing.hero.cta1")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-border px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-background"
          >
            {t("landing.hero.cta2")}
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated">
          <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-critical/40" />
            <span className="h-3 w-3 rounded-full bg-warning/40" />
            <span className="h-3 w-3 rounded-full bg-success/40" />
            <span className="ml-4 text-xs text-muted">{t("landing.hero.card.title")}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 p-6">
            {[
              { labelKey: "landing.hero.card.cash", value: "847 320 €", trend: "+12%", positive: true },
              { labelKey: "landing.hero.card.runway", value: "14,2 mois", trend: "+1,8", positive: true },
              { labelKey: "landing.hero.card.overdue", value: "3", trend: "23 450 €", positive: false },
            ].map((kpi) => (
              <div
                key={kpi.labelKey}
                className="rounded-xl border border-border bg-surface p-4 shadow-card"
              >
                <p className="text-xs font-medium text-muted">{t(kpi.labelKey)}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight">{kpi.value}</p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    kpi.positive ? "text-success" : "text-critical"
                  }`}
                >
                  {kpi.positive ? "↑" : "↓"} {kpi.trend}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-6 mb-6 rounded-xl border-l-4 border-ai-border bg-ai-bg p-4">
            <p className="text-xs font-semibold text-ai">✦ {t("landing.hero.card.insight")}</p>
            <p className="mt-1 text-sm italic text-primary/80">
              &quot;{t("landing.hero.card.insightText")}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
