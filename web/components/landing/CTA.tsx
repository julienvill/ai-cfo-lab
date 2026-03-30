"use client"

import { useLocale } from "@/lib/locale-context"

export function CTA() {
  const { t } = useLocale()

  return (
    <section
      id="contact"
      className="bg-background px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold sm:text-5xl">
          {t("landing.cta.title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          {t("landing.cta.subtitle")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#demo"
            className="inline-flex items-center rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover"
          >
            {t("landing.cta.demo")}
          </a>
          <a
            href="mailto:contact@aicfolab.com"
            className="inline-flex items-center rounded-lg border border-border px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-surface"
          >
            {t("landing.cta.access")}
          </a>
        </div>
      </div>
    </section>
  )
}
