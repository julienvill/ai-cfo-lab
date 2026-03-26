# Sociétés fictives — Datasets de démo

Trois sociétés 100% fictives pour les démonstrations. Aucune donnée réelle client.
Chaque société dispose de 24 mois d'historique financier synthétique.

---

## Société 1 — PME Industrielle

**Nom fictif :** À définir
**Secteur :** Industrie manufacturière (non technologique)
**Taille :** ~80 salariés, CA ~8M€/an

### Spécificités financières
- BFR important (stocks matières premières + encours de production)
- Cycle de production long → décalage encaissements/décaissements
- Charges fixes élevées (amortissements machines, loyers entrepôts)
- DSO élevé (clients industriels, paiements à 60 jours)
- Saisonnalité marquée selon carnets de commandes

### KPIs prioritaires
- Trésorerie et BFR
- Marge brute par ligne de produit
- Taux d'utilisation des capacités
- Délais clients/fournisseurs (DSO/DPO)
- Point mort et couverture charges fixes

### Scénarios de démo à mettre en valeur
- Tension de trésorerie liée à un retard de paiement client majeur
- Impact d'un investissement machine sur le runway
- Opportunité de renégociation fournisseur détectée par l'AI

---

## Société 2 — Startup SaaS

**Nom fictif :** À définir
**Secteur :** SaaS B2B (tech)
**Taille :** ~25 salariés, MRR ~150K€, ARR ~1.8M€

### Spécificités financières
- Revenus récurrents (MRR/ARR) — modèle à abonnement
- Burn rate significatif (masse salariale tech + marketing)
- Runway critique (18 mois)
- CAC élevé, LTV en construction
- Churn à surveiller de près
- Prochaine levée de fonds envisagée dans 12 mois

### KPIs prioritaires
- MRR, ARR, croissance MoM
- Churn rate (mensuel et annuel)
- CAC et LTV par canal d'acquisition
- NRR (Net Revenue Retention)
- Runway et burn rate net
- Pipeline levée de fonds

### Scénarios de démo à mettre en valeur
- Alerte churn: dégradation silencieuse sur 3 mois détectée par l'AI
- Simulation embauche: impact d'un recrutement senior sur le runway
- Investor update généré en 45 secondes (moment clé de démo)

---

## Société 3 — E-commerce

**Nom fictif :** À définir
**Secteur :** Commerce en ligne (B2C)
**Taille :** ~15 salariés, CA ~3M€/an

### Spécificités financières
- Forte saisonnalité (Black Friday, Noël = 40% du CA annuel)
- Gestion des stocks critique (risque de rupture vs. sur-stock)
- Marges produits variables selon catégories
- CAC publicitaire (Meta, Google Ads) à surveiller
- Délais de livraison fournisseurs (souvent Asie) créant des décalages
- Frais logistiques et retours à intégrer dans les marges réelles

### KPIs prioritaires
- CA et marge brute par catégorie produit
- Taux de conversion et panier moyen
- CAC par canal marketing
- Rotation des stocks et couverture
- Cash flow (pics et creux saisonniers)
- Coût de revient réel incluant retours et logistique

### Scénarios de démo à mettre en valeur
- Prévision de trésorerie avant pic de Noël: besoin de financement détecté 90 jours avant
- Alerte marge: une catégorie produit est vendue à perte une fois les retours intégrés
- Optimisation du budget publicitaire: CAC par canal comparé à la LTV

---

## Notes techniques

- Chaque dataset couvre **24 mois d'historique** + **6 mois de prévisionnel**
- Format : à définir (JSON / CSV / base de données)
- Les données doivent être suffisamment réalistes pour être convaincantes, 100% fictives pour rester RGPD-safe
- Chaque société doit avoir au moins **un problème financier latent** que l'AI détecte mais que le CEO n'avait pas vu (moment clé de démo)
