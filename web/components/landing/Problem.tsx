"use client"

import { useLocale } from "@/lib/locale-context"

const painKeys = ["1", "2", "3", "4"] as const

export function Problem() {
  const { t } = useLocale()

  return (
    <section className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("landing.problem.title")}
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {painKeys.map((key) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <p className="text-lg font-bold text-critical">
                &ldquo;{t(`landing.problem.${key}.title`)}&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`landing.problem.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
