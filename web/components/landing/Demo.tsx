const companies = [
  {
    name: "NovaTech SAS",
    type: "Startup SaaS B2B",
    employees: "32 salariés",
    revenue: "2,4 M€ ARR",
  },
  {
    name: "Maison Lefèvre",
    type: "PME familiale — distribution",
    employees: "67 salariés",
    revenue: "8,1 M€ CA",
  },
  {
    name: "UrbanGreen",
    type: "TPE — services",
    employees: "8 salariés",
    revenue: "620 K€ CA",
  },
]

export function Demo() {
  return (
    <section id="demo" className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Voyez par vous-même.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Choisissez une entreprise fictive et explorez la plateforme avec des
          données réalistes. Sans inscription.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {companies.map((c) => (
            <button
              key={c.name}
              className="group rounded-xl border border-border bg-surface p-6 text-left shadow-card transition-all hover:border-accent hover:shadow-card-hover"
            >
              <h3 className="text-lg font-bold group-hover:text-accent">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{c.type}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{c.employees}</span>
                <span className="font-semibold text-primary">{c.revenue}</span>
              </div>
              <div className="mt-4 text-center text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Explorer →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
