# SPEC — Impots

Gestion de l'ensemble des obligations fiscales francaises : calcul, declaration, paiement et optimisation. La plateforme calcule automatiquement, prepare les declarations et alerte sur les echeances — l'humain valide avant soumission.

---

## Sous-modules

| #   | Nom                          | Route                        | Description                                                      |
|-----|------------------------------|------------------------------|------------------------------------------------------------------|
| 6a  | TVA                          | impots/tva                   | Calcul, declaration CA3, TVA intracommunautaire, DEB/EMEBI       |
| 6b  | CFE/CVAE                     | impots/cfe-cvae              | Taxes locales, plafonnement CET, acomptes et declarations        |
| 6c  | CIR                          | impots/cir                   | Credit Impot Recherche : projets R&D, temps, assiette, dossier   |
| 6d  | IS                           | impots/is                    | Impot sur les societes, acomptes, liasse fiscale, credits impot  |
| 6e  | Participation / Interessement| impots/participation         | Reserve legale, accord interessement, PEE/PERCOL, declarations   |
| 6f  | Preparation controle fiscal  | impots/controle-fiscal       | Scoring risque IA, pre-audit, dossier FEC, suivi procedure       |

---

## Detail des sous-modules

---

### 6a — TVA

**Description**

Gestion complete de la TVA francaise et intracommunautaire : calcul automatique de la TVA collectee, deductible et a reverser, preparation des declarations CA3 mensuelles ou trimestrielles, traitement de l'autoliquidation intracommunautaire, suivi DEB/EMEBI, controle de coherence avec le chiffre d'affaires, echeancier des paiements et gestion des credits de TVA remboursables.

**Fonctionnalites**

| Fonctionnalite                         | Detail                                                                 |
|----------------------------------------|------------------------------------------------------------------------|
| Calcul TVA collectee/deductible        | Par taux (20 %, 10 %, 5.5 %, 2.1 %), par periode                      |
| TVA a reverser                         | Collectee - deductible, ajuste des reports precedents                  |
| Declaration CA3                        | Mensuelle ou trimestrielle selon regime                                |
| TVA intracommunautaire                 | Autoliquidation acquisitions et prestations de services                |
| DEB / EMEBI                            | Declaration d'echanges de biens, introduction et expedition            |
| Controle coherence CA                  | Rapprochement TVA declaree vs CA comptable                             |
| Echeancier paiements                   | Alertes avant echeances, historique des paiements                      |
| Credit TVA remboursement               | Suivi solde crediteur, demande de remboursement (3519)                 |

**Automatisation**

| Action automatique                     | Declencheur                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| Calcul TVA nette periode               | Cloture periode comptable                                              |
| Pre-remplissage CA3                    | Fin de mois / fin de trimestre                                         |
| Alerte echeance declaration            | J-10 avant date limite                                                 |
| Alerte echeance paiement               | J-5 avant date limite                                                  |
| Detection anomalie coherence CA        | Variation >5 % TVA/CA vs periode N-1                                   |
| Signal credit remboursable             | Solde crediteur >= 760 EUR pendant 2 periodes consecutives             |

---

### 6b — CFE / CVAE

**Description**

Gestion de la Contribution Economique Territoriale : calcul de la CFE sur la valeur locative des etablissements, calcul de la CVAE sur la valeur ajoutee, plafonnement du CET a 1.625 % de la valeur ajoutee, suivi de l'echeancier des acomptes (juin et septembre) et du solde (decembre), preparation des declarations 1447-C et 1330-CVAE.

**Fonctionnalites**

| Fonctionnalite                         | Detail                                                                 |
|----------------------------------------|------------------------------------------------------------------------|
| Calcul CFE                             | Base valeur locative par etablissement, taux commune                   |
| Calcul CVAE                            | Valeur ajoutee fiscale, taux progressif selon CA                       |
| Plafonnement CET                       | Seuil 1.625 % de la valeur ajoutee, demande de degrevement             |
| Echeancier acomptes CFE                | Acompte 50 % en juin, solde en decembre                                |
| Echeancier acomptes CVAE               | Acomptes avril et octobre (>= 3 000 EUR), solde mai N+1                |
| Declaration 1447-C                     | CFE annuelle, pre-remplissage automatique                              |
| Declaration 1330-CVAE                  | CVAE annuelle, pre-remplissage automatique                             |
| Historique par etablissement           | Suivi pluriannuel des bases et taux                                    |

