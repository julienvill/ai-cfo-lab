# SPEC — CIR : Credit Impot Recherche

Sous-module 6c du module Impots. Spec detaillee du cycle complet CIR.

---

## Vision

Un module standalone qui couvre le cycle complet du CIR : identification des projets eligibles, suivi des temps R&D, calcul de l'assiette, edition du formulaire 2069-A-SD, et constitution du dossier justificatif. L'objectif est une app concise, utilisable independamment du reste de la plateforme AI CFO Lab.

---

## Utilisateurs cibles

| Role | Usage |
|---|---|
| **DAF / CFO** | Pilotage du CIR, validation finale, arbitrage activation vs CIR |
| **Responsable R&D / CTO** | Qualification des projets, validation des temps, redaction des fiches techniques |
| **Chercheurs / Ingenieurs** | Saisie des temps par projet |
| **Expert-comptable / Cabinet CIR** | Revue du calcul, constitution du dossier, depot |

---

## Perimetre fonctionnel

### 1. Referentiel projets R&D

Fiche par projet avec les informations necessaires a la qualification CIR.

| Champ | Description |
|---|---|
| Code projet | Identifiant unique (ex: PRJ-AI) |
| Intitule | Nom du projet |
| Nature | Recherche fondamentale / Recherche appliquee / Developpement experimental |
| Description | Resume du projet |
| Etat de l'art | Documentation de l'existant et des limites identifiees |
| Verrous technologiques | Incertitudes scientifiques ou techniques a lever |
| Demarche experimentale | Methodologie, iterations, prototypages |
| Qualification MESRI | Eligible / Non eligible / En attente d'agrement |
| Statut | Actif / Termine / Abandonne |
| Periode | Date debut — Date fin |
| Responsable | Chef de projet R&D |

