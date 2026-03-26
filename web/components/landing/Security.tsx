const badges = [
  { label: "RGPD", icon: "🛡️" },
  { label: "Hébergement France", icon: "🇫🇷" },
  { label: "Scaleway", icon: "☁️" },
  { label: "AES-256", icon: "🔒" },
]

const features = [
  {
    title: "Hébergement souverain",
    description:
      "Données sensibles hébergées en France (Scaleway). Conformité RGPD native.",
  },
  {
    title: "Chiffrement",
    description: "AES-256 au repos, TLS 1.3 en transit.",
  },
  {
    title: "Traçabilité",
    description:
      "Chaque action IA est loggée et auditable. Piste d'audit fiable.",
  },
  {
    title: "Séparation calcul / IA",
    description:
      "Les chiffres sont déterministes. L'IA contextualise mais ne calcule jamais.",
  },
]

export function Security() {
  return (
    <section className="bg-primary px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          Vos données financières méritent le plus haut niveau de protection.
        </h2>

        {/* Badges */}
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

        {/* Features grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
