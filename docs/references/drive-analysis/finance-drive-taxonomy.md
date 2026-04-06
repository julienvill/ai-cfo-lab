# Synthèse — Taxonomie dossier Finance Shared Drive

Document de synthèse extrait de l'observation d'un dossier Finance partagé dans une PME technologique en croissance (effectif N-1 : ~80-100 salariés estimés, multi-exercices archivés).

**Objectif** : servir de référence pour enrichir le PRD AI CFO Lab (modules 2 Cash Management, 3 FP&A, 6 Impôts) et identifier les gaps entre les processus fintech/SaaS français et les modules existants.

Tous les noms, dates précises, montants et références métier ont été retirés. Seules **structure** et **conventions** sont conservées.

---

## 1. Vue d'ensemble

| Métrique | Valeur |
|---|---|
| Familles thématiques racine | 10 dossiers principaux |
| Couverture temporelle | ~5 exercices (archives + courant) |
| Double axe d'organisation | Par thème métier **ET** par exercice/variante |
| Domaines couverts | Financement, trésorerie, budget, prévisions, CIR/R&D, aides, immobilisations, holdings |
| Fichiers générés | Multiples formats : Excel, Sheets, XML/Excelis (outils tiers), PDF |

---

## 2. Taxonomie hiérarchique observée

### Dossier A — Financement structuré (BPI)

```
BPI/
├── Notifications des décisions (PDF historiques)
├── OC [Organisme Crédit] {TYPE_FINANCEMENT}/
│   ├── Plan de trésorerie (multi-année)
│   ├── Documents rendus/
│   │   ├── Prévisions financières (3-5 ans)
│   │   ├── Aides déclarées (jeunes pousses, innovation)
│   │   ├── Table de capitalisation (actionnariat)
│   │   ├── Questionnaires conformité (sanctions, KYC)
│   │   └── Tableau amortissement (si emprunt associé)
│   └── Docs Reference/ (templates)
```

**Observations** :
- Cycle fortement administratif (reporting lender, compliance, table cap)
- Intégration étroite avec trésorerie (plan de trésorerie multi-year obligatoire)
- Déclarations d'aides spécifiques par dispositif (startup, innovation)
- Archivage par type de financement (distinct de "Emprunts" bancaires purs)

---

### Dossier B — Trésorerie & comptes bancaires (Banques)

```
Banques/
├── {BANQUE_ABREV}/
│   ├── pièces/ (relevés PDF, avis)
│   └── [contrats, mandats, documentation opérationnelle]
├── CMB/                              ← treasury management
├── CA/
├── BPGO/
├── BNP/
├── [autre_banque]/
└── pièces/ (génériques)
```

**Observations** :
- **Spécialisation par banque** : chaque banque a des dossiers dédiés + un dossier "pièces" transverse
- **Pas d'intégration API forte déductible** (fichiers manuels, relevés PDF)
- **Absence de structure "cash forecast" au niveau trésorerie** (les prévisions sont dans le dossier Budget/Prévi)
- **CMB** code interne pour treasury management ou partenaire spécialisé

---

### Dossier C — Immobilisations & amortissements (Bilans)

```
Bilans/
├── Situation - {DD} {MOIS} {YYYY}/     ← snapshots intra-exercice
│   └── CIR/ (si justification)
├── Comptes de Clôture - {DATE}/        ← clôture formelle
│   ├── Clossing accounts - WiP/
│   ├── Clossing accounts - send {DATE}/
│   ├── Reçu {CABINET} {DATE}/ (après audit/expertise)
│   ├── Partage VC - {DATE}/ (if financing round)
│   └── August 1, August 2... (itérations)
├── Comptes Annuels - {YYYY}/
│   ├── CAC/ (auditor signed)
│   └── Liasse Fiscale/
├── CAC/ (par année)
│   ├── {YYYY}
│   └── {YYYY-1}
```

