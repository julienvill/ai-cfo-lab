export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} AI CFO Lab — Projet portfolio par Julien
          Villeret
        </p>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-primary">
            LinkedIn
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
