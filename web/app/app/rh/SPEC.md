# SPEC — RH

Gestion des ressources humaines couvrant les obligations legales francaises et les processus RH
operationnels. Automatiser l'administration RH courante pour permettre a une seule personne de
gerer l'ensemble.

---

## Table des sous-modules

| ID  | Nom                          | Phase |
|-----|------------------------------|-------|
| 5a  | CSE                          | V2    |
| 5b  | BDESE                        | MVP   |
| 5c  | Admin personnel              | MVP   |
| 5d  | Recrutement                  | V2    |
| 5e  | Onboarding / Offboarding     | V2    |
| 5f  | Temps & absences             | MVP   |
| 5g  | Formation                    | V2    |
| 5h  | Entretiens annuels           | V2    |
| 5i  | Remuneration & avantages     | V2    |
| 5j  | Index egalite F/H            | V2    |
| 5k  | Sante securite DUERP         | V3    |

---

## Sous-modules

### 5a — CSE

Gestion du Comite Social et Economique : representation du personnel, heures de delegation,
consultations obligatoires et budgets legaux.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Registre des elus                     | Mandat, college, heures delegation, coordonnees           |
| Suivi heures delegation               | Compteur mensuel par elu, alertes depassement             |
| Calendrier reunions                   | Planification ordinaire et extraordinaire                 |
| 3 consultations obligatoires          | Orientations strategiques, situation eco, politique sociale|
| Budget fonctionnement                 | 0,20 % de la masse salariale, suivi consommation          |
| Budget ASC                            | Activites sociales et culturelles, suivi consommation     |
| PV reunions                           | Generation automatique par IA                             |
| Elections professionnelles            | Calendrier, protocole, depouillement, affichage resultats |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Debut de mandat                       | Creation fiche elu, calcul credit heures                  |
| J-15 reunion ordinaire                | Envoi convocation + ordre du jour                         |
| Fin de mois                           | Rapport consommation heures delegation                    |
| Cloture reunion                       | Projet PV genere par IA pour relecture                    |
| Seuil budget atteint (80 %)           | Alerte tresorier CSE + DRH                                |

---

### 5b — BDESE

Base de Donnees Economiques, Sociales et Environnementales : 131 indicateurs reglementaires
mis a disposition des elus du CSE.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| 131 indicateurs reglementaires        | Conformes au decret du 26 aout 2022                       |
| 10 rubriques                          | Investissement, egalite, formation, relations sociales…   |
| Alimentation multi-sources            | Paie, comptabilite, RH, module formation                  |
| Comparatif N / N-1 / N-2             | Evolution sur 3 ans, graphiques                           |
| Checklist completude                  | Indicateurs manquants, taux de remplissage                |
| Mise a disposition elus               | Acces securise, journal de consultation                   |
| Export PDF                            | Rapport complet ou par rubrique                           |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Cloture de paie mensuelle             | Mise a jour automatique des indicateurs paie              |
| Cloture comptable                     | Mise a jour indicateurs financiers                        |
| Consultation CSE planifiee            | Rappel completude + generation rapport PDF                |
| Indicateur incomplet J-30 consultation| Alerte DRH avec liste des donnees manquantes              |

---

### 5c — Admin personnel

Dossier numerique du salarie, registre du personnel et formalites administratives de l'entree
a la sortie.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Dossier salarie                       | Documents, historique, acces role                         |
| Registre unique du personnel          | Conforme L.1221-13, export PDF                            |
| DPAE                                  | Declaration pre-embauche URSSAF                           |
| Contrats de travail automatiques      | CDI, CDD, alternance, stage — modeles parametrables       |
| Avenants                              | Generation automatique sur modification fiche             |
| Visites medicales                     | Embauche, periodique, reprise — suivi et alertes          |
| Affiliations mutuelle / prevoyance    | Adhesion, radiation, portabilite                          |
| Documents fin de contrat              | Solde tout compte, certificat travail, attestation France Travail |
| Organigramme                          | Generation automatique depuis la base salaries            |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Creation salarie                      | DPAE, contrat pre-rempli, checklist administrateur        |
| J-30 visite medicale                  | Rappel gestionnaire RH + salarie                          |
| Modification salaire / poste          | Avenant pre-rempli a valider                              |
| Date fin contrat CDD                  | Rappel renouvellement ou generation documents de sortie   |
| Rupture contrat                       | Pack documents de fin de contrat genere automatiquement   |

---

### 5d — Recrutement

