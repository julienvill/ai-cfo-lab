const personas = [
  {
    title: "Dirigeant de TPE",
    pain: "Pas de DAF. Zéro visibilité financière entre les RDV annuels avec l'expert-comptable.",
    solution:
      "Un DAF virtuel chaque matin. Compta automatisée. Expert-comptable pour la validation.",
  },
  {
    title: "DAF de PME",
    pain: "Submergé par la clôture, les déclarations, la paie, le CSE. Zéro temps pour le pilotage.",
    solution:
      "L'opérationnel tourne seul. Le DAF pilote la stratégie et la croissance.",
  },
  {
    title: "Fondateur de startup",
    pain: "Finance entre deux meetings. Déclarations en retard. Pas de board pack.",
    solution:
      "Brief quotidien. Clôture automatisée. Board pack en un clic. KPIs investisseurs temps réel.",
  },
  {
    title: "DAF externalisé",
    pain: "Jongle entre 5 clients. Temps perdu à collecter les données et faire des reportings manuels.",
    solution:
      "La plateforme collecte et automatise. Le consultant fait du conseil à haute valeur.",
  },
]

export function Personas() {
  return (
    <section className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Conçu pour ceux qui font tourner l&apos;entreprise.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {personas.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-3 text-sm text-critical/80">
                {p.pain}
              </p>
              <div className="mt-auto pt-4">
                <div className="rounded-lg bg-success-bg p-3">
                  <p className="text-sm font-medium text-primary/90">
                    {p.solution}
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