**Observations** :
- **Cycle de clôture itératif** : WiP → versions intermédiaires → envoyé → reçu audité
- **Statuts implicites dans les noms** : "WiP" = draft, "Corrigé" = amended
- **Multi-destinataires** : version CAC (audit), version VC (lenders), version fiscale
- **Snapshots intra-annuels** : states non-audited à des dates clés (souvent 30 juin, par ex)

---

### Dossier D — Budget & P&L (Budget)

```
Budget/
└── {YYYY}/
    ├── Modèle budgétaire principal (.cr8 = Excelis propriétaire)
    ├── Variantes (scénarios : base, upside, downside si applicable)
    ├── Export BP/
    │   ├── Compte de résultat.xlsx
    │   ├── Compte de résultat - détaillé.xlsx
    │   ├── Bilan.xlsx
    │   ├── Bilan - détaillé.xlsx
    │   ├── Trésorerie.xlsx
    │   ├── Trésorerie détaillée.xlsx
    │   ├── Trésorerie détaillée avec ventes.xlsx
    │   ├── Charges de personnel.xlsx
    │   ├── Charges de personnel - détaillé.xlsx
    │   ├── Charges externes.xlsx
    │   ├── Charges externes - détaillé.xlsx
    │   ├── Charges externes - détaillé++.xlsx
    │   ├── Fournisseurs sur Frais - détail mensuel.xlsx
    │   ├── Amortissements.xlsx
    │   └── [variantes / copies de travail]
    └── Reporting {YYYY}.gsheet (KPI dashboard)
```

**Observations** :
- **Format propriétaire dominant** : `.cr8` (Excelis = outil tiers, probablement du cabinet)
- **Export Excel multi-granularité** : synthétique vs détaillé par grand compte (charges externes 3x, charges paie 2x)
- **Trésorerie 3 variantes** : simple, détaillée, détaillée+ventes (avec impact CA)
- **Reporting Google Sheets** : KPI live, mais peu de granularité observée (probablement dashboards directeurs)
- **Pas de structure d'amortissement détaillée** (absent du Budget, probablement dans Bilans)

---

### Dossier E — Prévisions & Scenario Planning (Prévi)

```
Prévi/
├── Exec Sum/ (executive summaries, rapports)
│   └── old/
├── Export BP/ (exports mensuels/trimestriels)
│   └── old/
├── VC/ (investor/lender version)
├── Trésorerie/ (cash flow detail)
├── Old/ (archive importante)
│   ├── Sent {DATE}/ (envoyés à tiers)
│   ├── BP {YYYY}-{YYYY} - Base/ (baseline scenario)
│   ├── BP {YYYY}-{YYYY} - Upside/
│   ├── BP {YYYY}-{YYYY} - Downside/
│   ├── FISY/ (fiscal year model?)
│   ├── IFRS/ (accounting standard variant)
│   ├── BPI/ (lender-specific version)
│   ├── templates/
│   └── {DATE} versions/
```

**Observations** :
- **Scénarios formels** : Base / Upside / Downside structurés comme dossiers distincts
- **Multi-standards** : FISY, IFRS coexistent (variantes comptables/fiscales)
- **Destinataires explicites** : version BPI (lenders), version VC (investors), version interne
- **Exec summary** : rapports générés mensuels/trimestriels (probablement dashboards PDF)
- **Trésorerie isolée** : dossier dedié (cash forecasting importante pour TPE/PME)
- **Archive très dense** : "Old" contient des années d'itérations (non numérotées, non triées)

---

### Dossier F — Recherche & Développement (CIR)

```
CIR/
├── {YYYY}/
│   ├── Feuilles de temps R&D (par personne / projet / mois)
│   ├── Fiches projets/ (état de l'art, verrous, travaux)
│   ├── Ratios allocation (% effort R&D vs commercial, produit, etc.)
│   ├── Formulaires dépôt (.xlsx = pré-remplissage CIR)
│   └── Factures cabinet conseil CIR (prestataires audit)
├── Enquête Annuelle Recherche (formulaire administrations)
├── DAP - {DD} {MMM} {YYYY}.gsheet (suivi allocation projets)
└── 2019/ [archive d'exercice antérieur]
```

