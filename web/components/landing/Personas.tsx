"use client"

import { useLocale } from "@/lib/locale-context"

const personaKeys = ["1", "2", "3", "4"] as const

export function Personas() {
  const { t } = useLocale()

  return (
    <section className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("landing.personas.title")}
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {personaKeys.map((key) => (
            <div
              key={key}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <h3 className="text-lg font-bold">{t(`landing.personas.${key}.title`)}</h3>
              <p className="mt-3 text-sm text-critical/80">
                {t(`landing.personas.${key}.problem`)}
              </p>
              <div className="mt-auto pt-4">
                <div className="rounded-lg bg-success-bg p-3">
                  <p className="text-sm font-medium text-primary/90">
                    {t(`landing.personas.${key}.solution`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
