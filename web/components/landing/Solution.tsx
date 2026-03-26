const blocks = [
  {
    title: "Virtual CFO",
    subtitle: "Votre DAF virtuel, disponible 24/7",
    description:
      "Posez n'importe quelle question financière en langage naturel. Le Virtual CFO interroge toutes vos données, répond avec des sources traçables, et anticipe les risques avant qu'ils ne deviennent des crises.",
    features: [
      "Réponse instantanée avec source",
      "Mémoire de chaque clôture et décision",
      "Alerte proactive à 90 jours",
    ],
    hero: true,
    ai: true,
  },
  {
    title: "Daily CFO",
    subtitle: "Chaque matin, votre briefing financier.",
    description:
      "Cash disponible, alertes, actions recommandées, score de santé — tout ce que vous devez savoir en 30 secondes.",
    features: [],
    hero: false,
    ai: true,
  },
  {
    title: "Pilotage financier",
    subtitle: "Trésorerie, budget, KPIs — pilotez en temps réel.",
    description:
      "Cash forecast 13 semaines, runway, budget vs actuals, KPIs SaaS, scenario planning, board pack investisseurs.",
    features: [],
    hero: false,
    ai: false,
  },
  {
    title: "Comptabilité automatisée",
    subtitle: "Votre comptabilité tourne. Vous ne validez que l'essentiel.",
    description:
      "Facturation, fournisseurs, paie, clôture mensuelle en 8 jours, déclarations fiscales pré-remplies, états financiers annuels.",
    features: [],
    hero: false,
    ai: false,
  },
  {
    title: "Audit & conformité",
    subtitle: "Toujours prêt pour un audit.",
    description:
      "Contrôle interne automatisé, dossier CAC pré-constitué, data room peuplée en continu, conformité RGPD et piste d'audit fiable.",
    features: [],
    hero: false,
    ai: false,
  },
]

export function Solution() {
  return (
    <section className="bg-background px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Une plateforme. Toute votre finance.
        </h2>

        <div className="mt-14 space-y-6">
          {/* Hero block — Virtual CFO */}
          {blocks
            .filter((b) => b.hero)
            .map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border-2 border-ai-border/40 bg-surface p-8 shadow-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ai-bg px-3 py-1 text-xs font-semibold text-ai">
                    ✦ IA
                  </span>
                  <h3 className="text-2xl font-bold">{block.title}</h3>
                </div>
                <p className="mt-2 text-lg font-medium text-primary/80">
                  {block.subtitle}
                </p>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                  {block.description}
                </p>
                {block.features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {block.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-primary/80"
                      >
                        <span className="mt-0.5 text-accent">→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          {/* Grid of other blocks */}
          <div className="grid gap-6 sm:grid-cols-2">
            {blocks
              .filter((b) => !b.hero)
              .map((block) => (
                <div
                  key={block.title}
                  className="rounded-xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="flex items-center gap-2">
                    {block.ai && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ai-bg px-2.5 py-0.5 text-[11px] font-semibold text-ai">
                        ✦ IA
                      </span>
                    )}
                    <h3 className="text-lg font-bold">{block.title}</h3>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary/70">
                    {block.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {block.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