Gestion du cycle de recrutement de la redaction de la fiche de poste jusqu'a l'integration,
avec conformite OETH.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Fiche de poste IA                     | Generation depuis metier + competences + niveau           |
| Diffusion jobboards                   | LinkedIn, France Travail, Indeed — multiposting           |
| Pipeline kanban                       | Colonnes personnalisables, statut candidature             |
| Pre-qualification IA CV               | Scoring automatique vs. criteres poste                    |
| Planification entretiens              | Lien agenda, confirmation automatique                     |
| Grille d'evaluation                   | Criteres par competence, consolidation notes              |
| KPIs recrutement                      | TTFH, cout par recrutement, taux conversion, source       |
| Vivier candidats                      | Base de rappel avec consentement RGPD                     |
| Conformite OETH                       | Suivi taux emploi travailleurs handicapes                 |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Ouverture poste validee               | Publication multi-jobboards + notification equipe RH      |
| Reception CV                          | Scoring IA + placement dans pipeline                      |
| Passage etape pipeline                | Email candidat personnalise                               |
| Entretien confirme                    | Invitation agenda + guide entretien envoye au recruteur   |
| Cloture recrutement                   | Rapport KPIs + integration vivier refus                   |

---

### 5e — Onboarding / Offboarding

Parcours structures d'integration et de depart pour maximiser l'engagement et securiser les
obligations legales.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Parcours onboarding J1 / S1 / M1 / M3| Checklist par etape, responsable, statut                  |
| Kit bienvenue                         | Documents, acces, materiel — livret accueil genere        |
| Rapport d'etonnement                  | Formulaire structure, collecte a M1                       |
| Suivi periode d'essai                 | Alertes renouvellement et confirmation                    |
| Parcours offboarding                  | Restitution materiel, acces, transfert connaissance       |
| Entretien de depart IA                | Guide questions, synthese anonymisee                      |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Contrat signe                         | Lancement parcours onboarding, creation acces IT          |
| J-1 arrivee                           | Envoi kit bienvenue salarie + notification manager        |
| M1 arrivee                            | Envoi formulaire rapport d'etonnement                     |
| J-5 fin periode essai                 | Alerte manager : confirmer ou rompre                      |
| Date depart confirmee                 | Lancement checklist offboarding                           |

---

### 5f — Temps & absences

Suivi du temps de travail, gestion de tous les types d'absence et export vers la paie.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Suivi temps travail                   | 35h hebdo et forfait jours                                |
| Gestion conges                        | CP, RTT, anciennete, fractionnement                       |
| Absences maladie / AT                 | Arrets, IJSS, subrogation, declaration AT                 |
| Heures supplementaires               | Compteur, majorations, repos compensateur                 |
| Teletravail                           | Demande, validation, reporting fiscal                     |
| Planning equipe                       | Vue semaine/mois, chevauchements                          |
| Tableau de bord absenteisme           | Taux, motifs, comparatif services                         |
| CET                                   | Compte epargne-temps, alimentation, utilisation           |
| Export paie                           | Variables paie formatees Silae / PayFit / Lucca           |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Demande conge soumise                 | Verification solde + notification manager                 |
| Conge approuve / refuse               | Email salarie + mise a jour planning                      |
| Reception arret maladie               | Declaration IJSS CPAM + alerte paie subrogation           |
| Fin de mois                           | Calcul variables paie + export vers logiciel paie         |
| Seuil absenteisme depasse             | Alerte DRH avec rapport detail service                    |

---

### 5g — Formation

Plan de developpement des competences, suivi des obligations legales et gestion du budget
OPCO.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Plan de formation                     | Actions, priorites, budget previsionnel / reel            |
| Entretien professionnel 2 ans         | Planification, trame, suivi                               |
| Bilan 6 ans                           | 3 criteres legaux : EP tenu, formation suivie, evolution  |
| Budget formation                      | Suivi engagement / realise, ventilation par axe           |
| Relations OPCO                        | Demandes prise en charge, suivi remboursements            |
| Catalogue formations IA               | Suggestions personnalisees par metier / competence        |
| CPF                                   | Information salaries, co-investissement                   |
| Reporting                             | Bilan social, 2483, indicateurs BDESE                     |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| 24 mois sans EP                       | Alerte manager + creation rdv automatique                 |
| 6 ans (bilan)                         | Rapport automatique 3 criteres par salarie                |
| Formation validee                     | Demande prise en charge OPCO generee                      |
| Remboursement OPCO recu               | Mise a jour budget reel automatique                       |
| Fin d'annee                           | Rapport bilan formation + projection budget N+1           |

