# Liste des fichiers démo à créer — Finance Drive cases

Pour enrichir les 3 entreprises démo AI CFO Lab (Propello SaaS, Maison Nordique e-commerce, Mécaform industrie) avec des processus Finance observés.

Voir `finance-drive-taxonomy.md` et `finance-drive-prd-enrichments.md` pour le contexte métier.

**Référentiel cible** : `/Users/julien/Dev/AI-CFO-Lab/platform/data/{entreprise}/`

---

## Légende

| Priorité | Signification |
|---|---|
| **P1** | Essentiel pour démo crédible des modules FP&A core (V1/V2) |
| **P2** | Nécessaire pour démos avancées (financement, forecast multi-scénario) |
| **P3** | Enrichissement ultérieur (niche, cas particuliers) |

| Portée | Signification |
|---|---|
| **3 entités** | Propello + Maison Nordique + Mécaform |
| **Propello seul** | Cas SaaS / R&D éligible CIR |
| **Maison Nordique seul** | Cas e-commerce / saisonnalité Q4 |
| **Mécaform seul** | Cas PME industrielle / BFR long / CAPEX |
| **Groupe** | Financement structuré avancé |

---

## 1. Fichiers liés au Budget (Module 3b)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 1 | `budget-2025.json` | 3 entités | **P1** | Budget P&L détaillé par fonction (ventes, R&D, opérations, admin, COGS). Hypothèses : croissance CA, augmentations, capex. Bilan prévisionnel et trésorerie dérivés. |
| 2 | `budget-vs-actuals-2025-montage.json` | 3 entités | **P2** | Variance mensuels 2025 : budget vs réalisé par ligne. Écarts commentés. Mise à jour hypothèses. |

---

## 2. Fichiers liés aux Prévisions & Scénarios (Module 3c)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 3 | `forecast-scenarios-2025-2027.json` | 3 entités | **P1** | 3-5 ans prévisions. Scénarios : Base (défaut), Upside (croissance +50%), Downside (risque -20%). Hypothèses par scénario. |
| 4 | `forecast-revisions-history-2025.json` | 3 entités | **P2** | Historique révisions Q1/Q2/Q3/Q4 2025 : snapshots hypothèses + écarts vs dernière révision. |
| 5 | `forecast-exports-by-destinataire-2025.json` | 3 entités | **P2** | Versions générées : exec (tous metrics), lenders (cash focus, debt coverage), investors (croissance, MOIC), opérationnel (tréso 13w). |

---

