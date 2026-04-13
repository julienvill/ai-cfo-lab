# SPEC — Juridique / Corporate

Gestion du secretariat juridique, de la vie sociale de l'entreprise, des contrats et des assurances. Dans une PME, ces fonctions sont quasi systematiquement rattachees au DAF.

---

## Sous-modules

| ID  | Nom                              | Route                    | Description                                                                 |
|-----|----------------------------------|--------------------------|-----------------------------------------------------------------------------|
| 7a  | Secretariat juridique            | /juridique/secretariat   | AG, PV, registres legaux, depot comptes, formalites, delegations de pouvoir |
| 7b  | Cap table & BSPCE                | /juridique/cap-table     | Capital, dilution, BSPCE/BSA/AGA, augmentation capital, waterfall           |
| 7c  | Contrats & baux                  | /juridique/contrats      | Registre contrats, alertes echeances, baux commerciaux, extraction IA       |
| 7d  | Assurances                       | /juridique/assurances    | Registre polices, echeancier, suivi sinistres, analyse couverture IA        |
| 7e  | Contentieux & recouvrement       | /juridique/contentieux   | Suivi litiges, recouvrement amiable/judiciaire, gestion avocats, KPIs       |

---

### 7a — Secretariat juridique

**Description**

Gestion du cycle de vie des assemblees generales et des decisions collectives, tenue des registres legaux obligatoires, suivi des formalites aupres du greffe, et gestion des delegations de pouvoir. Module central pour la conformite juridique de la societe.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                                                       |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| AG et PV                              | Convocation, ordre du jour, redaction assistee IA, archivage numerique signe                 |
| Conseil d'administration              | Convocations, proces-verbaux, suivi des resolutions                                          |
| Registres legaux                      | Mouvements de titres, decisions collectives, beneficiaires effectifs (RBE)                   |
| Approbation des comptes               | Workflow AG -> depot greffe dans les 6 mois, alertes delais legaux                           |
| Depot des comptes                     | Generation liasses, suivi transmission greffe, confirmation depot                            |
| Formalites                            | Modification statuts, changement de dirigeant, augmentation de capital, publication legale   |
| Delegations de pouvoir                | Creation, suivi validite, archivage, alertes expiration                                      |
| Veille juridique IA                   | Alertes sur evolutions reglementaires impactant la structure ou les obligations legales      |

**Automatisation**

| Declencheur                           | Action automatique                                                                           |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Cloture exercice N                    | Rappel convocation AG ordinaire avant le 30 juin N+1                                         |
| Date AG approchante                   | Generation automatique de la convocation et de l'ordre du jour standard                      |
| Resolution adoptee                    | Draft PV genere par IA, soumis a validation                                                  |
| Depot comptes confirme                | Mise a jour statut registre, archivage recepisse                                             |
| Delegation arrivant a expiration      | Alerte J-30 et J-7 aupres du dirigeant                                                       |

---

### 7b — Cap table & BSPCE

**Description**

Suivi en temps reel de la structure du capital, gestion des plans d'actionnariat salarie (BSPCE, BSA, AGA), simulation des operations de haut de bilan, et analyse des droits des actionnaires. Outil strategique pour les levees de fonds et les operations de M&A.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                                                       |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Table de capitalisation               | Repartition du capital par actionnaire, categorie de titres, pourcentages fully diluted      |
| Dilution                              | Simulation dilution pre/post operation (augmentation capital, conversion OCA, exercice BSPCE)|
| Valorisation historique               | Historique des valorisations (409A, derniere levee), fair market value par date              |
| Plans BSPCE                           | Creation de plans, parametres (prix exercice, maturite, nombre de bons)                      |
| Attributions individuelles            | Beneficiaire, date attribution, vesting cliff + lineaire, date expiration                    |
| Exercice et expiration                | Workflow exercice (decision, emission actions, formalites), gestion des bons expires         |
| BSA / AGA                             | Gestion bons de souscription d'actions et attributions gratuites d'actions                   |
| Augmentation de capital               | Decision AG/CA, bulletin de souscription, DPS, prime d'emission, formalites greffe, MAJ statuts |
| Reduction de capital                  | Workflow decision, motifs (pertes / rachat), formalites                                      |
| Fiscalite beneficiaire                | Simulation gain d'acquisition, plus-value, abattements, contribution patronale               |
| Waterfall analysis                    | Distribution du produit de cession selon la structure du capital et les preferences de liquidation |
| Pacte d'associes                      | Saisie et suivi clauses : tag-along, drag-along, anti-dilution, preferences de liquidation   |
| Export data room                      | Export cap table certifie pour due diligence investisseurs                                   |

**Automatisation**

