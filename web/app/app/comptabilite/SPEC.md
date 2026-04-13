# SPEC — Comptabilite

Le module Comptabilite constitue le coeur du systeme financier de la plateforme AI-CFO-Lab. Il couvre l'ensemble du cycle comptable d'une entreprise francaise : de la facturation clients et fournisseurs jusqu'a la production des etats financiers annuels et de la liasse fiscale, en passant par la paie, les immobilisations, les notes de frais et la cloture mensuelle. Chaque sous-module s'appuie sur l'automatisation par IA pour reduire les taches manuelles, ameliorer la conformite reglementaire (PCG, LME, DSN, facturation electronique) et accelerer les clotures. Le module integre egalement une couche de mapping PCG / comptes groupe permettant un reporting bi-referentiel et la production de packages de consolidation.

---

## Sous-modules

| Code | Nom | Route | Description courte |
|------|-----|-------|--------------------|
| 4a | AR — Accounts Receivable | `/app/factures` | Facturation clients, suivi creances, relances automatiques |
| 4b | AP — Accounts Payable | `/app/comptabilite` | Reception factures, matching, paiements SEPA |
| 4c | Paie | `/app/paie` | Import SIRH, ecritures paie, masse salariale |
| 4d | Provisions CP | `/app/provisions-cp` | Calcul et ecritures provisions conges payes |
| 4e | Immobilisations | `/app/immobilisations` | Registre, amortissements, cessions, immos en cours |
| 4f | Notes de frais | `/app/notes-de-frais` | Soumission mobile, OCR, workflow, remboursement |
| 4g | Cloture mensuelle | `/app/cloture` | Checklist J+1/J+8, pre-cloture auto, lock period |
| 4h | Etats financiers annuels | `/app/etats-financiers` | Bilan, CR, flux tresorerie, liasse fiscale, XBRL |
| 4i | Facturation electronique | `/app/facturation-electronique` | Factur-X, PDP, e-reporting, archivage probant |
| 4j | FEC | `/app/fec` | Generation FEC 18 champs, controle, piste audit |
| 4k | Mapping PCG / Groupe | `/app/comptabilite/mapping-groupe` | Deux couches de comptes, retraitements IFRS, consolidation |

---

## Sous-modules detailles

---

### 4a — AR (Accounts Receivable)

**Description**

Gestion complete du cycle de facturation clients : emission des factures, suivi des creances, analyse de l'aging, pilotage du DSO et plan de relance automatise. L'IA enrichit le module avec du scoring client, de la prevision d'encaissements et une gestion des litiges structuree.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Facturation | Creation, envoi et suivi des factures clients |
| Suivi creances | Tableau de bord des creances ouvertes par echeance |
| Aging report | Tranches 0-30 / 30-60 / 60-90 / +90 jours |
| DSO | Calcul Days Sales Outstanding en continu |
| Plan de relance | Sequences de relance parametrables par profil client |
| Prevision encaissements | Modele predictif sur 30/60/90 jours |
| Scoring client | Score de risque credit par client (IA) |
| Gestion litiges | Suivi des factures contestees, historique echanges |
| Lettrage automatique | Rapprochement auto paiements / factures |
| Revenue recognition | Etalement automatique du chiffre d'affaires (IFRS 15 / PCG) |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Relance J+7 | Facture impayee a echeance + 7 jours | Email de relance niveau 1 |
| Relance J+15 | Toujours impayee | Email de relance niveau 2 + alerte |
| Relance J+30 | Toujours impayee | Passage en litige, alerte DAF |
| Lettrage auto | Reception paiement bancaire | Matching facture(s) correspondante(s) |
| Scoring mise a jour | Nouveau comportement paiement | Recalcul score risque client |
| Prevision encaissements | Chaque nuit | Rafraichissement modele ML |

---

### 4b — AP (Accounts Payable)

**Description**

