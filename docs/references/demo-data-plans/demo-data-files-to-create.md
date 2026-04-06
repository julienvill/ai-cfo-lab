# Liste des fichiers de données démo à créer

Pour enrichir les 3 entreprises démo AI CFO Lab (Propello SaaS, Maison Nordique
e-commerce, Mécaform industrie) et couvrir les processus observés sur le terrain.

Voir `cabinet-comptable-taxonomy.md` et `prd-enrichments-proposals.md` pour le
contexte métier.

**Référentiel cible** : `/Users/julien/Dev/AI-CFO-Lab/platform/data/{entreprise}/`

---

## Légende priorisation

| Priorité | Signification |
|---|---|
| **P1** | Essentiel pour démo crédible des modules core (V1/V2) |
| **P2** | Nécessaire pour démos avancées (groupes, multi-entités) |
| **P3** | Enrichissement ultérieur |

| Portée | Signification |
|---|---|
| **3 entités** | Propello + Maison Nordique + Mécaform |
| **Propello seul** | Cas SaaS / R&D |
| **Groupe** | Propello ou Maison Nordique (avec filiale/holding) |

---

## 1. Fichiers liés à la clôture & justification bilan

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 1 | `leadsheets-2025-12.json` | 3 entités | **P1** | Dossier de justification par poste de bilan au 31/12/2025 : immobilisations, clients, fournisseurs, banques, emprunts, provisions, IC, capitaux propres. Une leadsheet par compte principal avec statut (validé/WiP), rapprochement, evidence liée |
| 2 | `checklist-cloture-decembre-2025.json` | 3 entités | **P1** | Progression 8 blocs de clôture + dossier de justification : statuts par étape, responsables, dates, alertes |
| 3 | `balance-sheet-reconciliation-2025.json` | 3 entités | **P1** | Rapprochement compte par compte N vs N-1, écarts, justifications, anomalies détectées |
| 4 | `cut-off-writes-2025-12.json` | 3 entités | **P1** | Écritures de cut-off : CCA, PCA, FNP, FAE par ligne, contreparties |
| 5 | `provisions-detail-2025.json` | 3 entités | **P2** | Détail des provisions : IDR, litiges, garanties, risques clients, charges à payer |

---

## 2. Fichiers liés aux flux intercompany (groupes)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 6 | `intercompany-flows-2025.json` | Groupe | **P2** | Flux IC mensuels : rebill in / rebill out par entité, factures, paiements, soldes comptes courants IC |
| 7 | `cost-plus-worksheet-2025.json` | Groupe | **P2** | Calcul prix de cession interne : base de coûts, marge contractuelle, justification transfer pricing |
| 8 | `ic-reconciliation-2025-12.json` | Groupe | **P2** | Matching entités A/B, écarts, commentaires, solde final des comptes courants |
| 9 | `tva-rebill-annuel-2025.json` | Groupe | **P2** | Rattrapage TVA IC fin d'exercice : calcul, ajustements, écritures |
| 10 | `transfer-pricing-documentation-2025.json` | Groupe | **P3** | Fichier local + contrats intragroupe, benchmarks, déclaration 2257-SD |

**Suggestion** : Introduire une holding fictive au-dessus de **Propello** (ex: "Propello Holding SAS") et une filiale internationale (ex: "Propello UK Ltd") pour illustrer les flux IC. Ou bien utiliser **Mécaform** avec une filiale étrangère (ex: atelier Tunisie / Maroc) pour illustrer un cas industriel multi-sites.

---

## 3. Fichiers liés au cycle fournisseurs enrichi

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 11 | `vendor-master-2025.json` | 3 entités | **P1** | Référentiel fournisseurs complet : KYC, IBAN, plafonds, flag IC, statut, historique paiements |
| 12 | `three-way-matching-2025.json` | 3 entités | **P2** | Rapprochement BC / BL / Facture par ligne, exceptions, validations |
| 13 | `paiements-fournisseurs-2025-mensuel.json` | 3 entités | **P2** | Lots SEPA générés par mois, statut, délais LME, alertes dépassement |
| 14 | `saisies-administratives-2025.json` | Mécaform ou Maison Nordique | **P3** | Avis à tiers détenteur reçus (URSSAF, impôts), blocages paiements, versements Trésor |

