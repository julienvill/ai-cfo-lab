# SPEC — Mapping Comptes France / Groupe & Reporting Consolide

Sous-module 4k du module Comptabilite. Spec detaillee du mapping PCG vers comptes groupe.

---

## Vision

Permettre a une filiale francaise d'exporter ses donnees comptables dans le referentiel du groupe. L'app gere deux couches de comptes — comptes francais (PCG) et comptes groupe — avec la possibilite de modifier, retraiter ou neutraliser des elements avant export. Elle produit des rapports P&L et Balance Sheet dans les deux referentiels.

---

## Utilisateurs cibles

| Role | Usage |
|---|---|
| **DAF / CFO filiale** | Pilotage du reporting groupe, validation des retraitements, arbitrage des neutralisations |
| **Comptable filiale** | Maintenance du mapping, saisie des retraitements manuels, production du package |
| **Controleur de gestion groupe** | Consommateur du package de consolidation, feedback sur les ecarts |
| **Expert-comptable / CAC** | Revue du mapping et des retraitements |

---

## Perimetre fonctionnel

### 1. Couche comptes francais (PCG)

Source de verite : les ecritures comptables de l'entreprise en plan comptable francais.

| Fonctionnalite | Description |
|---|---|
| Import des ecritures | Depuis le FEC, le grand livre ou un connecteur comptable (Pennylane, Sage, Cegid) |
| Plan comptable PCG | Liste des comptes utilises par l'entreprise, avec libelles et soldes |
| Balance | Balance des comptes PCG par periode (mensuelle, trimestrielle, annuelle) |
| Grand livre | Detail des ecritures par compte |
| Vue P&L format francais | Compte de resultat au format PCG (par nature) |
| Vue Bilan format francais | Bilan actif/passif au format PCG |

---

### 2. Table de mapping PCG → Comptes groupe

Correspondance entre chaque compte PCG utilise et le compte groupe cible.

| Fonctionnalite | Description |
|---|---|
| Table de correspondance | Chaque compte PCG mappe vers un compte groupe (code + libelle) |
| Mapping automatique initial | L'IA propose un mapping de depart base sur les libelles et les numeros de compte |
| Validation manuelle | L'utilisateur valide, corrige ou complete le mapping propose |
| Comptes non mappes | Alerte sur les comptes PCG ayant un solde mais pas de correspondance groupe |
| Mapping 1-vers-1 ou N-vers-1 | Un compte PCG → un compte groupe, ou plusieurs comptes PCG → un seul compte groupe |
| Mapping avec eclatement | Un compte PCG → plusieurs comptes groupe (avec cle de repartition) |
| Historique des modifications | Audit trail de toute modification du mapping |
| Templates de mapping | Mappings pre-configures pour les referentiels courants (IFRS, US GAAP, plan groupe custom) |

---

### 3. Couche comptes groupe

Vue des ecritures et soldes une fois le mapping applique.

| Fonctionnalite | Description |
|---|---|
| Balance groupe | Soldes des comptes groupe, calculee automatiquement depuis le mapping |
| Grand livre groupe | Ecritures converties dans le referentiel groupe |
| Vue P&L format groupe | Compte de resultat au format groupe (par nature ou par fonction selon le referentiel) |
| Vue Bilan format groupe | Bilan au format groupe (classement courant/non-courant si IFRS) |

---

### 4. Modifications et neutralisations

Capacite de modifier ou neutraliser des elements dans la couche groupe sans toucher a la comptabilite francaise.