Automatisation du cycle fournisseurs de bout en bout : reception et extraction OCR/IA des factures, controle three-way matching, workflow de validation, suivi de la balance 401, gestion du DPO et conformite LME, preparation des fichiers de paiement SEPA et analyse de la depense (spend analytics).

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Reception factures OCR/IA | Extraction automatique des champs (fournisseur, montant, TVA, echeance) |
| Three-way matching | Rapprochement facture / bon de commande / bon de livraison |
| Workflow validation | Circuit d'approbation parametrable par seuil et direction |
| Balance 401 | Suivi en temps reel du compte fournisseurs |
| DPO | Calcul Days Payable Outstanding |
| Conformite LME | Alertes automatiques sur depassement delais legaux (60 jours) |
| Preparation paiements SEPA | Generation fichier SEPA XML pour validation bancaire |
| Spend analytics | Analyse depenses par categorie, fournisseur, centre de cout |
| FNP | Identification et comptabilisation automatique des factures non parvenues |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Extraction OCR | Reception email / upload PDF | Extraction donnees facture, creation brouillon |
| Three-way matching | Facture extraite | Recherche BC/BL et calcul ecart |
| Alerte LME | Echeance > 60 jours detectee | Notification DAF + blocage si hors norme |
| Rappel validation | Facture en attente > 3 jours | Relance approbateur |
| Generation SEPA | Validation du lot de paiements | Production fichier XML SEPA |
| Calcul FNP | Fin de periode | Detection livraisons sans facture, ecriture FNP auto |

---

### 4c — Paie

**Description**

Integration entre le SIRH / logiciel de paie et la comptabilite : import automatique des donnees de paie, generation des ecritures comptables (salaires nets, charges patronales, charges salariales), suivi de la masse salariale et pilotage du cout charge par employe.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Import donnees paie SIRH | Connexion Silae / PayFit / Lucca via API ou fichier |
| Ecritures comptables auto | Generation OD paie (641x, 421, 431, 437, 645) |
| Suivi masse salariale | Dashboard evolution par mois, entite, service |
| Charges sociales | Ventilation patronales / salariales par nature |
| DSN | Verification coherence DSN / ecritures |
| Regularisations | Gestion rappels, avoirs, corrections de paie |
| Cout charge par employe | Calcul CTC (cost-to-company) individuel et agrege |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Import paie | Date de versement paie (parametrable) | Import fichier SIRH, generation ecritures OD |
| Controle coherence | Import termine | Rapprochement masse salariale N vs N-1, alerte si ecart > seuil |
| Mise a jour DSN | Validation ecritures | Verification coherence avec donnees DSN |
| Alertes charges | Calcul charges | Alerte si taux charges sociales hors fourchette attendue |

---

### 4d — Provisions Conges Payes

**Description**

Calcul automatique de la provision pour conges payes selon les deux methodes legales (1/10e de la remuneration annuelle ou maintien de salaire), suivi des droits acquis par collaborateur, generation des ecritures OD de provision et de reprise en cloture mensuelle.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Calcul provision 1/10e | Methode legale sur remuneration brute des 12 derniers mois |
| Calcul maintien salaire | Methode du maintien de salaire si plus favorable |
| Suivi droits acquis | Tableau droits par collaborateur (acquis / pris / solde) |
| Ecriture OD automatique | Generation ecriture provision CP (6412 / 1538) |
| Reprise provision | Ecriture de reprise lors de la prise de conges |
| Historique | Traçabilite complete des calculs et hypotheses |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Calcul mensuel | Fin de mois | Calcul provision selon methode retenue, comparaison 1/10e vs maintien |
| Generation OD | Calcul valide | Creation ecriture OD provision dans journal |
| Reprise auto | Import paie (conges pris) | Ecriture de reprise proportionnelle |
| Alerte derive | Calcul mensuel | Alerte si variation provision > seuil parametrable |

---

### 4e — Immobilisations

**Description**

