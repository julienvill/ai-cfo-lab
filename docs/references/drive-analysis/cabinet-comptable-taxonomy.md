# Synthèse — Taxonomie dossier expert-comptable de terrain

Document de synthèse extrait de l'observation d'un dossier partagé entre une PME
française (groupe, ~30-80 salariés) et son expert-comptable, sur une période
pluriannuelle.

**Objectif** : servir de référence pour enrichir le PRD AI CFO Lab (modules 4
Comptabilité, 6 Impôts, 2 Cash Management) et construire des données démo plus
réalistes pour les 3 entreprises fictives (Propello, Maison Nordique, Mécaform).

Tous les noms, montants, dates et références métier ont été retirés. Seules
**structure** et **conventions** sont conservées.

---

## 1. Vue d'ensemble

| Métrique | Valeur |
|---|---|
| Volume (snapshot) | ~9 000 fichiers |
| Couverture temporelle | 8 exercices fiscaux (archives + courant) |
| Double axe d'organisation | Par exercice fiscal **ET** par cycle métier |
| Entités couvertes | 1 société holding + 1 filiale étrangère + 1 succursale |
| Devises | EUR + devise étrangère (filiale) |
| Lignes de financement | 9 (bancaires + publiques + prêts d'honneur) |

---

## 2. Taxonomie hiérarchique observée

Le dossier combine **deux axes** de classement qui coexistent :

### Axe A — Par exercice fiscal (annuel, archive)

```
{YYYY}/
├── Exports systèmes comptables (balance générale, grand livre, VAT data)
├── Bilan {DD}.{MM}.{YYYY}/          ← dossier de justification du bilan
│   ├── Cloud / Infra (allocations par entité et par projet)
│   ├── Chiffre d'affaires (reconciliation CA système ↔ comptabilité)
│   ├── Circularisation bancaire (bank confirmations pour CAC)
│   ├── Balance fournisseurs (aged payables détaillé + synthétique)
│   ├── Bonus accruals (provisions variable rémunération)
│   ├── Commissions payables (provisions commerciales)
│   ├── Paie (evidence vs DSN, ventilation analytique)
│   ├── Production immobilisée (R&D activée + qualification temps)
│   ├── Immobilisations corporelles (FA register + rapprochement physique)
│   ├── Immobilisations incorporelles (IA register : logiciels, brevets, R&D)
│   ├── Factures fournisseurs (pièces justificatives regroupées)
│   ├── Relations intercompany (IC invoices + réconciliation)
│   ├── Documentation juridique (PV, approbations, baux)
│   ├── Dossier TVA (CA3 mensuelles + reconciliation)
│   ├── Aides à l'embauche (subventions salariales par contrat)
│   ├── Cost plus worksheet (pricing intercompany)
│   ├── Feuilles de temps (timesheets consolidées)
│   ├── Comptes courants associés (débiteurs/créditeurs actionnaires)
│   └── Réconciliation générale (leadsheets par poste de bilan)
├── Factures IC {YYYY}/              ← flux intercompany annuels
└── Autres (documents ponctuels)
```

### Axe B — Par exercice en cours (mensuel)

```
{MM}_{YYYY}/
├── Achats/                           ← 30-50 factures fournisseurs
├── Ventes/                           ← factures clients
├── Banques/                          ← relevés de tous les comptes
└── Intercompany/
    ├── Rebill from parent            ← refacturation reçue
    └── Rebill to parent              ← refacturation émise
```

### Axe C — Transverses (hors temps)

```
Banque/{BANQUE_CODE}/
├── Relevés par mois (historique complet)
├── Relevés de cartes de crédit corporate
├── Relevés d'intérêts
└── Contrats, mandats, documentation

Emprunts/{ID_EMPRUNT}/
├── Acte de prêt
├── Échéancier (PDF + Excel exploitable)
├── Assurance emprunteur
└── Mandat SEPA

Social/
├── Bulletins de paie/{YYYY-MM}/
│   ├── Récapitulatif multi-employés
│   └── Fiches individuelles par salarié
├── Contrats d'assurance collectifs
├── Contrats homme clé / décès
└── Paie étrangère (salarié expatrié ou succursale)

CIR/{YYYY}/
├── Feuilles de temps R&D (par personne × projet × mois)
├── Ratios d'allocation (effort distribution)
├── Fiches projets R&D (état de l'art, verrous, travaux)
└── Formulaires de dépôt

Assurances/{TYPE}/
├── Contrats (RC Pro, MRP, homme clé, emprunteur)
├── Conditions générales + spéciales
├── Quittances de paiement
└── Attestations d'assurance

Notes de Frais/
├── À traiter/
├── À vérifier/
└── Traitées/{YYYY}/{MM}/ (archive par ID NDF{YYMMDD})

{ENTITE_GROUPE}/                      ← dossier filiale/succursale
├── Bail immobilier (multi-sites)
├── Banque (comptes dédiés + saisies administratives)
├── Comptes annuels par exercice
├── Trial Balance par exercice
├── Listes paie détaillées + réconciliation SIRH
├── Taux de change historiques
├── Impôt sur les sociétés (filings locaux)
├── Leasing véhicules
├── Pénalités / contentieux fiscaux
└── Journal entries / recordings

Dataroom/                             ← archive audit / DD
├── Balances mensuelles historiques (3-4 années)
├── Retours fiscaux IS par exercice
├── Récap TVA par exercice
└── Balances âgées clients + fournisseurs snapshots
```

---

## 3. Conventions de nommage observées

### 3.1 Dates

- **Mois** : `MM_YYYY` (ex: `01_2026`, `03_2025`) — tri naturel chronologique
- **Dates précises** : `DD.MM.YYYY` ou `YYYY-MM-DD` selon contexte

### 3.2 Pièces comptables

- **Factures** : `INV-{VENDOR_CODE}-{DD-MM-YYYY}.pdf` ou numéro séquentiel
- **Relevés bancaires** : `Bank-Statement-{BANK_CODE}-{MM-YYYY}.pdf`
- **Écritures** : `General journal account entry_{TIMESTAMP}.xlsm`
- **Notes de frais** : `NDF{YYMMDD}-{type dépense}-{initiales}.pdf`
- **TVA** : `{NN}_VAT Data {MMM}{YY} {statut}.xlsx` (export système)
- **Tableaux d'amortissement** : `Tableau amortissement {LOAN_ID} {DATE}.xlsx`

### 3.3 Statuts

Suffixes appliqués au nom de fichier pour indiquer l'état de traitement :

- `Vu -` : document vérifié / validé par le comptable
- `- WiP` : brouillon / travail en cours
- `- Backup` : version de sauvegarde avant modification
- `Corrigé` : version rectifiée après contrôle
- `rbst` : reclassement / réajustement comptable
- `Détaillé` vs `Synthétique` : variantes de granularité pour un même état

---

## 4. Processus métier déductibles de la structure

### 4.1 Cycle de clôture mensuelle

```
J+1  Intégration relevés bancaires → pointage → rapprochement
J+2  Validation factures fournisseurs → three-way matching → comptabilisation
J+3  Facturation clients → émission factures → suivi encaissements
J+4  Intégration données paie (depuis SIRH) → OD paie → DSN
J+5  Provisions & cut-off (CCA, PCA, FNP, FAE, provisions congés)
J+6  Intercompany (rebill in/out, TVA rebill, réconciliation)
J+7  Contrôles (balance M/M-1, comptes d'attente, leadsheets bilan)
J+8  Reporting (P&L mensuel, dashboard, variance vs budget)
```

### 4.2 Cycle de clôture annuelle (30+ jours)

```
J-30  Pré-clôture : cut-off approfondi, inventaires physiques
J-15  Justification bilan par poste (leadsheets par compte)
      └── dossier par rubrique (CA, paie, immos, IC, cost plus, etc.)
J     Arrêté comptable
J+5   Circularisation tiers (banques, clients, fournisseurs, avocats)
J+15  Retraitements consolidation (si groupe) : package groupe
J+20  Production états financiers (bilan, CR, flux, annexe, liasse)
J+30  Revue CAC → rapport → approbation
```

### 4.3 Cycle intercompany (flux groupe)

```
Transaction IC identifiée (service, management fee, cost plus)
    ↓
Calcul prix de cession interne (cost plus worksheet)
    ↓
Émission facture IC (rebill from/to parent)
    ↓
Comptabilisation des deux côtés (entités)
    ↓
Traitement TVA (rebill TVA si rattrapage annuel)
    ↓
Réconciliation mensuelle IC (matching automatique + écarts)
    ↓
Justification bilan IC en fin d'exercice
```

### 4.4 Cycle CIR (annuel)

```
Saisie mensuelle temps R&D (par personne × projet)
    ↓
Allocation effort R&D vs non-R&D
    ↓
Calcul coûts salariaux éligibles (salaires + charges)
    ↓
Application forfait fonctionnement 43%
    ↓
Ajout dotations amortissement biens R&D
    ↓
Rédaction fiches projets R&D (état de l'art, verrous)
    ↓
Assiette CIR × 30% → crédit d'impôt
    ↓
Dépôt formulaire 2069-A-SD avec liasse fiscale
    ↓
Demande de remboursement si PME (CERFA 2573-SD)
```

### 4.5 Cycle des emprunts

```
Négociation → signature acte de prêt
    ↓
Mise en place échéancier (tableau amortissement)
    ↓
Souscription assurance emprunteur (si requise)
    ↓
Mandat SEPA pour prélèvement
    ↓
Comptabilisation décaissement (164)
    ↓
Écritures mensuelles : principal (164) + intérêts (66)
    ↓
Justification fin d'exercice : solde restant dû par ligne
```

### 4.6 Onboarding / changement de cabinet comptable

```
Récupération des données du cabinet sortant :
    ├── Balance de sortie exercices N-1, N-2
    ├── FEC exercices antérieurs
    ├── Registre des immobilisations
    ├── Dossier de travail (leadsheets, provisions)
    ├── Liste fournisseurs/clients master
    ├── Échéanciers d'emprunts en cours
    └── Dossiers fiscaux (CIR, TVA, IS déposés)
    ↓
Reprise en compte d'à-nouveau (journal AN)
    ↓
Période de double vérification (1-3 mois)
    ↓
Validation transition → dossier "Justif transition"
```

---

## 5. Processus absents / insuffisamment couverts dans le PRD AI CFO Lab

Après comparaison entre la structure observée et le PRD module 4 actuel :

### 5.1 Processus bien couverts ✓

- Module 4g — Clôture mensuelle (checklist 8 blocs) : **aligné**
- Module 4e — Immobilisations avec production immo : **aligné**
- Module 4i — Facturation électronique : **aligné**
- Module 4j — FEC : **aligné**
- Module 6c — CIR avec forfait 43% : **aligné**
- Module 2c — Dette & emprunts : **aligné**

### 5.2 Processus à enrichir ⚠️

| Sujet | Où | État actuel | Enrichissement suggéré |
|---|---|---|---|
| **Leadsheets de justification par compte** | 4g | Mentionné dans "Balance sheet reconciliation" | Template par typologie de compte (CA, immos, paie, IC, emprunts…), génération auto du dossier de justification |
| **Rebill intercompany mensuel** | 4k | "Réconciliation inter-comptes" générique | Workflow dédié rebill in/rebill out, TVA rebill, matching automatique deux-entités, cost plus worksheet |
| **Cost plus pricing** | 4k ou 6 | Absent | Calcul prix de cession interne (base coûts + marge), documentation transfer pricing, alerte seuil documentation fiscale |
| **Allocation de coûts multi-entités** | 4k | Absent | Clés de répartition (headcount, CA, usage), journal d'allocation récurrent (cloud, frais siège) |
| **Circularisation bancaire & tiers** | 4g, 8b | Absent | Génération automatique des lettres de confirmation pour le CAC (banques, clients top N, fournisseurs top N, avocats) |
| **Vendor master file** | 4b | Implicite | Référentiel fournisseurs : référencement, KYC, IBAN, plafonds, relations IC, blacklist |
| **Paie étrangère / expatriés** | 4c, 5 | Absent | Intégration bulletins format étranger, change devise, harmonisation comptes |
| **Aides à l'embauche / subventions salariales** | 4c ou 6 | Absent | Suivi des contrats aidés (emploi-franc, POEC, etc.), crédits de cotisation, comptabilisation |
| **Prêts d'honneur aux fondateurs** | 2c | Absent | Distinct des emprunts société, engagements personnels des dirigeants, documentation séparée |
| **Saisies administratives** | 4b, 5, 7 | Absent | Gestion des avis à tiers détenteur (URSSAF, impôts), traitement paie + fournisseurs |
| **Onboarding reprise cabinet comptable** | 4 transverse | Absent | Workflow de reprise : récupération FEC/balance N-1, période de bascule, justification |

### 5.3 Nouveaux sous-modules proposés

| # | Sous-module | Placement | Description |
|---|---|---|---|
| **4l** | **Dossier de justification bilan (leadsheets)** | Module 4 | Génération automatique du dossier justificatif par poste pour audit/CAC : un sous-dossier par rubrique, evidence structuré |
| **4m** | **Intercompany & rebill** | Module 4 | Cycle IC complet : factures rebill in/out, TVA rebill annuel, matching multi-entités, cost plus pricing |
| **4n** | **Allocations de coûts (cost allocation)** | Module 4 | Allocation automatique charges multi-entités / multi-projets (cloud, siège, R&D) selon clés paramétrables |
| **2g** | **Prêts d'honneur & engagements personnels** | Module 2 | Distinct de 2c — engagements des fondateurs pour le compte société |
| **8e** | **Circularisation tiers** | Module 8 | Lettres de confirmation CAC automatisées (banques, clients, fournisseurs, avocats) |

---

## 6. Recommandations consolidées pour le PRD

### 6.1 Enrichissements prioritaires (V2)

1. **Module 4l nouveau — Dossier de justification bilan** (leadsheets)
2. **Module 4m nouveau — Intercompany & rebill** (groupe)
3. **Module 4k enrichissement — Cost plus pricing** (transfer pricing)
4. **Module 8e nouveau — Circularisation tiers** (audit)
5. **Module 4b enrichissement — Vendor master file**

### 6.2 Enrichissements secondaires (V3)

6. **Module 4n — Allocations de coûts**
7. **Module 4c — Paie étrangère / expatriés**
8. **Module 2g — Prêts d'honneur**
9. **Module 4 transverse — Onboarding migration cabinet**
10. **Module 6 — Aides à l'embauche & subventions salariales**

---

## 7. Fichiers de données démo à créer

Pour rendre les 3 entreprises démo (Propello SaaS, Maison Nordique e-commerce,
Mécaform industrie) réalistes sur ces processus, voir document séparé
[`demo-data-files-to-create.md`](./demo-data-files-to-create.md).

---

*Fin de synthèse.*