| Fonctionnalite | Description |
|---|---|
| Ecritures de retraitement | OD de retraitement saisies dans la couche groupe uniquement (pas d'impact sur les comptes francais) |
| Neutralisation d'ecritures | Possibilite de marquer des ecritures PCG comme "neutralisees" pour qu'elles ne soient pas exportees dans les comptes groupe |
| Motif de neutralisation | Champ obligatoire : justification de chaque neutralisation (ex: provision reglementee, charge non recurrente locale) |
| Filtre par statut | Vue des ecritures : actives / neutralisees / retraitees |
| Reversibilite | Toute neutralisation ou retraitement est reversible, avec historique |

---

### 5. Retraitements IFRS

Retraitements systematiques pour passer des comptes sociaux PCG aux comptes consolides IFRS.

#### Retraitements simples — regles deterministes (V2)

| # | Theme | Retraitement |
|---|---|---|
| 1 | Amortissements derogatoires | Extourne complete : annulation dotation/reprise derogatoire (145/687/787) |
| 2 | Subventions d'investissement | Reclassement capitaux propres → deduction actif ou produit differe (IAS 20) |
| 3 | Frais d'emission d'emprunt | Reclassement actif → deduction dette, recalcul charge interet au TIE (IFRS 9) |
| 4 | Couts d'emprunt sur actifs qualifies | Activation obligatoire si non fait en PCG (IAS 23) |
| 5 | Presentation etats financiers | Reclassements courant/non-courant, OCI (IAS 1) |

#### Retraitements moyens — parametrage + calcul automatise (V2)

| # | Theme | Retraitement |
|---|---|---|
| 6 | Contrats de location (IFRS 16) | Capitalisation ROU + dette de loyer, extourne loyer, amortissement + interets |
| 7 | Goodwill | Extourne amortissement PCG, test impairment annuel (IFRS 3 / IAS 36) |
| 8 | Impots differes | IDA/IDP sur chaque retraitement + differences temporelles (IAS 12) |
| 9 | Immeubles de placement | Option juste valeur : extourne amortissement, reevaluation (IAS 40) |
| 10 | Contrats a long terme | Avancement obligatoire si criteres remplis (IFRS 15) |
| 11 | Provisions | Criteres IAS 37 + actualisation obligatoire si effet temps significatif |
| 12 | Ecarts de conversion | Reclassement P&L → OCI pour filiales autonomes (IAS 21) |

#### Retraitements complexes — jugement humain requis (V3)

| # | Theme | Retraitement |
|---|---|---|
| 13 | Reconnaissance du revenu (IFRS 15) | Modele 5 etapes, reallocation entre obligations de performance |
| 14 | Avantages du personnel (IAS 19) | Engagements retraite, indemnites depart — calcul actuariel |
| 15 | Instruments financiers (IFRS 9) | Reclassification, juste valeur, modele ECL |
| 16 | Regroupements d'entreprises (IFRS 3) | PPA, affectation du goodwill aux UGT |
| 17 | Stock-options / BSPCE (IFRS 2) | Charge en P&L, juste valeur Black-Scholes, etalement vesting |
| 18 | Depreciation d'actifs (IAS 36) | Test par UGT, valeur d'utilite DCF |

---

### 6. Production immobilisee

| Fonctionnalite | Description |
|---|---|
| Identification | Reperage des ecritures de production immobilisee (comptes 72x → 20x/23x) |
| Traitement PCG | Affichage dans la couche francaise tel quel |
| Traitement groupe / IFRS | Application des criteres IAS 38 (activation obligatoire si 6 criteres remplis, sinon charge) |
| Neutralisation possible | Si le groupe ne souhaite pas activer certains frais de developpement : neutralisation de l'activation PCG |
| Impact amortissements | Recalcul des dotations dans la couche groupe si traitement different |

---

### 7. Reporting bi-referentiel

Capacite de produire des rapports en choisissant le referentiel : francais ou groupe.

| Rapport | Format francais (PCG) | Format groupe |
|---|---|---|
| **P&L** | Compte de resultat par nature (PCG) | P&L par nature ou par fonction (selon referentiel groupe) |
| **Bilan** | Actif / Passif format PCG | Bilan courant/non-courant (IFRS) ou format groupe custom |
| **Balance** | Balance PCG | Balance comptes groupe |
| **Grand livre** | Ecritures PCG | Ecritures remappees + retraitements |

| Fonctionnalite | Description |
|---|---|
| Selecteur de referentiel | Bouton de bascule France / Groupe sur chaque rapport |
| Comparaison cote a cote | Vue double : rapport francais et groupe en parallele pour identifier les ecarts |
| Periodes | Mensuel, trimestriel, annuel, cumul YTD |
| Comparatif N vs N-1 | Variation absolue et % |
| Export | PDF, Excel, CSV |
| Drill-down | Depuis une ligne P&L ou Bilan, acces au detail des ecritures (PCG ou groupe) |

---

### 8. Package de consolidation

Export structure destine au systeme de consolidation du groupe.

| Fonctionnalite | Description |
|---|---|
| Format de sortie | Excel standardise, CSV, ou format natif (SAP BPC, Oracle HFM, Tagetik) |
| Contenu | Balance groupe, ecritures de retraitement, reconciliation intragroupe |
| Calendrier de reporting | Alertes deadlines de remontee (hard close, soft close) |
| Statut | Brouillon → Valide DAF → Envoye groupe |
| Reconciliation intragroupe | Rapprochement des comptes courants, refacturations, management fees entre entites |
| Ecarts de conversion | Gestion si devise groupe ≠ EUR |

---

### 9. Tableau de bord

| Indicateur | Description |
|---|---|
| Taux de mapping | % des comptes PCG ayant un solde qui sont mappes vers un compte groupe |
| Ecritures neutralisees | Nombre et montant des ecritures neutralisees, avec motifs |
| Retraitements appliques | Liste et impact des retraitements IFRS actifs |
| Ecarts France / Groupe | Principaux ecarts entre le resultat PCG et le resultat groupe |
| Statut package | Avancement de la preparation du package de consolidation |
| Prochaine deadline | Date de remontee groupe |

---

## Phasage

### MVP (V1)

Objectif : mapper les comptes francais vers les comptes groupe, neutraliser des elements, et produire un P&L et un Bilan dans les deux referentiels.

| Fonctionnalite | Inclus |
|---|---|
| Import ecritures (FEC ou saisie) | Oui |
| Plan comptable PCG | Oui |
| Table de mapping PCG → groupe | Oui — saisie manuelle + proposition IA |
| Neutralisation d'ecritures | Oui |
| Ecritures de retraitement manuelles (couche groupe) | Oui |
| P&L format francais | Oui |
| P&L format groupe | Oui |
| Bilan format francais | Oui |
| Bilan format groupe | Oui |
| Selecteur de referentiel (France / Groupe) | Oui |
| Export Excel / PDF | Oui |
| Tableau de bord (taux mapping, ecarts) | Oui |
| Donnees demo | Propello (filiale SaaS d'un groupe) |

### V2

| Fonctionnalite | Description |
|---|---|
| Retraitements IFRS simples (1-5) | Regles deterministes automatisees |
| Retraitements IFRS moyens (6-12) | Parametrage + calcul automatise |
| Production immobilisee | Traitement differentie PCG vs IFRS, alerte doublon CIR |
| Comparaison cote a cote | Vue double France / Groupe |
| Drill-down ecritures | Du P&L/Bilan vers le detail des ecritures |
| Connecteurs comptables | Import depuis Pennylane, Sage, Cegid |
| Package de consolidation | Export structure (Excel, CSV) |
| Reconciliation intragroupe | Matching comptes courants, refacturations |
| Templates de mapping | Preconfigurations IFRS, US GAAP |
| Donnees demo supplementaires | Mecaform (filiale industrielle) |

### V3

| Fonctionnalite | Description |
|---|---|
| Retraitements IFRS complexes (13-18) | Jugement humain assiste par IA |
| Impots differes automatises | Calcul IDA/IDP sur chaque retraitement |
| Format natif consolidation | Export SAP BPC, Oracle HFM, Tagetik |
| Ecarts de conversion multi-devises | Gestion devise fonctionnelle ≠ EUR |
| Calendrier de reporting avec alertes | Deadlines hard/soft close |
| Workflow d'approbation | Comptable → DAF → Controleur groupe |
| Reporting par fonction (IFRS) | P&L par fonction en plus du P&L par nature |
| API export | Pour integration avec le systeme de consolidation |

---

## Donnees d'entree

| Donnee | Source | MVP |
|---|---|---|
| Ecritures comptables PCG | FEC / Grand livre / Connecteur | Oui (FEC ou saisie) |
| Plan de comptes groupe | Saisie manuelle ou import | Oui |
| Table de mapping | Saisie + proposition IA | Oui |
| Ecritures de retraitement | Saisie manuelle | Oui |
| Neutralisations | Saisie manuelle | Oui |
| Contrats de location (IFRS 16) | Saisie manuelle | V2 |
| Engagements retraite (IAS 19) | Saisie manuelle / actuaire | V3 |

---

## Entrees / Sorties

| | Detail |
|---|---|
| **Entrees** | FEC ou grand livre (4j), table de mapping PCG <> comptes groupe (config), retraitements IFRS, ecritures de neutralisation (saisie manuelle) |
| **Sorties** | Package de consolidation, ecritures remappees, P&L et Bilan au format groupe, reconciliation inter-comptes, rapport des ecarts France/Groupe |
| **Dependances** | 4j (FEC) |
| **Consommateurs** | 8c (Data Room) |

---

## Regles metier cles

1. **Separation des couches** : les comptes francais ne sont jamais modifies par les retraitements ou neutralisations. Toutes les modifications vivent dans la couche groupe.
2. **Tracabilite** : chaque neutralisation et chaque retraitement est justifie, date et attribue a un utilisateur.
3. **Coherence** : le total actif = total passif doit etre verifie dans les deux referentiels apres chaque operation.
4. **Reversibilite** : toute operation (neutralisation, retraitement) peut etre annulee. L'historique est conserve.
5. **Rapprochement** : la difference entre le resultat PCG et le resultat groupe doit etre entierement expliquee par les retraitements et neutralisations (pont de passage).

---

## Connecteurs (V2+)

| Systeme | Donnees | Usage |
|---|---|---|
| **Pennylane / Sage / Cegid** | Ecritures comptables | Import du grand livre PCG |
| **Module 4j (FEC)** | Fichier FEC | Source alternative d'import |
| **Module 4e (Immobilisations)** | Registre immos | Production immobilisee, IFRS 16 |
| **Systeme de consolidation groupe** | Package export | Destination du reporting |

---

*Fin du PRD Mapping Comptes France / Groupe.*