Gestion complete du registre des immobilisations et des equipements, calcul des amortissements (lineaire et degressif), generation des ecritures comptables, traitement des cessions et mises au rebut, suivi des immobilisations en cours, comptabilisation de la production immobilisee R&D, test d'impairment et production du tableau des immobilisations pour l'annexe.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Registre immobilisations | Fiche par immo : nature, date acquisition, valeur, duree, methode |
| Registre equipements | Inventaire physique lie au registre comptable |
| Amortissements lineaires | Calcul et ecritures 681x / 28x par immo |
| Amortissements degressifs | Coefficients fiscaux, bascule lineaire automatique |
| Ecritures automatiques | Dotations mensuelles / annuelles selon parametrage |
| Cessions | Calcul plus/moins-value, ecritures de sortie |
| Immobilisations en cours | Suivi 23x, transfert en immo definitive |
| Production immobilisee R&D | Comptabilisation 72x / 203, distinction phase R&D vs developpement |
| Impairment | Test de depreciation, ecriture de provision si VNC > VR |
| Tableau immos annexe | Export tableau standard pour annexe des comptes annuels |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Dotations mensuelles | Cloture mensuelle | Calcul et generation ecritures dotations pour toutes les immos actives |
| Bascule lineaire/degressif | Calcul amortissement | Detection du moment ou lineaire > degressif, bascule automatique |
| Alerte fin amortissement | Calcul | Notification si immo completement amortie ce mois |
| Mise a jour registre | Validation facture fournisseur (immo) | Creation automatique fiche immobilisation depuis AP |
| Export annexe | Cloture annuelle | Generation tableau immobilisations format annexe |

---

### 4f — Notes de frais

**Description**

Gestion du cycle complet des notes de frais : soumission via application mobile avec OCR des justificatifs, verification automatique de la conformite (plafonds URSSAF, categories autorisees), workflow d'approbation, comptabilisation et remboursement, avec detection de fraude par IA.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Soumission mobile OCR | Capture photo justificatif, extraction automatique montant/date/marchand |
| Verification conformite | Controle plafonds URSSAF, categories, doublons |
| Workflow approbation | Validation N+1, puis DAF si > seuil |
| Comptabilisation | Ecritures 625x / 421 / 445 automatiques |
| Remboursement | Integration virement ou paie selon parametrage |
| Detection fraude | Score IA sur patterns suspects (doublons, depassements repetitifs) |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Extraction OCR | Upload photo | Extraction champs, pre-remplissage formulaire |
| Controle conformite | Soumission | Verification regles, rejet automatique si non conforme |
| Relance approbateur | Note en attente > 48h | Notification approbateur |
| Comptabilisation | Approbation finale | Generation ecritures comptables |
| Score fraude | Chaque soumission | Calcul score, alerte si > seuil |

---

### 4g — Cloture mensuelle

**Description**

Orchestration de la cloture mensuelle via une checklist structuree en 8 blocs de J+1 a J+8, avec tableau de bord de progression en temps reel. Pre-cloture automatique des charges constatees d'avance (CCA), produits constates d'avance (PCA), factures non parvenues (FNP) et factures a emettre (FAE). Controle de la balance, suivi des comptes d'attente, rapprochement inter-modules, balance sheet reconciliation, production du P&L mensuel et lock de periode.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Checklist 8 blocs | J+1: paie / J+2: fournisseurs / J+3: immos / J+4: provisions / J+5: FNP-FAE-CCA-PCA / J+6: rapprochements / J+7: revue balance / J+8: validation et lock |
| Dashboard progression | Avancement en % par bloc, responsable, statut (en cours / valide / bloque) |
| Pre-cloture auto CCA/PCA | Calcul et ecritures automatiques charges / produits constates d'avance |
| Pre-cloture auto FNP/FAE | Detection et comptabilisation des FNP et FAE |
| Controle balance | Detection desequilibres, comptes a solde anormal |
| Comptes d'attente | Identification et resolution des ecritures en 471x / 472x |
| Rapprochement inter-modules | Coherence AR / AP / Paie / Immos / Provisions vs GL |
| Balance sheet reconciliation | Justification de chaque ligne de bilan par piece ou calcul |
| P&L mensuel auto | Generation compte de resultat mensuel et YTD |
| Archivage | Sauvegarde immuable de la balance et des etats a la date de lock |
| Lock period | Blocage des ecritures sur la periode cloturee |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Lancement checklist | J+1 apres fin de mois | Creation automatique de la checklist avec assignations |
| Calcul CCA/PCA | Etape J+5 | Calcul selon contrats et abonnements, proposition ecritures |
| Calcul FNP/FAE | Etape J+5 | Detection BL sans facture / contrats sans facture emise |
| Controle balance | Etape J+7 | Scan automatique comptes a solde anormal, rapport d'anomalies |
| Rapprochement inter-modules | Etape J+6 | Verification totaux AR/AP/Paie vs ecritures GL |
| Lock automatique | Validation DAF | Blocage periode, archivage balance figee |
| P&L auto | Validation J+8 | Generation et envoi P&L mensuel aux destinataires parametres |