## 3. Fichiers liés à la Trésorerie détaillée (Module 3a/2)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 6 | `cash-forecast-13w-2025.json` | 3 entités | **P1** | Prévisions trésorerie semaine par semaine (13 semaines glissantes). Entrées (ventes, financements), sorties (achats, paie, dettes). Position nette hebdo. |
| 7 | `treasury-multi-bank-consolidation-2025.json` | 3 entités | **P1** | Consolidation comptes multiples (comptes opérationnel, compte d'épargne, compte crédit si applicable). Nets, alertes seuils liquidité. |

---

## 4. Fichiers liés au Financement structuré (Module 2h)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 8 | `bpi-financing-dossier-2024.json` | Propello + Maison Nordique | **P2** | Dossier de financement structuré : type dispositif, documents requis checklist, plan tréso attaché, table capitalisation, questionnaire KYC, notifications tracking. |
| 9 | `aides-publiques-historique-2024.json` | 3 entités | **P2** | Aide reçues / en cours : JEI, CIR, subventions région, crédits d'impôt, montants, dépôts, rembour. |
| 10 | `lender-reporting-covenant-2025.json` | Propello + Maison Nordique | **P2** | Rapports lender obligatoires : P&L vs prévisions, covenants (ratio dette, interest coverage), événements, alertes si dépassements. |

---

## 5. Fichiers liés au suivi Emprunts enrichi (Module 2c enrichi)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 11 | `debt-schedule-consolidated-2025.json` | 3 entités | **P1** | Consolidation toutes dettes : par ligne (banque, montant, date), solde dû, intérêts restants, assurance, covenants si applicable. |
| 12 | `covenant-monitoring-2025.json` | Propello + Maison Nordique | **P2** | Monitoring continu ratios endettement, interest coverage. Alertes si seuils franchis. |
| 13 | `early-repayment-scenario-2025.json` | Mécaform ou l'une des autres | **P3** | Simulation remboursement anticipé : économie intérêts, impact tréso, justification économique. |

---

## 6. Fichiers liés au Time Tracking & Cost Allocation (Module 4o)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 14 | `time-sheets-monthly-2025.json` | Propello seul | **P2** | Feuilles de temps mensuels 2025 : par employé, par projet (R&D, vente, production, admin), par activité. % allocation. |
| 15 | `cost-allocation-by-project-2025.json` | Propello seul | **P2** | Coûts réels alloués par projet : salaires + charges selon % temps. Comparaison budget vs réalisé. Tendances. |
| 16 | `time-cost-analytics-2025.json` | Propello seul | **P2** | Analytics coûts : par centre de coûts, par activité, par personne. KPIs (coût/jour, % allocation, productivité). |

---

## 7. Fichiers liés au CIR enrichi (Module 6c enrichi)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 17 | `cir-project-files-2025.json` | Propello seul | **P1** | Fiches projets R&D 2025 : état de l'art, verrous techniques, travaux menés, équipe impliquée, durée. |
| 18 | `cir-time-allocation-2025.json` | Propello seul | **P1** | Allocation temps R&D vs non-R&D par personne/mois. Justification pour assiette éligible. |
| 19 | `cir-form-2069-a-sd-2025.json` | Propello seul | **P2** | Pré-remplissage formulaire 2069-A-SD : assiette (coûts salaires), forfait 43%, amortissement biens R&D, total crédit, déclaration. |
| 20 | `cir-audit-trail-2025.json` | Propello seul | **P3** | Audit trail CIR : factures cabinet conseil audit, rapports vérification, échanges avec prestataire, historique dépôts antérieurs. |

---

## 8. Fichiers liés à la Clôture itérative (Module 4g enrichi)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 21 | `closing-versions-iterations-2024-12.json` | 3 entités | **P2** | Versions itératives clôture 2024 : snapshots WiP, draft, sent to audit, approved. Statuts, approbations, dates. |
| 22 | `closing-approvals-workflow-2024-12.json` | 3 entités | **P2** | Workflow approbations : audit approval, finance approval, VC/lender approval (si applicable). Signataires, dates. |

---

## 9. Fichiers liés aux Impôts (divers modules)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 23 | `tax-calendar-2025.json` | 3 entités | **P3** | Calendrier obligations fiscales : TVA (mensuels), CIR (annuel), IS (annuel), paie (mensuels). Alertes deadlines. |

---

## 10. Fichiers liés au Reporting Exécutif (Module 3 enrichi)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 24 | `exec-dashboard-kpi-2025-monthly.json` | 3 entités | **P2** | KPIs mensuels 2025 : CA, EBITDA, margin, DSO, burn rate (si SaaS), runway, cash position, principales anomalies. |
| 25 | `board-pack-template-2025.json` | 3 entités | **P3** | Template board pack : executive summary, P&L highlights, KPI trends, risks/opportunities, financial forecast, capital needs. |

---

## 11. Plan de production recommandé

### Sprint 1 — Budget & Forecast (P1, ~4 fichiers)

1. `budget-2025.json` (3 entités) — template de base
2. `forecast-scenarios-2025-2027.json` (3 entités)
3. `cash-forecast-13w-2025.json` (3 entités)
4. `treasury-multi-bank-consolidation-2025.json` (3 entités)

### Sprint 2 — Financement & Emprunts (P1-P2, ~5 fichiers)

5. `debt-schedule-consolidated-2025.json` (3 entités)
6. `bpi-financing-dossier-2024.json` (Propello, Maison Nordique)
7. `aides-publiques-historique-2024.json` (3 entités)
8. `lender-reporting-covenant-2025.json` (Propello, Maison Nordique)
9. `cir-project-files-2025.json` (Propello)

### Sprint 3 — CIR & Analytics (P1-P2, ~4 fichiers)

10. `cir-time-allocation-2025.json` (Propello)
11. `cost-allocation-by-project-2025.json` (Propello)
12. `cir-form-2069-a-sd-2025.json` (Propello)
13. `exec-dashboard-kpi-2025-monthly.json` (3 entités)

### Sprint 4 — Clôture & Audit (P2, ~3 fichiers)

14. `closing-versions-iterations-2024-12.json` (3 entités)
15. `closing-approvals-workflow-2024-12.json` (3 entités)
16. `cir-audit-trail-2025.json` (Propello)

**Total Sprint V1 : ~16 fichiers JSON**

---

## 12. Structures JSON minimales

### budget-2025.json

```json
{
  "metadata": {
    "company": "propello",
    "exercice": "2025",
    "generated_at": "2025-01-15",
    "currency": "EUR"
  },
  "budget_header": {
    "fiscal_year": 2025,
    "status": "approved",
    "prepared_by": "finance",
    "approved_by": "cfo"
  },
  "hypotheses": {
    "revenue_growth_rate": 0.25,
    "salary_increase_rate": 0.03,
    "cogs_percent_of_revenue": 0.35
  },
  "pl_budget": [
    {
      "line_item": "Revenue",
      "function": "Sales",
      "monthly_values": [...]
    }
  ],
  "balance_sheet_projection": {...},
  "cash_flow_projection": {...}
}
```

### forecast-scenarios-2025-2027.json

```json
{
  "metadata": {
    "company": "propello",
    "forecast_period": "2025-2027",
    "scenarios": ["base", "upside", "downside"]
  },
  "scenarios": {
    "base": {
      "assumptions": {
        "revenue_cagr": 0.15,
        "ebitda_margin": 0.22
      },
      "projections": {...}
    },
    "upside": {
      "assumptions": {
        "revenue_cagr": 0.35,
        "ebitda_margin": 0.28
      },
      "projections": {...}
    },
    "downside": {
      "assumptions": {
        "revenue_cagr": 0.05,
        "ebitda_margin": 0.15
      },
      "projections": {...}
    }
  },
  "revision_history": [...]
}
```

### cash-forecast-13w-2025.json

```json
{
  "metadata": {
    "company": "maison_nordique",
    "start_date": "2025-01-06",
    "end_date": "2025-03-31"
  },
  "weekly_forecast": [
    {
      "week_ending": "2025-01-10",
      "opening_balance": 250000,
      "inflows": {
        "customer_receipts": 45000,
        "financing": 0
      },
      "outflows": {
        "payroll": 18000,
        "suppliers": 22000,
        "debt_service": 5000
      },
      "closing_balance": 250000
    }
  ]
}
```

### cir-project-files-2025.json

```json
{
  "metadata": {
    "company": "propello",
    "exercice": 2025,
    "total_projects": 3
  },
  "projects": [
    {
      "project_id": "RD_2025_001",
      "name": "{PROJECT_ALPHA}",
      "state_of_art": "Brief description of current industry/market state and what's been done historically",
      "technical_blockers": ["Issue A", "Issue B"],
      "work_performed": [
        {
          "period": "2025-01",
          "description": "Technical work on component X"
        }
      ],
      "team_members": ["Person A", "Person B"],
      "duration_months": 12,
      "eligible_for_cir": true
    }
  ]
}
```

---

## 13. Priorisation par entreprise démo

### Propello (SaaS, ~25 sal.)

Fichiers prioritaires (P1) :
- budget-2025.json
- forecast-scenarios-2025-2027.json
- cash-forecast-13w-2025.json
- debt-schedule-consolidated-2025.json
- cir-project-files-2025.json
- cir-time-allocation-2025.json

Fichiers secondaires (P2) :
- time-sheets-monthly-2025.json
- cost-allocation-by-project-2025.json
- bpi-financing-dossier-2024.json
- exec-dashboard-kpi-2025-monthly.json

### Mécaform (Industrie, ~80 sal.)

Fichiers prioritaires (P1) :
- budget-2025.json
- forecast-scenarios-2025-2027.json
- cash-forecast-13w-2025.json
- debt-schedule-consolidated-2025.json
- treasury-multi-bank-consolidation-2025.json

Fichiers secondaires (P2) :
- bpi-financing-dossier-2024.json
- lender-reporting-covenant-2025.json
- aides-publiques-historique-2024.json
- closing-versions-iterations-2024-12.json

### Maison Nordique (E-commerce, ~15 sal.)

Fichiers prioritaires (P1) :
- budget-2025.json (version allégée saisonnière)
- cash-forecast-13w-2025.json

Fichiers secondaires (P2) :
- forecast-scenarios-2025-2027.json (version light)
- aides-publiques-historique-2024.json (possibilité aides embauche)

---

## 14. Conventions communes à tous les nouveaux fichiers

- **Encoding** : UTF-8, pas d'accents dans les clés JSON
- **Cas nominaux** : camelCase pour clés JSON
- **Dates** : ISO 8601 (`YYYY-MM-DD` ou `YYYY-MM` pour périodes)
- **Montants** : nombre décimal (pas de string), 2 décimales recommandées
- **Devises** : EUR par défaut, champ `currency` explicite si multi-devise
- **Métadonnées obligatoires** en tête de chaque fichier (voir exemples)
- **Cohérence** : chaque fichier doit pouvoir être réconcilié avec `fec-YYYY.json`, `balance-cloture-YYYY.json`, `employees.json`
- **Traçabilité** : champ `prepared_by`, `approved_by`, `last_updated` obligatoires sur données structurées

---

## 15. Cas d'usage clés par fichier

| Fichier | Cas d'usage principal | Utilisateurs |
|---|---|---|
| budget-2025.json | Planification annuelle, KPI tracking vs budget | CFO, finance team |
| forecast-scenarios-2025-2027.json | Levées de fonds, negotiations lenders, strategic planning | CFO, board, investors |
| cash-forecast-13w-2025.json | Trésorerie opérationnelle, alertes liquidité | Trésorier, finance |
| bpi-financing-dossier-2024.json | Dossier candidature financement public | CFO, admin |
| debt-schedule-consolidated-2025.json | Suivi covenant, rapports audit | CFO, auditeur |
| cir-project-files-2025.json | Justification CIR, dépôt administration | CFO, R&D manager |
| closing-versions-iterations-2024-12.json | Processus clôture annuelle, audit | Finance controller, auditeur |

---

*Fin de liste.*
