const rows = [
  {
    label: "Visibilité",
    before: "Chiffres 1x/mois (au mieux). Expert-comptable 1x/an.",
    after: "Briefing quotidien. KPIs temps réel.",
  },
  {
    label: "Clôture",
    before: "15-20 jours. Mails, Excel, allers-retours.",
    after: "8 jours. Automatisée, bloc par bloc.",
  },
  {
    label: "Déclarations",
    before: "Manuelles, stress des échéances.",
    after: "Pré-remplies, vous validez en un clic.",
  },
  {
    label: "Trésorerie",
    before: "Vérifiée sur le site de la banque.",
    after: "Cash forecast 13 semaines, alertes de seuil.",
  },
  {
    label: "Questions financières",
    before: "Attendre le prochain RDV avec le comptable.",
    after: "Réponse instantanée du Virtual CFO.",
  },
  {
    label: "Outils",
    before: "5 outils qui ne se parlent pas.",
    after: "Une plateforme qui les connecte tous.",
  },
]

export function Comparison() {
  return (
    <section className="bg-background px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Avant / Avec AI CFO Lab
        </h2>

        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border bg-background text-sm font-semibold">
            <div className="p-4" />
            <div className="border-l border-border p-4 text-critical/80">
              Avant
            </div>
            <div className="border-l border-border p-4 text-success">
              Avec AI CFO Lab
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_1fr_1fr] text-sm ${
                i < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-4 font-semibold">{row.label}</div>
              <div className="border-l border-border p-4 text-muted">
                {row.before}
              </div>
              <div className="border-l border-border bg-success-bg/50 p-4 font-medium text-primary/90">
                {row.after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
