import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI CFO Lab — Votre DAF virtuel",
  description:
    "Plateforme d'orchestration IA pour DAF et dirigeants de TPE, PME et startups françaises. Connecte vos outils financiers, automatise vos opérations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