---

### 4h — Etats financiers annuels

**Description**

Production des etats financiers annuels complets : bilan, compte de resultat, tableau des flux de tresorerie, annexe simplifiee, liasse fiscale 2050-2059, rapport de gestion genere par IA, avec export en PDF et XBRL pour depot electronique.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Bilan | Production bilan actif/passif selon PCG, comparatif N/N-1 |
| Compte de resultat | CR par nature, comparatif N/N-1, soldes intermediaires de gestion |
| Tableau flux tresorerie | Methode indirecte, flux exploitation / investissement / financement |
| Annexe simplifiee | Modele simplifie pour PME, notes automatisees depuis les donnees |
| Liasse fiscale 2050-2059 | Generation des tableaux fiscaux (2050 bilan actif, 2051 bilan passif, 2052 CR, 2053 SIG, 2054-2059 annexes fiscales) |
| Rapport de gestion IA | Redaction automatique commentaires de gestion (variation CA, marges, BFR, tresorerie) |
| Export PDF | Mise en page officielle, export PDF signe numeriquement |
| Export XBRL | Format XBRL pour depot electronique (infogreffe, DGFiP) |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Pre-remplissage liasse | Cloture annuelle validee | Alimentation automatique des tableaux 2050-2059 depuis la balance |
| Generation rapport IA | Cloture annuelle | Redaction brouillon rapport de gestion par IA |
| Controle coherence | Generation etats | Verification equilibre bilan, coherence CR / flux / bilan |
| Export automatique | Validation DAF | Generation PDF et XBRL, envoi aux destinataires |

---

### 4i — Facturation electronique

**Description**

Conformite a la reforme de la facturation electronique francaise : emission et reception des factures au format Factur-X, connexion aux Plateformes de Dematerialisation Partenaires (PDP), gestion du e-reporting, suivi du cycle de vie des factures et archivage a valeur probante sur 10 ans.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Format Factur-X | Generation factures PDF/A-3 embarquant le fichier XML structure |
| Envoi PDP | Transmission factures via PDP agreee (dont Chorus Pro pour secteur public) |
| Reception PDP | Recuperation factures fournisseurs via PDP, injection dans AP |
| E-reporting | Transmission des donnees de transaction a la DGFiP (B2C, international) |
| Cycle de vie | Suivi statuts : emise / deposee / rejetee / acceptee / payee |
| Conformite mentions | Controle automatique des mentions obligatoires |
| Archivage valeur probante | Conservation 10 ans, piste d'audit fiable (PAF), integrabilite GED |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Generation Factur-X | Emission facture client | Creation automatique PDF/A-3 + XML |
| Envoi PDP | Generation Factur-X | Transmission via PDP et suivi statut |
| Reception et import | Reception facture via PDP | Injection dans module AP, lancement OCR si necessaire |
| E-reporting | Fin de periode (mensuelle/trimestrielle) | Preparation et envoi fichier e-reporting DGFiP |
| Alerte statut | Changement statut facture | Notification au responsable (rejet, litige) |
| Archivage auto | Facture finalisee | Horodatage, empreinte, archivage GED |

---

### 4j — FEC

**Description**