---

### 5h — Entretiens annuels

Campagne d'evaluation des collaborateurs, fixation des objectifs et people review.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Campagne entretiens                   | Lancement, echances, taux completion                      |
| Grille d'evaluation                   | Competences, comportements, resultats — parametrable      |
| Objectifs                             | SMART, pondere, suivi avancement                          |
| Auto-evaluation                       | Formulaire salarie avant entretien manager                |
| Calibration / people review           | Matrice 9 boxes, consolidation equipe                     |
| Plan de developpement                 | Actions issues de l'entretien, suivi                      |
| Analytics                             | Distribution notes, ecarts auto/manager, tendances        |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Lancement campagne                    | Invitations envoyees (salaries + managers)                |
| J-7 echeance                          | Relance automatique non-completions                       |
| Auto-evaluation soumise               | Notification manager pour planifier entretien             |
| Entretien clos                        | Plan developpement cree + notification formation          |
| Cloture campagne                      | Rapport analytics + export people review                  |

---

### 5i — Remuneration & avantages

Politique salariale, benchmark, revue annuelle, epargne salariale et gestion complete des
avantages salaries.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Grilles salariales                    | Par niveau / filiere, fourchettes, midpoint               |
| Benchmark                             | Comparatif marche (import enquetes salariales)            |
| Revue salariale                       | Simulation enveloppe, recommandations, validation         |
| NAO                                   | Suivi negociations, PV, affichage obligations             |
| Variable / bonus                      | Regles calcul, simulation, validation                     |
| Simulation impact P&L                 | Cout total employeur avant decision                       |
| Epargne salariale PEE / PERCOL        | Abondement, versements, tableau de bord                   |
| Titres restaurant                     | Attribution, commande, suivi solde                        |
| Transport                             | Remboursement 50 %, forfait mobilite durable              |
| Cheques vacances                      | Attribution, valeur faciale, financement                  |
| Avantages CCN                         | Primes conventionnelles selon convention collective       |
| Avantages negocies                    | Accords d'entreprise specifiques                          |
| Avantages en nature                   | Vehicule, logement, outil — valorisation fiscale          |
| Registre avantages                    | Synthese par salarie, cout total                          |
| Cout total employeur                  | Salaire brut + charges + avantages + epargne salariale    |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Lancement revue salariale             | Pre-remplissage recommandations depuis benchmark          |
| Validation augmentation               | Avenant genere + mise a jour fiche paie                   |
| Calendrier NAO                        | Rappel obligations legales + generation convocations      |
| Cloture bilan social                  | Export indicateurs remuneration vers BDESE                |
| Seuil P&L depasse                     | Alerte DRH + simulation ajustements                       |

---

### 5j — Index egalite F/H

Calcul et publication de l'index egalite professionnelle femmes-hommes (obligatoire >= 50 sal.).

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| Indicateur 1 : ecart remuneration     | /40 points — ecart global par tranche d'age / CSP        |
| Indicateur 2 : ecart augmentations    | /20 points                                                |
| Indicateur 3 : ecart promotions       | /15 points                                                |
| Indicateur 4 : augmentations retour conge mat. | /15 points                                       |
| Indicateur 5 : hauts salaires         | /10 points — presence F parmi 10 plus hautes remunerations|
| Score global /100                     | Calcul automatique, comparatif N-1                        |
| Objectifs de progression              | Obligatoires si score < 75, suivi annuel                  |
| Publication obligatoire               | Export DARES + affichage site internet                    |
| Historique                            | Suivi evolution sur 5 ans                                 |
| Simulation                            | Impact mesures correctives sur score                      |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Cloture annee civile                  | Calcul automatique des 5 indicateurs                      |
| Score < 75                            | Generation plan d'action obligatoire                      |
| 1er mars                              | Rappel publication obligatoire DARES                      |
| Mesure corrective validee             | Mise a jour simulation impact score                       |

---

### 5k — Sante securite DUERP

Document Unique d'Evaluation des Risques Professionnels, sante au travail et prevention.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                    |
|---------------------------------------|-----------------------------------------------------------|
| DUERP                                 | Obligatoire des le 1er salarie, conservation 40 ans       |
| Mise a jour annuelle                  | Workflow validation, versioning, archivage                |
| Declaration AT / MP                   | CERFA 14463*03, transmission CPAM, suivi                  |
| Visites medicales                     | Suivi VIMT, VIP, VIPP — alertes echeances                 |
| Risques psychosociaux                 | Questionnaire RPS, cartographie, plan d'action            |
| Referent harcelement                  | Designation, formation, procedures                        |
| Plan de prevention                    | Interventions entreprises exterieures                     |
| C2P                                   | Compte professionnel prevention — facteurs suivi          |