**Automatisation**

| Action automatique                     | Declencheur                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| Estimation CFE/CVAE N                  | Cloture exercice N-1                                                   |
| Alerte acompte CFE juin                | J-15 avant le 15 juin                                                  |
| Alerte acompte CVAE                    | J-15 avant echeances avril/octobre                                     |
| Alerte solde decembre                  | J-15 avant le 15 decembre                                              |
| Calcul plafonnement CET                | Disponibilite valeur ajoutee fiscale definitive                        |
| Pre-remplissage declarations           | Ouverture campagne declarative                                         |

---

### 6c — CIR

**Description**

Credit Impot Recherche : referentiel complet des projets R&D et des collaborateurs eligibles, suivi des temps par projet, controles automatiques de coherence, calcul de l'assiette CIR, workflow de validation multi-niveaux, lien avec les immobilisations (production immobilisee), preparation du dossier justificatif et pre-remplissage du formulaire 2069-A.

> **Note** : Ce sous-module dispose d'une spec detaillee dans `cir/SPEC.md`

**Fonctionnalites**

| Fonctionnalite                         | Detail                                                                 |
|----------------------------------------|------------------------------------------------------------------------|
| Referentiel projets R&D                | Fiche par projet : description, verrous technologiques, etat de l'art, qualification MESRI |
| Referentiel collaborateurs             | Cout charge, qualification, eligibilite CIR par personne               |
| Suivi des temps                        | Fractions 1.0 / 0.5 / 0.25 j/jour, contrainte <= 1.0 j/jour           |
| Calcul assiette CIR                    | Personnel + forfait 43 % + sous-traitance + amortissements R&D + brevets |
| Workflow validation                    | Ingenieur -> Manager -> DAF avant soumission                           |
| Production immobilisee                 | Lien R&D -> immobilisations 203/232                                    |
| Dossier justificatif                   | Fiches techniques generees avec assistance IA                          |
| Formulaire 2069-A                      | Pre-rempli automatiquement, export PDF                                 |
| Rescrit fiscal                         | Preparation dossier rescrit, suivi procedure                           |

**Controles automatiques**

| Controle                               | Regle                                                                  |
|----------------------------------------|------------------------------------------------------------------------|
| Coherence temps / travaille            | Temps CIR <= temps contractuel du collaborateur                        |
| Reconciliation paie                    | Couts CIR vs masses salariales comptabilisees                          |
| Ventilation 100 %                      | Totalite du temps declare ventilee sur des projets                     |
| Alerte taux charge R&D eleve           | Alerte si taux R&D > 90 % du temps d'un collaborateur                 |

**Automatisation**

| Action automatique                     | Declencheur                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| Calcul assiette provisoire             | Fin de chaque mois                                                     |
| Controles coherence                    | Saisie ou import de temps                                              |
| Generation fiches techniques IA        | Demande manuelle ou cloture exercice                                   |
| Pre-remplissage 2069-A                 | Cloture exercice                                                       |
| Alerte depot declaration               | J-15 avant echeance liasse fiscale                                     |

---

### 6d — IS

**Description**

Gestion de l'impot sur les societes : calcul du resultat fiscal avec reintegrations et deductions, application du taux normal 25 % et du taux reduit PME 15 % sur les 42 500 premiers euros, suivi des acomptes trimestriels, provision mensuelle 1/12e, liquidation du solde via le formulaire 2572, gestion du carry-back et du report en avant des deficits, integration des credits d'impot (CIR, CII, CICE) et preparation de la liasse fiscale 2050-2059.

**Fonctionnalites**

