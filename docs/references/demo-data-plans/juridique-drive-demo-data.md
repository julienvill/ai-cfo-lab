# Liste des fichiers démo à créer — Juridique Drives cases

Pour enrichir les 3 entreprises démo AI CFO Lab (Propello SaaS, Maison Nordique e-commerce, Mécaform industrie) avec des processus Juridique observés.

Voir `juridique-drive-taxonomy.md` et `juridique-drive-prd-enrichments.md` pour le contexte métier.

**Référentiel cible** : `/Users/julien/Dev/AI-CFO-Lab/platform/data/{entreprise}/`

---

## Légende

| Priorité | Signification |
|---|---|
| **P1** | Essentiel pour démo crédible des modules 7b/7f (V2) |
| **P2** | Nécessaire pour démos avancées (M&A, vigilance, IP) |
| **P3** | Enrichissement ultérieur (niche, cas particuliers) |

| Portée | Signification |
|---|---|
| **3 entités** | Propello + Maison Nordique + Mécaform |
| **Propello seul** | Cas SaaS startup / rounds VC / BSPCE / IP |
| **Maison Nordique seul** | Cas TPE e-commerce / co-gérance familiale |
| **Mécaform seul** | Cas PME industrielle / cap table structurée / IP procédés |

---

## 1. Fichiers liés à la Cap Table & aux rounds (Module 7b enrichi)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 1 | `cap-table-history.json` | 3 entités | **P1** | Historique cap table en base événementielle : chaque événement K (création, round, BSPCE, exercice, cession) = 1 ligne. Diff auto entre états. |
| 2 | `equity-rounds.json` | Propello seul | **P1** | Rounds AK successifs (seed, série A, OC bailleur public) : TS, pacte, mini-pactes, souscripteurs, montants, pre/post-money, classes d'actions. |
| 3 | `bspce-plans.json` | Propello seul | **P1** | Plans BSPCE : tranches successives, bénéficiaires, quantités, prix d'exercice, vesting (cliff + linéaire), statut (attribué/acquis/exercé/expiré). |
| 4 | `mini-pactes.json` | Propello seul | **P2** | Un mini-pacte par bénéficiaire BSPCE + fondateurs : clauses clés (lock-up, good/bad leaver, tag/drag-along, promesses). |
| 5 | `waterfall-simulation.json` | Propello seul | **P1** | Simulation répartition produit cession selon scénarios valorisation : préférences liquidation, classes actions, ratchets, impact BSPCE. |
| 6 | `cerfa-fiscal-investors.json` | Propello seul | **P2** | CERFA dispositif fiscal par souscripteur (IR-PME, PEA-PME) : personnes physiques + entités, attestations libération. |
| 7 | `shareholders-register.json` | 3 entités | **P1** | Registre mouvements titres : historique toutes opérations par actionnaire (souscription, cession, exercice, annulation). |

---

## 2. Fichiers liés au M&A sell-side (Module 7f nouveau)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 8 | `ma-sell-side-process.json` | Propello seul | **P1** | Process cession : mandatement cabinet M&A, info memo, buyer list, TS reçus, sélection acquéreur, signing, closing. |
| 9 | `data-room-template.json` | 3 entités | **P1** | Template data room 10 catégories (Corporate/Finance/IT/IP/Legal/Litigation/Sales/Solution/Source/Subsidies) avec auto-population. |
| 10 | `dd-qa-tracker.json` | Propello seul | **P2** | Tracker Q&A due diligence : questions acquéreur, statut, propriétaire interne, délai, réponse. |
| 11 | `completion-accounts.json` | Propello seul | **P2** | Comptes arrêtés à closing, mécanisme ajustement prix, écarts vs estimation. |
| 12 | `spa-gap-tracker.json` | Propello seul | **P2** | Suivi négociation SPA + GAP : versions, clauses clés, exceptions déclarations, plafonds garantie. |
| 13 | `earn-out-escrow-tracking.json` | Propello seul | **P3** | Suivi pluri-annuel earn-out + escrow : indicateurs déclenchement, paiements conditionnels, libération escrow. |
| 14 | `closing-checklist.json` | Propello seul | **P2** | Checklist closing : conditions suspensives, conditions préalables, documents à échanger, séquence. |
| 15 | `bspce-ma-treatment.json` | Propello seul | **P2** | Traitement BSPCE en cours lors cession : accélération vesting, sortie, substitution, rachat — impact net fondateurs/bénéficiaires. |

