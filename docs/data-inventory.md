# Inventaire des données démo — AI CFO Lab

## Priorité 1 — Données de base (déjà prévu)
- FEC 12 mois (01/01/2025 → 31/12/2025)
- Bilan d'ouverture (31/12/2024) + Bilan de clôture (31/12/2025)
- Bulletins de salaire (format Silae) x 12 mois x effectif
- Rapports de paie (journal, état des charges, écritures comptables)
- Relevés bancaires 12 mois
- Factures clients et fournisseurs
- Fichier clients + fournisseurs (tiers)

## Priorité 2 — À générer (fort impact démo)
- Balance âgée clients et fournisseurs (DSO/DPO/BFR)
- Échéancier de trésorerie prévisionnel
- Provisions (congés payés, créances douteuses, charges sociales)
- Plan d'amortissement des immobilisations
- Métriques SaaS (MRR, ARR, churn, NRR, LTV, CAC) — Propello
- Inventaire et valorisation des stocks (CMUP) — Mécaform, Maison Nordique
- Feuilles de temps R&D + dossier CIR — Propello
- Déclaration TVA (CA3) mensuelle
- Écritures de clôture (CCA, PCA, FNP, FAE)
- Comptabilité analytique (centres de coûts)

## Priorité 3 — Enrichissement réalisme (à faire ultérieurement)
- Contrats de travail types (CDI Syntec, CDD saisonnier, CDI Métallurgie)
- Registre unique du personnel
- CGV adaptées par société
- Cap table + contrats BSPCE post-seed — Propello
- Board pack / investor update — Propello
- Certifications EN 9100 / IATF 16949 — Mécaform
- Déclarations douanières import — Maison Nordique
- En-cours de production — Mécaform
- Taux de retour par produit — Maison Nordique
- Contrats d'assurance (RC Pro, D&O, cyber)
- DUERP
- Procédures de contrôle interne
- Data room due diligence — Propello
- Registre des traitements RGPD

## Contraintes de cohérence absolues
1. Bilan N-1 (31/12/2024) + FEC 2025 = Bilan N (31/12/2025)
2. TVA déclarée (CA3) = journaux ventes + achats
3. Écritures de paie = bulletins Silae
4. Rapprochement bancaire = mouvements banque vs écritures journal banque
5. Balance âgée = soldes auxiliaires clients/fournisseurs
6. Dotations amortissements = plan d'amortissement
7. Provisions CP = droits acquis x taux charges patronales
8. Métriques SaaS Propello = cohérentes avec factures clients (MRR = somme abonnements)
9. Stock valorisé = mouvements entrées/sorties (Mécaform, Maison Nordique)

## Profils des sociétés

| | Propello | Mécaform | Maison Nordique |
|---|---|---|---|
| Forme | SAS | SA | SARL |
| CA / MRR | MRR ~150K€ (ARR ~1,8M€) | ~8M€ | ~3M€ |
| Effectif | ~25 | ~80 | ~15 |
| Convention | Syntec | Métallurgie | Commerce détail non alim. |
| Exercice | 01/01 - 31/12 | 01/01 - 31/12 | 01/01 - 31/12 |
| Siège | Paris | Villefranche-sur-Saône | Nantes |
| Particularités | SaaS MRR, CIR, BSPCE, seed | Sous-traitance aéro/auto, machines, BFR long | Saisonnalité Q4, import Scandinavie, stocks |
