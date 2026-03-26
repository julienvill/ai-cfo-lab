import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Connectors } from "@/components/landing/Connectors"
import { Problem } from "@/components/landing/Problem"
import { Solution } from "@/components/landing/Solution"
import { Extensions } from "@/components/landing/Extensions"
import { Comparison } from "@/components/landing/Comparison"
import { Personas } from "@/components/landing/Personas"
import { Security } from "@/components/landing/Security"
import { Demo } from "@/components/landing/Demo"
import { CTA } from "@/components/landing/CTA"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Connectors />
        <Problem />
        <div id="solution">
          <Solution />
        </div>
        <Extensions />
        <Comparison />
        <div id="personas">
          <Personas />
        </div>
        <div id="security">
          <Security />
        </div>
        <Demo />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