| Fonctionnalite                         | Detail                                                                 |
|----------------------------------------|------------------------------------------------------------------------|
| Resultat fiscal                        | Reintegrations et deductions extra-comptables par poste                |
| Calcul IS                              | Taux 25 % + taux reduit PME 15 % sur 42 500 EUR                        |
| Acomptes trimestriels                  | Mars, juin, septembre, decembre                                        |
| Provision mensuelle                    | 1/12e de l'IS estime, ajuste en cours d'annee                          |
| Liquidation solde                      | Formulaire 2572, paiement au plus tard le 15 du 4e mois post-cloture   |
| Carry-back                             | Report en arriere sur N-1, remboursement creance                       |
| Report deficits en avant               | Suivi stock deficits reportables, plafond 1M EUR + 50 %                |
| Credits d'impot                        | Imputation CIR, CII, CICE sur IS du                                    |
| Liasse fiscale                         | Formulaires 2050 a 2059, pre-remplissage automatique                   |

**Automatisation**

| Action automatique                     | Declencheur                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| Mise a jour provision IS               | Cloture mensuelle                                                      |
| Calcul acompte trimestriel             | J-15 avant echeance (15 mars, 15 juin, 15 sept., 15 dec.)             |
| Alerte echeance acompte                | J-10 avant echeance                                                    |
| Calcul resultat fiscal provisionnel    | Cloture exercice comptable                                             |
| Pre-remplissage liasse fiscale         | Disponibilite bilan definitif                                          |
| Alerte depot liasse + paiement solde   | J-15 avant echeance                                                    |
| Detection deficit reportable           | IS calcule negatif                                                     |

---

### 6e — Participation / Interessement

**Description**

Calcul et gestion de la participation aux benefices et de l'interessement : application de la formule legale de la reserve de participation, simulation d'impact, repartition individuelle, suivi des accords d'interessement, versement sur PEE et PERCOL, calcul du forfait social, preparation des declarations DREETS.

**Fonctionnalites**

| Fonctionnalite                         | Detail                                                                 |
|----------------------------------------|------------------------------------------------------------------------|
| Calcul reserve participation           | Formule : 1/2 * (B - 5 % * C) * S / VA                                |
| Simulation impact                      | Scenarios sur hypotheses de resultat, masse salariale, VA              |
| Repartition individuelle               | Pro rata salaire et/ou presence, plafond 3/4 du PASS                  |
| Accord interessement                   | Suivi accord (duree, formule, objectifs), historique                   |
| Versement PEE / PERCOL                 | Affectation individuelle, delai 15 jours                               |
| Forfait social                         | Calcul 20 % (participation) / 0 % PME < 50 salaries (interessement)   |
| Declarations DREETS                    | Depot accord interessement, declaration annuelle participation         |

**Automatisation**

| Action automatique                     | Declencheur                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| Calcul reserve participation           | Disponibilite resultat fiscal N                                        |
| Simulation scenarios                   | Mise a jour hypotheses budgetaires                                     |
| Calcul forfait social                  | Validation montants participation/interessement                        |
| Alerte delai versement                 | J-1 avant expiration delai legal 15 jours                              |
| Generation avis individuels            | Validation repartition par DAF                                         |
| Alerte depot declarations DREETS       | J-15 avant echeance                                                    |

---

### 6f — Preparation controle fiscal (V3)

**Description**

Module de preparation proactive aux controles fiscaux : scoring de risque par poste via IA, simulation de pre-audit interne, constitution automatique du dossier de controle (FEC certifie, grand livre, balance, pieces justificatives), documentation des choix fiscaux, suivi de la procedure en cas de controle, historique des controles passes.

**Fonctionnalites**

| Fonctionnalite                         | Detail                                                                 |
|----------------------------------------|------------------------------------------------------------------------|
| Scoring risque fiscal IA               | Analyse par poste : CIR, prix de transfert, TVA intra, provisions      |
| Pre-audit interne                      | Simulation des verifications probables, liste des points sensibles     |
| Dossier controle automatique           | FEC certifie, grand livre, balance, pieces justificatives associees    |
| Documentation choix fiscaux            | Memo par option exercee (amortissement, provisions, regimes)           |
| Suivi procedure controle               | Etapes, delais, interlocuteurs, courriers                              |
| Historique controles                   | Redressements, accords, jurisprudence interne                          |

**Automatisation**

| Action automatique                     | Declencheur                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| Mise a jour scoring risque             | Cloture exercice ou modification declaration                           |
| Generation FEC certifie                | Demande manuelle ou ouverture procedure controle                       |
| Alerte poste risque eleve              | Score risque > seuil parametre                                         |
| Constitution dossier controle          | Notification ouverture controle fiscal                                 |

