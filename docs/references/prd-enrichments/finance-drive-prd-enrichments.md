# Propositions d'enrichissement du PRD AI CFO Lab — Finance Drive

Basé sur l'observation du dossier Finance Shared Drive d'une PME technologique en croissance.

Voir `finance-drive-taxonomy.md` pour le détail de l'analyse source.

---

## 1. Module 3 — FP&A (enrichissements majeurs)

### 1.1 NOUVEAU : 3b — Budget planning détaillé & exports multi-granularité

**Description** : Outil de construction budgétaire annuel avec prévisions détaillées par fonction, générant exports P&L synthétique/détaillé, bilan prévisionnel et trésorerie multi-granulaire.

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Modèle budgétaire hiérarchique** | Par fonction/département + CA par segment. Structure flexible : bottom-up (par centre coûts) ou top-down (% du CA) |
| **Scénarios implicites** | Baseline (par défaut), + possibilité ajouts scénarios custom (upside, downside, cas de stress) |
| **Hypothèses paramétrables** | Taux croissance CA, augmentations salaires, variations coûts fixes, investissements, éléments non-récurrents |
| **Bilan prévisionnel auto** | Génération automatique du bilan et trésorerie à partir de la P&L (circulating capital, capex, financements) |
| **Exports multi-granularité** | P&L synthétique (grand compte), P&L détaillé (par ligne budget), Bilan détaillé, Trésorerie simple et trésorerie+ventes |
| **Comparaison vs actuals mensuels** | Variance budget vs réalisé, évolution des hypothèses de l'année |
| **Reporting KPI Dashboard** | Synthèse mensuelle/trimestrielle (Sheets ou PDF) : principaux KPIs vs budget, tendances, alertes |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Génération structure budgétaire | 🟡 Template + saisie hypothèses |
| Bilan / Tréso prévisionnel | 🟢 100% auto (depuis P&L) |
| Exports Excel / Sheets | 🟢 100% auto (templates) |
| Variance analyses | 🟢 100% auto (calculs) |
| Alertes KPI | 🟢 100% auto (règles seuils) |

---

### 1.2 NOUVEAU : 3c — Forecast engine & scenario planning

**Description** : Moteur de prévisions financières multi-année (3-5 ans) avec gestion formelle de scénarios, révisions périodiques et exports destinataires-spécifiques (exec, lenders, investors).

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Prévisions multi-année** | Projection 3-5 ans (N à N+4) avec hypothèses économiques à long terme |
| **Scénarios formels** | Base (par défaut), Upside (accélération croissance), Downside (risque), + custom illimité |
| **Gestion hypothèses** | Par scénario : taux CA, EBITDA margin, capex %, intensité capital, mix produits, expansion géo |
| **Historique révisions** | Snapshot prévisions à chaque révision, traçabilité hypothèses N vs N-1 vs N-2 |
| **Cycle trimestriel** | Révisions attendues Q1-Q4, avec alerte si hypothèses déviées de seuils |
| **Exports par destinataire** | Version lenders (focus cash, debt coverage), version investors (focus croissance, MOIC), version exec (all metrics), version opérationnelle (trésorerie glissante 13w) |
| **Exec Summary automatisé** | Synthèse textuelle des hypothèses, résumé chiffré, appels clés (runway, capex needs, capital raises) |
| **Sensibilité / tornade** | Analysis impact variation hypothèses clés (CA, margin, WACC) sur KPIs critiques |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Projection P&L/BS/CF | 🟢 100% auto |
| Exports par destinataire | 🟢 100% auto (templates) |
| Alerte déviation hypothèses | 🟡 Auto + validation |
| Exec Summary textuelle | 🟡 Template + édition fine |
| Sensibilité analyses | 🟢 100% auto (depuis paramètres) |

---