| Declencheur                           | Action automatique                                                                           |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Date de vesting atteinte              | Notification beneficiaire et RH, mise a jour pourcentage acquis                             |
| Bons arrivant a expiration            | Alerte J-90, J-30, J-7 aupres du beneficiaire et du dirigeant                               |
| Augmentation capital finalisee        | Recalcul automatique cap table, notification actionnaires                                    |
| Nouvel investisseur saisi             | Simulation dilution mise a jour en temps reel                                                |

---

### 7c — Contrats & baux

**Description**

Centralisation et suivi du portefeuille contractuel de l'entreprise. Alertes proactives sur les echeances critiques, gestion specifique des baux commerciaux avec indexation automatique, et analyse IA des clauses a risque. Inclut le suivi des obligations de vigilance envers les sous-traitants.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                                                       |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Registre contrats centralise          | Tous types : clients, fournisseurs, partenaires, prestataires, baux, NDA                     |
| Alertes echeances                     | Renouvellement tacite, resiliation, revision de prix — alertes J-90, J-30, J-7              |
| Baux commerciaux                      | Indexation ILC/ILAT automatique, suivi charges, renouvellement triennal                      |
| Extraction IA clauses PDF             | Import PDF contrat, extraction automatique des clauses cles (duree, prix, resiliation, SLA)  |
| Analyse risque IA                     | Scoring de risque contractuel, identification clauses penalisantes ou inhabituelles          |
| Archivage                             | Stockage signe electroniquement, versioning, acces controle par profil                      |
| Obligations de vigilance              | Suivi sous-traitants : URSSAF (attestation vigilance), Kbis, assurance RC Pro a jour         |

**Automatisation**

| Declencheur                           | Action automatique                                                                           |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Date echeance approchante             | Alerte responsable contrat + DAF, suggestion action (renouveler / resilier / reneg.)        |
| Renouvellement indice ILC/ILAT        | Calcul nouveau loyer, generation courrier d'information bailleur                             |
| Document sous-traitant expire         | Alerte responsable achats, blocage paiement optionnel                                        |
| Nouveau contrat importe               | Extraction IA automatique, pre-remplissage fiche contrat                                     |

---

### 7d — Assurances

**Description**

Pilotage du programme assurance de l'entreprise : inventaire des polices, gestion des echeances (droits Hamon et Chatel), suivi des sinistres, et analyse IA de la couverture. Checklist dediee pour repondre aux exigences des investisseurs (due diligence assurance).

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                                                       |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Registre polices                      | RC Pro, RC Exploitation, multirisque, cyber-risques, D&O, homme-cle, garantie financiere, perte d'exploitation, flotte auto, protection juridique, responsabilite environnementale, mutuelle/prevoyance |
| Echeancier                            | Alertes renouvellement, exercice droit Hamon (resiliation 1 an), droit Chatel (non-reconduction) |
| Suivi sinistres                       | Declaration, suivi instruction, indemnisation recue, cloture                                 |
| Analyse couverture IA                 | Identification lacunes, doublons, sous-couvertures par rapport au profil de risque           |
| Benchmark                            | Comparaison primes et garanties avec references sectorielles                                 |
| Optimisation IA                       | Recommandations de renegociation ou de restructuration du programme assurance               |
| Checklist investisseurs               | Verification couverture D&O, homme-cle, cyber, RC Pro — format due diligence               |

**Automatisation**

| Declencheur                           | Action automatique                                                                           |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Echeance police approchante           | Alerte J-90 (negociation) et J-30 (confirmation renouvellement)                             |
| Fenetre droit Chatel ouverte          | Alerte pour exercer option de non-reconduction avant fermeture fenetre                       |
| Nouveau risque identifie (ex: recrutement, export) | Suggestion de couverture complementaire                               |
| Sinistre declare                      | Creation fiche suivi, rappels jalons instruction                                             |

---

### 7e — Contentieux & recouvrement (V3)

**Description**

Suivi centralize des litiges et pilotage du recouvrement des creances. Workflows automatises de relance amiable jusqu'a la procedure judiciaire. Gestion des mandats avocats et analyse IA du risque de perte. Reserve aux entreprises ayant un volume significatif de contentieux.

**Fonctionnalites**

| Fonctionnalite                        | Detail                                                                                       |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Suivi litiges                         | Commercial, prud'homal, fiscal, penal — statut, parties, juridiction, montants              |
| Provisionnement                       | Calcul provision comptable selon probabilite de perte estimee par IA                        |
| Recouvrement amiable                  | Workflow automatique : rappel -> mise en demeure -> derniere relance avant procedure         |
| Recouvrement judiciaire               | Injonction de payer, assignation, execution forcee — suivi etapes et delais                 |
| Gestion avocats                       | Mandats, honoraires, notes de frais, suivi diligences                                       |
| Prud'hommes                           | Suivi specifique : convocation, audience, conciliation, jugement, appel                     |
| Analyse risque IA                     | Probabilite de gain/perte, estimation montant expose, recommandation strategie              |
| KPIs contentieux                      | Taux de recouvrement, delai moyen de recouvrement, encours provisions, nombre litiges actifs |