Generation du Fichier des Ecritures Comptables (FEC) en conformite avec l'arrete du 29 juillet 2013 : 18 champs obligatoires, controle de conformite integre, outil de test FEC, archivage et maintien de la piste d'audit fiable (PAF).

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Generation FEC | Export TXT pipe-separated des 18 champs reglementaires |
| Controle conformite | Verification format, completude, coherence (debit = credit, chronologie) |
| Test FEC | Simulation controle DGFiP : detection anomalies avant remise |
| Archivage | Conservation FEC par exercice avec horodatage |
| Piste audit fiable (PAF) | Lien facture / ecriture / paiement tracable et inalterable |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Generation FEC | Cloture annuelle validee | Export automatique FEC exercice clos |
| Controle conformite | Generation FEC | Rapport de controle, liste des anomalies |
| Test pre-remise | Demande utilisateur | Simulation controle fiscal, rapport de conformite |
| Archivage | Generation validee | Stockage immuable, hash SHA-256 |

---

### 4k — Mapping PCG / Groupe

**Description**

Couche de mapping permettant de faire coexister deux referentiels comptables : les comptes francais PCG (plan comptable general) et les comptes groupe (IFRS ou referentiel interne). Une table de mapping relie chaque compte PCG a un compte groupe. Le module gere la neutralisation d'ecritures specifiques au referentiel local, applique les 18 retraitements IFRS classes par complexite (simple / moyen / complexe), traite differemment la production immobilisee, et produit un reporting bi-referentiel (P&L et Bilan en format francais ou groupe) ainsi que des packages de consolidation.

> **Note** : Ce sous-module dispose de son propre PRD detaille dans `mapping-groupe/PRD.md` (a renommer en `SPEC.md`). La presente section constitue la description de haut niveau dans la SPEC du module Comptabilite.

**Fonctionnalites**

| Fonctionnalite | Detail |
|----------------|--------|
| Deux couches de comptes | Referentiel PCG et referentiel groupe geres en parallele |
| Table de mapping | Association N-N entre comptes PCG et comptes groupe, versionnable |
| Neutralisation d'ecritures | Identification et exclusion des ecritures 100% locales (ex: amortissements derogatoires) |
| Retraitements IFRS simples | 6 retraitements : leasing IFRS 16, retraitement subventions, elimination provisions reglementees, etc. |
| Retraitements IFRS moyens | 6 retraitements : revenue recognition IFRS 15, avantages salaries IAS 19, impots differes IAS 12, etc. |
| Retraitements IFRS complexes | 6 retraitements : instruments financiers IFRS 9, regroupements IFRS 3, tests depreciation IAS 36, etc. |
| Production immobilisee | Traitement differentie PCG (720) vs IFRS (IAS 38 capitalisation stricte) |
| Reporting bi-referentiel | P&L et Bilan generes en format PCG ou en format groupe au choix |
| Package de consolidation | Production du reporting package pour la consolidation groupe |

**Automatisation**

| Automatisation | Declencheur | Action |
|----------------|------------|--------|
| Application mapping | Chaque ecriture GL | Affectation automatique compte groupe selon table de mapping |
| Retraitements simples | Cloture mensuelle | Application automatique des 6 retraitements simples |
| Retraitements moyens | Cloture mensuelle | Application semi-automatique des 6 retraitements moyens (validation requise) |
| Retraitements complexes | Cloture annuelle | Workflow dedie, intervention expert-comptable requise |
| Generation package | Validation cloture | Production package consolidation format groupe |
| Reporting bi-referentiel | Demande utilisateur ou cloture | Generation P&L + Bilan en format PCG et groupe cote a cote |

---

## Entrees / Sorties par sous-module

### 4a — AR

| | Detail |
|---|---|
| **Entrees** | Contrats/abonnements clients, donnees de facturation (Stripe, GoCardless), encaissements bancaires (2b), regles de lettrage |
| **Sorties** | Factures emises (Factur-X), balance auxiliaire 411, aging report, DSO, prevision encaissements, scoring client, relances automatiques, ecritures comptables, revenue recognition |
| **Dependances** | 2b (Banque), connecteurs paiement (Stripe, GoCardless) |
| **Consommateurs** | 2a (Cash Forecast), 2e (Affacturage), 3a (KPIs), 4g (Cloture — bloc J+3 AR), 4i (Facturation electronique), 9c (Predictive Risk) |

