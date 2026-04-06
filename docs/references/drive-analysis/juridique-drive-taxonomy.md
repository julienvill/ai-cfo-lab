# Synthèse — Taxonomie Juridique Shared Drives

Document de synthèse extrait de l'observation de deux drives partagés couvrant la fonction juridique d'une PME technologique française (SAS, multi-actionnaires, multi-tours de table, secteur B2B tech) sur environ un horizon pluriannuel (création, levées successives, contentieux, opération de cession).

**Objectif** : servir de référence pour enrichir le PRD AI CFO Lab (module 7 Juridique / Corporate, module 8 Audit & Compliance, data room & M&A) et identifier les gaps entre la pratique juridique PME-startup française observée et les modules existants.

Tous les noms d'entités, personnes, projets, dates précises, montants et marques ont été retirés. Seules **structure** et **conventions** sont conservées. Tout identifiant est remplacé par un placeholder générique (`{CLIENT_A}`, `{VC_N}`, `{CABINET_X}`, etc.).

---

## 1. Vue d'ensemble

| Métrique | Valeur |
|---|---|
| Drives explorés | 2 (ouvert + confidentiel) |
| Profondeur d'exploration | 2 niveaux |
| Familles thématiques racine | ~15 (drive ouvert) + ~20 (drive confidentiel) |
| Double axe d'organisation | Par thème métier **ET** par opération/événement |
| Cycle de vie couvert | Création → levées successives → contentieux → opération M&A |
| Formats dominants | PDF (actes signés), DOCX (drafts), XLSX/GSHEET (cap tables), GSLIDES (présentations) |

---

## 2. Drive A — Juridique (périmètre opérationnel ouvert)

### Familles observées

```
Assurances/
├── Homme-clé Fondateurs/
├── Multirisque (courante + archive exercices antérieurs)/
├── RC Pro exercice {YYYY}/
├── RC Mandataires sociaux (D&O)/
└── Projet de remplacement multirisque / RC

Brevets/
├── {REF_BREVET_1}/          ← un dossier par famille de brevet
├── {REF_BREVET_2}/
├── {REF_BREVET_3}/
├── Courriers reçus par date
└── Devis dépôt cabinet PI

INPI/
├── Cessions de marque
├── Récépissés de dépôt
└── BOPI (publications)

Clients/
└── {CLIENT_A}/              ← structure par client grand compte

Cloud/
├── {FOURNISSEUR_CLOUD}_Private Pricing/
├── Dossier crédits cloud
└── Cloud resource usage (suivi engagement)

Fournisseurs/
├── {FOURNISSEUR_N}/         ← un dossier par fournisseur actif
│   ├── Contrat signé (PDF)
│   └── [devis, avenants]
└── Comparaison fournisseurs (gsheet)

NDA/
├── {CONTREPARTIE_N}/        ← un dossier par NDA signé
└── Templates NDA FR + EN

SaaS/                        ← CGU/CGV de la société éditeur SaaS
├── Final/ (versions en vigueur)
├── Drafts markup (versions avec cabinet)
├── Mentions légales
└── Questions ouvertes contrat (worklog)

Sous-traitants/
├── {SOUS_TRAITANT_N}/       ← un dossier par sous-traitant (KYC + contrat)
└── Suivi sous-traitants (gsheet de vigilance)

Locaux/
├── {SITE_A}/                ← bail et pièces par site
└── {SITE_B}/

Portage/                     ← véhicules de structuration capital/export
├── {VEHICULE_PORTAGE_N}/
└── Liste traducteurs assermentés

RGPD/
└── Privacy Policy publiée

{SOCIETE_OP}/ (entité société)
├── Attestations (vigilance, régularité fiscale, assurance)
├── KBIS/ (historique)
├── Statuts/ (historique)
├── Transferts de siège {YYYY}/
├── Avis SIRENE, CFE signés par exercice
├── État de mise en conformité RGPD
└── Organizational Chart

{ENTITE_PARTAGE_CABINET}/    ← espace partagé avec cabinet juridique externe
├── Contrats/
└── SLA/
```

