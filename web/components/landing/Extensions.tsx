const extensions = [
  {
    title: "Extension RH",
    subtitle: "Administration du personnel, simplifiée.",
    items: [
      "Administration du personnel, contrats, DPAE",
      "Temps, absences, congés, planning",
      "CSE, BDESE (131 indicateurs), index égalité F/H",
      "Recrutement, onboarding/offboarding",
      "Entretiens, formation, OPCO",
      "Rémunération, avantages, épargne salariale",
      "DUERP, santé, sécurité",
    ],
  },
  {
    title: "Extension Juridique",
    subtitle: "Le minimum légal, sans juriste dédié.",
    items: [
      "Secrétariat juridique, AG, PV, registres",
      "Cap table, BSPCE, augmentations de capital",
      "Contrats, baux, alertes d'échéances",
      "Assurances (RC Pro, D&O, cyber, homme-clé)",
    ],
  },
]

export function Extensions() {
  return (
    <section className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Dans une PME, le DAF porte aussi d&apos;autres casquettes.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Pour les structures où la même personne gère Finance, RH et
          Juridique, la plateforme couvre ces fonctions complémentaires.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {extensions.map((ext) => (
            <div
              key={ext.title}
              className="rounded-xl border border-border bg-background p-6"
            >
              <h3 className="text-lg font-bold">{ext.title}</h3>
              <p className="mt-1 text-sm text-muted">{ext.subtitle}</p>
              <ul className="mt-5 space-y-2.5">
                {ext.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-primary/80"
                  >
                    <span className="mt-0.5 text-success">✓</span>
                    {item}
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
