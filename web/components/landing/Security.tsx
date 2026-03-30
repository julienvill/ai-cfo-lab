"use client"

import { useLocale } from "@/lib/locale-context"

const badges = [
  { label: "RGPD", icon: "🛡️" },
  { label: "Hébergement France", icon: "🇫🇷" },
  { label: "Scaleway", icon: "☁️" },
  { label: "AES-256", icon: "🔒" },
]

const featureKeys = ["hosting", "encryption", "audit", "separation"] as const

export function Security() {
  const { t } = useLocale()

  return (
    <section className="bg-primary px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          {t("landing.security.title")}
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white"
            >
              <span>{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {featureKeys.map((key) => (
            <div
              key={key}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-bold text-white">
                {t(`landing.security.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {t(`landing.security.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
