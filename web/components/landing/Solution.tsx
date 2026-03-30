"use client"

import { useLocale } from "@/lib/locale-context"

const blocks = [
  { key: "vcfo", hero: true, ai: true, featureCount: 3 },
  { key: "daily", hero: false, ai: true, featureCount: 0 },
  { key: "pilotage", hero: false, ai: false, featureCount: 0 },
  { key: "compta", hero: false, ai: false, featureCount: 0 },
  { key: "audit", hero: false, ai: false, featureCount: 0 },
]

export function Solution() {
  const { t } = useLocale()

  return (
    <section className="bg-background px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("landing.solution.title")}
        </h2>

        <div className="mt-14 space-y-6">
          {blocks
            .filter((b) => b.hero)
            .map((block) => (
              <div
                key={block.key}
                className="rounded-2xl border-2 border-ai-border/40 bg-surface p-8 shadow-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ai-bg px-3 py-1 text-xs font-semibold text-ai">
                    ✦ IA
                  </span>
                  <h3 className="text-2xl font-bold">{t(`landing.solution.${block.key}.tag`)}</h3>
                </div>
                <p className="mt-2 text-lg font-medium text-primary/80">
                  {t(`landing.solution.${block.key}.title`)}
                </p>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                  {t(`landing.solution.${block.key}.desc`)}
                </p>
                {block.featureCount > 0 && (
                  <ul className="mt-4 space-y-2">
                    {Array.from({ length: block.featureCount }, (_, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-primary/80"
                      >
                        <span className="mt-0.5 text-accent">→</span>
                        {t(`landing.solution.${block.key}.f${i + 1}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          <div className="grid gap-6 sm:grid-cols-2">
            {blocks
              .filter((b) => !b.hero)
              .map((block) => (
                <div
                  key={block.key}
                  className="rounded-xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="flex items-center gap-2">
                    {block.ai && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ai-bg px-2.5 py-0.5 text-[11px] font-semibold text-ai">
                        ✦ IA
                      </span>
                    )}
                    <h3 className="text-lg font-bold">{t(`landing.solution.${block.key}.tag`)}</h3>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary/70">
                    {t(`landing.solution.${block.key}.title`)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t(`landing.solution.${block.key}.desc`)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