### 1.3 ENRICHISSEMENT : 3a — Cash forecast & treasury analytics

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Cash forecast 13 semaines** | Projection de trésorerie glissante par semaine, intégrant paiements reçus/émis, investissements, financements |
| **Scénarios de trésorerie** | Cas nominal vs case stress (hausse délais paiements, réduction CA) |
| **Consolidation multi-banques** | Agrégation comptes multiples, nets + positions par devise si applicable |
| **Alerte seuils de liquidité** | Déclenche si prévision tréso < seuil minimum (paramétrable), avec recommandations (avances, crédits court terme) |
| **Seasonalité & cycles** | Capture cycles saisonniers de trésorerie (e.g., pointes charges pré-noël pour retail) |

---

## 2. Module 2 — Cash Management (enrichissements majeurs)

### 2.1 NOUVEAU : 2h — Financement structuré & aides publiques

**Description** : Gestion dédiée des financements publics (BPI, OSEO, subventions) et aides gouvernementales, incluant workflow administratif, reporting lenders et suivi conformité.

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Référentiel dispositifs** | Catalogue aides publiques (BPI PAI, FEI, OSEO, startups, JEI, innovation, emploi) avec critères éligibilité et procédures |
| **Dossier de demande structuré** | Checklist documents requis, generator de lettres/déclarations, intégration prévisions financières |
| **Plan de trésorerie obligatoire** | Pour chaque dossier financement, pré-remplissage automatique depuis module 3 FP&A |
| **Table de capitalisation** | Historique actionnariat, documents juridiques (statuts, PV, résolutions) |
| **Questionnaires conformité** | KYC, sanctions, activités (pays interdits) — auto-remplissage depuis données company + tiers |
| **Notification & tracking** | Suivi dates clés (appels projets, deadlines, notifications décisions) |
| **Reporting lender** | Rapports périodiques (obligations de financement structuré) : P&L vs prévisions, covenants, événements |
| **Déclarations aides reçues** | Saisie montants perçus, crédit d'impôt réclamés (JEI, CIR), subventions comptabilisées |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Checklist document | 🟢 100% auto (du catalogue dossier) |
| Plan trésor & prévisions | 🟢 Import depuis FP&A |
| Table cap historique | 🟡 Auto + validation signatures |
| Questionnaires KYC | 🟡 Pré-remplissage + vérification manuelle |
| Reporting lender | 🟡 Templates + calcul auto, revue annuelle |

---

### 2.2 ENRICHISSEMENT : 2c — Suivi emprunts & dette

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Consolidation multi-lignes** | Vue d'ensemble dette : solde dû par ligne, intérêts restants, assurance actuelle |
| **Alerte covenants** | Monitoring ratio d'endettement, interest coverage, covenant autres (si applicables), avec alerte si seuils franchis |
| **Remboursements anticipés** | Workflow dédié : simulations impact économie d'intérêts, justification économique, processus lender |
| **Centralisation pièces** | Actes, assurances, mandats SEPA centralisés par ligne, accessible pour audit/trésorier |

---

## 3. Module 4 — Comptabilité (enrichissements)

### 3.1 NOUVEAU : 4o — Time tracking & cost allocation

**Description** : Feuilles de temps par projet/activité intégrées à la paie, permettant allocation analytique des coûts (notamment R&D vs opérationnel) et analytics coûts par centre/projet.

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Saisie temps mensuelle** | Feuilles de temps par employé, par projet, par activité (R&D, vente, production, admin). Granularité jour/semaine |
| **Allocation effort** | % temps par catégorie (R&D vs opérationnel, produit A vs produit B, interne vs client). Validation superviseur |
| **Intégration paie** | Coûts paie (salaires + charges) alloués selon pourcentages temps par projet/centre |
| **Analytics coûts** | Coûts réels par projet, par centre, par activité. Comparaison vs budget. Tendance. |
| **Justification CIR** | Export automatique allocation R&D pour dossier CIR (assiette éligible, charges indirectes) |
| **Piste audit** | Traçabilité complète : qui a saisi quoi, quand, approbations, modifications |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Saisie templates | 🟡 Templates pré-remplies (répétition mois N-1) |
| Allocation coûts | 🟢 100% auto (depuis % temps) |
| Analytics | 🟢 100% auto (données paie + temps) |
| Export CIR | 🟢 100% auto (justificatif assiette) |

---