**Automatisation**

| Declencheur                           | Action automatique                                                                           |
|---------------------------------------|----------------------------------------------------------------------------------------------|
| Facture impayee J+30                  | Declenchement automatique workflow relance amiable                                           |
| Absence de reponse apres relance      | Escalade automatique vers etape suivante (mise en demeure, puis procedure)                   |
| Audience programmee                   | Rappel J-7 et J-1 aupres du responsable et de l'avocat mandate                              |
| Jugement rendu                        | Mise a jour provision comptable, declenchement procedure execution si condamnation           |

---

## Entrees / Sorties par sous-module

### 7a — Secretariat juridique

| | Detail |
|---|---|
| **Entrees** | Etats financiers annuels (4h), statuts de la societe, calendrier legal, donnees dirigeants |
| **Sorties** | PV AG et CA (assistance IA), decisions enregistrees, registres legaux mis a jour, depot comptes au greffe, formalites (modifications statuts, changements dirigeants), alertes reglementaires |
| **Dependances** | 4h (Etats financiers) |
| **Consommateurs** | 7b (Cap table — operations sur capital), 8c (Data Room), 8d (Conformite) |

### 7b — Cap table & BSPCE

| | Detail |
|---|---|
| **Entrees** | Decisions AG/CA (7a), contrats BSPCE/BSA/AGA, operations sur capital, pacte associes, valorisations |
| **Sorties** | Cap table actualisee, simulation dilution, waterfall analysis, vesting schedules, fiscalite instruments, exports data room |
| **Dependances** | 7a (Secretariat juridique), 4 (Comptabilite) |
| **Consommateurs** | 3d (Reporting — donnees investisseurs), 8c (Data Room) |

### 7c — Contrats & baux

| | Detail |
|---|---|
| **Entrees** | Contrats numeriques ou scannes, donnees sous-traitants, indices indexation (baux) |
| **Sorties** | Registre contrats, alertes echeances et renouvellements, clauses cles extraites (IA), analyses de risque, vigilance sous-traitants (URSSAF, Kbis, assurance) |
| **Dependances** | 8d (Conformite — obligations vigilance) |
| **Consommateurs** | 2c (Dette — contrats emprunt), 6c (CIR — sous-traitance), 7d (Assurances) |

### 7d — Assurances

| | Detail |
|---|---|
| **Entrees** | Polices assurance, historique sinistres, activite entreprise, effectifs (5c), contrats (7c), donnees immobilisations (4e) |
| **Sorties** | Registre polices, alertes echeances, rapports sinistres, analyse couverture, benchmark, recommandations optimisation, checklist investisseurs |
| **Dependances** | 5c (Admin personnel), 7a (Secretariat juridique), 7c (Contrats), 4e (Immobilisations) |
| **Consommateurs** | 8c (Data Room), 4b (AP — primes assurance) |

### 7e — Contentieux & recouvrement

| | Detail |
|---|---|
| **Entrees** | Creances impayees (4a), litiges commerciaux/sociaux/fiscaux, mandats avocats, provisions existantes (4) |
| **Sorties** | Registre litiges, provisions pour risques, relances automatiques, suivi procedures judiciaires, KPIs recouvrement |
| **Dependances** | 4a (AR), 4 (Comptabilite) |
| **Consommateurs** | 4g (Cloture — provisions litiges), 8c (Data Room) |

---

## Phasage

| Phase | Sous-modules inclus | Commentaire                                                    |
|-------|---------------------|----------------------------------------------------------------|
| MVP   | 7a, 7b, 7c          | Fonctions juridiques core d'un DAF PME (secretariat, capital, contrats) |
| V2    | 7d                  | Assurances — valeur elevee, complexite maitrisee               |
| V3    | 7e                  | Contentieux — necessaire uniquement pour PME avec volume litige |

---

## Connecteurs

| Connecteur                            | Usage                                                                        | Modules concernes |
|---------------------------------------|------------------------------------------------------------------------------|-------------------|
| Infogreffe (API)                      | Verification statut, depot comptes, formalites greffe                        | 7a, 7b            |
| Ledgy / Carta / Capdesk               | Import/export cap table, synchronisation plans actionnariat                  | 7b                |
| Prestataires signature electronique   | Yousign, DocuSign, HelloSign — signature PV, contrats, bulletins souscription| 7a, 7c            |