### 4b — AP

| | Detail |
|---|---|
| **Entrees** | Factures fournisseurs (email, scan, API), bons de commande, bons de reception, donnees bancaires (2b) |
| **Sorties** | Factures comptabilisees, balance auxiliaire 401, DPO, FNP, ordres de paiement SEPA, spend analytics, alertes conformite LME, ecritures comptables |
| **Dependances** | 2b (Banque), connecteurs comptabilite (Pennylane, Sage, Cegid) |
| **Consommateurs** | 2a (Cash Forecast), 3e (Comptabilite analytique), 4g (Cloture — bloc J+2 AP), 4i (Facturation electronique) |

### 4c — Paie & charges sociales

| | Detail |
|---|---|
| **Entrees** | Donnees de paie importees (Silae, PayFit, Lucca), registre du personnel (5c), temps de travail et absences (5f), avantages (5i) |
| **Sorties** | Ecritures comptables de paie (641, 645, 431/437, 421), masse salariale par departement, cout charge par employe, verification DSN, alertes coherence |
| **Dependances** | 5c (Admin personnel), 5f (Temps & absences), 5i (Remuneration), connecteurs SIRH |
| **Consommateurs** | 2a (Cash Forecast), 4d (Provisions CP), 4g (Cloture — bloc J+5 paie), 5j (Index egalite), 6c (CIR), 6e (Participation) |

### 4d — Provisions conges payes

| | Detail |
|---|---|
| **Entrees** | Droits acquis et droits pris (5f), salaires bruts (4c), taux de charges sociales |
| **Sorties** | OD mensuelle de provision CP, suivi des droits par salarie, reprise de provision, reporting |
| **Dependances** | 4c (Paie), 5f (Temps & absences) |
| **Consommateurs** | 4g (Cloture — bloc J+5 provisions) |

### 4e — Immobilisations & amortissements

| | Detail |
|---|---|
| **Entrees** | Donnees acquisition (factures fournisseurs 4b, production immobilisee 6c), plans amortissement, registre equipements (lien 5c) |
| **Sorties** | Dotations mensuelles amortissements (681x/28xx), plus/moins-values cession, tableau immobilisations (annexe), registre equipements, alertes depreciation |
| **Dependances** | 4b (AP — factures acquisition), 5c (Admin personnel — affectataires), 6c (CIR — production immobilisee) |
| **Consommateurs** | 4g (Cloture), 4h (Etats financiers — tableau immobilisations), 6c (CIR — amortissements eligibles) |

### 4f — Notes de frais

| | Detail |
|---|---|
| **Entrees** | Justificatifs numeriques (photos, PDF), politique de frais (config), donnees bancaires (2b) |
| **Sorties** | Notes de frais validees, ecritures comptables (charges + TVA deductible), remboursements, rapports conformite, alertes fraude |
| **Dependances** | 2b (Banque), 4c (Paie — integration remboursement) |
| **Consommateurs** | 4g (Cloture), 6a (TVA — TVA deductible) |

### 4g — Cloture mensuelle

| | Detail |
|---|---|
| **Entrees** | Rapprochement bancaire (2b), soldes AR (4a), soldes AP (4b), ecritures paie (4c), provisions CP (4d), dotations amortissements (4e), notes de frais (4f), declarations TVA (6a), provisions IS (6d), balance N et N-1 |
| **Sorties** | Cloture validee, ecritures cut-off (CCA, PCA, FNP, FAE), balance sheet reconciliation, P&L mensuel, dossier archivage, periode verrouillee |
| **Dependances** | 2b, 4a, 4b, 4c, 4d, 4e, 4f, 6a, 6d |
| **Consommateurs** | 1 (Daily CFO), 3b (Budget — reel vs budget), 3d (Reporting), 4h (Etats financiers), 9b (Financial Memory) |

