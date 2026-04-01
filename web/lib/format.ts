/** Format a number as French currency: 1 234 567 € */
export function formatCurrency(value: number, options?: { compact?: boolean; decimals?: number }): string {
  const compact = options?.compact ?? false
  const decimals = options?.decimals

  if (compact) {
    const abs = Math.abs(value)
    if (abs >= 1_000_000) {
      const formatted = (value / 1_000_000).toFixed(1).replace(".", ",")
      return `${formatted}\u00A0M€`
    }
    if (abs >= 1_000) {
      const formatted = Math.round(value / 1_000)
      return `${formatted}\u00A0K€`
    }
  }

  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 0,
  }).format(value)

  return formatted
}

/** Format a number as French percentage: +12,3 % */
export function formatPercent(value: number, options?: { showSign?: boolean; decimals?: number }): string {
  const showSign = options?.showSign ?? false
  const decimals = options?.decimals ?? 1
  const sign = showSign && value > 0 ? "+" : ""
  const formatted = value.toFixed(decimals).replace(".", ",")
  return `${sign}${formatted}\u00A0%`
}

/** Format a number with French thousands separator */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** Format a variation as colored badge text */
export function formatVariation(pct: number | null): { text: string; color: "green" | "red" | "gray" } {
  if (pct === null) return { text: "—", color: "gray" }
  const text = formatPercent(pct, { showSign: true })
  return {
    text,
    color: pct >= 0 ? "green" : "red",
  }
}

/** Format negative numbers in parentheses: (1 234) */
export function formatNegative(value: number, compact = false): string {
  if (value >= 0) return formatCurrency(value, { compact })
  return `(${formatCurrency(Math.abs(value), { compact })})`
}

/** Format period: "2025-12" → "déc. 2025" */
export function formatPeriod(period: string, locale: "fr" | "en" = "fr"): string {
  const [year, month] = period.split("-")
  const monthsFr = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const months = locale === "fr" ? monthsFr : monthsEn
  const idx = parseInt(month) - 1
  return `${months[idx]} ${year}`
}

/** Format period short: "2025-12" → "déc." */
export function formatPeriodShort(period: string, locale: "fr" | "en" = "fr"): string {
  const month = period.split("-")[1]
  const monthsFr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
  const monthsEn = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
  const months = locale === "fr" ? monthsFr : monthsEn
  const idx = parseInt(month) - 1
  return months[idx]
}

/** Format runway: "12,6 mois" */
export function formatRunway(months: number | null, locale: "fr" | "en" = "fr"): string {
  if (months === null) return "—"
  const label = locale === "fr" ? "mois" : "mo."
  return `${months.toFixed(1).replace(".", ",")}\u00A0${label}`
}