### Observations clés

- **Classement par tiers** dominant (un dossier par client, par fournisseur, par sous-traitant, par NDA)
- **IP / brevets structurés** par numéro de référence famille (pas de nom commercial)
- **Vigilance sous-traitants** : fichier de suivi central + KYC par sous-traitant (Kbis, URSSAF, assurance)
- **NDA** : large portefeuille (~15 contreparties B2B), templates FR + EN disponibles
- **Contrats SaaS éditeur** : cycle Draft → markup cabinet → Final, avec worklog de questions ouvertes

---

## 3. Drive B — Juridique Confidentiel (corporate, capital, M&A)

### Familles observées

```
Création/
├── Projets pacte associés (itérations datées)
├── Pacte associés signé
├── Acte valant décisions collectives (absence de rémunération)
└── DPI/ (déclarations propriété intellectuelle fondateurs)

AK round {N} {VC_N} {YYYY}/  ← un dossier par augmentation de capital
├── Term sheet + redlines cabinet
├── Pacte associés (versions successives)
├── Protocole d'investissement / SPA
├── Déclarations & garanties (GAP)
├── Annexes GAP/
├── Mini-pactes fondateurs (par personne)
├── Bulletins de souscription
├── Attestations PEA (par souscripteur)
├── Attestations dépôt de fonds bancaires
├── IBAN compte augmentation de capital
├── Tables de capitalisation versions successives
├── Clauses de cession préférentielle
├── PV AGE d'augmentation de capital
├── Extraits PV signés
└── Échanges cabinet par date / par contrepartie

AK round {N-1} (annulée) {YYYY}/  ← traces d'opération avortée
├── LOI signée
├── Protocole + redlines
└── Pacte clean

OC {DISPOSITIF_PUBLIC} {YYYY}/    ← obligations convertibles bailleur public
├── Avis de décaissement
├── Bulletin OCA
├── Rapport Président (émission)
├── Texte des résolutions AG
├── Acte nomination commissaire à la vérification
├── PV AG d'émission
├── PV de réalisation
├── Pouvoirs
└── Dossiers envoi bailleur

BSPCE tranche {N} exercice {YYYY}/
├── Projet décisions Président attribution
├── Modèle convention attribution
├── Modèle mini-pacte bénéficiaires
├── Rapport complémentaire Président
├── Rapport CAC sur émission BSPCE
├── Annexe (tableau bénéficiaires × quantités)
├── documents à docusigner/
└── documents docusignés/

BSPCE tranche {N+1} exercice {YYYY+1}/
├── PV CA
├── Convention attribution BSPCE dirigeant
├── Convention attribution BSPCE salarié
├── Rapport complémentaire
├── AVDC (rémunération dirigeants + BSPCE)
├── PV Président
├── Rapport Président
└── Rapport CAC

CERFA tranche {N}/            ← CERFA souscription par bénéficiaire
├── CERFA_{PERSONNE_N}.pdf    ← un par souscripteur individuel
├── CERFA_{ENTITE_SOUSCRIPTRICE}.pdf
└── Summary

CERFA tranche {N} - Attestations/
└── Attestation_{PERSONNE_N}.pdf

Dircofi/                     ← contrôle fiscal dispositif incitatif
├── Attestations individuelles
├── CERFA tranche {N}/
└── CERFA tranche {N+1}/

PV/                          ← registre AG/CA par exercice
├── {YYYY-4}/
├── {YYYY-3}/
├── {YYYY-2}/
├── {YYYY-1}/
└── {YYYY}/

Assurances RC et HC/         ← doublon avec drive ouvert — copies confidentielles
├── HC - {ASSUREUR_A}/
├── HC - {ASSUREUR_B}/
└── RC - {ASSUREUR_C}/

Reporting/                   ← reporting investisseurs / conseil
├── Board/
├── Comité Stratégique - Closed/
├── {VC_N} Board/
├── {BAILLEUR_PUBLIC} Board/
├── Monthly/
├── Quarterly/
├── {OUTIL_REPORTING_TIERS}/ (modèles reporting)
├── Attestations comptes investisseurs (PEA, dépôt)
├── Modèle AIEC ({FONDS_N})
└── Benchmarks sectoriels externes

{CONTENTIEUX_DOSSIER_A}/     ← contentieux / expertise dommages
├── Rapport d'évaluation préjudices (versions successives)
├── Feuille de calcul évaluation (taux actualisés)
├── Lettre de mission cabinet expertise
├── AK round annulé (contexte)
├── Présentations contexte (bilan, marché, concurrence)
├── Résumé Pacte et GAP
├── documents {MOIS} {YYYY}/
└── Rapport d'évaluation {MOIS} {YYYY}/

{CONTENTIEUX_DOSSIER_B}/     ← pièces procédure judiciaire
├── BCP n°1.pdf (bordereau communication pièces)
├── Pièce n°1 à Pièce n°N
└── Pièces annexées n°{X}-{Y}

{OPERATION_MA} {YYYY}/       ← opération de cession / M&A
├── Corporate/ (docs société cible)
├── Finance/ (comptes, liasses, KPIs)
├── IT & Payroll/ (data RH + SI)
├── IP/ (brevets, marques, licences)
├── Legal expense/
├── Litigation/ (contentieux en cours)
├── Sales {YYYY-N}-{YYYY}/ (historique CA)
├── Solution/ (descriptif technique)
├── Source listing/ (code source)
├── Subsidies/ (aides & subventions)
├── TS/ (term sheets)
├── SPA/ (share purchase agreement + annexes)
├── DD Questions.docx (questions & réponses DD)
├── Closing Accounts - versions datées
├── Completion accounts schedule template
├── Draft Waterfall (répartition prix)
├── Simulation prix de cession
├── Employés BSPCE (tableau sortie)
├── IRL (information right letter)
├── Lettre de mission cabinet M&A
├── RIB augmentation capital
├── Présentations introduction contrepartie
└── Finance - présentation par date

Documentation fondateurs/mandataires/
├── Pièces d'identité scannées
├── Passeports validité (mandataires sociaux et bailleurs publics)
├── Changements représentants (bailleurs publics)
└── Modifications représentants

Table de capi {DATE}.xlsx    ← snapshots cap table datés récurrents
Table de capi - simplifiée.xlsx
Waterfall.gsheet             ← simulation répartition produit cession
QX Sale.gsheet               ← modèle de cession
Debt Projection.gsheet       ← projection dette
Diagramme Capital.gslides    ← visualisation graphique cap table
SPA signé (PDF)              ← acte final M&A
```