---

## 4. Fichiers liés au cycle clients enrichi

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 15 | `aging-balance-clients-snapshots-2025.json` | 3 entités | **P1** | Balance âgée clients snapshot fin de chaque mois (pas seulement current) : historique tranches |
| 16 | `dunning-history-2025.json` | 3 entités | **P2** | Historique des relances par facture, paliers, emails envoyés, réponses, statut |
| 17 | `scoring-clients-2025.json` | 3 entités | **P2** | Scoring risque par client : paiement historique, exposition, alertes |
| 18 | `litiges-clients-2025.json` | 3 entités | **P3** | Contestations en cours, avoirs émis, workflow résolution |

---

## 5. Fichiers liés à la trésorerie enrichie

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 19 | `rapprochement-bancaire-2025-mensuel.json` | 3 entités | **P1** | État de rapprochement mensuel par compte bancaire : pointage, suspens |
| 20 | `circularisation-bancaire-2025.json` | 3 entités | **P2** | Lettres de confirmation CAC envoyées aux banques, réponses, écarts |
| 21 | `emprunts-detail-2025.json` | 3 entités | **P1** | Détail par ligne de crédit : acte, échéancier, assurance emprunteur, solde dû, intérêts payés cumul |
| 22 | `prets-honneur-fondateurs-2025.json` | Maison Nordique | **P3** | Prêts d'honneur accordés aux co-gérants (TPE), engagements personnels |
| 23 | `cautions-garanties-2025.json` | 3 entités | **P3** | Registre des cautions données/reçues (hors bilan) |

---

## 6. Fichiers liés à l'audit & circularisation

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 24 | `circularisation-clients-2025.json` | 3 entités | **P2** | Lettres de confirmation clients top N, réponses, écarts |
| 25 | `circularisation-fournisseurs-2025.json` | 3 entités | **P2** | Lettres de confirmation fournisseurs top N |
| 26 | `circularisation-avocats-2025.json` | 3 entités | **P2** | Confirmations contentieux et passifs potentiels |
| 27 | `piste-audit-fiable-2025.json` | 3 entités | **P2** | PAF : chemin facture → écriture → paiement, documentation |

---

## 7. Fichiers liés à la paie enrichie

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 28 | `paie-etrangere-2025.json` | Groupe ou Propello | **P3** | Bulletins format étranger (1 expatrié), devise, harmonisation comptable |
| 29 | `aides-embauche-2025.json` | Maison Nordique | **P2** | Contrats aidés (apprentis, emploi-franc), crédits de cotisations reçus |
| 30 | `provisions-bonus-commissions-2025.json` | 3 entités | **P1** | Provisions variable rémunération : bonus annuels, commissions commerciales |
| 31 | `charges-sociales-detail-2025.json` | 3 entités | **P2** | Détail charges par organisme (URSSAF, AGIRC, prévoyance, mutuelle) |
| 32 | `commissions-payables-2025.json` | Maison Nordique ou Propello | **P2** | Provisions commissions commerciales par vendeur, calcul, échéances |

---

## 8. Fichiers liés au FP&A et à l'analytique

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 33 | `cost-allocation-cloud-2025.json` | Propello | **P2** | Allocation coûts AWS / GCP par projet, par entité, clés de répartition |
| 34 | `cost-allocation-siege-2025.json` | Groupe | **P2** | Refacturation frais de siège aux filiales (forfait, % CA, headcount) |
| 35 | `revenue-breakdown-2025.json` | 3 entités | **P1** | Décomposition CA : par produit/service, par client, par canal, mensuel |
| 36 | `comptabilite-analytique-2025.json` | 3 entités | **P2** | Ventilation par centres de coût, par projet, par activité |

---

