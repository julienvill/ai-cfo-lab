# Architecture Technique — AI CFO Lab

Dernière mise à jour : 2026-03-26

---

## Connecteurs (infrastructure transverse)

Couche d'intégration qui normalise les données depuis les systèmes externes. Chaque connecteur expose une interface unifiée indépendante du fournisseur source.

### Comptabilité / Facturation

| Connecteur | Données | Usage |
|---|---|---|
| **Pennylane** (API V2) | Plan comptable, écritures, factures, rapprochement bancaire, TVA | Comptabilité (4), Impôts (6) |
| **Sage** (Sage Business Cloud) | Grand livre, balance, écritures, facturation | Comptabilité (4), Impôts (6) |
| **Cegid** | Comptabilité générale, analytique, facturation | Comptabilité (4), Impôts (6) |

### SIRH / Paie

| Connecteur | Données | Usage |
|---|---|---|
| **Lucca** (Timmi Temps, Timmi Absences, Core RH) | Temps de travail, absences, registre du personnel, contrats | Comptabilité 4c/4d/4e (paie, CP, CSE), Impôts 5c (CIR) |
| **Silae** | Bulletins de paie, DSN, charges sociales | Comptabilité 4c (paie) |
| **PayFit** | Paie, RH, absences, effectifs | Comptabilité 4c/4d/4e (paie, CP, CSE) |

### Banque

| Connecteur | Données | Usage |
|---|---|---|
| **Bridge API** | Agrégation multi-banques, soldes, mouvements, catégorisation | Cash Management (2) |
| **Qonto** | Soldes, transactions, cartes, virements | Cash Management (2) |
| **Revolut Business** | Soldes multi-devises, transactions, cartes | Cash Management (2) |

### Paiements

| Connecteur | Données | Usage |
|---|---|---|
| **Stripe** | Revenus SaaS, abonnements, MRR, churn, invoices | FP&A 3a (KPIs SaaS), Comptabilité 4a (AR) |
| **GoCardless** | Prélèvements SEPA, mandats, échecs de paiement | Cash Management (2), Comptabilité 4a (AR) |

### Administration fiscale

| Connecteur | Données | Usage |
|---|---|---|
| **Impots.gouv** (EDI / API) | Déclarations TVA (CA3), IS, liasse fiscale, CFE/CVAE | Impôts (6) |
| **URSSAF / net-entreprises** | DSN, DPAE, cotisations sociales | Comptabilité 4c (paie), RH 5c (admin personnel) |

### Corporate / Cap table

| Connecteur | Données | Usage |
|---|---|---|
| **Ledgy** | Table de capitalisation, BSPCE/BSA/AGA, vesting, dilution | Juridique 7b (Cap table & BSPCE) |
| **Carta** | Cap table, equity plans, 409A valuations | Juridique 7b (Cap table & BSPCE) |
| **Capdesk** | Equity management, cap table, option plans | Juridique 7b (Cap table & BSPCE) |

### Greffe / Formalités

| Connecteur | Données | Usage |
|---|---|---|
| **Infogreffe** (API) | Dépôt des comptes, formalités (modification statuts, changement dirigeant), Kbis | Juridique 7a (secrétariat juridique), Audit 8d (conformité) |

### Formation

| Connecteur | Données | Usage |
|---|---|---|
| **OPCO** (portails) | Demandes de financement formation, accords, soldes | RH 5g (Formation) |

### Cloud / Infrastructure

| Connecteur | Données | Usage |
|---|---|---|
| **AWS** | Compute, stockage, services managés (S3, RDS, Lambda, SES) | Infrastructure par défaut |
| **Scaleway** | Compute, stockage objet, bases de données managées, GPU (IA) | Alternative souveraine française — hébergement des données sensibles (données personnelles, fiscales, RH) pour conformité RGPD et exigences de souveraineté |

---

## Stack technique

### Frontend

| Composant | Choix | Justification |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Standard industrie, SSR/SSG, déploiement Vercel natif |
| Langage | **TypeScript strict** | Typage, refactoring safe, standard industrie |
| CSS | **Tailwind CSS 4** | Utility-first, rapide, pas de CSS custom à maintenir |
| Composants UI | **shadcn/ui** | Composants accessibles (Radix), copiés dans le projet, zéro dépendance runtime |
| Charts | **Tremor** | Composants dashboard FP&A prêts à l'emploi, intégré Tailwind, basé sur Recharts (fallback possible) |
| Icônes | **Lucide React** | Léger, cohérent, intégré shadcn/ui |

### Backend

| Composant | Choix | Justification |
|---|---|---|
| Framework API | **FastAPI** | Standard Python API, auto-documentation OpenAPI, typage Pydantic, async natif |
| Typage données | **Pydantic v2** | Validation, sérialisation, génération schémas JSON/OpenAPI |
| Logique métier | **Python modules purs** | Calculateurs, règles fiscales/comptables — testables unitairement sans framework |
| Parsing fichiers | **pandas + openpyxl** | Excel, CSV, FEC — écosystème Python mature pour la finance |
| Package manager | **pip + requirements.txt** | Éprouvé, universel, pas de tooling supplémentaire |