---

## 3. Fichiers liés à l'IP (Module 7g nouveau)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 16 | `ip-portfolio-patents.json` | Propello seul | **P2** | Registre familles brevets : référence interne, inventeurs, date priorité, titre, statut dépôts par juridiction (FR/EP/US/CN/JP). |
| 17 | `ip-annuities-calendar.json` | Propello seul | **P2** | Calendrier annuités brevets par pays, cabinet PI responsable, coût annuel, alertes paiement. |
| 18 | `ip-declarations-inventors.json` | Propello seul | **P3** | Déclarations PI inventeurs (DPI) : cession droits inventeur → société, archivage signé. |
| 19 | `ip-trademarks.json` | 3 entités | **P3** | Marques déposées : classes Nice, date dépôt, renouvellement décennal, surveillance BOPI. |

---

## 4. Fichiers liés à la Vigilance sous-traitants (Module 7h nouveau)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 20 | `subcontractors-registry.json` | 3 entités | **P1** | Référentiel sous-traitants : raison sociale, SIREN, IBAN, contrat associé, catégorie prestation. |
| 21 | `subcontractors-kyc-status.json` | 3 entités | **P1** | Statut KYC par sous-traitant : Kbis (< 3 mois), URSSAF (< 6 mois), fiscale (< 6 mois), RC Pro, date dernière validation. |
| 22 | `subcontractors-renewal-alerts.json` | 3 entités | **P2** | Alertes renouvellement semestrielles/annuelles, historique relances automatiques, statut conformité (vert/orange/rouge). |

---

## 5. Fichiers liés aux Contrats & NDA (Module 7c existant)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 23 | `contracts-registry.json` | 3 entités | **P1** | Registre contrats : clients grands comptes, fournisseurs stratégiques, partenaires, baux commerciaux. Parties, objet, montant, durée, préavis. |
| 24 | `nda-registry.json` | 3 entités | **P2** | Registre NDA signés : contrepartie, date, périmètre, durée confidentialité, template utilisé. |
| 25 | `leases-registry.json` | 3 entités | **P2** | Baux commerciaux par site : bailleur, surface, loyer, indice ILC/ILAT, renouvellement triennal. |

---

## 6. Fichiers liés aux Assurances (Module 7d existant)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 26 | `insurance-policies.json` | 3 entités | **P1** | Polices actives : RC Pro, RC Exploitation, D&O, Homme-clé, Multirisque, Cyber, Flotte. Primes, franchises, plafonds, échéances. |
| 27 | `insurance-claims-history.json` | 3 entités | **P3** | Historique sinistres par police : déclaration, indemnisation, ratio S/P. |

---

## 7. Fichiers liés au Secrétariat juridique (Module 7a existant)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 28 | `corporate-minutes-register.json` | 3 entités | **P1** | Registre AG/CA par exercice : AGO (approbation comptes), AGE (modifications statuts, augmentation K), PV signés, formalités greffe. |
| 29 | `statutes-history.json` | 3 entités | **P2** | Historique statuts : version en vigueur + versions antérieures datées, événements déclencheurs modification. |
| 30 | `beneficial-owners-register.json` | 3 entités | **P2** | Registre bénéficiaires effectifs (obligation légale) : personnes > 25% K ou droits de vote. |

---

## 8. Fichiers liés aux Contentieux (Module 7e V3)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 31 | `litigation-cases.json` | 3 entités | **P2** | Dossiers contentieux actifs : objet, parties, juridiction, calendrier, cabinet, provisions comptabilisées. |
| 32 | `damage-assessment-reports.json` | Maison Nordique | **P3** | Rapports évaluation préjudices pré-contentieux : versions, taux actualisation, rapprochement réalisations. |
| 33 | `judicial-pieces-bcp.json` | Maison Nordique | **P3** | Bordereau communication pièces (BCP) : numérotation pièces, annexes, mémoires signifiés. |

---

## 9. Fichiers liés à la Compliance / RGPD (Module 8d)

| # | Fichier | Portée | Priorité | Contenu |
|---|---|---|---|---|
| 34 | `directors-id-vault.json` | 3 entités | **P3** | Coffre-fort identités mandataires : CNI/passeports chiffrés, dates validité, alertes expiration. |
| 35 | `rgpd-processing-register.json` | 3 entités | **P2** | Registre traitements RGPD (article 30) : finalité, base légale, catégories données, durée conservation, destinataires. |

---

