"use client"

import { useLocale } from "@/lib/locale-context"

const extensions = [
  { key: "rh", featureCount: 7 },
  { key: "juridique", featureCount: 4 },
]

export function Extensions() {
  const { t } = useLocale()

  return (
    <section className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("landing.extensions.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          {t("landing.extensions.subtitle")}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {extensions.map((ext) => (
            <div
              key={ext.key}
              className="rounded-xl border border-border bg-background p-6"
            >
              <h3 className="text-lg font-bold">{t(`landing.extensions.${ext.key}.tag`)}</h3>
              <p className="mt-1 text-sm text-muted">{t(`landing.extensions.${ext.key}.title`)}</p>
              <ul className="mt-5 space-y-2.5">
                {Array.from({ length: ext.featureCount }, (_, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-primary/80"
                  >
                    <span className="mt-0.5 text-success">✓</span>
                    {t(`landing.extensions.${ext.key}.f${i + 1}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