## 9. Fichiers liés au CIR / R&D

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 37 | `fiches-projets-rd-2025.json` | Propello | **P1** | Fiches techniques par projet R&D : état de l'art, verrous, travaux menés (déjà évoqué, à compléter) |
| 38 | `declaration-cir-2069-a-sd-2025.json` | Propello | **P2** | Pré-remplissage formulaire 2069-A-SD avec données de temps-rd.json |
| 39 | `prestataires-cir-honoraires-2025.json` | Propello | **P3** | Honoraires cabinet conseil CIR (à déduire de l'assiette) |

---

## 10. Fichiers liés à la migration / onboarding

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 40 | `justif-transition-cabinet.json` | 1 entité exemple | **P3** | Dossier de transition ex-cabinet → plateforme : balance reprise, écritures d'à-nouveau, période double |
| 41 | `balance-reprise-ouverture-2024.json` | 3 entités | **P3** | Balance de sortie exercice antérieur (si besoin, déjà existe partiellement) |

---

## 11. Plan de production recommandé (vague 1 — P1)

### Ordre de création suggéré

**Sprint 1 — Clôture & justification** (4-5 fichiers)
1. `leadsheets-2025-12.json` (3 entités) — template de base
2. `checklist-cloture-decembre-2025.json` (3 entités)
3. `cut-off-writes-2025-12.json` (3 entités)
4. `balance-sheet-reconciliation-2025.json` (3 entités)

**Sprint 2 — Cycle fournisseurs/clients** (3-4 fichiers)
5. `vendor-master-2025.json` (3 entités)
6. `aging-balance-clients-snapshots-2025.json` (3 entités)
7. `revenue-breakdown-2025.json` (3 entités)
8. `provisions-bonus-commissions-2025.json` (3 entités)

**Sprint 3 — Trésorerie & emprunts** (2-3 fichiers)
9. `emprunts-detail-2025.json` (3 entités)
10. `rapprochement-bancaire-2025-mensuel.json` (3 entités)
11. `fiches-projets-rd-2025.json` (Propello)

**Total Sprint V1 : ~11 fichiers × ~3 entités = ~25-30 nouveaux JSON**

---

## 12. Volumétrie cible

Pour rester cohérent avec le profil réaliste des 3 entreprises :

| Entreprise | Fichiers existants | À ajouter (P1) | Total V2 |
|---|---|---|---|
| **Propello** (SaaS, ~25 sal.) | ~17 | ~11 | ~28 |
| **Maison Nordique** (e-commerce, ~15 sal.) | ? | ~8 (version allégée) | ~15-18 |
| **Mécaform** (industrie, ~80 sal.) | ? | ~11 | ~20-25 |

Les fichiers leadsheets, IC, cost plus ne s'appliquent qu'aux entreprises en
configuration groupe (Propello + holding fictive ou Mécaform + filiale).

---

## 13. Conventions communes à tous les nouveaux fichiers

- Encoding : UTF-8, pas d'accents dans les clés JSON (camelCase ou snake_case)
- Dates : ISO 8601 (`YYYY-MM-DD`)
- Montants : nombre décimal (pas de string), 2 décimales max
- Devises : EUR par défaut, sinon champ `currency` explicite
- Métadonnées obligatoires en tête de chaque fichier :
  ```json
  {
    "metadata": {
      "company": "...",
      "exercice": "2025",
      "generated_at": "YYYY-MM-DD",
      "description": "..."
    },
    ...
  }
  ```
- Cohérence : chaque fichier doit pouvoir être réconcilié avec `fec-YYYY.json`,
  `balance-cloture-YYYY.json`, `employees.json`

---

## 14. Propositions d'extension structurelle de Propello

Pour illustrer le cas "groupe" sur Propello (aujourd'hui mono-entité), introduire :

- **Propello Holding SAS** (société mère fictive, SIREN distinct)
- **Propello UK Ltd** (filiale UK, GBP, 3-5 salariés)
- Flux IC : refacturation de services R&D de Propello SAS vers Propello UK Ltd
- Management fees de Propello Holding vers Propello SAS

Cela permettrait de démontrer les modules 4m (IC), 4n (allocations), 6g (TP),
8e (circularisation multi-entités) sans changer le cœur du jeu de données existant.

---

*Fin de liste.*