## 10. Plan de production recommandé

### Sprint 1 — Cap table & BSPCE (P1, ~6 fichiers)

1. `cap-table-history.json` (3 entités)
2. `equity-rounds.json` (Propello)
3. `bspce-plans.json` (Propello)
4. `waterfall-simulation.json` (Propello)
5. `shareholders-register.json` (3 entités)
6. `corporate-minutes-register.json` (3 entités)

### Sprint 2 — M&A sell-side (P1-P2, ~5 fichiers)

7. `ma-sell-side-process.json` (Propello)
8. `data-room-template.json` (3 entités)
9. `dd-qa-tracker.json` (Propello)
10. `spa-gap-tracker.json` (Propello)
11. `bspce-ma-treatment.json` (Propello)

### Sprint 3 — Vigilance & contrats (P1-P2, ~4 fichiers)

12. `subcontractors-registry.json` (3 entités)
13. `subcontractors-kyc-status.json` (3 entités)
14. `contracts-registry.json` (3 entités)
15. `insurance-policies.json` (3 entités)

### Sprint 4 — IP & contentieux (P2-P3, ~4 fichiers)

16. `ip-portfolio-patents.json` (Propello)
17. `ip-annuities-calendar.json` (Propello)
18. `litigation-cases.json` (3 entités)
19. `rgpd-processing-register.json` (3 entités)

**Total Sprint V2 : ~19 fichiers JSON**

---

## 11. Structures JSON minimales

### cap-table-history.json

```json
{
  "metadata": {
    "company": "propello",
    "generated_at": "{YYYY-MM-DD}",
    "currency": "EUR"
  },
  "events": [
    {
      "event_id": "EVT_001",
      "event_date": "{YYYY-MM-DD}",
      "event_type": "creation|round|bspce_grant|bspce_exercise|transfer|capital_reduction",
      "event_label": "Création société",
      "shares_before": 0,
      "shares_after": 10000,
      "share_classes": [
        {"class": "ordinary", "count": 10000, "nominal_value": 1.0}
      ],
      "shareholders_delta": [
        {"shareholder_id": "SH_001", "role": "founder", "delta": 5000}
      ]
    }
  ],
  "current_state_snapshot": {
    "total_shares": 100000,
    "shareholders": [
      {"shareholder_id": "SH_001", "count": 25000, "percentage": 0.25}
    ]
  }
}
```

### bspce-plans.json

```json
{
  "metadata": {
    "company": "propello",
    "total_tranches": 2
  },
  "plans": [
    {
      "plan_id": "BSPCE_{YYYY}_T{N}",
      "grant_date": "{YYYY-MM-DD}",
      "total_granted": 5000,
      "strike_price": 2.5,
      "vesting": {
        "cliff_months": 12,
        "total_months": 48,
        "schedule": "linear_post_cliff"
      },
      "beneficiaries": [
        {
          "beneficiary_id": "BEN_001",
          "role": "employee|director",
          "quantity": 500,
          "status": "granted|vested|exercised|expired|forfeited"
        }
      ],
      "cac_report_ref": "{REF_RAPPORT_CAC}",
      "president_decision_ref": "{REF_DECISION}"
    }
  ]
}
```

### data-room-template.json

```json
{
  "metadata": {
    "company": "propello",
    "operation_type": "ma_sell_side|fundraising|bank_financing",
    "operation_id": "OP_001"
  },
  "categories": [
    {
      "category": "corporate",
      "items": [
        {"doc_type": "statutes", "source_module": "7a", "status": "populated"},
        {"doc_type": "shareholders_register", "source_module": "7b", "status": "populated"}
      ]
    },
    {
      "category": "finance",
      "items": [
        {"doc_type": "fec", "source_module": "4j", "status": "populated"},
        {"doc_type": "balance_sheet", "source_module": "4g", "status": "populated"}
      ]
    },
    {"category": "it_payroll", "items": []},
    {"category": "ip", "items": []},
    {"category": "legal", "items": []},
    {"category": "litigation", "items": []},
    {"category": "sales", "items": []},
    {"category": "solution", "items": []},
    {"category": "source_listing", "items": []},
    {"category": "subsidies", "items": []}
  ]
}
```

### subcontractors-kyc-status.json

