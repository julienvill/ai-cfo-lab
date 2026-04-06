# Synthèse — Taxonomie de référence Data Room M&A

Document de synthèse extrait de l'analyse d'une data room M&A professionnelle réelle
(plateforme data room commerciale standard du marché, transaction menée avec un cabinet
d'audit Big 4 comme conseil DD acquéreur).

**Objectif** : servir de modèle de référence pour enrichir le module 8c (Data Room) du
PRD AI CFO Lab — en particulier le template "M&A sell-side".

Tous les noms, montants, dates et références métier ont été retirés.
Seules la **structure** et les **conventions d'organisation** sont conservées.

---

## 1. Vue d'ensemble de la data room observée

| Métrique | Valeur |
|---|---|
| Plateforme | Data room commerciale professionnelle (SaaS dédié M&A) |
| Volume (snapshot) | ~480 fichiers, ~230 Mo |
| Nombre de rubriques | ~15 (numérotation 1-15) |
| Couverture temporelle | 4 exercices fiscaux + situations intermédiaires |
| Période de transaction | ~6 mois (plusieurs rounds Q&A) |
| Conseil vendeur | Cabinet d'audit + équipe interne Finance |
| Conseil acquéreur | Cabinet d'audit Big 4 (DD financière & fiscale) |

---

## 2. Taxonomie hiérarchique — Rubriques observées

Les rubriques sont **numérotées à la racine** (1, 2, 3…) et **sous-numérotées** en cascade
(3.1, 3.1.1…). Cette numérotation **structure l'Information Request List (IRL)** et
**les Q&A** pendant toute la transaction.

### Rubrique 1 — Corporate / Structure

Documents d'identité de la société, gouvernance, capital.

- Statuts et K-bis (ou équivalent juridique local)
- PV d'assemblée générale / décisions d'associé unique
- PV de conseil d'administration / conseil de surveillance
- Pacte d'actionnaires
- Cap table historique et actuelle
- Registre des mouvements de titres
- Documents d'incorporation (acte de constitution)
- Historique des augmentations de capital

### Rubrique 2 — Statut et incorporation

Sous-section corporate dédiée aux évolutions du statut juridique.

- Actes modificatifs des statuts
- Décisions d'augmentation / réduction de capital
- Fusion, scission, apport partiel d'actif (historique)

### Rubrique 3 — Reporting financier interne

**Rubrique à très fort volume** — c'est le cœur du reporting de gestion.

- **3.1 Monthly** — reporting mensuel (P&L, cash, KPIs)
- **3.2 Quarterly** — reporting trimestriel consolidé
- **3.3 Working Capital & Liabilities** — BFR, dettes, engagements
- **3.4 Board** — board pack investisseurs / comité stratégique
- **3.5 Budget** — budgets par exercice (historique et en cours)
  - 3.5.1 à 3.5.N : un sous-dossier par exercice budgétaire

### Rubrique 4 — États financiers

États financiers statutaires, annuels et situations intermédiaires.

- **4.1, 4.2, 4.3…** — comptes annuels par exercice (PDF signés)
- **4.4, 4.5, 4.6…** — situations comptables intermédiaires (semestriels, trimestriels)

### Rubrique 5 — Sales (Chiffre d'affaires)

Détail du CA sur plusieurs dimensions.

- 5.1 Monthly Sales — CA mensuel (historique multi-années)
- 5.2 KPIs & Metrics — indicateurs d'activité (ARR, MRR, churn, NRR si SaaS…)
- 5.3 Sales and Margin — détail CA × marge par segment / client / produit
- 5.4 Pipeline / Backlog (si pertinent)

### Rubrique 6 — Accounting Data

Données comptables brutes, exports systèmes.

- **6.1, 6.2, 6.3…** — un sous-dossier par exercice
  - Balances générales (TB)
  - Grand livre (GL)
  - FEC (Fichier des Écritures Comptables)
  - Plan comptable

### Rubrique 7 — Budget (duplication / consolidation)

Souvent duplicatif avec 3.5 — contient parfois les budgets validés finaux uniquement.

### Rubrique 8 — Commercial / Customers

- Contrats clients majeurs (top 10, top 20)
- Bons de commande / Purchase Orders clients
- Historique de facturation par client
- Dossiers commerciaux clés (un sous-dossier par client majeur)
- Conditions commerciales types

### Rubrique 9 — Tax information

**Rubrique à très fort volume** — point d'attention critique en DD.

- **9.1 General** — documents transverses
  - 9.1.1 Rapports des commissaires aux comptes
  - 9.1.2 By-laws / statuts version en vigueur
  - 9.1.3 Procès-verbaux de conseil
- **9.2 CIT / IS** — impôt sur les sociétés
  - Liasses fiscales (un sous-dossier par exercice)
  - Avis d'imposition
  - Justificatifs de paiement
- **9.3 Tax compliance** — obligations déclaratives
  - CVAE, CFE, IFER, taxes locales
  - DEB, DES (déclarations d'échanges)
- **9.4 VAT / TVA** — un sous-dossier par exercice
  - Déclarations mensuelles / trimestrielles (CA3, CA12)
  - Justificatifs de crédit / remboursement
- **9.5 Transfer Pricing** — prix de transfert (si groupe)
- **9.6 CIR** — Crédit Impôt Recherche (dossier très volumineux)
  - 9.6.1 à 9.6.N : un dossier par exercice
  - Pour chaque exercice :
    - Note méthodologique
    - Déclaration 2069-A-SD
    - Justificatifs de dépenses
    - Feuilles de temps
    - **Fiches R&D** — une par projet R&D, avec annexes techniques
- **9.7 Capitalized R&D** — R&D immobilisée (activation)
- **9.8 BSPCE** — bons de souscription, stock options
  - Règlements de plans
  - Attributions
  - Déclarations fiscales afférentes

### Rubrique 10 — HR / Payroll

- Effectif détaillé (fichier personnel)
- Grille des rémunérations
- Contrats de travail (types et spécifiques)
- Bulletins de paie (échantillons)
- DSN (Déclarations Sociales Nominatives)
- Charges sociales
- Commissions et bonus (plans et paiements)
- Intéressement, participation, épargne salariale
- Accords d'entreprise, convention collective
- Registre du personnel
- Dossiers RH sensibles (contentieux)

### Rubrique 11 — Legal / Juridique

- Contrats fournisseurs majeurs
- Contrats de bail (bureaux)
- Contrats d'assurance (RC Pro, D&O, cyber, etc.)
- Contentieux en cours
- Propriété intellectuelle (marques, brevets, licences)
- Règlement intérieur
- Conditions générales de vente / d'achat
- Mandats et délégations de pouvoirs

### Rubrique 12 — Documents complémentaires (Q&A Round 1)

Généralement consécutifs à une première liste de questions de l'acquéreur.

- Contrats clients supplémentaires
- Bons de commande clients (un sous-dossier par client demandé)
- Précisions sur segments / marchés
- Structure organisationnelle détaillée

### Rubrique 13 — Documents complémentaires (Q&A Round 2)

Approfondissement suite au 2e round DD.

- **13.1 Bank Statements** — relevés bancaires (multi-banques, multi-mois)
- **13.2 Capex spend** — détail investissements
- **13.3 Bank Loans** — prêts bancaires et PGE
  - Un sous-dossier par emprunt (banque + montant + date)
  - Contrats de prêt, tableaux d'amortissement, justificatifs
- **13.4 Bank Cards** — cartes bancaires et frais
- **13.5 Aged Debtor listing** — balance clients âgée
- **13.6 Aged Creditors Listing** — balance fournisseurs âgée
- **13.7 Legal expenses breakdown** — ventilation des honoraires juridiques

### Rubrique 14 — Aged balances

- Balance clients âgée par date (snapshot par période)
- Balance fournisseurs âgée par date

### Rubrique 15 — Autres (ad hoc)

Dossier fourre-tout pour documents livrés tardivement ou hors scope initial.

---

## 3. Conventions de nommage observées

### 3.1 Numérotation des rubriques

- **Niveau 1** : `1 Nom_Rubrique/` (préfixe numérique + espace + nom)
- **Niveau 2** : `1.1 Sous-rubrique/` (numéro composé)
- **Niveau 3** : `1.1.1 Sous-sous-rubrique/`
- Jusqu'à 4-5 niveaux dans les sections volumineuses (CIR notamment)

**Avantages** :
- Tri naturel par ordre de numérotation
- Référence claire dans les IRL et Q&A (« voir rubrique 9.6.4.6 »)
- Structure stable même si ajout de nouveaux dossiers

### 3.2 Nommage des fichiers

Convention observée :
```
{Entité} {Exercice} - {Catégorie} - {Précision}.pdf
```

Exemples anonymisés :
- `Entity 2024 - Comptes annuels.pdf`
- `Entity 2024 - Rapprochement Comptabilité-Immobilisations.pdf`
- `Entity 2022 - Balances âgées clients - fin févr 2022.pdf`
- `Entity S1 rapports_sur_les_temps.xlsx`

### 3.3 Ajout de dossiers post-création

Les nouveaux dossiers ajoutés en cours de transaction prennent le numéro suivant disponible,
**pas forcément dans l'ordre logique** — ce qui crée des "trous" ou des numéros hors séquence.
Exemple observé : `6.9 Balances 2022`, `6.13 Balances 2020`, `6.14 Balances 2021`.

C'est une limite connue des plateformes data room : pour préserver les liens IRL, on ne
renumérote pas a posteriori.

---

## 4. Structure des outils de pilotage de la transaction

La plateforme data room fournit **8 exports meta** standards :

| Export | Rôle |
|---|---|
| **Liste des fichiers et dossiers** | Inventaire complet (audit) |
| **Liste des utilisateurs** | Tous les comptes actifs |
| **Groupes et utilisateurs** | Permissions par groupe |
| **Vue d'ensemble des groupes** | Qui a accès à quoi |
| **Accès au dossier** | Matrice d'accès par document |
| **Historique des actions** | Piste d'audit (lectures, downloads, uploads) |
| **Activité du Q&A** | Statistiques Q&A (volume, délais de réponse) |
| **Messages du Q&A** | Log complet des questions et réponses |

Ces 8 exports sont **la baseline** d'une data room professionnelle. Le module 8c d'AI CFO
Lab devrait proposer ces mêmes exports.

### Outils de suivi externes (fichiers Excel du vendeur)

En complément de la plateforme, le vendeur maintient :

- **IRL (Information Request List)** — Excel structuré par rubrique, avec pour chaque ligne :
  - Numéro (aligné sur la taxonomie de la data room)
  - Question de l'acquéreur
  - Statut (à traiter / en cours / répondu / clôturé)
  - Responsable côté vendeur
  - Date de réponse
  - Référence au document chargé
- **Q&A Tracker** — versions datées successives (suivi des itérations)
- **Tax Information Request List** — IRL spécifique fiscal (souvent séparée)
- **Kickoff meeting agenda** — doc de lancement de la DD

---

## 5. Recommandations pour le module 8c — Data Room (PRD)

### 5.1 Fonctionnalités à confirmer / ajouter dans le PRD

| # | Fonctionnalité | Priorité | Justification |
|---|---|---|---|
| 1 | **Template "M&A sell-side" avec taxonomie pré-construite** | Haute | Les 15 rubriques ci-dessus forment le template de référence |
| 2 | **Numérotation hiérarchique automatique** | Haute | Essentielle pour synchroniser IRL et Q&A |
| 3 | **Export Information Request List (IRL)** | Haute | Outil central du pilotage de la transaction |
| 4 | **Module Q&A avec workflow de validation** | Haute | Déjà dans le PRD, à conserver |
| 5 | **8 exports meta standards** | Haute | Baseline des plateformes du marché |
| 6 | **Gestion des "trous" de numérotation** | Moyenne | Accepter des numéros non contigus pour préserver les liens |
| 7 | **Templates de checklists par type d'opération** | Haute | Différencier seed, série A/B, M&A, refinancement, audit fiscal |
| 8 | **Watermarking dynamique** | Moyenne | Protection des documents en circulation |
| 9 | **Q&A tracker externe (export Excel)** | Haute | Vendeur maintient souvent un Excel en parallèle |
| 10 | **Score de complétude par rubrique** | Haute | Déjà dans le PRD, à conserver |

### 5.2 Taxonomies différenciées selon le contexte

Le module 8c doit proposer **plusieurs templates** selon le scénario :

| Scénario | Rubriques clés | Volumes typiques |
|---|---|---|
| **M&A sell-side** | Les 15 rubriques ci-dessus | 300-800 fichiers |
| **Levée de fonds Seed/A** | Corporate, Financial, Tax, HR, Commercial, Legal | 80-200 fichiers |
| **Levée de fonds Série B+** | Idem + Reporting détaillé + Metrics/KPIs SaaS | 200-500 fichiers |
| **Audit annuel (CAC)** | Financial, Accounting, Tax, Payroll | 150-400 fichiers |
| **Contrôle fiscal** | Tax (très détaillé), Accounting, Payroll | 100-300 fichiers |
| **Financement bancaire** | Financial, Reporting, Structure | 30-80 fichiers |

### 5.3 Peuplement automatique depuis les autres modules

Le module 8c doit **agréger automatiquement** les documents produits par les autres modules :

| Module source | Alimente les rubriques |
|---|---|
| 4 Comptabilité | Rubriques 4, 6, 14 (états financiers, accounting data, aged balances) |
| 6 Impôts | Rubrique 9 (tax information complète) |
| 5 RH | Rubrique 10 (HR / payroll) |
| 7 Juridique | Rubriques 1, 2, 11 (corporate, legal) |
| 3 FP&A | Rubriques 3, 5, 7 (reporting, sales, budget) |
| 2 Cash Management | Rubrique 13 (bank statements, loans) |
| 4k Consolidation | Rubrique 8 (commercial si groupe) |

### 5.4 Fonctionnalités spécifiques M&A à ajouter

Absentes ou insuffisamment détaillées dans le PRD actuel :

- **Deal room dédiée** — workspace temporaire avec durée de vie limitée (12-18 mois)
- **Multi-groupes d'accès** (management, buyer, buyer's advisors, seller's advisors)
- **Suivi des téléchargements critiques** (alertes si doc sensible téléchargé)
- **Redaction automatique** (masquer zones confidentielles en PDF)
- **Room index PDF** généré à la demande (table des matières consolidée)
- **Expiration automatique** des accès à la clôture de la transaction

---

## 6. Synthèse opérationnelle

**Taxonomie de référence à 15 rubriques** — à intégrer comme template "M&A sell-side"
dans le module 8c :

```
01 Corporate
02 Statut & Incorporation
03 Reporting financier
04 États financiers
05 Sales
06 Accounting Data
07 Budget
08 Commercial / Customers
09 Tax information
10 HR / Payroll
11 Legal
12 Q&A complémentaires (Round 1)
13 Q&A complémentaires (Round 2)
14 Aged balances
15 Autres
```

**4 outils de pilotage** :
1. Information Request List (IRL) — Excel, aligné sur la taxonomie
2. Q&A tracker — workflow intégré + export Excel
3. Audit trail — 8 exports meta standards
4. Score de complétude par rubrique

**3 cycles d'itération typiques** :
- Round 1 : documents "standards" demandés par l'acquéreur
- Round 2 : approfondissement post analyse financière
- Round N : questions ad hoc jusqu'à signing

---

*Fin de synthèse.*
