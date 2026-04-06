# AI CFO Lab

Plateforme d'orchestration IA pour la fonction Finance des TPE/PME françaises. Connecte les outils existants (Pennylane, Silae, Qonto...), ne les remplace pas.

Construit par **Julien Villeret** — CFO / VP Finance, 15+ ans en direction financière.

---

## Concept

> "La visibilité d'un DAF senior au prix d'un assistant comptable, avec supervision humaine experte."

AI CFO Lab est une couche intelligente au-dessus de l'écosystème comptable/paie/banque existant. L'IA automatise les processus transverses (clôture, reporting, conformité, déclarations) — l'humain garde le contrôle et la décision.

## Stack technique

| Couche | Technologie |
|--------|------------|
| Frontend | Next.js 14 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui |
| Charts | Recharts |
| Tests | Vitest · Playwright |
| Déploiement | Vercel (auto-deploy sur push main) |
| IA | Claude API (Anthropic) |
| Repo | github.com/julienvill/ai-cfo-lab |

## Structure du projet

```
AI-CFO-Lab/
├── .claude/agents/     # Agents IA (architect, dev-frontend, dev-backend, test-unit, test-e2e, reviewer)
├── ARCHITECTURE.md     # Architecture technique — connecteurs, stack, flux de données
├── DESIGN.md           # Specs design — palette, composants, conventions FP&A
├── PRD.md              # Specs fonctionnelles — 9 modules, ~50 sous-modules
├── data/               # Données démo JSON (3 entreprises fictives)
│   ├── propello/       # Startup SaaS B2B
│   ├── maison-nordique/# PME familiale distribution
│   └── mecaform/       # TPE services/industrie
└── web/                # Application Next.js
    ├── app/            # Pages (App Router)
    ├── components/     # Composants (landing, app, ui)
    ├── lib/            # Utilitaires, contextes, traductions
    └── tests/          # Tests unitaires (Vitest) et E2E (Playwright)
```

## Modules

Deux numérotations coexistent, pour deux vues différentes :

- **Vue business (ci-dessous)** : 9 modules fonctionnels, périmètre métier complet de la plateforme (cf. `PRD.md`).
- **Vue UI** : 10 entrées de navigation dans la sidebar (5 MVP actifs + 5 V2 désactivés), cf. `DESIGN.md` §3. L'ordre et le découpage UI diffèrent car il reflète l'expérience utilisateur (ex : le module business « Comptabilité » est éclaté en Factures clients O2C / Factures fournisseurs P2P / Clôture mensuelle dans l'UI).

### Vue business (9 modules)

| # | Module | Périmètre |
|---|--------|-----------|
| 1 | Daily CFO | Briefing quotidien, KPIs héro, score de santé, alertes |
| 2 | Cash Management | Trésorerie, forecast 13 semaines, banque, dette, BPI, affacturage |
| 3 | FP&A | KPIs SaaS, budget/forecast/variance, scénarios, slide deck VC |
| 4 | Comptabilité | AR, AP, paie, provisions CP, immos, clôture, FEC, facture électronique |
| 5 | RH | CSE, BDESE, admin personnel, recrutement, formation, rémunération |
| 6 | Impôts | TVA, IS, CIR, CFE/CVAE, participation/intéressement |
| 7 | Juridique | Secrétariat juridique, cap table/BSPCE, contrats, assurances |
| 8 | Audit & Compliance | Contrôle interne, relations CAC, data room, RGPD |
| 9 | Virtual CFO | Chat RAG, financial memory, predictive risk, CFO Twin |

### Mapping vers la vue UI (`DESIGN.md`)

| Business | UI (MVP)                  | UI (V2)                                    |
|----------|---------------------------|--------------------------------------------|
| 1        | Synthèse du jour          | —                                          |
| 2        | Trésorerie                | Scenario Planner                           |
| 3        | KPIs SaaS                 | Scenario Planner                           |
| 4        | Factures clients (O2C), Factures fournisseurs (P2P), Clôture mensuelle | — |
| 5        | —                         | Connecteur SIRH, Reporting CSE             |
| 6        | —                         | Crédit Impôt Recherche                     |
| 7        | —                         | —                                          |
| 8        | —                         | —                                          |
| 9        | —                         | Conseiller IA                              |

## Développement local

```bash
cd web
npm install
npm run dev          # http://localhost:3000
npm run test         # Tests unitaires (Vitest)
npm run test:e2e     # Tests E2E (Playwright)
npm run build        # Build production
```

## Principes fondamentaux

1. **Orchestration, pas remplacement** — connecte les outils existants, ne les concurrence pas
2. **Augmentation humaine** — une personne augmentée fait le travail de 3
3. **Traçabilité totale** — chaque calcul et chaque décision IA sont auditables
4. **Conformité française native** — PCG, CGI, Code du travail, RGPD, EU AI Act
5. **Séparation calcul / IA** — les chiffres sont déterministes, l'IA contextualise et recommande