```json
{
  "metadata": {
    "company": "propello",
    "last_audit": "{YYYY-MM-DD}"
  },
  "subcontractors": [
    {
      "subcontractor_id": "ST_001",
      "siren": "XXXXXXXXX",
      "kyc_documents": {
        "kbis": {"validated_at": "{YYYY-MM-DD}", "expires_at": "{YYYY-MM-DD}", "status": "valid"},
        "urssaf_attestation": {"validated_at": "{YYYY-MM-DD}", "expires_at": "{YYYY-MM-DD}", "status": "expiring_soon"},
        "fiscal_attestation": {"status": "valid"},
        "rc_pro": {"status": "valid"}
      },
      "overall_status": "green|orange|red",
      "last_reminder_sent": "{YYYY-MM-DD}"
    }
  ]
}
```

### waterfall-simulation.json

```json
{
  "metadata": {
    "company": "propello",
    "scenario_count": 3
  },
  "scenarios": [
    {
      "scenario": "base",
      "exit_valuation": 10000000,
      "share_classes_preferences": [
        {"class": "preferred_a", "preference_type": "non_participating", "multiple": 1.0}
      ],
      "distribution": [
        {"shareholder_id": "SH_001", "gross_amount": 2500000, "net_amount": 2100000}
      ],
      "bspce_treatment": {
        "accelerated_vesting": true,
        "total_bspce_payout": 500000
      }
    }
  ]
}
```

---

## 12. Priorisation par entreprise démo

### Propello (SaaS, ~25 sal.)

Fichiers prioritaires (P1) :
- cap-table-history.json
- equity-rounds.json
- bspce-plans.json
- waterfall-simulation.json
- shareholders-register.json
- ma-sell-side-process.json
- data-room-template.json
- subcontractors-registry.json
- contracts-registry.json
- insurance-policies.json

Fichiers secondaires (P2) :
- mini-pactes.json
- cerfa-fiscal-investors.json
- dd-qa-tracker.json
- spa-gap-tracker.json
- ip-portfolio-patents.json
- ip-annuities-calendar.json

### Mécaform (Industrie, ~80 sal.)

Fichiers prioritaires (P1) :
- cap-table-history.json (version stable, pas de VC)
- shareholders-register.json
- subcontractors-registry.json (tech, maintenance, usinage externalisé)
- contracts-registry.json (focus clients aéro/auto, certifications)
- insurance-policies.json (RC Pro, bris de machines)
- corporate-minutes-register.json
- leases-registry.json (atelier + bureaux)

Fichiers secondaires (P2) :
- litigation-cases.json (contentieux qualité/garantie)
- damage-assessment-reports.json
- ip-portfolio-patents.json (brevets procédés)

### Maison Nordique (E-commerce, ~15 sal.)

Fichiers prioritaires (P1) :
- cap-table-history.json (co-gérants)
- subcontractors-registry.json (logistique, prestataires web)
- insurance-policies.json
- corporate-minutes-register.json

---

## 13. Conventions communes

- **Encoding** : UTF-8, pas d'accents dans les clés JSON
- **Cas nominaux** : camelCase pour clés JSON
- **Dates** : ISO 8601 (`YYYY-MM-DD`)
- **Montants** : nombre décimal, 2 décimales, devise EUR par défaut
- **Identifiants** : placeholders abstraits (`SH_001`, `BEN_001`, `EVT_001`, `ST_001`)
- **Métadonnées obligatoires** en tête de chaque fichier
- **Cohérence** : lien avec `employees.json`, `balance-cloture-YYYY.json`, `fec-YYYY.json`
- **Anonymisation** : aucun nom réel, tout en placeholders génériques

---

## 14. Cas d'usage clés par fichier

| Fichier | Cas d'usage principal | Utilisateurs |
|---|---|---|
| cap-table-history.json | Source unique cap table, simulation dilution | CFO, direction, VC |
| bspce-plans.json | Suivi vesting, reporting fondateurs/bénéficiaires | CFO, DRH, bénéficiaires |
| waterfall-simulation.json | Préparation cession, négociation pacte | CFO, fondateurs |
| ma-sell-side-process.json | Pilotage opération cession | CFO, CEO, cabinet M&A |
| data-room-template.json | Alimentation DD (levée ou cession) | CFO, cabinet, acquéreur |
| subcontractors-kyc-status.json | Conformité URSSAF vigilance | DAF, contrôle URSSAF |
| insurance-policies.json | Renouvellement annuel, couverture VC | CFO, courtier, VC |
| litigation-cases.json | Provisionnement + reporting conseil | CFO, avocat, CAC |

---

*Fin de liste.*