### Observations clés

- **Traçabilité exhaustive des opérations sur capital** : chaque round AK a son propre dossier complet (term sheet → docs signés → attestations bancaires → CERFA)
- **Versioning intense** : cap tables sauvegardées en v1, v2, v3, v4 + dates (pas de single source of truth, risque d'écarts)
- **Mini-pactes individuels** : un document par fondateur/bénéficiaire (multiplicité des signataires)
- **BSPCE annuels** : tranches successives avec même template (décision Président + rapport CAC + convention bénéficiaire + mini-pacte)
- **CERFA dispositif fiscal** : un fichier par souscripteur (personnes physiques + entités), multi-tranches (CERFA 2, CERFA 3)
- **M&A = consolidation data room complète** : miroir des modules AI CFO Lab (Finance, RH, IT, IP, Legal, Subventions)
- **Contentieux** : deux types observés — (i) dossiers d'expertise dommages préalables à négociation, (ii) pièces judiciaires numérotées (procédure active)
- **Reporting investisseurs** : fréquence monthly + quarterly + board ad hoc, multi-destinataires (lead VC, suiveurs, bailleur public)
- **Documents d'identité** : stockés en clair (photo CNI, passeports) — sensibilité élevée
- **Operation avortée conservée** : traces d'un round annulé maintenues avec traces d'itérations

---

## 4. Conventions de nommage observées

### 4.1 Dates
- `YYYY.MM.DD` (format ISO-inversé européen, tri naturel)
- `{JJ}.{MM}.{YYYY}` (format français dans titres d'événements)
- `{MM} {YYYY}` (mois littéral français)

### 4.2 Itérations d'actes juridiques
- `v{N}` (v1, v2, v3, v4...) → versions successives d'un acte en négociation
- `+ Redlines {CABINET}` → version avec modifications cabinet (interne)
- `+ Commentaires {PARTIE}` → version avec commentaires d'une partie
- `clean` → version propre (sans marks)
- `mark up` → version avec annotations visibles
- `signé` → acte final signé (PDF)
- `signé_{YYYYMMDD}_{HHMM}` → signature électronique avec timestamp

### 4.3 Statuts documents
- `Projet -` → version brouillon à valider
- `PROJET -` → variante majuscule
- `Draft -` → anglicisme équivalent
- `FINAL` / `final` → version finale homologuée
- `old/` → archive obsolète
- `(version signature électronique)` → variante docusignable

### 4.4 Opérations capital
- `AK {VC_N} {YYYY}` → augmentation de capital (round)
- `OC {BAILLEUR} {YYYY}` → obligations convertibles
- `BSPCE - {MOIS} {YYYY}` / `BSPCE {YYYY}` → tranche d'attribution
- `CERFA {N}` → N° de tranche CERFA fiscale

### 4.5 Documents M&A
- `LOI {CONTREPARTIE}` → lettre d'intention
- `TS` → term sheet
- `SPA` → share purchase agreement
- `GAP` → garanties d'actif et de passif (décla & garanties)
- `DD` → due diligence
- `BCP n°{N}` → bordereau communication pièces (procédure)
- `Pièce n°{N}` / `Pièce n°{N}-{M}` → pièces annexées procédure

---

## 5. Processus métier déductibles de la structure

### 5.1 Cycle vie juridique annuel (secrétariat)

```
Planification AGO (approbation comptes N-1) — date légale {6 mois après clôture}
    ↓
Convocation + ordre du jour
    ↓
Préparation dossier (rapport gestion, rapport CAC, projet résolutions)
    ↓
Tenue AGO → PV signé
    ↓
Dépôt comptes au greffe
    ↓
Mise à jour registres (mouvements titres, décisions, BE)
    ↓
AGE ad hoc si besoin (modification statuts, augmentation K, etc.)
    ↓
Archivage {YYYY}/ dans dossier PV
```

### 5.2 Cycle augmentation de capital (round)

```
Term sheet initial (VC lead)
    ↓ redlines cabinet société
    ↓ redlines cabinet VC
    ↓ redlines VC
    ↓ itérations (v1 → v4)
Term sheet signé
    ↓
Négociation pacte + SPA + GAP en parallèle
    ↓ (multiples versions datées)
    ↓
Due Diligence VC (data room alimentée)
    ↓
Décision AGE augmentation capital
    ↓
Ouverture compte séquestre bancaire
    ↓
Souscriptions (bulletins + attestations PEA)
    ↓
Attestation dépôt fonds banque
    ↓
PV de réalisation de l'augmentation K
    ↓
Mise à jour statuts + dépôt greffe
    ↓
Mise à jour cap table (v{N+1}) + waterfall
    ↓
Signature pacte associés consolidé + mini-pactes
    ↓
Attestation souscription aux souscripteurs (CERFA dispositif fiscal)
    ↓
Reporting premier board post-round
```

### 5.3 Cycle d'attribution BSPCE (tranche annuelle)

```
Identification bénéficiaires éligibles (DRH + direction)
    ↓
Valorisation titres (exercice expert externe)
    ↓
Rapport du Président (justification attribution)
    ↓
Rapport complémentaire CAC (obligatoire)
    ↓
Décision Président / CA (si délégation AG)
    ↓
Convention attribution individuelle (dirigeant vs salarié)
    ↓
Mini-pacte bénéficiaires
    ↓
Signature électronique multi-parties (docusign)
    ↓
Mise à jour registre mouvements titres
    ↓
Mise à jour cap table (titres en circulation)
    ↓
Déclaration sociale (ACOSS) si applicable
    ↓
Suivi vesting (cliff + linéaire) sur durée plan
    ↓
Exercice bénéficiaires (si applicable) → nouvelle émission
```

### 5.4 Cycle contentieux (expertise dommages)

```
Identification du préjudice (rupture contrat, concurrence déloyale, etc.)
    ↓
Mandatement cabinet expertise (lettre de mission)
    ↓
Collecte pièces (historique commercial, perte marge, business plan)
    ↓
Rédaction rapport d'évaluation préjudices (v1)
    ↓
Révisions (mise à jour taux actualisation, rapprochement réalisations)
    ↓
Rapport final
    ↓
Négociation pré-contentieuse
    ↓
Si échec : saisine juridiction → bordereau communication pièces (BCP)
    ↓
Constitution dossier pièces numérotées (Pièce n°1 à Pièce n°N)
    ↓
Provisionnement comptable (risques & charges)
```

### 5.5 Cycle M&A sell-side (cession)

```
Décision stratégique cession (board)
    ↓
Mandatement cabinet M&A (lettre de mission)
    ↓
Préparation info memorandum + simulation prix cession
    ↓
Approche contreparties → term sheets multiples
    ↓
Sélection acquéreur → TS exclusif
    ↓
Ouverture data room (Corporate / Finance / IT & Payroll / IP / Legal / Litigation / Sales / Solution / Source / Subsidies)
    ↓
Q&A DD (DD Questions + réponses tracées)
    ↓
Négociation SPA + GAP
    ↓
Completion accounts (comptes intermédiaires)
    ↓
Waterfall définitive (répartition prix entre actionnaires)
    ↓
Traitement BSPCE en cours (accélération vesting, sortie, substitution)
    ↓
Signing SPA
    ↓
Closing (transfert titres + prix)
    ↓
Earn-out / escrow si applicable (suivi pluri-annuel)
    ↓
Reporting final aux investisseurs sortants
```

### 5.6 Cycle vigilance sous-traitants (obligations légales)

```
Identification nouveau sous-traitant
    ↓
Collecte pièces KYC : Kbis, attestation URSSAF, attestation fiscale, RIB, assurance RC, IBAN
    ↓
Vérification authenticité pièces
    ↓
Signature contrat de sous-traitance
    ↓
Rappel semestriel (attestations URSSAF périmées tous les 6 mois)
    ↓
Mise à jour fichier central suivi sous-traitants
    ↓
Alerte si pièce manquante ou expirée
```

### 5.7 Cycle IP / brevets

```
Invention identifiée (inventeur interne)
    ↓
DPI (déclaration propriété intellectuelle) → cession à société
    ↓
Évaluation brevetabilité (cabinet PI)
    ↓
Dépôt FR INPI (n° de référence)
    ↓
Publication BOPI
    ↓
Extension internationale (PCT → phases nationales) — multi-pays
    ↓
Suivi annuités (paiement maintien)
    ↓
Transfert / cession éventuelle (acte de cession marque/brevet)
```

---

## 6. Familles thématiques principales — Vue consolidée

| Famille | Finalité métier | Cycle | Granularité | Volumétrie observée |
|---|---|---|---|---|
| **Corporate & gouvernance** | Vie sociale SAS | Annuel (AGO) + ad hoc (AGE) | Par exercice | ~5 exercices archivés |
| **Cap table & equity** | Répartition K, dilution | À chaque événement K | Par round + par tranche BSPCE | 3-4 rounds + 2-3 tranches BSPCE |
| **Contrats tiers** | Engagements clients/fournisseurs | Continu | Par tiers | ~15 NDA, ~10 fournisseurs, ~10 ST |
| **IP** | Protection brevets & marques | Annuel (annuités) | Par famille brevet | ~3 familles brevets + marques |
| **Assurances** | Couverture risques entreprise | Annuel (renouvellement) | Par police | ~5 polices actives (RC, D&O, HC, multirisque) |
| **Contentieux** | Gestion litiges + provisions | Ponctuel (durée procédure) | Par dossier | 1-2 dossiers actifs |
| **M&A / cession** | Opérations sur titres | Ponctuel (6-18 mois) | Par opération | 1 opération majeure |
| **Financement structuré** | Dette bailleur public | Annuel (reporting) | Par ligne OC/emprunt | 1-2 lignes actives |
| **Compliance / RGPD** | Conformité réglementaire | Continu | Transverse | Docs courants + audit ponctuel |
| **Vigilance sous-traitants** | Obligation légale donneur d'ordre | Semestriel (URSSAF) | Par sous-traitant | ~10 ST actifs |

---

## 7. Comparaison avec PRD module 7 actuel

### 7.1 Processus **bien couverts** ✓

| Sous-module PRD | Observation drive | État |
|---|---|---|
| **7a — Secrétariat juridique** | Dossier PV par exercice, approbation comptes annuelle | **Aligné** |
| **7b — Cap table & BSPCE** | Tranches BSPCE documentées + cap table versionnée + waterfall | **Aligné** (mais fragmenté) |
| **7c — Contrats & baux** | Registre par tiers, NDA, sous-traitants | **Aligné** |
| **7d — Assurances** | Portefeuille RC Pro, D&O, homme-clé, multirisque observé | **Aligné** |
| **7e — Contentieux** | Dossiers expertise + pièces procédure observés | **Partiellement aligné** (V3) |

### 7.2 Processus **à enrichir** ⚠️

| Sujet | Où dans PRD | État actuel | Enrichissement suggéré |
|---|---|---|---|
| **Mini-pactes individuels** | 7b | Pacte d'associés global | Gestion granulaire des mini-pactes par bénéficiaire (un document par fondateur/bénéficiaire BSPCE) |
| **Single source of truth cap table** | 7b | Table de capitalisation | Supprimer versioning manuel (v1, v2, v3…) → historique intégré en base, diff automatique entre états |
| **Dossier complet par round AK** | 7b | Augmentation de capital | Workflow end-to-end : TS → redlines → DD → souscriptions → attestations PEA → PV réalisation → MAJ cap table → mini-pactes → CERFA |
| **CERFA dispositif fiscal par souscripteur** | 7b / 6 | Absent | Génération automatique CERFA individuels (IR-PME, Madelin, PEA-PME) avec attestations de libération |
| **Obligations convertibles bailleur public** | 2h + 7b | Financement structuré mentionné | Workflow spécifique OC bailleur public : avis décaissement, bulletin OCA, rapport Président, commissaire à la vérification, PV émission/réalisation |
| **Data room M&A pré-peuplée** | 8c Data Room | Mentionné | Structure template 10 catégories (Corporate/Finance/IT/IP/Legal/Litigation/Sales/Solution/Source/Subsidies), auto-alimentation depuis modules |
| **Completion accounts & waterfall M&A** | Manquant | Absent | Module spécifique sell-side : closing accounts, simulation prix, waterfall par classe d'actions, traitement BSPCE en cours |
| **Vigilance sous-traitants automatisée** | 7c | Mentionné | KYC automatisé : collecte Kbis + URSSAF + RC + fiscale, alertes renouvellement semestriel, tableau central |
| **IP multi-juridictions** | Manquant | Absent | Registre famille brevets par référence INPI, extensions internationales (PCT), suivi annuités multi-pays |
| **Reporting investisseurs multi-destinataires** | 3 / 8 | Mentionné | Distinction board VC / comité stratégique / bailleur public / reporting monthly vs quarterly |
| **Contentieux — expertise dommages** | 7e V3 | Absent | Workflow préalable procédure : mandat cabinet expertise, rapport évaluation préjudices, mise à jour taux actualisation |
| **Procédure judiciaire — gestion pièces** | 7e V3 | Absent | Bordereau communication pièces (BCP), numérotation pièces, suivi mémoires |
| **Documents d'identité mandataires** | 7a / 8d | Absent | Coffre-fort sécurisé CNI/passeports dirigeants, mandataires, alertes expiration passeports |
| **Operations avortées (traces)** | Manquant | Absent | Conservation traces rounds avortés (LOI, TS non signées) pour historique & audit DD ultérieure |

### 7.3 Nouveaux sous-modules proposés

| # | Sous-module | Placement | Description |
|---|---|---|---|
| **7b-enrichi** | **Rounds & opérations capital — workflow end-to-end** | Module 7b | Dossier complet par round (TS → DD → souscriptions → attestations → mini-pactes → CERFA → MAJ cap table) |
| **7f (nouveau)** | **M&A sell-side** | Module 7 | Module dédié cession : data room pré-peuplée, Q&A DD, completion accounts, waterfall, SPA, GAP, earn-out/escrow |
| **7g (nouveau)** | **IP & brevets** | Module 7 | Registre familles IP multi-juridictions, annuités, DPI inventeurs, cessions |
| **7h (nouveau)** | **Vigilance sous-traitants** | Module 7c | KYC automatisé, renouvellement semestriel URSSAF, alertes, tableau central |
| **7e-enrichi** | **Contentieux — expertise dommages & procédure** | Module 7e | Mandat expertise, rapports évaluation, BCP, pièces numérotées, mémoires |
| **8c-enrichi** | **Data room templatisée 10 catégories** | Module 8c | Template auto-peuplé depuis modules (Corporate/Finance/IT/IP/Legal/…) |

---

## 8. Volumes & patterns de travail déductibles

| Pattern | Observation |
|---|---|
| **Cap table** | Versionnée ~10 fois en 3-4 ans (fragile si pas de DB) |
| **Tranches BSPCE** | 1-2/an, ~20 bénéficiaires/tranche, ~10 documents/tranche |
| **Rounds AK** | 3-4 rounds sur 4-5 ans, dossier moyen ~30-50 fichiers |
| **NDA** | ~15 contreparties signées, cycle ponctuel (pre-deal) |
| **Sous-traitants** | ~10 actifs, obligation vigilance semestrielle |
| **Reporting investisseurs** | Monthly + quarterly + board ad hoc = ~15 livrables/an |
| **Contentieux** | 1-2 dossiers actifs, multi-années |
| **M&A** | Opération exceptionnelle mais data room massive (>200 docs) |

---

## 9. Sensibilité des données observées

| Niveau | Exemples | Stockage observé |
|---|---|---|
| **Très sensible** | CNI/passeports mandataires, IBAN comptes AK, mini-pactes signés | Drive Confidentiel (mais en clair) |
| **Sensible** | Pacte associés, SPA, GAP, waterfall, cap table, BSPCE bénéficiaires | Drive Confidentiel |
| **Confidentiel interne** | Rapports évaluation préjudices, DD questions, simulation prix cession | Drive Confidentiel |
| **Confidentiel externe** | NDA contreparties, contrats clients grands comptes | Drive opérationnel (accès restreint) |
| **Interne** | Contrats fournisseurs, SaaS, KYC sous-traitants | Drive opérationnel |
| **Public** | Kbis, statuts, attestations réglementaires | Drive opérationnel |

---

## 10. Recommandations consolidées pour PRD

### 10.1 Priorités V2 (rapprochement cap table + M&A)

1. **Module 7b enrichissement — Rounds & opérations capital end-to-end** (workflow complet depuis TS)
2. **Module 7f NOUVEAU — M&A sell-side** (data room, waterfall, completion accounts, BSPCE sortie)
3. **Module 8c enrichissement — Data room templatisée 10 catégories**

### 10.2 Priorités V3 (compliance & IP)

4. **Module 7g NOUVEAU — IP & brevets multi-juridictions**
5. **Module 7h NOUVEAU — Vigilance sous-traitants automatisée**
6. **Module 7e enrichissement — Contentieux expertise + procédure judiciaire**

### 10.3 Enrichissements transverses

- **Coffre-fort documents d'identité mandataires** (module 7a ou 8d)
- **Historique opérations avortées** (LOI, TS non signés)
- **CERFA fiscaux générés automatiquement** (IR-PME, PEA-PME)

---

*Fin de synthèse. Document produit {YYYY-MM-DD}.*
