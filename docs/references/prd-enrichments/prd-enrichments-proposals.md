# Propositions d'enrichissement du PRD AI CFO Lab

Basé sur l'observation terrain d'un dossier expert-comptable PME (groupe multi-entités).

Voir `cabinet-comptable-taxonomy.md` pour le détail de l'analyse source.

---

## 1. Module 4 — Comptabilité (enrichissements majeurs)

### 1.1 NOUVEAU : 4l — Dossier de justification bilan (leadsheets)

**Description** : Génération automatique du dossier justificatif par poste de bilan, structurant l'evidence nécessaire au CAC et à l'audit. Chaque compte de bilan fait l'objet d'une leadsheet dédiée.

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Génération automatique des leadsheets** | Une leadsheet par rubrique de bilan : immobilisations, créances clients, dettes fournisseurs, comptes courants, IC, emprunts, provisions, impôts, capitaux propres |
| **Templates par typologie** | Templates pré-remplis : rapprochement bancaire, balance âgée, tableau immos, cut-off, provisions congés, FNP/FAE, PCA/CCA |
| **Evidence automatique** | Attachement automatique des pièces justificatives (factures, relevés, contrats) à chaque leadsheet |
| **Dashboard de couverture** | Vue d'ensemble : % de postes bilan justifiés, postes en attente, anomalies détectées |
| **Export pour CAC** | Package complet téléchargeable (dossier zippé structuré, comme livré aux cabinets d'audit) |
| **Versionnage** | Historique des versions (WiP, validé, corrigé) avec piste d'audit |
| **Rapprochement N vs N-1** | Comparaison systématique avec la leadsheet de l'exercice précédent |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Génération leadsheet | 🟡 Auto + validation (pré-remplissage IA, revue comptable) |
| Evidence attachment | 🟢 100% auto (liens vers pièces déjà en base) |
| Détection anomalies | 🟢 100% auto (écarts vs N-1, soldes atypiques) |
| Validation finale | 🔴 Humain requis |

**Placement** : Juste après 4g (Clôture mensuelle) et 4h (États financiers annuels). À positionner en **4g bis** ou nouveau **4l**.

---

### 1.2 NOUVEAU : 4m — Intercompany & rebill (cycle IC)

**Description** : Gestion complète des flux intercompany pour les groupes multi-entités : refacturation mensuelle (rebill), TVA rebill annuel, réconciliation matching, documentation transfer pricing.

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Émission factures IC (rebill out)** | Génération automatique des factures de refacturation (services, management fees, coûts partagés) selon calendrier paramétré |
| **Réception factures IC (rebill in)** | Import automatique des factures reçues d'entités groupe, matching avec les attendus |
| **Cost plus worksheet** | Calculateur de prix de cession interne : base de coûts + marge contractuelle (typiquement 5-10%), traçabilité |
| **Matching automatique deux-entités** | Rapprochement automatique entre factures émises par entité A et reçues par entité B, avec détection des écarts |
| **TVA rebill annuel** | Rattrapage TVA de fin d'exercice sur les flux IC (ajustement si base finale ≠ base provisionnée) |
| **Calendrier de clôture IC** | Deadlines de remontée et d'imputation synchronisées entre entités du groupe |
| **Package transfer pricing** | Documentation prête pour contrôle fiscal : contrat intragroupe, méthode, benchmarks, études |
| **Réconciliation bilan IC** | Leadsheet dédiée IC : comptes courants entre entités soldés en fin d'exercice |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Émission factures IC récurrentes | 🟢 100% auto (selon contrats paramétrés) |
| Cost plus calcul | 🟢 100% auto (depuis analytique) |
| Matching | 🟡 95% auto (écarts > seuil remontés) |
| TVA rebill | 🟡 Auto + validation (calcul auto, comptable valide) |
| Documentation TP | 🔴 Humain requis (mise à jour annuelle) |

---

### 1.3 NOUVEAU : 4n — Allocations de coûts multi-entités / multi-projets

**Description** : Allocation automatique des charges transverses (infrastructure cloud, frais de siège, coûts R&D) entre entités du groupe et/ou projets selon clés de répartition paramétrables.

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Clés de répartition paramétrables** | Par headcount, par CA, par usage (nombre d'instances cloud), par forfait, par nombre de projets |
| **Journaux d'allocation récurrents** | OD mensuelles automatiques appliquant les clés en vigueur |
| **Traçabilité** | Chaque allocation documentée : coût source, clé appliquée, période, entités destinataires |
| **Reversion / correction** | Possibilité d'annuler et rejouer une allocation si paramètres modifiés |
| **Reporting par dimension** | Coûts réellement supportés par chaque entité / projet, après allocation |

**Exemple d'usage** : Une PME en groupe refacture les coûts AWS à ses filiales au prorata des instances utilisées, chaque mois, automatiquement.

---

### 1.4 ENRICHISSEMENT : 4b — Accounts Payable (AP)

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Vendor master file** | Référentiel fournisseurs centralisé : référencement KYC, IBAN validé, plafonds d'engagement, relations IC identifiées, statut actif/bloqué, historique |
| **Détection de doublons fournisseurs** | IA détecte les fournisseurs créés en double (variations de nom, SIREN identiques) |
| **Relations IC dans le master** | Flag "entité groupe" sur les fournisseurs IC pour traitement comptable dédié |
| **Saisies administratives (ATD)** | Gestion des avis à tiers détenteur reçus : blocage paiements, versement au Trésor, traçabilité |

---

### 1.5 ENRICHISSEMENT : 4c — Paie & charges sociales

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Paie étrangère / expatriés** | Intégration des bulletins au format étranger (UK, DE, US), conversion devise, harmonisation dans la compta FR |
| **Aides à l'embauche** | Suivi des contrats aidés (emploi-franc, POEC, CIE, apprentis) et des crédits de cotisations associés |
| **Subventions salariales** | Comptabilisation des aides reçues (DIRECCTE, Région, OPCO) imputées sur la paie |
| **Saisies sur salaire** | Gestion des saisies ATD reçues sur un salarié, calcul du solde disponible |

---

### 1.6 ENRICHISSEMENT : 4e — Immobilisations

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Rapprochement physique** | Workflow de rapprochement annuel entre registre comptable et inventaire physique (affectataire, localisation, état) |
| **Composants (approche par composants)** | Ventilation d'un actif en sous-composants ayant des durées d'amortissement différentes (obligatoire PCG > seuil) |
| **Attestation mise en service** | Workflow de validation MES pour les immos en cours (IMM en 23x → 2x) |

---

## 2. Module 6 — Impôts (enrichissements)

### 2.1 ENRICHISSEMENT : 6a — TVA

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **TVA rebill IC** | Workflow de rattrapage annuel de TVA sur flux intercompany |
| **Déclaration TVA groupe / consolidée** | Consolidation TVA des entités groupe si régime applicable |
| **Réconciliation TVA vs écritures** | Rapprochement automatique entre déclarations TVA et écritures comptables |

### 2.2 NOUVEAU : 6g — Transfer pricing (documentation)

**Description** : Documentation des prix de transfert entre entités du groupe, conforme aux exigences fiscales françaises (fichier principal + fichier local si seuils atteints).

| Fonctionnalité | Description |
|---|---|
| **Fichier principal (Master File)** | Description du groupe, stratégie TP, flux intragroupe (obligatoire CA > 50 M€) |
| **Fichier local (Local File)** | Détail des transactions de l'entité française, benchmarks comparables |
| **Déclaration 2257-SD** | Déclaration annuelle simplifiée (obligatoire seuils spécifiques) |
| **Contrats intragroupe** | Référentiel des contrats IC (services, licences, royalties, prêts) |
| **Benchmarks** | Études comparables externes attachées par type de transaction |

---

## 3. Module 2 — Cash Management (enrichissements)

### 3.1 NOUVEAU : 2g — Prêts d'honneur & engagements personnels

**Description** : Suivi distinct des prêts d'honneur accordés aux fondateurs/dirigeants (personnels, souvent à taux zéro) parfois reversés à la société, et autres engagements personnels.

| Fonctionnalité | Description |
|---|---|
| **Registre des prêts d'honneur** | Par bénéficiaire, organisme prêteur, montant, échéancier, garanties |
| **Distinct des emprunts société** | Engagements personnels, souvent en hors bilan société |
| **Documentation** | Acte, échéancier, modifications (moratoires, report Covid, etc.) |
| **Impact trésorerie indirect** | Si apports/remboursements via compte courant associé |

---

## 4. Module 8 — Audit & Compliance (enrichissements)

### 4.1 NOUVEAU : 8e — Circularisation tiers

**Description** : Génération automatique et suivi des demandes de confirmation de soldes envoyées aux tiers dans le cadre de l'audit annuel (procédure CAC obligatoire).

| Fonctionnalité | Description |
|---|---|
| **Circularisation bancaire** | Génération automatique des lettres de confirmation pour toutes les banques (soldes, emprunts, engagements, cautions) |
| **Circularisation clients** | Lettres de confirmation pour les clients top N (seuil paramétrable), statut envoyé/reçu |
| **Circularisation fournisseurs** | Lettres de confirmation pour fournisseurs top N |
| **Circularisation avocats** | Demande de déclaration des contentieux en cours et passifs potentiels |
| **Suivi des réponses** | Dashboard : envois, relances, réponses reçues, écarts identifiés |
| **Évidences pour le CAC** | Dossier complet téléchargeable (lettres + réponses) pour fichier d'audit |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Génération lettres | 🟢 100% auto (depuis référentiel tiers) |
| Envoi | 🟡 Auto + validation CAC (destinataires paramétrés par CAC) |
| Suivi réponses | 🟡 Auto + saisie (scan + IA pour extraction des réponses) |
| Écarts | 🟡 Auto + validation (IA compare réponse vs compta, humain qualifie l'écart) |

---

## 5. Workflow transverse — Onboarding / Migration cabinet comptable

**Description** : Nouveau parcours utilisateur pour les entreprises qui rejoignent la plateforme en cours d'année comptable, ayant travaillé avec un autre cabinet comptable auparavant.

**Étapes** :

1. **Récupération données ex-cabinet**
   - Upload FEC des 2 derniers exercices
   - Balance de sortie N-1 validée
   - Registre des immobilisations
   - Dossier de travail (leadsheets, provisions, engagements)
   - Liste fournisseurs/clients master
   - Échéanciers d'emprunts en cours
   - Dossiers fiscaux déposés (CIR, TVA, IS)

2. **Écriture d'à-nouveau (journal AN)**
   - Reprise automatique des soldes N-1 à l'ouverture N
   - Contrôle équilibre actif = passif
   - Validation DAF / expert-comptable

3. **Période de bascule (1-3 mois de double contrôle)**
   - Comparaison écritures plateforme vs ex-cabinet
   - Détection des écarts, corrections
   - Validation formelle de transition

4. **Archive transition**
   - Dossier "Justif transition" conservé
   - Accessible en permanence pour contrôle fiscal

**Placement** : Dans le **module 9 Virtual CFO** (9b Financial Memory) ou comme workflow transverse au module 4.

---

## 6. Impact sur les 3 entreprises démo

| Entreprise | Modules nouveaux applicables |
|---|---|
| **Propello (SaaS, ~25 sal.)** | 4l leadsheets, 4b vendor master, 8e circularisation |
| **Maison Nordique (e-commerce, ~15 sal.)** | 4l leadsheets, 4b vendor master, 4m IC (si groupe filiale), 8e circularisation, 4c aides embauche |
| **Mécaform (industrie, ~80 sal.)** | 4l leadsheets, 4b vendor master, 4m IC (cas PME structurée), 8e circularisation |

Propello et Mécaform peuvent illustrer les cas groupe / multi-entités. Maison Nordique reste sur les fondamentaux TPE/PME e-commerce.

---

## 7. Priorisation recommandée

| Priorité | Module | Justification |
|---|---|---|
| **P1 V2** | 4l Leadsheets | Cœur du processus de clôture annuelle, valeur client immédiate pour audit |
| **P1 V2** | 8e Circularisation tiers | Différenciant vs concurrents, charge CAC actuelle élevée |
| **P1 V2** | 4b Vendor master | Prérequis pour AP automation avancée |
| **P2 V2** | 4m Intercompany & rebill | Pertinent groupes uniquement, mais complexité non triviale |
| **P2 V2** | 4k Cost plus pricing | Lié au 4m, bonus transfer pricing |
| **P3 V3** | 4n Allocations de coûts | Sophistication, pas MVP |
| **P3 V3** | 6g Transfer pricing | Niche (seuils élevés) |
| **P3 V3** | 2g Prêts d'honneur | Cas particulier fondateurs |
| **P3 V3** | Migration cabinet | Feature d'onboarding, post-MVP |

---

*Fin des propositions.*
