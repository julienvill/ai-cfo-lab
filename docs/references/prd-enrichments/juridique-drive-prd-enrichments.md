# Propositions d'enrichissement du PRD AI CFO Lab — Juridique Drives

Basé sur l'observation des drives Juridique (opérationnel + confidentiel) d'une PME technologique française (SAS multi-actionnaires, ~4-5 ans d'historique, rounds successifs + opération M&A).

Voir `juridique-drive-taxonomy.md` pour le détail de l'analyse source.

---

## 1. Module 7 — Juridique / Corporate (enrichissements majeurs)

### 1.1 ENRICHISSEMENT : 7b — Cap table & BSPCE → workflow end-to-end rounds

**Constat source** : cap tables stockées en plusieurs versions manuelles (v1, v2, v3, v4 + dates + simplifiée + Liquidation), risque élevé d'écart entre fichiers, chaque round d'augmentation de K génère ~30-50 fichiers dispersés.

**Description** : transformer 7b en module de gestion des opérations sur capital avec workflow end-to-end par round, cap table en base unique et génération automatisée des documents.

**Fonctionnalités nouvelles** :

| Fonctionnalité | Description |
|---|---|
| **Single source of truth cap table** | DB unique, historique intégré par événement (pas de versioning manuel), diff automatique entre états N et N-1 |
| **Workflow par round AK** | Étapes structurées : term sheet → redlines → DD → décision AGE → bulletins souscription → attestations PEA → attestation dépôt fonds → PV réalisation → MAJ cap table → mini-pactes → CERFA → MAJ statuts → dépôt greffe |
| **Workflow par tranche BSPCE** | Étapes : identification bénéficiaires → valorisation → rapport Président → rapport CAC → décision → convention individuelle → mini-pacte → signature électronique → MAJ registre titres |
| **Mini-pactes individuels** | Génération automatique d'un mini-pacte par bénéficiaire (fondateur, salarié, dirigeant), tracking des signatures |
| **CERFA dispositif fiscal par souscripteur** | Génération automatique des CERFA (IR-PME, PEA-PME, Madelin) par souscripteur, attestations de libération, dossier DIRCOFI |
| **Waterfall dynamique** | Simulation répartition produit cession selon préférences liquidation, classes d'actions, ratchets, par scénario de valorisation |
| **Rounds avortés — traces** | Conservation traces LOI et TS non signés pour historique et audit DD ultérieure |
| **Registre mouvements titres** | Auto-généré à chaque événement K, exportable pour greffe |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Cap table DB historisée | 🟢 100% auto |
| Génération documents round (TS, bulletin, attestation) | 🟢 Templates + données |
| Mini-pactes par bénéficiaire | 🟢 Génération auto |
| CERFA par souscripteur | 🟢 100% auto |
| Waterfall simulations | 🟢 100% auto |
| Signature électronique | 🟡 Intégration prestataire |
| Décision d'attribution BSPCE | 🔴 Humain (board) |

---

### 1.2 NOUVEAU : 7f — M&A sell-side

**Constat source** : opération de cession observée avec data room massive (>200 docs, 10 catégories), completion accounts multi-versions, waterfall, traitement spécifique BSPCE en cours.

**Description** : module dédié aux opérations sell-side (cession totale ou partielle de titres).

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Préparation cession** | Info memorandum, teaser, buyer list, mandatement cabinet M&A |
| **Data room sell-side** | Structure 10 catégories : Corporate / Finance / IT & Payroll / IP / Legal / Litigation / Sales / Solution / Source listing / Subsidies — auto-peuplée depuis modules AI CFO Lab |
| **Process Q&A DD** | Tracker questions-réponses acquéreur, statut par question, propriétaire interne |
| **Completion accounts** | Comptes arrêtés à date de closing, réconciliation vs estimation, mécanisme d'ajustement de prix |
| **Simulation prix cession** | Modèle valorisation (DCF, multiples, transactions comparables) |
| **Waterfall cession** | Répartition prix entre actionnaires selon préférences liquidation, classes d'actions, anti-dilution, earn-out |
| **Traitement BSPCE en cours** | Accélération vesting, sortie, substitution, rachat par acquéreur — impact sur prix net fondateurs |
| **SPA & GAP** | Versioning négociation, annexes GAP (déclarations & garanties), exceptions listées |
| **Earn-out & escrow** | Suivi pluri-annuel paiements conditionnels, calcul indicateurs de déclenchement |
| **Closing checklist** | Conditions suspensives (CP), conditions préalables, séquence closing |
| **Reporting post-closing** | Rapport final actionnaires sortants, calcul TRI investisseurs |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Data room auto-peuplée | 🟢 Depuis modules AI CFO Lab |
| Completion accounts | 🟡 Import comptes + retraitements |
| Waterfall cession | 🟢 100% auto |
| Traitement BSPCE | 🟢 100% auto (simulation) |
| Earn-out tracking | 🟢 100% auto (indicateurs) |
| Négociation SPA/GAP | 🔴 Humain (cabinet) |

---

### 1.3 NOUVEAU : 7g — IP & brevets multi-juridictions

**Constat source** : familles de brevets identifiées par références internes, dépôts INPI, extensions internationales, suivi annuités, cessions de marque.

**Description** : registre centralisé portefeuille IP (brevets, marques, dessins, logiciels).

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Registre familles IP** | Base par référence (numéro interne), inventeurs, date priorité, titre, abstract |
| **Déclarations PI inventeurs (DPI)** | Formulaire cession droits de l'inventeur à société, archivage signé |
| **Dépôts multi-juridictions** | Suivi FR INPI → PCT → phases nationales (US, EP, CN, JP…), statut par pays |
| **Calendrier annuités** | Alertes paiement annuités multi-pays, délégation cabinet PI |
| **Marques** | Dépôt, classes Nice, renouvellement décennal, surveillance BOPI |
| **Cessions & licences IP** | Actes cession marque/brevet, contrats licence, redevances |
| **Coûts IP par famille** | Tracking dépenses dépôt + annuités + honoraires cabinet PI |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Alertes annuités | 🟢 100% auto |
| Suivi statut dépôts | 🟡 Saisie retours cabinet PI |
| Coûts par famille | 🟢 Lien avec 4b Fournisseurs |
| Décisions stratégiques PI | 🔴 Humain |

---

### 1.4 NOUVEAU : 7h — Vigilance sous-traitants

**Constat source** : ~10 sous-traitants actifs, fichier de suivi central, obligation URSSAF semestrielle, pièces KYC collectées par dossier.

**Description** : automatisation de l'obligation légale de vigilance du donneur d'ordre (L.8222-1 CT, L.243-15 CSS).

**Fonctionnalités** :

| Fonctionnalité | Description |
|---|---|
| **Référentiel sous-traitants** | Base centrale : raison sociale, SIREN, IBAN, contact, contrat associé |
| **KYC automatisé** | Collecte Kbis (< 3 mois), attestation vigilance URSSAF (< 6 mois), attestation fiscale, attestation RC Pro |
| **Alertes renouvellement** | Semestrielles (URSSAF + fiscale), annuelles (RC Pro), automatiques |
| **Vérification authenticité** | Intégration API INSEE, URSSAF (si disponible) |
| **Statut conformité** | Dashboard par sous-traitant : vert (à jour), orange (échéance < 30j), rouge (périmé) |
| **Relances automatiques** | Email automatique au sous-traitant si pièce expirée |
| **Piste audit** | Traçabilité complète pour contrôles URSSAF |

**Automatisation** :

| Élément | Niveau |
|---|---|
| Alertes renouvellement | 🟢 100% auto |
| Vérification API | 🟢 100% auto (si API dispo) |
| Relances sous-traitants | 🟢 100% auto |
| Vérification manuelle pièces | 🟡 Humain si API indisponible |

---

### 1.5 ENRICHISSEMENT : 7e — Contentieux (V3)

**Constat source** : deux types contentieux observés — dossiers d'expertise dommages (avant procédure) et pièces judiciaires numérotées (procédure active).

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Expertise dommages pré-contentieuse** | Mandatement cabinet expertise, rapports évaluation préjudices versionnés, mise à jour taux actualisation, rapprochement réalisations |
| **Bordereau communication pièces (BCP)** | Génération automatique BCP numérotés, numérotation pièces (n°1, n°1-1, n°17-10, etc.) |
| **Gestion mémoires & conclusions** | Versionning drafts cabinet, archivage conclusions signifiées |
| **Calendrier procédure** | Audiences, mises en état, délais légaux |
| **Provisionnement affiné** | Liaison avec module 4 comptabilité : calcul provision par dossier selon risque + montants, ajustements trimestriels |

---

## 2. Module 8 — Audit & Compliance (enrichissements)

### 2.1 ENRICHISSEMENT : 8c — Data Room (templatisation M&A)

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Template 10 catégories M&A** | Corporate / Finance / IT & Payroll / IP / Legal / Litigation / Sales / Solution / Source listing / Subsidies |
| **Auto-population depuis modules** | Corporate ← 7a, Finance ← 4, IT ← 5, IP ← 7g, Legal ← 7a+7c, Litigation ← 7e, Sales ← 2 CRM, Subsidies ← 2h+6c |
| **Checklist DD par type opération** | Template DD : seed / A / B / C / sell-side / financement bancaire / contrôle fiscal |
| **Q&A tracker** | Questions acquéreur/prêteur, statut, propriétaire interne, délai |
| **Droits d'accès granulaires** | Niveau 1 (buyer lead), niveau 2 (cabinet DD), niveau 3 (exec), logs d'accès |
| **Watermarking documents** | Marquage destinataire pour traçabilité fuites |

---

### 2.2 ENRICHISSEMENT : 8d — RGPD / Coffre-fort documents d'identité

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Coffre-fort identités mandataires** | Stockage sécurisé (chiffrement fort) CNI/passeports dirigeants, mandataires sociaux, représentants bailleurs publics |
| **Alertes expiration** | CNI (validité 15 ans), passeports (10 ans), titres séjour |
| **Registre traitements ST 4b** | Lien avec vigilance sous-traitants (7h) : registre conforme article 30 RGPD |

---

## 3. Module 2 — Cash Management (lien financement structuré)

### 3.1 ENRICHISSEMENT : 2h — Financement public → workflow OC bailleur public

**Constat source** : obligations convertibles bailleur public avec workflow distinct d'une AK classique (avis décaissement, bulletin OCA, commissaire à la vérification, rapports spécifiques).

**Ajouts proposés** :

| Nouvelle fonctionnalité | Description |
|---|---|
| **Workflow OC bailleur public** | Étapes : dossier demande → décision bailleur → AG émission OC → rapport Président → nomination commissaire à vérification → avis décaissement → bulletin OCA → PV réalisation |
| **Conversion OC → titres** | Déclenchement automatique selon conditions contrat (maturité, événement liquidité, conversion volontaire) |
| **Reporting bailleur** | Reporting périodique obligatoire : P&L vs prévisions, événements significatifs, modifications gouvernance |
| **Changements représentants** | Registre des changements de représentants bailleur public, transmission automatique |

---

## 4. Priorisation recommandée

| Priorité | Module | Justification |
|---|---|---|
| **P1 V2** | 7b enrichi — Rounds & BSPCE end-to-end | Cœur valeur startup/scale-up, douleur forte (cap table fragile), démo percutante |
| **P1 V2** | 7f NOUVEAU — M&A sell-side | Événement à forte valeur, différenciant, peu de SaaS couvre bien le sell-side PME |
| **P2 V2** | 8c enrichi — Data room templatisée | Support direct au 7f, réutilisable levées + DD |
| **P2 V2** | 7h NOUVEAU — Vigilance sous-traitants | Obligation légale claire, faible complexité, valeur immédiate |
| **P2 V3** | 7g NOUVEAU — IP multi-juridictions | Niche (tech, deeptech), mais critique pour valorisation DD |
| **P3 V3** | 7e enrichi — Contentieux expertise + BCP | Ponctuel, valeur si contentieux actif |
| **P3 V3** | 2h enrichi — OC bailleur public | Spécifique PME tech bénéficiant dispositifs publics |
| **P3 V3** | 8d enrichi — Coffre-fort identités | Conformité RGPD, faible effort |

---

## 5. Impact sur les 3 entreprises démo

| Entreprise | Modules applicables | Notes |
|---|---|---|
| **Propello (SaaS, ~25 sal.)** | 7b end-to-end, 7f, 7g, 7h, 2h OC | Cas SaaS startup : rounds AK successifs, BSPCE réguliers, IP brevetée, sous-traitants tech, financement bailleur public. M&A plausible à horizon 3-5 ans. |
| **Maison Nordique (e-commerce, ~15 sal.)** | 7b (cap table simple), 7h, 7e | Cas TPE e-commerce : cap table stable (co-gérants), vigilance sous-traitants logistiques, contentieux commerciaux possibles. Pas de BSPCE a priori. |
| **Mécaform (industrie, ~80 sal.)** | 7b, 7f (brevets procédés), 7g, 7h, 7e | Cas PME industrielle : cap table structurée, IP (savoir-faire, procédés), sous-traitants tech/maintenance, certifications, contentieux qualité possibles. |

---

## 6. Tableau de synthèse — Nouveaux modules vs existants

| Module | Status | Placement | Impact PRD |
|---|---|---|---|
| 7b Rounds & BSPCE end-to-end | ENRICHISSEMENT majeur | Module 7 existant | +60% contenu 7b |
| 7f M&A sell-side | NOUVEAU | Après 7e | +1 sous-module entier |
| 7g IP multi-juridictions | NOUVEAU | Après 7f | +1 sous-module entier |
| 7h Vigilance sous-traitants | NOUVEAU | Sous-section 7c | +1 sous-module |
| 7e Contentieux expertise/BCP | ENRICHISSEMENT | Module 7e | +40% contenu 7e |
| 8c Data room templatisée | ENRICHISSEMENT | Module 8c | +30% contenu |
| 8d Coffre-fort identités | ENRICHISSEMENT | Module 8d | +10% contenu |
| 2h OC bailleur public | ENRICHISSEMENT | Module 2h | +20% contenu |

---

*Fin des propositions.*