### 3.2 ENRICHISSEMENT : 4g — Versionnage & itérations clôture

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Snapshots intra-annuels** | Captures états financiers à dates clés (30 juin, etc.) sans pour autant être clôture officielle |
| **Statuts versions** | WiP (brouillon), Draft (versioning), Sent to audit (envoyé CAC), Approved (approuvé CAC/conseil), Final |
| **Suivi approbations multi-destinataires** | Workflows d'approval : audit → finance → VC/lenders (si applicable). Signatures électroniques |
| **Historique modifications** | Change log : qui a modifié quoi et quand, motif |
| **Export multi-format** | Liasse fiscale, Bilan CAC, documents VC, synthèses board |

---

## 4. Module 6 — Impôts (enrichissements)

### 4.1 ENRICHISSEMENT : 6c — Dossier CIR enrichi

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Fiches projets R&D enrichies** | État de l'art détaillé, verrous techniques, travaux menés (vs juste noms projets) |
| **Pré-remplissage 2069-A-SD** | Import automatique : assiette CIR depuis 4o (time allocation), charges, forfait 43%, amortissements, total crédit |
| **Audit trail cabinet CIR** | Factures, rapports d'audit, échanges avec prestataire CIR centralisés et tracés |
| **Historique dépôts** | Dépôts antérieurs (N-1, N-2) avec montants réclamés et remboursés |
| **Alerte seuils documentation** | Si CA > seuils (50 M€), alerte obligation fichier transfer pricing principal associé |

---

## 5. Priorisation recommandée

| Priorité | Module | Justification |
|---|---|---|
| **P1 V2** | 3b Budget planning détaillé | Valeur client immédiate, cœur FP&A, démo percutante |
| **P1 V2** | 3c Forecast engine & scenarios | Cas d'usage fréquent, investisseurs/lenders demand, différenciant vs Abacum |
| **P1 V2** | 2h Financement structuré | Niche importante PME en croissance, demande administrative élevée, peu de SaaS couvre bien |
| **P2 V2** | 4o Time tracking & cost allocation | Prérequis meilleur CIR, analytics opérationnels, mais moins prioritaire que budget |
| **P2 V3** | 3a Cash forecast enrichi | Niche trésorique, haute valeur si bien fait, mais moins viral que budget/forecast |
| **P3 V3** | 4g Versionnage clôture | Feature audit/conformité, valeur client moyenne |
| **P3 V3** | 6c CIR enrichi | Spécialisation niche (R&D), amélioration incrémentale |

---

## 6. Impact sur les 3 entreprises démo

| Entreprise | Modules applicables | Notes |
|---|---|---|
| **Propello (SaaS, ~25 sal.)** | 3b, 3c, 2h, 4o, 6c | Cas SaaS avec R&D : budget détaillé, forecast scénarios, CIR, time tracking. Financement structuré optionnel (startup) |
| **Maison Nordique (e-commerce, ~15 sal.)** | 3b, 3c, 2h, 4g | Budget e-commerce (saisonnalité Q4), forecast (croissance), financement structuré optionnel. Time tracking moins pertinent. |
| **Mécaform (industrie, ~80 sal.)** | 3b, 3c, 2h, 4g, 4o | Budget industriel (BFR long, CAPEX), forecast (carnet cdes), financement structuré (cas PME). Time tracking par atelier/projet. |

---

## 7. Tableau de synthèse — Nouveaux modules vs existants

| Module | Status | Placement logique | PRD impact |
|---|---|---|---|
| 3b Budget planning | NOUVEAU | Après 3 FP&A core | +15% contenu module 3 |
| 3c Forecast engine | NOUVEAU | Après 3b | +20% contenu module 3 |
| 2h Financement public | NOUVEAU | Après 2c Emprunts | +25% contenu module 2 |
| 4o Time tracking | NOUVEAU | Avant 4g Clôture | +10% contenu module 4 |
| 3a Cash forecast | ENRICHISSEMENT | Dans 2 ou 3 | +5% contenu module 2 ou 3 |
| 4g Versioning | ENRICHISSEMENT | Existant | +10% contenu module 4 |
| 6c CIR | ENRICHISSEMENT | Existant | +10% contenu module 6 |

---

*Fin des propositions.*
