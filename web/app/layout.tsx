import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { LocaleProvider } from "@/lib/locale-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

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
    <html lang="fr" className={cn(inter.variable, jetbrainsMono.variable)}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
