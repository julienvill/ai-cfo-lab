const pains = [
  {
    quote: "Je n'ai aucune visibilité sur ma tréso",
    detail:
      "Vous découvrez les problèmes de cash quand il est trop tard. Votre expert-comptable vous donne des chiffres une fois par an.",
  },
  {
    quote: "Ma clôture prend 3 semaines",
    detail:
      "Rapprochements manuels, écritures de cut-off oubliées, allers-retours avec le comptable.",
  },
  {
    quote: "Je passe mon temps sur l'admin au lieu de piloter",
    detail:
      "Déclarations TVA, relances fournisseurs, bulletins de paie — l'opérationnel dévore le stratégique.",
  },
  {
    quote: "J'ai 5 outils qui ne se parlent pas",
    detail:
      "Pennylane d'un côté, Qonto de l'autre, Silae encore ailleurs. Aucune vue consolidée.",
  },
]

export function Problem() {
  return (
    <section className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Vous reconnaissez-vous ?
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {pains.map((pain) => (
            <div
              key={pain.quote}
              className="rounded-xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <p className="text-lg font-bold text-critical">
                &ldquo;{pain.quote}&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pain.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