**Automatisation**

| Declencheur                           | Action automatique                                        |
|---------------------------------------|-----------------------------------------------------------|
| Anniversaire annuel                   | Rappel mise a jour DUERP obligatoire                      |
| Declaration AT                        | Pre-remplissage CERFA + transmission CPAM                 |
| J-30 visite medicale                  | Rappel salarie + gestionnaire RH                          |
| Nouveau risque identifie              | Mise a jour DUERP + notification referent securite        |
| Changement poste                      | Verification exposition facteurs C2P                      |

---

## Entrees / Sorties par sous-module

### 5a — CSE

| | Detail |
|---|---|
| **Entrees** | Effectifs et registre du personnel (5c), donnees financieres (4 — consultations obligatoires), masse salariale (4c), heures de delegation saisies |
| **Sorties** | PV de reunions, consultations preparees (strategie, situation eco/fin, politique sociale), budgets CSE (fonctionnement + ASC), alertes heures delegation |
| **Dependances** | 4 (Comptabilite), 5c (Admin personnel), 4c (Paie) |
| **Consommateurs** | 5b (BDESE), 5i (Remuneration — accords CSE) |

### 5b — BDESE

| | Detail |
|---|---|
| **Entrees** | Donnees comptables (4), donnees de paie (4c), effectifs et donnees RH (5c), donnees fiscales (6), donnees CSE (5a), formations (5g), temps de travail (5f) |
| **Sorties** | Rapport BDESE complet (131 indicateurs, 10 rubriques), comparatif N/N-1/N-2, checklist completude, exports PDF |
| **Dependances** | 4 (Comptabilite), 4c (Paie), 5a (CSE), 5c (Admin personnel), 5f (Temps), 5g (Formation), 6 (Impots) |
| **Consommateurs** | 5a (CSE — mise a disposition), 8d (Conformite) |

### 5c — Admin personnel

| | Detail |
|---|---|
| **Entrees** | Donnees embauche (saisie manuelle ou connecteurs SIRH), contrats, avenants, donnees visite medicale |
| **Sorties** | Dossiers salaries complets, registre unique du personnel, DPAE, contrats de travail generes, organigramme, affiliations mutuelle/prevoyance, documents fin de contrat |
| **Dependances** | Connecteurs SIRH (Lucca, Silae, PayFit) |
| **Consommateurs** | 4c (Paie), 4e (Immobilisations — affectataires), 5a (CSE), 5b (BDESE), 5d (Recrutement), 5e (Onboarding), 5f (Temps), 5g (Formation), 5h (Entretiens), 5i (Remuneration), 5j (Index egalite), 5k (Sante), 6c (CIR — collaborateurs eligibles) |

### 5d — Recrutement

| | Detail |
|---|---|
| **Entrees** | Besoins de recrutement (saisie), organigramme (5c), budget (3b), CV candidats |
| **Sorties** | Fiches de poste, pipeline de candidatures, KPIs recrutement (time-to-hire, cost-per-hire), vivier de candidats |
| **Dependances** | 5c (Admin personnel), 3b (Budget) |
| **Consommateurs** | 5e (Onboarding — declenchement), 5c (Admin personnel — creation dossier salarie) |

### 5e — Onboarding / Offboarding

| | Detail |
|---|---|
| **Entrees** | Dossier salarie (5c), checklist equipements (4e — registre equipements), acces IT |
| **Sorties** | Checklists de progression (J+1, S+1, M+1, M+3), rapport etonnement, suivi periode essai, checklist sortie, analyses IA tendances depart |
| **Dependances** | 5c (Admin personnel), 4e (Immobilisations — affectation equipements) |
| **Consommateurs** | 5c (Admin personnel — mise a jour dossier) |

### 5f — Temps & absences

| | Detail |
|---|---|
| **Entrees** | Declarations presence/conges (saisie ou connecteur Lucca Timmi), donnees contractuelles (5c — forfait jours, horaire, temps partiel) |
| **Sorties** | Soldes conges par salarie (CP acquis/pris/restants, RTT), planning equipe, export paie (heures travaillees, absences, HS), taux absenteisme, alertes, CET |
| **Dependances** | 5c (Admin personnel), connecteur Lucca |
| **Consommateurs** | 4c (Paie — elements variables), 4d (Provisions CP), 6c (CIR — temps R&D) |

