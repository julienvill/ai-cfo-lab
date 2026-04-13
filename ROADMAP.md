# Roadmap — AI CFO Lab

Derniere mise a jour : 2026-04-11

---

## Phases

### MVP (V1)

Objectif : plateforme fonctionnelle avec donnees demo, couvrant les fondamentaux finance + comptabilite.

**Stack** : Next.js 16 + donnees JSON fictives → deploye sur Vercel.

| Module | Sous-modules MVP |
|---|---|
| Daily CFO | Briefing quotidien |
| Cash Management | 2a Cash Forecast, 2b Banque, 2c Dette |
| Reports | 3a KPIs, 3b Budget/Forecast, 3d Reporting board |
| Comptabilite | 4a AR, 4b AP, 4c Paie, 4d Provisions CP, 4e Immos, 4g Cloture, 4h Etats financiers, 4j FEC |
| RH | 5b BDESE, 5c Admin personnel, 5f Temps & absences |
| Impots | 6a TVA, 6d IS |
| Juridique | 7a Secretariat juridique, 7b Cap table, 7c Contrats |

**Donnees demo** : Propello (SaaS ~25 sal.), Mecaform (industrie ~80 sal.), Maison Nordique (e-commerce ~15 sal.)

---

### V2

Objectif : modules avances, premiers connecteurs reels, backend Python.

**Stack** : + FastAPI + lib/calculators → Railway/Render. + Vercel Postgres + Auth.js v5.

| Module | Sous-modules V2 |
|---|---|
| Cash Management | 2d BPI France, 2e Affacturage |
| Reports | 3c Scenario Planner, 3e Analytique |
| Comptabilite | 4f Notes de frais, 4i Facturation electronique, 4k Mapping PCG/Groupe |
| RH | 5a CSE, 5d Recrutement, 5e Onboarding, 5g Formation, 5h Entretiens, 5i Remuneration, 5j Index egalite |
| Impots | 6b CFE/CVAE, 6c CIR, 6e Participation |
| Juridique | 7d Assurances |
| Audit | 8a Controle interne, 8b CAC, 8c Data Room, 8d Conformite, 8e Moteur regles |

**Connecteurs V2** : Pennylane, Silae, Qonto, Bridge API, Lucca, Stripe, Impots.gouv

---

### V3

Objectif : modules avances, IA generative, donnees reelles.

**Stack** : + Claude API + embeddings. Migration donnees sensibles → Scaleway.

| Module | Sous-modules V3 |
|---|---|
| Cash Management | 2f Cash pooling |
| Reports | 3f Pricing & rentabilite |
| RH | 5k Sante & DUERP |
| Impots | 6f Preparation controle fiscal |
| Juridique | 7e Contentieux |
| Audit | 8f Cybersecurite |
| Virtual CFO | 9a Chat RAG, 9b Financial Memory, 9c Predictive Risk, 9d Autonomous Actions, 9e CFO Twin |

---

## Dependances critiques entre modules

```
Cash Forecast (2a) ← AR (4a) + AP (4b) + Paie (4c) + Dette (2c) + Impots (6a/6d)
Cloture (4g)       ← AR (4a) + AP (4b) + Paie (4c) + Provisions CP (4d) + Immos (4e) + TVA (6a)
CIR (6c)           ← Paie (4c) + Immos (4e) + Temps (5f) + Contrats (7c)
IS (6d)            ← Cloture (4g) + Etats financiers (4h) + CIR (6c)
Mapping (4k)       ← FEC (4j)
Reports board (3d) ← KPIs (3a) + Budget (3b) + Cash (2a) + Cloture (4g) + Paie (4c)
BDESE (5b)         ← Paie (4c) + Admin personnel (5c) + Temps (5f)
Daily CFO (1)      ← Tous les modules
```

---

## Timeline estimee

| Phase | Periode | Focus |
|---|---|---|
| MVP | En cours | Landing page + demo donnees fictives + modules core |
| V2 | Post-MVP | Connecteurs reels + modules avances + auth |
| V3 | Post-V2 | Virtual CFO + IA avancee + donnees reelles |

Note : pas d'estimation de dates — avancement au rythme du developpement solo.