**Observations** :
- **Processus CIR quasi-documenté** : fiches projets, feuilles de temps, ratios (vs cabinet-comptable qui ne montre que temps R&D)
- **Intégration avec cabinet externe** : factures de conseil intégrées au dossier
- **Enquête annuelle administration** : formulaire légal dédié (Enquête Annuelle Recherche)
- **DAP (Data Allocation Projects?)** : outil collaboratif Google Sheets pour suivi temps/effort
- **Pas de lien explicite vers Bilans** : CIR isolé, alors que charges R&D devraient être justifiées en clôture

---

### Dossier G — Aides publiques & subventions (Subventions)

```
Subventions/
[structure non détaillée en exploration — dossier probablement archivé]
```

**Observations** :
- Dossier distinct de BPI (financement vs subventions)
- Probablement contient : notifications aides, déclarations reçues, justificatifs administratifs
- **Thème entièrement absent du PRD actuel** (potentiel enrichissement significatif)

---

### Dossier H — Emprunts & dette (Emprunts)

```
Emprunts/
├── {BANQUE} - {MONTANT_APPROX} - {MOIS} {YYYY}/
│   ├── Acte de prêt (PDF)
│   ├── Assurance emprunteur/
│   ├── Tableau amortissement (Excel)
│   ├── Mandat SEPA (prélèvement)
│   └── [documentation légale]
├── {TYPE_EMPRUNT} {MONTANT_APPROX} - {MOIS} {YYYY}/
│   ├── Contrat
│   ├── Assurance
│   └── [pièces]
├── Remboursements anticipés/
├── {ENTITE_SPECIALISEE} AR/ (possible emprunt adhoc)
└── [archive plusieurs années]
```