### 4h — Etats financiers annuels

| | Detail |
|---|---|
| **Entrees** | 12 clotures mensuelles validees (4g), tableau immobilisations (4e), provisions (4d), donnees fiscales (6a/6d), resultat fiscal (6d) |
| **Sorties** | Bilan, compte de resultat, tableau flux tresorerie, annexe, liasse fiscale (CERFA 2050-2059), rapport de gestion (IA), exports (PDF, XBRL) |
| **Dependances** | 4g (Cloture), 4e (Immobilisations), 6a (TVA), 6d (IS) |
| **Consommateurs** | 7a (Secretariat juridique — approbation comptes), 8b (Relations CAC), 8c (Data Room) |

### 4i — Facturation electronique

| | Detail |
|---|---|
| **Entrees** | Factures emises (4a), factures recues (4b), plateforme PDP |
| **Sorties** | Factures Factur-X conformes, statuts cycle de vie, e-reporting, archivage valeur probante |
| **Dependances** | 4a (AR), 4b (AP) |
| **Consommateurs** | 8d (Conformite — archivage) |

### 4j — FEC

| | Detail |
|---|---|
| **Entrees** | Grand livre comptable (toutes les ecritures de tous les sous-modules 4x) |
| **Sorties** | Fichier FEC conforme (18 champs obligatoires), rapport auto-test, piste audit fiable (PAF) |
| **Dependances** | 4 (tous les sous-modules comptables) |
| **Consommateurs** | 4k (Mapping PCG/Groupe), 8b (Relations CAC), 8d (Conformite) |

### 4k — Mapping PCG / Groupe

| | Detail |
|---|---|
| **Entrees** | FEC ou grand livre (4j), table de mapping PCG <> comptes groupe (config), retraitements IFRS |
| **Sorties** | Package de consolidation, ecritures remappees, reporting au format groupe (P&L + Bilan), reconciliation inter-comptes |
| **Dependances** | 4j (FEC) |
| **Consommateurs** | 8c (Data Room) |

---

## Phasage

### MVP — Phase 1

Sous-modules inclus dans la premiere version livrable :

| Code | Sous-module |
|------|-------------|
| 4a | AR — Accounts Receivable |
| 4b | AP — Accounts Payable |
| 4c | Paie |
| 4d | Provisions Conges Payes |
| 4e | Immobilisations |
| 4g | Cloture mensuelle |
| 4h | Etats financiers annuels |
| 4j | FEC |

Objectif MVP : couvrir le cycle comptable complet d'une PME francaise, produire les etats financiers et le FEC, et automatiser la cloture mensuelle.

### V2 — Phase 2

| Code | Sous-module | Raison du decalage |
|------|-------------|-------------------|
| 4f | Notes de frais | Necessite application mobile native |
| 4i | Facturation electronique | Dependance au calendrier reglementaire DGFiP (2026) |
| 4k | Mapping PCG / Groupe | Complexite du moteur de retraitement, cible clients groupe |

### V3 — Phase 3

| Perimetre | Detail |
|-----------|--------|
| Retraitements IFRS complexes | 6 retraitements complexes du sous-module 4k (IFRS 9, IFRS 3, IAS 36) |
| Tests d'impairment automatises | Integration modeles de valorisation pour IAS 36 |
| Consolidation multi-entites | Extension du package de consolidation aux groupes multi-filiales |

---

## Connecteurs

| Connecteur | Type | Perimetre |
|-----------|------|-----------|
| Pennylane | API REST | Import/export ecritures, grand livre, tiers |
| Sage | API / fichier | Import balance, FEC, immobilisations |
| Cegid | API / fichier | Import balance, FEC, liasse fiscale |
| Silae | API | Import donnees paie, DSN, ecritures OD |
| PayFit | API | Import donnees paie, remboursement NDF |
| Lucca | API | Import notes de frais, conges payes, paie |
| Chorus Pro (PDP) | API Piste | Envoi/reception factures electroniques secteur public |
| PDP partenaires | API PDP | Envoi/reception factures electroniques secteur prive (2026) |
