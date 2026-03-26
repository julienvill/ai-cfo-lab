# AI CFO Lab — Project Brief

## Vision

Une plateforme de démonstration qui prouve la valeur d'une **équipe Finance AI as a Service**.

L'objectif n'est pas de vendre un SaaS — c'est de convaincre un CEO de PME ou startup tech qu'une équipe AI peut remplacer ou augmenter son équipe financière, pour le prix d'un assistant comptable avec la visibilité d'un DAF senior.

> "Votre équipe finance AI vous donne la visibilité d'un DAF senior à temps plein, pour le prix d'un assistant comptable — avec un humain expert qui supervise et engage sa responsabilité."

---

## Business Model

**Prestation.** La démo est l'outil de vente principal. À terme : équipe Finance AI as a Service.

---

## Persona cible

**CEO de PME ou startup tech**
- 10 à 500 salariés
- Sans DAF interne
- Manque de visibilité financière
- Veut des insights actionnables immédiatement
- France / Europe

---

## Équipe projet (agents AI)

| Rôle | Périmètre |
|------|-----------|
| **Product Designer** | Roadmap features, UX, moments de démo |
| **Finance Expert** | KPIs, compliance, standards de reporting |
| **Legal & Ethics** | RGPD, souveraineté, AI Act |
| **Orchestrateur (Claude)** | Coordination, synthèses, reporting |

---

## Décisions & arbitrages actés

| Sujet | Décision |
|-------|---------|
| Autonomie AI | Conseil uniquement — l'humain reste décisionnaire |
| Hébergement | Vercel |
| Données démo | 3 datasets 100% fictifs (aucune donnée réelle client) |
| Legal | Pas d'avocat dans l'immédiat — produit d'abord |
| Stack | Next.js 14, TypeScript, Tailwind CSS v4, shadcn/ui |

---

## Contraintes non négociables

1. Toute donnée chiffrée produite par l'AI doit être traçable jusqu'à sa source
2. L'AI ne prend aucune décision autonome — elle prépare, alerte, recommande
3. Les données de démo sont 100% fictives
4. Audit trail complet sur toutes les actions et recommandations AI

---

## Positionnement concurrentiel

Différenciation directe face aux outils américains (QuickBooks, Brex, Ramp) :
- Hébergement européen (pas d'exposition CLOUD Act)
- Conformité RGPD native, pas en option
- AI explicable et traçable, pas une boîte noire
- Humain superviseur engageant sa responsabilité

---

## 3 moments clés de la démo

1. **La question brûlante** — Le CEO tape lui-même sa question financière la plus urgente dans le Conseiller Financier IA et reçoit une réponse chiffrée en 10 secondes (feature H2)
2. **Le chiffre invisible** — Le Pilotage de Trésorerie révèle un coût anodin qui raccourcit le runway de 3 semaines — que le CEO n'avait pas vu
3. **Le rapport en 45 secondes** — L'Investor Report Generator produit un board pack complet en direct (feature H2)

---

## Stack technique

```
Framework :   Next.js 14 (App Router)
Langage :     TypeScript
Styling :     Tailwind CSS v4 + shadcn/ui
Déploiement : Vercel (auto-deploy sur push main)
AI :          Anthropic Claude (API)
Repo :        github.com/julienvill/v0-ai-cfo-portfolio
```

---

## Structure du projet

```
AI-CFO-Lab/
├── v0-ai-cfo-portfolio/   # Hub — Next.js portfolio & launcher
├── payroll/               # ✅ Live — Payroll variance analysis (Streamlit)
├── rd-tax-credit/         # 🚧 Planifié — R&D Tax Credit assistant
├── cashflow/              # 🚧 Planifié — Cash flow forecasting
├── slide-deck/            # 🚧 Planifié — Investor reporting automation
├── month-end-close/       # 🚧 Planifié — Month-end close tracker
├── saas-metrics/          # 🚧 Planifié — SaaS KPI dashboard
└── data-room/             # 🚧 Planifié — AI-generated investor data room
```