### IA

| Composant | Choix | Justification |
|---|---|---|
| LLM | **Claude** (Anthropic API) | Via le backend Python |
| SDK | **anthropic** (Python) | SDK mature, tool use, streaming |

### Base de données

| Phase | Choix | Justification |
|---|---|---|
| MVP | **Fichiers JSON** | Données fictives, zéro infrastructure, versionné dans git |
| V2+ | **Vercel Postgres** | Intégré Vercel, PostgreSQL managé, simple pour un solo dev |

### Auth

| Phase | Choix | Justification |
|---|---|---|
| MVP | Aucune | Page publique + démo données fictives |
| V2+ | **Auth.js v5** (NextAuth) | Standard Next.js, gratuit, social login, magic link |

### Tests

| Composant | Choix | Justification |
|---|---|---|
| Frontend | **Vitest** | Rapide, compatible Vite/Next.js, API Jest-compatible |
| Backend | **pytest** | Standard Python |

### Communication Front ↔ Back

| Composant | Choix | Justification |
|---|---|---|
| Contrat API | **OpenAPI** (généré par FastAPI) | Spec auto-générée depuis les types Pydantic |
| Client TypeScript | **Généré depuis OpenAPI** | Client TS typé auto-généré → zéro désynchronisation front/back |

### Déploiement

| Composant | Service | Justification |
|---|---|---|
| Frontend | **Vercel** | Natif Next.js, preview deploys, CDN global |
| Backend Python | **À définir** (Railway ou Render) | PaaS simple pour FastAPI, choix différé à la phase 2 |
| MVP | **Vercel uniquement** | Pas de backend Python tant que la landing + démo suffisent |
| Prod données sensibles | **Scaleway** | RGPD, souveraineté, données personnelles/fiscales/RH |

---

## Architecture applicative

```
┌─────────────────────────────────────────┐
│           FRONTEND (TypeScript)          │
│  Next.js 14 (App Router)                │
│  Tailwind CSS 4 + shadcn/ui + Tremor    │
│  Pages, composants, charts              │
│  Déployé sur Vercel                     │
└──────────────┬──────────────────────────┘
               │ API calls (REST / OpenAPI)
               ▼
┌─────────────────────────────────────────┐
│           BACKEND (Python)               │
│  FastAPI + Pydantic v2                   │
│  Routers par domaine métier              │
│  Appelle les calculators + connecteurs   │
│  Appelle Claude API (IA)                 │
│  Déployé sur Railway (puis Scaleway)     │
└──────────────┬──────────────────────────┘
               │ imports
               ▼
┌─────────────────────────────────────────┐
│        LOGIQUE MÉTIER (Python)           │
│  lib/calculators/ — calculs déterministes│
│  lib/connectors/  — intégrations externes│
│  lib/ai/          — prompts, RAG, Claude │
│  Testable unitairement avec pytest       │
└─────────────────────────────────────────┘
```

---

## Structure du projet

```
AI-CFO-Lab/
├── web/                          ← Next.js 14 (frontend)
│   ├── app/                      ← App Router (pages, layouts)
│   ├── components/               ← Composants React
│   ├── lib/                      ← Utilitaires TypeScript
│   └── public/                   ← Assets statiques
│
├── api/                          ← FastAPI (backend Python) — ajouté en phase 2
│   ├── main.py                   ← Point d'entrée FastAPI
│   ├── routers/                  ← Routes par domaine
│   └── dependencies.py           ← Injection de dépendances
│
├── lib/                          ← Logique métier Python (partagée)
│   ├── calculators/              ← Calculs déterministes
│   │   ├── accounting/           ← Clôture, écritures, balance
│   │   ├── tax/                  ← TVA, IS, CIR
│   │   ├── hr/                   ← CSE, BDESE, paie
│   │   └── fpa/                  ← Trésorerie, runway, KPIs SaaS
│   ├── connectors/               ← Intégrations externes
│   └── ai/                       ← Client Claude, prompts, RAG
│
├── data/                         ← Datasets fictifs JSON (MVP)
│
├── docs/                         ← Documentation
│   ├── PRD.md
│   ├── DESIGN.md
│   ├── ARCHITECTURE.md
│   └── COMPANIES.md
│
├── README.md
└── PROJECT.md
```

---

## Phasage technique

| Phase | Ce qui est déployé | Stack active |
|---|---|---|
| **MVP** | Page d'accueil + démo (données fictives) | Next.js 14 + JSON → Vercel |
| **Phase 2** | Premiers modules fonctionnels (Daily CFO, Cash) | + FastAPI + lib/calculators → Railway/Render |
| **Phase 3** | Auth, données persistantes, connecteurs réels | + Vercel Postgres + Auth.js v5 |
| **Phase 4** | Virtual CFO (chat, RAG) | + Claude API + embeddings |
| **Prod** | Données sensibles réelles | Migration données sensibles → Scaleway |