### 5g — Formation

| | Detail |
|---|---|
| **Entrees** | Besoins formation, budget formation (3b), donnees OPCO, dossiers salaries (5c) |
| **Sorties** | Plan formation, rapports entretiens professionnels, alertes bilan 6 ans, reporting formation, demandes OPCO |
| **Dependances** | 5c (Admin personnel), 3b (Budget), connecteur OPCO |
| **Consommateurs** | 5b (BDESE), 4 (Comptabilite — charges formation) |

### 5h — Entretiens annuels

| | Detail |
|---|---|
| **Entrees** | Dossiers salaries (5c), objectifs precedents, auto-evaluations |
| **Sorties** | Rapports entretiens, people reviews, plans developpement individuels, analytics performance |
| **Dependances** | 5c (Admin personnel) |
| **Consommateurs** | 5i (Remuneration — input revue salariale), 5d (Recrutement — identification besoins) |

### 5i — Remuneration & avantages

| | Detail |
|---|---|
| **Entrees** | Donnees paie (4c), grilles salariales, benchmarks marche, accords CSE (5a), entretiens performance (5h), conventions collectives (5c) |
| **Sorties** | Politique remuneration, simulations impact, registre consolide avantages, cout total employeur par salarie, NAO preparee, epargne salariale (PEE/PERCOL) |
| **Dependances** | 4c (Paie), 5a (CSE), 5c (Admin personnel), 5h (Entretiens) |
| **Consommateurs** | 4c (Paie — elements remuneration), 3b (Budget — previsions masse salariale), 6e (Participation) |

### 5j — Index egalite F/H

| | Detail |
|---|---|
| **Entrees** | Donnees paie par genre (4c), effectifs par categorie (5c), promotions, augmentations, retours conge maternite |
| **Sorties** | Score index (5 indicateurs, /100), objectifs progression si score < 75, publication obligatoire, historique, simulation impact |
| **Dependances** | 4c (Paie), 5c (Admin personnel) |
| **Consommateurs** | 5b (BDESE), 8d (Conformite) |

### 5k — Sante, securite & DUERP

| | Detail |
|---|---|
| **Entrees** | Evaluations de risques, donnees medicales (visites), AT/MP declares, postes et unites de travail (5c) |
| **Sorties** | DUERP documente et mis a jour, rapports AT/MP, plans prevention, C2P, RPS evalues |
| **Dependances** | 5c (Admin personnel) |
| **Consommateurs** | 5b (BDESE), 8d (Conformite) |

---

## Phasage

### MVP — Priorites immediates

| Sous-module   | Justification                                                          |
|---------------|------------------------------------------------------------------------|
| 5c Admin pers.| Socle obligatoire : registre, DPAE, contrats, dossier salarie          |
| 5f Temps      | Gestion quotidienne la plus chronophage, export paie critique          |
| 5b BDESE      | Obligation legale CSE, indicateurs alimentes par 5c et 5f              |

### V2 — Extension operationnelle

| Sous-module   | Justification                                                          |
|---------------|------------------------------------------------------------------------|
| 5a CSE        | Apres 5b : les deux modules sont lies                                  |
| 5d Recrutement| Croissance equipe                                                      |
| 5e Onboarding | Depend du recrutement (5d)                                             |
| 5g Formation  | Obligation entretien pro 2 ans                                         |
| 5h Entretiens | Cycle RH complet avec 5g                                               |
| 5i Remuneration| Depend du dossier salarie (5c) et des entretiens (5h)                 |
| 5j Index F/H  | Obligation legale, donnees issues de 5i                                |

### V3 — Compliance avancee

| Sous-module   | Justification                                                          |
|---------------|------------------------------------------------------------------------|
| 5k DUERP      | Specifique securite, necessite socle RH complet                        |

---

## Connecteurs

| Connecteur                    | Usage                                                              |
|-------------------------------|--------------------------------------------------------------------|
| Lucca — Timmi Temps           | Import pointage, heures, soldes conges                             |
| Lucca — Timmi Absences        | Synchronisation absences, teletravail                              |
| Lucca — Core RH               | Donnees master salarie (poste, service, contrat)                   |
| Silae                         | Export variables paie, import bulletins                            |
| PayFit                        | Export variables paie, import bulletins                            |
| France Travail                | Declaration AT, attestation employeur, offres emploi               |
| LinkedIn                      | Publication offres, import profils candidats                       |
| OPCO portails                 | Demandes prise en charge formation, suivi remboursements           |
