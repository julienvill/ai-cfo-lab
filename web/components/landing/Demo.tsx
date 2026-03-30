"use client"

import { useLocale } from "@/lib/locale-context"

const companyKeys = ["company1", "company2", "company3"] as const

export function Demo() {
  const { t } = useLocale()

  return (
    <section id="demo" className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          {t("landing.demo.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          {t("landing.demo.subtitle")}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {companyKeys.map((key) => (
            <button
              key={key}
              className="group rounded-xl border border-border bg-surface p-6 text-left shadow-card transition-all hover:border-accent hover:shadow-card-hover"
            >
              <h3 className="text-lg font-bold group-hover:text-accent">
                {t(`landing.demo.${key}.name`)}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {t(`landing.demo.${key}.sector`)}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{t(`landing.demo.${key}.size`)}</span>
                <span className="font-semibold text-primary">
                  {t(`landing.demo.${key}.revenue`)}
                </span>
              </div>
              <div className="mt-4 text-center text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                {t("landing.demo.explore")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