**Assistance IA** : aide a la redaction des fiches techniques (etat de l'art, verrous, travaux realises) a partir des descriptions saisies.

---

### 2. Referentiel collaborateurs R&D

| Champ | Description |
|---|---|
| Nom / Prenom | Identite du collaborateur |
| Qualification | Chercheur (PhD), Ingenieur, Technicien |
| Diplome | Niveau et specialite (justificatif CV) |
| Cout charge annuel | Salaire brut + charges patronales |
| Taux horaire charge | Calcule automatiquement |
| Eligibilite CIR | Oui / Non (selon qualification et affectation) |
| Projets affectes | Liste des projets R&D auxquels le collaborateur contribue |

---

### 3. Suivi des temps R&D

Saisie mensuelle des temps par collaborateur et par projet.

| Fonctionnalite | Description |
|---|---|
| Saisie mensuelle | Par collaborateur, par projet, par jour. Fractions : 1.0, 0.5, 0.25 jour |
| Contrainte journaliere | Total temps saisi <= 1.0 jour par jour travaille |
| Vue calendrier | Visualisation mensuelle des jours affectes R&D vs autres activites |
| Validation hierarchique | Saisie collaborateur → validation manager → verrouillage |
| Import externe | Import depuis Lucca Timmi, Silae ou fichier CSV |
| Historique | Conservation des temps valides par mois, non modifiables apres verrouillage |

**4 controles automatiques** :

| Controle | Regle |
|---|---|
| Coherence temps/travaille | Heures R&D declarees <= heures travaillees sur la periode |
| Reconciliation paie | Jours travailles declares coherents avec les bulletins de paie |
| Ventilation 100% | Somme des % d'affectation par projet = 100% du temps R&D declare |
| Alerte taux CIR > 90% | Warning si un collaborateur declare > 90% de son temps en R&D |

---

### 4. Calcul de l'assiette CIR

Calcul deterministe de l'assiette selon l'article 244 quater B du CGI.

| Poste | Calcul |
|---|---|
| **A — Depenses de personnel** | Σ (cout charge collaborateur × % temps R&D) |
| **B — Jeunes docteurs** | Coefficient ×2 pour les docteurs embauches depuis < 2 ans (premier CDI) |
| **C — Forfait frais de fonctionnement** | 43% des depenses de personnel (A + B) |
| **D — Amortissements biens R&D** | Quote-part des dotations sur materiel affecte a la R&D |
| **E — Sous-traitance R&D** | Couts sous-traitance (agrees ou non), plafond 2 M EUR agrees / 10 M EUR total |
| **F — Veille technologique** | Abonnements, conferences techniques (plafond 60 000 EUR) |
| **G — Brevets et PI** | Depots, defense, taxes maintenance, amortissement certificats |
| **H — Normalisation** | Participation aux travaux de normalisation (50% des depenses, plafond) |
| **I — Dotations immos incorporelles R&D** | Amortissement des frais de developpement actives (hors doublon avec A) |
| **Deductions** | Subventions publiques R&D a deduire + honoraires cabinet conseil CIR |
| **Assiette nette** | Total brut − deductions |

**Calcul du credit** :

| Tranche | Taux |
|---|---|
| 0 — 100 M EUR | 30% |
| > 100 M EUR | 5% |

**Imputation** : credit impute sur l'IS, excedent remboursable immediatement si PME communautaire.

---

### 5. Formulaire 2069-A-SD

| Fonctionnalite | Description |
|---|---|
| Pre-remplissage automatique | Toutes les cases du formulaire alimentees depuis le calcul |
| Apercu PDF | Visualisation du formulaire avant depot |
| Export PDF | Generation du formulaire au format PDF imprimable |
| Validation avant depot | Checklist des controles de coherence passes |

---

### 6. Dossier justificatif

Constitution automatique du dossier complet pour controle fiscal ou rescrit.

| Piece | Source |
|---|---|
| Note methodologique de calcul | Generee automatiquement |
| Fiches techniques par projet R&D | Referentiel projets + assistance IA |
| Etats des depenses de personnel detaillees | Referentiel collaborateurs + temps |
| Feuilles de temps validees | Module suivi des temps |
| Releves abonnements veille technologique | Saisie manuelle ou import |
| Organigramme R&D | Referentiel collaborateurs |
| CV et diplomes des chercheurs | Pieces jointes |
| Contrats de sous-traitance R&D | Import ou saisie |
| Justificatifs amortissements R&D | Lien avec registre immobilisations |
| Historique des depots anterieurs | Archive N-1, N-2, N-3 |

**Export** : dossier complet telechargeable en ZIP structure.

---

### 7. Production immobilisee R&D

Lien entre les projets R&D et les immobilisations incorporelles activees.

| Fonctionnalite | Description |
|---|---|
| Identification des projets activables | Criteres IAS 38 / PCG : faisabilite technique, intention d'achever, capacite d'utiliser, generation d'avantages futurs |
| Calcul de la production immobilisee | Couts R&D eligibles a l'activation (comptes 203/232) |
| Alerte doublon CIR / activation | Si des depenses sont activees en 203, elles ne doivent pas figurer dans l'assiette CIR |
| Suivi amortissement | Plan d'amortissement des frais de developpement actives |

---

### 8. Rescrit CIR

| Fonctionnalite | Description |
|---|---|
| Modele de demande | Template de demande de rescrit aupres du MESRI |
| Suivi de la procedure | Etapes : envoi → accuse reception → reponse (3 mois) → decision |
| Archivage | Conservation de la demande et de la reponse |

---

### 9. Tableau de bord

| Indicateur | Description |
|---|---|
| Assiette CIR nette | Montant cumule de l'exercice en cours |
| Credit CIR estime | 30% de l'assiette nette |
| Nombre de projets actifs | Projets R&D en cours |
| Heures R&D declarees | Cumul YTD |
| Taux d'avancement saisie | % des mois avec temps valides sur l'exercice |
| Historique CIR | Graphique assiette + credit sur 3-5 exercices |
| Alertes | Temps non saisis, controles en echec, pieces manquantes |

---

## Phasage

### MVP (V1)

Objectif : calculer le CIR d'un exercice et constituer le dossier.

| Fonctionnalite | Inclus |
|---|---|
| Referentiel projets R&D | Oui — saisie manuelle |
| Referentiel collaborateurs | Oui — saisie manuelle |
| Suivi des temps (saisie mensuelle) | Oui — saisie manuelle, validation simple |
| 4 controles automatiques | Oui |
| Calcul assiette complet (postes A a I) | Oui |
| Formulaire 2069-A-SD (pre-remplissage + PDF) | Oui |
| Dossier justificatif (generation ZIP) | Oui |
| Tableau de bord | Oui — KPIs + historique |
| Donnees demo | Propello (SaaS, 3 projets R&D) |

### V2

| Fonctionnalite | Description |
|---|---|
| Assistance IA fiches techniques | Redaction assistee de l'etat de l'art et des verrous |
| Import temps depuis SIRH | Connecteurs Lucca Timmi, Silae, CSV |
| Production immobilisee R&D | Lien projets → immobilisations activees, alerte doublon |
| Workflow de validation complet | Ingenieur → manager → DAF → verrouille |
| Rescrit CIR | Template + suivi procedure |
| Historique des depots | Archive pluriannuelle avec comparatifs |
| Donnees demo supplementaires | Mecaform (industrie) |

### V3

| Fonctionnalite | Description |
|---|---|
| Scoring de risque controle fiscal | IA evalue le niveau de risque par poste |
| Pre-audit interne | Simulation controle : verification pieces, coherence FEC |
| Integration IS | Imputation automatique du credit CIR sur l'IS (lien module 6d) |
| Jeunes docteurs | Gestion du coefficient ×2, suivi premier CDI |
| CII (Credit Impot Innovation) | Extension au CII (20%, plafond 400 K EUR, PME uniquement) |
| API export | Export des donnees CIR pour consolidation groupe ou cabinet |

---

## Donnees d'entree

| Donnee | Source | MVP |
|---|---|---|
| Projets R&D | Saisie manuelle | Oui |
| Collaborateurs R&D | Saisie manuelle | Oui |
| Temps R&D par projet | Saisie manuelle | Oui |
| Bulletins de paie (couts charges) | Saisie manuelle / import | Oui |
| Factures sous-traitance R&D | Saisie manuelle | Oui |
| Amortissements materiels R&D | Saisie manuelle | Oui |
| Abonnements veille techno | Saisie manuelle | Oui |
| Import temps SIRH | Connecteur Lucca / Silae / CSV | V2 |
| Registre immobilisations | Lien module 4e | V2 |
| IS de l'exercice | Lien module 6d | V3 |

---

## Entrees / Sorties

| | Detail |
|---|---|
| **Entrees** | Suivi des temps R&D par projet (5f), donnees de paie des chercheurs (4c), amortissements equipements R&D (4e), contrats sous-traitance (7c), brevets |
| **Sorties** | Assiette CIR calculee (personnel + forfait 43% + sous-traitance + amortissements + brevets), formulaire 2069-A pre-rempli, fiches techniques par projet (assistance IA), dossier justificatif complet, alertes controle (coherence temps, taux > 90%) |
| **Dependances** | 4c (Paie), 4e (Immobilisations), 5f (Temps), 7c (Contrats) |
| **Consommateurs** | 6d (IS — credit impot a imputer), 4e (Immobilisations — production immobilisee R&D) |

---

## Regles metier cles

1. **Eligibilite CIR** : seules les depenses correspondant a des operations de recherche au sens du CGI (recherche fondamentale, recherche appliquee, developpement experimental) sont eligibles.
2. **Forfait 43%** : applique sur les depenses de personnel R&D (depuis 2020, remplace l'ancien 75%/50% personnel + 200% jeunes docteurs fonctionnement).
3. **Sous-traitance agreee** : retenue pour le double du montant (plafond 2 M EUR). Sous-traitance non agreee : montant reel (plafond 10 M EUR, deduction faite de l'agreee).
4. **Pas de doublon activation / CIR** : les depenses activees en compte 203 ne doivent pas figurer dans l'assiette CIR.
5. **PME communautaire** : remboursement immediat de l'excedent de credit non impute sur l'IS (effectif < 250, CA < 50 M EUR ou total bilan < 43 M EUR).
6. **Conservation** : les justificatifs doivent etre conserves pendant la duree de prescription fiscale (3 ans + exercice en cours, etendu a 10 ans en cas de report).

---

## Connecteurs (V2+)

| Systeme | Donnees | Usage |
|---|---|---|
| **Lucca Timmi** | Temps de travail par projet | Import des temps R&D |
| **Silae / PayFit** | Bulletins de paie | Couts charges collaborateurs |
| **Pennylane / Sage** | Ecritures comptables | Amortissements, sous-traitance |
| **Module 4e (Immobilisations)** | Registre immos | Dotations R&D, production immobilisee |
| **Module 6d (IS)** | IS de l'exercice | Imputation du credit CIR |

---

*Fin du PRD CIR.*
