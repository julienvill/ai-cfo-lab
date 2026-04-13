# SPEC — Cash Management

Module 2 de la plateforme AI-CFO-Lab. Couvre la gestion de tresorerie au sens large : prevision des flux, rapprochement bancaire, suivi de la dette, financements publics (BPI France), affacturage et, en V3, le cash pooling multi-entites. L'objectif est de donner au CFO une vision temps reel de la position de cash, d'anticiper les tensions et d'automatiser les taches a faible valeur ajoutee.

## Sous-modules

| ID  | Nom                      | Route                          | Description courte                                      |
|-----|--------------------------|--------------------------------|---------------------------------------------------------|
| 2a  | Cash Forecast            | /tresorerie                    | Plan glissant 13 semaines + 12 mois, scenarios, alertes |
| 2b  | Banque                   | /tresorerie/rapprochement-bancaire | Vue multi-banques, rapprochement automatique        |
| 2c  | Dette & emprunts         | /tresorerie/dette              | Registre emprunts, amortissement, covenants             |
| 2d  | Relations BPI France     | /tresorerie/bpi                | Financements BPI, echeancier, dossiers                  |
| 2e  | Affacturage / Dailly     | /tresorerie/affacturage        | Cessions de creances, impact tresorerie, cout           |
| 2f  | Cash pooling (V3)        | /tresorerie/cash-pooling       | Consolidation multi-entites, netting, equilibrage       |

---

### 2a — Cash Forecast

Description : Prevision de tresorerie glissante sur deux horizons (13 semaines operationnel, 12 mois strategique) avec simulation de scenarios contrastes. Fournit la position de cash en temps reel, le burn rate, le runway et des alertes de seuil configurables.

#### Fonctionnalites

| Fonctionnalite                        | Detail                                                                 |
|---------------------------------------|------------------------------------------------------------------------|
| Plan glissant 13 semaines             | Horizon court terme, mise a jour hebdomadaire ou a la demande          |
| Plan glissant 12 mois                 | Horizon annuel, granularite mensuelle                                  |
| 3 scenarios                           | Optimiste / Central / Pessimiste, parametrables                        |
| Position de cash temps reel           | Agregation des soldes bancaires en direct via connecteurs              |
| Burn rate & runway                    | Calcul automatique base sur les flux reels et previsionnels            |
| Alertes de seuil                      | Notifications configures par solde mini ou runway en jours             |
| Prevision encaissements               | Basee sur factures clients en attente (DSO), commandes, contrats recurrents |
| Prevision decaissements               | Basee sur factures fournisseurs, paie, echeances fiscales et sociales  |
| Analyse BFR                           | DSO, DPO, DIO calcules et visualises avec tendance                     |

#### Automatisation

| Tache automatisee                     | Methode                                                                |
|---------------------------------------|------------------------------------------------------------------------|
| Import flux reels                     | Synchronisation quotidienne via Bridge API / Qonto / Revolut           |
| Mise a jour previsions                | Recalcul a chaque nouveau flux ou facture enregistre                   |
| Detection ecart previsionnel          | Comparaison budget vs reel, alerte si ecart > seuil                    |
| Calcul DSO / DPO / DIO                | Formules automatiques sur la base des donnees comptables               |
| Envoi rapport hebdomadaire            | Email ou notification Slack avec synthese position + runway            |

---

### 2b — Banque

Description : Vue consolidee de tous les comptes bancaires de l'entreprise. Rapprochement automatique des ecritures, categorisation intelligente des transactions, detection d'anomalies et suivi des frais.

#### Fonctionnalites

| Fonctionnalite                        | Detail                                                                 |
|---------------------------------------|------------------------------------------------------------------------|
| Vue consolidee multi-banques          | Agregation de tous les comptes en un seul tableau de bord              |
| Rapprochement bancaire automatique    | Matching ecritures comptables <-> releves bancaires                    |
| Categorisation intelligente           | Classification des transactions par categorie via ML                   |
| Detection d'anomalies                 | Alertes sur transactions inhabituelles (montant, beneficiaire, heure)  |
| Suivi frais bancaires                 | Analyse des couts par banque, benchmark                                |
| Virements & prelevements              | Historique, statut, rapprochement                                      |
| Soldes intra-day                      | Mise a jour en cours de journee si connecteur temps reel disponible    |

#### Automatisation

| Tache automatisee                     | Methode                                                                |
|---------------------------------------|------------------------------------------------------------------------|
| Synchronisation bancaire              | Pull quotidien (ou temps reel) via Bridge API, Qonto, Revolut          |
| Rapprochement automatique             | Algorithme de matching par montant, date, reference                    |
| Suggestion de categorisation          | Modele entraine sur historique transactions                            |
| Alerte anomalie                       | Regles configures + scoring d'anomalie                                 |
| Export OFX / CSV                      | Generation automatique pour import comptable                           |