**Observations** :
- **Granularité : une ligne de crédit = un dossier** (pas de consolidation intra-exercice)
- **Toutes les lignes documentées** : acte, assurance, échéancier, mandat
- **Dossier "Remboursements anticipés"** : suivi distinct de la gestion courante des emprunts
- **Distinction de Banques/** : ici c'est la documentation structurée par montant/date, là c'est par banque/opérationnel

---

### Dossier I — Outils de planification (Excelis)

```
Excelis/
├── Modèles propriétaires (.cr8 = format Excelis)
│   ├── PREVI {NOM_SOCIETE} {YYYY} {YYYY} MAJ - current.xls
│   ├── [variantes BPI, scénarios divers]
│   └── Document 3 - Elements financiers.xlsx (input data)
├── {DATE}/ (versions datées)
│   ├── Modèles archivés
│   └── Fichiers sources
└── old/
```

**Observations** :
- **Excelis = plateforme tierce** (probablement cabinet de conseil ou partenaire spécialisé)
- **Intégration forte** : modèles prévisions + budget réunifiés
- **Versions multiples datées** : itérations client-consultant (pas d'historique Git, mais snapshots)
- **Format .xls** : ancien Excel (vs modernes .xlsx), suggère outils / templates hérités

---

### Dossier J — Holdings & consolidation (Pulceo)

```
Pulceo/
[structure brève — probablement société holding ou holding fictive pour structuration]
```

**Observations** :
- Présence d'une structure holding/regroupement (PULCEO = possible code entité groupe)
- **Indicateur de complexité groupe** : multi-entités probables

---

## 3. Conventions de nommage observées

### 3.1 Cycles & périodes

- **Exercices annuels** : `{YYYY}`, `{YYYY}-{YYYY}` (ex: 2022, 2020-2024 pour prévisions pluriannuelles)
- **Mois précis** : `{DD} {MOIS_FR} {YYYY}` ou `{MOIS} {YYYY}` (ex: "30 Juin 2021", "Juillet 2020")
- **Dates compactes** : `{MMMMYY}` rare en observation (plutôt complet)

### 3.2 Statuts implicites

- `WiP` (Work in Progress) → draft, en cours
- `- current` → version vivante, mise à jour
- `MAJ` (mise à jour) → dernière version consolidée
- `Copie de` → brouillon / non-officiel
- `Reçu {CABINET} {DATE}` → auditée, signée
- `Partage VC` → version partagée avec investisseurs
- `Sent {DATE}` → envoyée à tiers (lenders, experts)
- `old` → archive / obsolète

### 3.3 Outils & formats

- `.cr8` → Excelis (outil tiers propriétaire)
- `.gsheet` → Google Sheets (collaboratif / live)
- `.xlsx` → Excel modernes
- `.xls` → Excel ancien (legacy)
- `.pdf` → documents officiels (actes, notifications)

### 3.4 Noms de fichiers clés

- `Prévisions financières {YYYY}-{YYYY}.xlsx` → forecast multi-year
- `Plan de trésorerie {YYYY}-{YYYY}.xlsx` → cash flow
- `Tableau amortissement {LOAN_ID} {DATE}.xlsx` → debt schedule
- `Compte de résultat.xlsx`, `Bilan.xlsx` → P&L et balance sheet
- `Fiche Projets collab {TYPE}.xlsx` → R&D project registry
- `Charges de personnel - détaillé.xlsx` → payroll breakdown

---

## 4. Processus métier déductibles de la structure

### 4.1 Cycle budgétaire annuel

```
Septembre-Octobre (N-1)      Préparation budget N
    ↓
Modèle Excelis chargé avec hypothèses (CA, coûts fixes, recrutements)
    ↓
Scénarios générés : Base / Upside / Downside
    ↓
Exports Excel multi-granularité (P&L simple, P&L détaillé, BS, Tréso)
    ↓
Validation direction + lenders (si emprunt)
    ↓
Reporting Sheets mensualisé pour suivi vs actuals
```

### 4.2 Cycle de prévisions (planning avancé)

```
Prévisions de base : 3-5 années (N à N+4)
    ├── Baseline (scénario par défaut)
    ├── Upside (croissance accélérée)
    └── Downside (risque)
    ↓
Exports par destinataire :
    ├── Version interne (Exec Sum)
    ├── Version lenders (BPI, banques)
    ├── Version investors (VC)
    └── Trésorerie détaillée (cash management)
    ↓
Révisions trimestrielles (hypothèses mises à jour)
    ↓
Archive annuelle → dossier "Old" (avant nouvelle année)
```

### 4.3 Cycle CIR (fiscal R&D)

```
Feuilles de temps mensuelles (saisie effectif R&D)
    ↓
Allocation effort (% temps R&D vs autres activités)
    ↓
Fiches projets (description, verrous, travaux menés)
    ↓
Audit cabinet conseil CIR (vérification assiette)
    ↓
Formulaire 2069-A-SD pré-rempli
    ↓
Dépôt auprès administration + demande remboursement (PME)
```

### 4.4 Cycle d'emprunts

```
Négociation / signature acte prêt
    ↓
Tableau amortissement généré
    ↓
Souscription assurance emprunteur (si requise)
    ↓
Mandat SEPA pour prélèvement automatique
    ↓
Stockage dans dossier dédié (par banque + montant + date)
    ↓
Remboursement anticipé ? → dossier séparé
    ↓
Justification en clôture annuelle (solde restant dû)
```

### 4.5 Cycle de clôture annuelle

```
J-30        Pré-clôture, inventaires, cut-off
    ↓
J-15        Justification par poste (si applicable)
            → Snapshots "Situation" créés
    ↓
J           Arrêté comptable
    ↓
J+5         Envoi à auditeur / expert
    ↓
J+20        Versions multi-itératives (WiP, corrigée, finale)
    ↓
J+30        Réception version audité (CAC)
            → Liasse fiscale constituée
            → Partage VC si applicable
```

### 4.6 Cycle d'aides & subventions (présumé)

```
Identification dispositif applicable (startup, innovation, emploi)
    ↓
Déclaration auprès organisme (dossier administratif)
    ↓
Justificatifs attachés (factures, preuves eligibilité)
    ↓
Notification / Paiement
    ↓
Comptabilisation (produit ou réduction de charge)
    ↓
Suivi compliance (obligation reporting)
```

---

## 5. Comparaison avec "cabinet-comptable-taxonomy.md"

| Domaine | Cabinet comptable | Drive Finance |
|---|---|---|
| **Clôture annuelle** | Très détaillée (leadsheets par compte, cycle 30j) | Implicite (snapshots + versions itératives) |
| **Intercompany** | Formalisé (rebill in/out, reconciliation) | Absent (mono-entité ou holding opaque) |
| **CIR** | Mentions (temps, fiches projets) | **Documenté en détail** (feuilles temps, ratios, fiches, formulaires) |
| **Prévisions** | Absent | **Très développé** (scénarios, multi-destinataires, cycles trimestriels) |
| **Budget** | Absent | **Détaillé** (P&L détaillé, charges par fonction, trésorerie) |
| **Emprunts** | Bien couvert (acte, assurance, échéancier) | **Identique** |
| **Banques** | Transverse (relevés, mandats) | **Isolé par banque** (moins de vue consolidée) |
| **Aides publiques** | Absent | **Domaine dédié** (subventions) |
| **Tools** | Comptabilité numérisée (Pennylane, etc.) | **Outils spécialisés** (Excelis propre, modèles Excel) |

---

## 6. Familles thématiques principales — Vue consolidée

| Famille | Finalité métier | Cycle | Granularité | Automatisation perçue |
|---|---|---|---|---|
| **Financement structuré (BPI)** | Levées de fonds / emprunts subventionnés | Annuel (dossier + vérification) | Par ligne de financement | Basse (administratif lourd) |
| **Trésorerie & Banques** | Gestion de comptes et flux paiements | Continu (relevés, mandats) | Par compte bancaire | Basse (relevés manuels) |
| **Budget** | Plan financier pour l'année | Annuel (préparation sept-oct) | Par fonction / P&L / BS | Moyenne (Excelis calculs) |
| **Prévisions** | Anticipation multi-scénario 3-5 ans | Révision trimestrielle | Par scénario + destinataire | Moyenne (Excelis, exports) |
| **CIR / R&D** | Crédit d'impôt recherche | Annuel (justification) | Par projet × personne × mois | Moyenne (feuilles temps + audit) |
| **Immobilisations** | Bilan comptable annuel | Annuel (clôture) | Par poste bilan | Basse (itérations manuelles) |
| **Emprunts & dette** | Suivi des crédits | Continu (paiements) + annuel (justif) | Par ligne d'emprunt | Basse (documentation statique) |
| **Aides & subventions** | Subventions publiques (présumé) | Ponctuel (quand applicable) | Par aide/dispositif | Inconnue (dossier peu exploré) |

---

## 7. Processus absents ou insuffisamment couverts (vs PRD actuel)

### Processus **bien couverts** en PRD ✓

- Module 2c — Emprunts & lignes de crédit : **aligné**
- Module 6c — CIR : **aligné**
- Module 3 — FP&A (mentionné) : **partiellement couvert**

### Processus **à enrichir ou ajouter** ⚠️

| Sujet | Où dans PRD | État actuel | Enrichissement proposé |
|---|---|---|---|
| **Budget détaillé (P&L, BS, Tréso par fonction)** | 3 FP&A | Mentionné génériquement | Module 3b nouveau — Budget planning avec exports multi-granularité (détaillé vs synthétique par fonction) |
| **Prévisions multi-scénario (base/upside/downside)** | 3 FP&A | Implicite dans "scenario planning" | Module 3c nouveau — Forecast engine avec gestion scénarios, révisions trimestrielles, exports par destinataire (lenders, investors) |
| **Financement structuré (BPI, subventions)** | 2 Cash Management | Partiel (emprunts bancaires) | Module 2h nouveau — Financement public & aides (BPI, innovation, startup, etc.) avec workflow administratif et reporting lender |
| **Suivi centralisé trésorerie (comptes multiples)** | 2 Cash Management | Implicite dans "cash forecast" | Module 2d enrichissement — Consolidation multi-banques, vue transverse flux, alertes seuils |
| **Feuilles de temps & allocation effort (paie + analytique)** | 4c Paie, 6c CIR | CIR seul | Module 4o nouveau — Time tracking & cost allocation : feuilles temps par projet, allocation paie R&D vs opérationnel, analytics coûts |
| **Fiches projets R&D & audit CIR** | 6c CIR | Basique | Module 6c enrichissement — Fiches projets enrichies (état de l'art, verrous, travaux détaillés), pré-remplissage 2069-A-SD, audit trail |
| **Rapports de clôture itérative** | 4g Clôture | WiP → audit → approval | Module 4g enrichissement — Versionnage des clôtures (snapshots, WiP, drafts), suivi approvals multi-destinataires (audit, VC, actionnaires) |

---

## 8. Recommandations consolidées pour PRD

### 8.1 Nouveaux modules majeurs (V2-V3)

| # | Module | Placement | Priorité | Description |
|---|---|---|---|---|
| **3b** | **Budget planning détaillé** | Module 3 FP&A | **P1** | Construction budgets par fonction, exports P&L détaillé / BS / Tréso, comparaison vs actuals mensuels |
| **3c** | **Scenario planning & forecast** | Module 3 FP&A | **P1** | Gestion scénarios Base/Upside/Downside, révisions trimestrielles, exports par destinataire (lender, investor, exec) |
| **2h** | **Financement public & aides** | Module 2 Cash Management | **P2** | Suivi BPI/OSEO, subventions publiques, workflow administratif, reporting pour bailleurs de fonds |
| **4o** | **Time tracking & cost allocation** | Module 4 Comptabilité | **P2** | Feuilles de temps par projet/activité, allocation coûts paie (R&D vs opé), analytics par centre de coûts |
| **6c-enrichi** | **Audit trail CIR & R&D** | Module 6 Impôts | **P2** | Fiches projets enrichies, pré-remplissage formulaires 2069-A-SD, preuve audit cabinet conseil |

### 8.2 Enrichissements de modules existants

- **Module 2c** : Ajouter "Suivi centralisé multi-comptes bancaires" (vs seulement cash forecast)
- **Module 3** : Ajouter "Reporting exécutif" (dashboards KPI, Exec Summary PDF)
- **Module 4g** : Ajouter "Versionnage & itérations clôture" (snapshots intra-annuels, suivi approbations)

---

## 9. Volumes & patterns de travail déductibles

| Pattern | Observation |
|---|---|
| **Cycle budgétaire** | Annuel (sept-oct), figé en début d'année, révisions ponctuelles |
| **Suivi vs budget** | Mensuel (reporting Sheets KPI) |
| **Prévisions** | Révision trimestrielle (hypothèses mises à jour) |
| **Clôture annuelle** | 30 jours, multi-itérations, multi-destinataires |
| **Financement** | Crises / cycles de levée (dossiers épais pendant négociation, puis archived) |
| **CIR** | Annuel (dépôt administration, cycle strict) |
| **Trésorerie** | Continu (relevés banquiers) mais peu de vue intégrée perçue |

---

## 10. Fichiers de données démo à créer — Recommandations

Pour illustrer les cas d'usage de cette taxonomie Finance (distincte du cabinet-comptable) :

- `budget-2025.json` — Budget P&L détaillé par fonction / mois
- `forecast-scenarios-2025-2027.json` — Scénarios base/upside/downside avec révisions
- `cash-forecast-13w.json` — Prévisions trésorerie glissantes
- `bpi-financing-application-2024.json` — Dossier financement structuré avec livrables administratifs
- `cir-time-allocation-2025.json` — Feuilles temps par projet R&D
- `time-cost-allocation-2025.json` — Allocation coûts multi-projets
- `closing-iterations-2024-12.json` — Versions itératives clôture (WiP → audit → approved)

---

*Fin de synthèse. — Document produit 2026-04-05.*
