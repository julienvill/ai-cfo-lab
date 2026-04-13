# Modules — AI CFO Lab

Index de tous les modules de la plateforme.

Derniere mise a jour : 2026-04-11

---

## Modules applicatifs

| # | Module | Route | Sous-modules | Statut | Priorite | SPEC |
|---|--------|-------|--------------|--------|----------|------|
| 1 | Daily CFO | `synthese` | — | Spec | MVP | Dans PRD.md |
| 2 | Cash Management | `tresorerie` | 2a-2f (6) | Spec | MVP | [`tresorerie/SPEC.md`](web/app/app/tresorerie/SPEC.md) |
| 3 | Reports (ex-FP&A) | `reports` | 3a-3f (6) | Spec | MVP | [`reports/SPEC.md`](web/app/app/reports/SPEC.md) |
| 4 | Comptabilite | `comptabilite` | 4a-4k (11) | Spec | MVP | [`comptabilite/SPEC.md`](web/app/app/comptabilite/SPEC.md) |
| 5 | RH | `rh` | 5a-5k (11) | Spec | MVP | [`rh/SPEC.md`](web/app/app/rh/SPEC.md) |
| 6 | Impots | `impots` | 6a-6f (6) | Spec | MVP | [`impots/SPEC.md`](web/app/app/impots/SPEC.md) |
| 7 | Juridique / Corporate | `juridique` | 7a-7e (5) | Spec | MVP | [`juridique/SPEC.md`](web/app/app/juridique/SPEC.md) |
| 8 | Audit & Compliance | `audit` | 8a-8f (6) | Spec | V2 | A creer |
| 9 | Virtual CFO | `virtual-cfo` | 9a-9e (5) | Spec | V3 | A creer |

**Total** : 9 modules, 56 sous-modules.

---

## Sous-modules avec spec detaillee

Certains sous-modules ont leur propre SPEC.md en complement de la spec module :

| Sous-module | Spec detaillee | Module parent |
|---|---|---|
| 6c — CIR (Credit Impot Recherche) | [`impots/cir/SPEC.md`](web/app/app/impots/cir/SPEC.md) | Impots |
| 4k — Mapping PCG / Groupe | [`comptabilite/mapping-groupe/SPEC.md`](web/app/app/comptabilite/mapping-groupe/SPEC.md) | Comptabilite |

---

## Detail des sous-modules par module

### Module 2 — Cash Management

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 2a | Cash Forecast | `tresorerie` | MVP |
| 2b | Banque | `rapprochement-bancaire` | MVP |
| 2c | Dette & emprunts | `dette` | MVP |
| 2d | Relations BPI France | — | V2 |
| 2e | Affacturage / Dailly | — | V2 |
| 2f | Cash pooling | — | V3 |

### Module 3 — Reports (ex-FP&A)

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 3a | KPIs & Tableaux de bord | `kpis-saas` | MVP |
| 3b | Budget, Forecast & Variance | `budget` | MVP |
| 3c | Scenario Planner | `scenarios` | V2 |
| 3d | Reporting investisseurs & board | `reporting` | MVP |
| 3e | Comptabilite analytique | `analytique` | V2 |
| 3f | Pricing & rentabilite | — | V3 |

### Module 4 — Comptabilite

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 4a | AR (Accounts Receivable) | `factures` | MVP |
| 4b | AP (Accounts Payable) | `comptabilite` | MVP |
| 4c | Paie & charges sociales | `paie` | MVP |
| 4d | Provisions conges payes | `provisions-cp` | MVP |
| 4e | Immobilisations & amortissements | `immobilisations` | MVP |
| 4f | Notes de frais | `notes-de-frais` | V2 |
| 4g | Cloture mensuelle | `cloture` | MVP |
| 4h | Etats financiers annuels | `etats-financiers` | MVP |
| 4i | Facturation electronique | `facturation-electronique` | V2 |
| 4j | FEC | `fec` | MVP |
| 4k | Mapping PCG / Groupe | `comptabilite/mapping-groupe` | V2 |

### Module 5 — RH

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 5a | CSE | — | V2 |
| 5b | BDESE | — | MVP |
| 5c | Admin personnel | — | MVP |
| 5d | Recrutement | — | V2 |
| 5e | Onboarding / Offboarding | — | V2 |
| 5f | Temps & absences | — | MVP |
| 5g | Formation | — | V2 |
| 5h | Entretiens annuels | — | V2 |
| 5i | Remuneration & avantages | — | V2 |
| 5j | Index egalite F/H | — | V2 |
| 5k | Sante, securite & DUERP | — | V3 |

### Module 6 — Impots

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 6a | TVA | `impots/tva` | MVP |
| 6b | CFE / CVAE | `impots/cfe-cvae` | V2 |
| 6c | CIR | `impots/cir` | V2 |
| 6d | IS | `impots/is` | MVP |
| 6e | Participation / Interessement | `impots/participation` | V2 |
| 6f | Preparation controle fiscal | — | V3 |

### Module 7 — Juridique / Corporate

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 7a | Secretariat juridique | — | MVP |
| 7b | Cap table & BSPCE | — | MVP |
| 7c | Contrats & baux | — | MVP |
| 7d | Assurances | — | V2 |
| 7e | Contentieux & recouvrement | — | V3 |

### Module 8 — Audit & Compliance

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 8a | Controle interne | `audit/controle-interne` | V2 |
| 8b | Relations CAC | `audit/cac` | V2 |
| 8c | Data Room | `audit/dataroom` | V2 |
| 8d | Conformite & RGPD | `audit/conformite` | V2 |
| 8e | Moteur de regles | `audit/regles` | V2 |
| 8f | Cybersecurite | `audit/securite` | V3 |

### Module 9 — Virtual CFO

| # | Sous-module | Route | Priorite |
|---|---|---|---|
| 9a | Chat RAG | `virtual-cfo` | V3 |
| 9b | Financial Memory | — | V3 |
| 9c | Predictive Risk | — | V3 |
| 9d | Autonomous Actions | — | V3 |
| 9e | CFO Twin | — | V3 |