---

### 2c — Dette & emprunts

Description : Registre centralise de tous les emprunts en cours. Genere automatiquement les tableaux d'amortissement, suit le respect des covenants et integre les echeances dans la prevision de tresorerie.

#### Fonctionnalites

| Fonctionnalite                        | Detail                                                                 |
|---------------------------------------|------------------------------------------------------------------------|
| Registre des emprunts                 | Fiche par emprunt : preteur, montant, taux, duree, garanties           |
| Tableau d'amortissement               | Calcul automatique capital / interets / assurance par echeance         |
| Suivi des covenants                   | Indicateurs surveilles (ratio d'endettement, DSCR, EBITDA), alertes   |
| Echeancier de remboursement           | Vue calendrier avec integration dans le plan de tresorerie             |
| Simulation nouvel emprunt             | Calculateur d'impact sur cash et covenants avant souscription          |
| Comptabilisation automatique          | Generation des ecritures comptables pour chaque echeance               |

#### Automatisation

| Tache automatisee                     | Methode                                                                |
|---------------------------------------|------------------------------------------------------------------------|
| Calcul des echeances                  | Formule d'amortissement (lineaire ou in fine) calculee a la saisie     |
| Rappel d'echeance                     | Notification J-7 et J-1 avant echeance                                 |
| Calcul covenants                      | Recalcul automatique a chaque cloture de periode                       |
| Injection dans Cash Forecast          | Les echeances futures alimentent automatiquement le module 2a          |
| Generation ecritures comptables       | Export vers module comptabilite a chaque echeance validee              |

---

### 2d — Relations BPI France

Description : Centralise le suivi de tous les financements BPI France (prets, garanties, aides, subventions). Gere les echeanciers, les conditions d'utilisation et facilite la preparation des dossiers et reportings.

#### Fonctionnalites

| Fonctionnalite                        | Detail                                                                 |
|---------------------------------------|------------------------------------------------------------------------|
| Registre des financements BPI         | Fiche par financement : type, montant, conditions, statut              |
| Echeancier BPI                        | Tableau de remboursement et integration dans Cash Forecast             |
| Suivi des conditions d'utilisation    | Respect des obligations liees aux aides (emploi, R&D, etc.)           |
| Preparation des dossiers              | Templates de documents, checklist, historique des soumissions          |
| Reporting BPI                         | Generation des rapports periodiques exiges par BPI                     |

#### Automatisation

| Tache automatisee                     | Methode                                                                |
|---------------------------------------|------------------------------------------------------------------------|
| Alertes echeances & obligations       | Notifications preventives sur conditions et remboursements             |
| Integration Cash Forecast             | Echeances BPI injectees dans le plan de tresorerie 2a                  |
| Pre-remplissage reporting             | Extraction automatique des donnees depuis les autres modules           |
| Checklist dossier                     | Verification automatique de la completude avant soumission             |

---

### 2e — Affacturage / Dailly

Description : Gestion des cessions de creances commerciales dans le cadre d'un contrat d'affacturage ou d'une cession Dailly. Permet de selectionner les creances eligibles, de suivre les cessions et d'analyser l'impact tresorerie et le cout de financement.

#### Fonctionnalites

| Fonctionnalite                        | Detail                                                                 |
|---------------------------------------|------------------------------------------------------------------------|
| Selection des creances eligibles      | Filtrage automatique selon criteres du contrat (age, client, devise)   |
| Suivi des cessions                    | Statut par creance : cedee, financee, remboursee, litigieuse           |
| Impact tresorerie                     | Visualisation de l'acceleration d'encaissement par cession             |
| Reconciliation                        | Rapprochement des fonds recus avec les creances cedees                 |
| Cout comparatif                       | Calcul du taux de revient effectif vs alternative de financement       |

#### Automatisation

| Tache automatisee                     | Methode                                                                |
|---------------------------------------|------------------------------------------------------------------------|
| Detection creances eligibles          | Regles du contrat appliquees automatiquement au portefeuille factures  |
| Mise a jour statut cession            | Synchronisation avec le factor via export/import ou API si disponible  |
| Calcul cout de financement            | Formule appliquee automatiquement a chaque cession validee             |
| Integration Cash Forecast             | Les encaissements anticipes alimentent le plan de tresorerie 2a        |

---

### 2f — Cash pooling (V3)

Description : Consolidation de la tresorerie de plusieurs entites juridiques d'un meme groupe. Permet l'equilibrage automatique entre comptes, la gestion des conventions de tresorerie intra-groupe, le netting des flux et la production du reporting groupe.

#### Fonctionnalites

| Fonctionnalite                        | Detail                                                                 |
|---------------------------------------|------------------------------------------------------------------------|
| Vue consolidee multi-entites          | Agregation des positions de cash de toutes les entites du groupe       |
| Equilibrage automatique               | Sweep ou zero balancing entre comptes selon les regles definies        |
| Conventions de tresorerie             | Gestion des conventions intra-groupe (taux, plafonds, durees)          |
| Netting                               | Compensation des flux intra-groupe avant reglement externe             |
| Reporting groupe                      | Tableau de bord consolide, position nette, interets intra-groupe       |

#### Automatisation

| Tache automatisee                     | Methode                                                                |
|---------------------------------------|------------------------------------------------------------------------|
| Equilibrage automatique               | Regles configurees executees quotidiennement ou en temps reel          |
| Calcul interets intra-groupe          | Taux et periodicite definis dans la convention, calcul automatique     |
| Netting periodique                    | Compensation automatique selon periodicite (hebdo / mensuel)           |
| Reporting consolide                   | Agregation des donnees de toutes les entites pour le rapport groupe    |

---

## Entrees / Sorties par sous-module

### 2a — Cash Forecast

| | Detail |
|---|---|
| **Entrees** | Soldes bancaires temps reel (2b), echeancier clients — encaissements prevus (4a), echeancier fournisseurs — decaissements prevus (4b), echeancier paie — salaires nets + charges (4c), echeancier fiscal — TVA, IS, CFE (6a/6b/6d), remboursements d'emprunts (2c), prelevements recurrents (2b) |
| **Sorties** | Plan de tresorerie glissant (13 semaines + 12 mois), 3 scenarios (pessimiste/central/optimiste), burn rate net et brut, runway en mois, alertes de seuil, BFR (DSO + DPO + DIO) |
| **Dependances** | 2b, 2c, 4a, 4b, 4c, 6a, 6b, 6d |
| **Consommateurs** | 1 (Daily CFO), 3c (Scenario Planner), 3d (Reporting), 9c (Predictive Risk) |

### 2b — Banque

| | Detail |
|---|---|
| **Entrees** | Flux bancaires via connecteurs (Bridge API, Qonto, Revolut), ecritures comptables pour rapprochement (4) |
| **Sorties** | Vue consolidee multi-banques, soldes intra-day, mouvements categorises, rapprochements bancaires, anomalies detectees |
| **Dependances** | Connecteurs bancaires (Bridge, Qonto, Revolut) |
| **Consommateurs** | 2a (Cash Forecast), 4g (Cloture — bloc J+1 banque), 4f (Notes de frais) |

### 2c — Dette & emprunts

| | Detail |
|---|---|
| **Entrees** | Contrats d'emprunt (donnees manuelles ou 7c), donnees comptables (4), soldes bancaires (2b) |
| **Sorties** | Tableaux d'amortissement, echeancier de remboursement, suivi des covenants, ecritures comptables (interets/capital), alertes de covenant |
| **Dependances** | 4 (Comptabilite), 7c (Contrats) |
| **Consommateurs** | 2a (Cash Forecast), 4g (Cloture) |

### 2d — Relations BPI France

| | Detail |
|---|---|
| **Entrees** | Contrats BPI, donnees financieres (4), KPIs (3a), previsions (3b) |
| **Sorties** | Dossiers BPI pre-remplis, alertes echeances, reporting BPI |
| **Dependances** | 3 (Reports), 4 (Comptabilite) |
| **Consommateurs** | 2a (Cash Forecast) |

### 2e — Affacturage / Dailly

| | Detail |
|---|---|
| **Entrees** | Creances clients eligibles (4a), position de tresorerie (2a), conditions contractuelles |
| **Sorties** | Simulation d'impact tresorerie, suivi des cessions en cours, cout comparatif, ecritures comptables |
| **Dependances** | 4a (AR), 2a (Cash Forecast) |
| **Consommateurs** | 2a (Cash Forecast), 4 (Comptabilite) |

---

## Phasage

| Phase | Perimetre                          | Objectif                                                   |
|-------|------------------------------------|------------------------------------------------------------|
| MVP   | 2a Cash Forecast + 2b Banque + 2c Dette & emprunts | Couverture des besoins essentiels d'un CFO PME |
| V2    | 2d Relations BPI France + 2e Affacturage / Dailly  | Extension aux financements externes                |
| V3    | 2f Cash pooling                    | Groupes multi-entites                                      |

---

## Connecteurs

| Connecteur        | Usage                                           | Disponibilite |
|-------------------|-------------------------------------------------|---------------|
| Bridge API        | Agregation bancaire multi-etablissements        | MVP           |
| Qonto             | Synchronisation compte Qonto en temps reel      | MVP           |
| Revolut Business  | Synchronisation compte Revolut Business         | MVP           |
| BPI France (portail) | Import manuel des donnees BPI, pre-remplissage dossiers | V2   |