---

## Entrees / Sorties par sous-module

### 6a — TVA

| | Detail |
|---|---|
| **Entrees** | Ecritures comptables de ventes et achats (4a/4b), TVA sur notes de frais (4f), TVA intracommunautaire |
| **Sorties** | Declaration CA3 pre-remplie, TVA collectee/deductible/a reverser, credit de TVA, alertes echeances, etat recapitulatif (DEB/EMEBI) |
| **Dependances** | 4a (AR), 4b (AP), 4f (Notes de frais) |
| **Consommateurs** | 2a (Cash Forecast — decaissements TVA), 4g (Cloture — bloc J+5 impots) |

### 6b — CFE / CVAE

| | Detail |
|---|---|
| **Entrees** | Valeur ajoutee (4 — donnees comptables), valeur locative des biens, effectifs |
| **Sorties** | Calcul CFE et CVAE, plafonnement CET, echeancier (acomptes + solde), declarations pre-remplies (1447-C, 1330-CVAE) |
| **Dependances** | 4 (Comptabilite) |
| **Consommateurs** | 2a (Cash Forecast), 4g (Cloture) |

### 6c — CIR

| | Detail |
|---|---|
| **Entrees** | Suivi des temps R&D par projet (5f), donnees de paie des chercheurs (4c), amortissements equipements R&D (4e), contrats sous-traitance (7c), brevets |
| **Sorties** | Assiette CIR calculee (personnel + forfait 43% + sous-traitance + amortissements + brevets), formulaire 2069-A pre-rempli, fiches techniques par projet (assistance IA), dossier justificatif complet, alertes controle (coherence temps, taux > 90%) |
| **Dependances** | 4c (Paie), 4e (Immobilisations), 5f (Temps), 7c (Contrats) |
| **Consommateurs** | 6d (IS — credit impot a imputer), 4e (Immobilisations — production immobilisee R&D) |

### 6d — IS

| | Detail |
|---|---|
| **Entrees** | Resultat comptable (4g/4h), retraitements fiscaux (reintegrations/deductions), CIR a imputer (6c), deficits reportables |
| **Sorties** | Resultat fiscal, IS calcule (taux normal 25% / reduit PME 15%), acomptes trimestriels, provision mensuelle (1/12e), releve de solde, liasse fiscale (contribution CERFA) |
| **Dependances** | 4g (Cloture), 4h (Etats financiers), 6c (CIR) |
| **Consommateurs** | 2a (Cash Forecast — decaissements IS), 4g (Cloture — provision IS), 4h (Etats financiers) |

### 6e — Participation / Interessement

| | Detail |
|---|---|
| **Entrees** | Resultat comptable (4), capitaux propres, masse salariale (4c), accords participation/interessement, effectifs (5c) |
| **Sorties** | Reserve de participation calculee, repartition individuelle, simulation impact, forfait social, declarations, versements |
| **Dependances** | 4 (Comptabilite), 4c (Paie), 5c (Admin personnel), 5i (Remuneration) |
| **Consommateurs** | 4g (Cloture — provision participation) |

---

## Phasage

| Phase | Sous-modules inclus                          | Objectif                                                  |
|-------|----------------------------------------------|-----------------------------------------------------------|
| MVP   | 6a TVA + 6d IS                               | Couverture des deux obligations fiscales principales      |
| V2    | 6b CFE/CVAE + 6c CIR + 6e Participation      | Extension aux taxes locales, credit impot, partage valeur |
| V3    | 6f Preparation controle fiscal               | Intelligence fiscale preventive et gestion de crise       |

---

## Connecteurs

| Connecteur                             | Usage                                                                  |
|----------------------------------------|------------------------------------------------------------------------|
| Impots.gouv — EDI / API                | Teledeclaration CA3, liasse fiscale, 2069-A, 2572, paiements          |
| URSSAF / net-entreprises               | Declarations sociales liees (forfait social, participation)            |
| Module Comptabilite (interne)          | Import FEC, balance, grand livre, ecritures de cloture                 |
| Module Paie (interne)                  | Masses salariales, couts charges pour CIR, participation, CVAE        |
| Module Immobilisations (interne)       | Amortissements R&D pour assiette CIR, production immobilisee          |
