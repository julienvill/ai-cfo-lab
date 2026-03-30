"use client"

import { useLocale } from "@/lib/locale-context"
import { LocaleToggle } from "@/components/app/locale-toggle"

export function Header() {
  const { t } = useLocale()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-surface/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-primary">AI CFO</span>{" "}
          <span className="text-accent">Lab</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a href="#solution" className="transition-colors hover:text-primary">
            {t("landing.nav.solution")}
          </a>
          <a href="#personas" className="transition-colors hover:text-primary">
            {t("landing.nav.personas")}
          </a>
          <a href="#security" className="transition-colors hover:text-primary">
            {t("landing.nav.security")}
          </a>
          <a href="#demo" className="transition-colors hover:text-primary">
            {t("landing.nav.demo")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleToggle />
          <a
            href="#demo"
            className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            {t("landing.nav.cta")}
          </a>
        </div>
      </div>
    </header>
  )
}
