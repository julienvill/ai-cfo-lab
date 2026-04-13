# SPEC — Reports

> Anciennement FP&A (Financial Planning & Analysis)

Le module Reports centralise toutes les fonctionnalites de pilotage financier : tableaux de bord KPIs, construction budgetaire, planification par scenarios, reporting investisseurs et board, comptabilite analytique et analyse de rentabilite. Il s'adresse aussi bien aux SaaS (metriques ARR/NRR/LTV) qu'aux PME classiques (CA, marges, EBE).

---

## Sous-modules

| Code | Nom | Route | Description |
|------|-----|-------|-------------|
| 3a | KPIs & Tableaux de bord | `/app/reports/kpis-saas` | Suivi des indicateurs cles en mode SaaS ou PME classique |
| 3b | Budget, Forecast & Variance | `/app/reports/budget` | Construction budgetaire, forecast glissant, analyse des ecarts |
| 3c | Scenario Planner | `/app/reports/scenarios` | Simulation de scenarios financiers avec impact temps reel |
| 3d | Reporting investisseurs & board | `/app/reports/reporting` | Generation automatique de board packs et reportings periodiques |
| 3e | Comptabilite analytique | `/app/reports/analytique` | Ventilation par axes analytiques, P&L segmente |
| 3f | Pricing & rentabilite (V3) | `/app/reports/pricing` | Analyse de rentabilite produit/client/projet, simulation de prix |

---

## Detail des sous-modules

### 3a — KPIs & Tableaux de bord

**Description** : Tableau de bord interactif presentant les indicateurs cles de performance selon deux modes — SaaS (metriques recurrentes) et PME classique (metriques operationnelles). Chaque KPI est accompagne d'un commentaire IA et d'alertes automatiques en cas d'ecart significatif.

**Fonctionnalites**

| Fonctionnalite | Mode SaaS | Mode PME classique |
|---|---|---|
| MRR / ARR | Oui | — |
| Churn rate (logo & revenue) | Oui | — |
| NRR (Net Revenue Retention) | Oui | — |
| CAC & LTV | Oui | — |
| LTV/CAC ratio | Oui | — |
| Burn multiple | Oui | — |
| Rule of 40 | Oui | — |
| Analyse de cohortes | Oui | — |
| Chiffre d'affaires | — | Oui |
| Marges brute et nette | — | Oui |
| EBE (EBITDA) | — | Oui |
| Point mort | — | Oui |
| Charges fixes / variables | — | Oui |
| Tendances sur 12 mois | Oui | Oui |
| Benchmark sectoriel | Oui | Oui |
| Commentaire IA par KPI | Oui | Oui |
| Alertes automatiques | Oui | Oui |

**Automatisation**

| Automatisation | Detail |
|---|---|
| Rafraichissement des donnees | Synchronisation quotidienne depuis les connecteurs (Stripe, comptabilite) |
| Commentaires IA | Generation automatique d'une analyse narrative par KPI |
| Alertes de seuil | Notification si un KPI depasse/descend sous un seuil configurable |
| Benchmark sectoriel | Comparaison automatique avec les medianes du secteur |

---

### 3b — Budget, Forecast & Variance

**Description** : Module de construction budgetaire structure par ligne de P&L, departement ou projet. Integre un workflow de validation, un forecast glissant (rolling forecast) et une analyse des ecarts (variance analysis) avec visualisations en waterfall et narratives IA.

**Fonctionnalites**

| Fonctionnalite | Detail |
|---|---|
| Construction budgetaire | Par ligne P&L, departement ou projet |
| Workflow de validation | Circuit d'approbation configurable par niveau |
| Forecast glissant | Mise a jour continue de la projection sur 12 mois |
| Variance analysis | Comparaison budget vs reel vs forecast |
| Waterfall charts | Visualisation des contributions aux ecarts |
| Commentaires IA sur ecarts | Analyse narrative automatique des variations significatives |
| Versioning | Historique des versions de budget et forecast |
| Drill-down | Decomposition jusqu'au niveau transaction |
| Export Excel / PDF | Export formate du budget et du forecast |

**Automatisation**

| Automatisation | Detail |
|---|---|
| Import des reels | Reconciliation automatique avec la comptabilite |
| Calcul des ecarts | Variance budget/reel/forecast calculee en temps reel |
| Alertes d'ecart | Notification si l'ecart depasse le seuil configurable |
| Narratives IA | Generation automatique des commentaires de gestion |
| Versioning auto | Sauvegarde automatique a chaque validation |

---

### 3c — Scenario Planner

**Description** : Interface de planification par scenarios permettant d'ajuster des variables cles et de visualiser instantanement l'impact sur le P&L, la tresorerie et le runway. Supporte la comparaison de trois scenarios simultanement et fournit des recommandations IA.

**Fonctionnalites**

| Fonctionnalite | Detail |
|---|---|
| Interface conversationnelle | Saisie des hypotheses en langage naturel |
| Variables ajustables | Croissance, churn, recrutement, investissements, prix, etc. |
| Impact temps reel | Mise a jour instantanee du P&L, cash et runway |
| Comparaison 3 scenarios | Affichage cote a cote (pessimiste / base / optimiste) |
| Analyse de sensibilite | Courbes d'impact par variable |
| Recommandation IA | Suggestion du scenario optimal selon les objectifs |

**Automatisation**

| Automatisation | Detail |
|---|---|
| Calcul des projections | Recalcul instantane du modele financier a chaque modification |
| Sensibilites automatiques | Generation automatique des courbes de sensibilite |
| Recommandation IA | Analyse et classement des scenarios par probabilite et impact |
| Sauvegarde des scenarios | Persistance et partage des scenarios nommes |

---

### 3d — Reporting investisseurs & board

**Description** : Generation automatique de board packs et reportings periodiques a partir des donnees de la plateforme. Deux templates preconfigures : Board Pack VC (10 slides) et Reporting PME (8 slides). Supporte l'export PDF et PPTX ainsi qu'un calendrier de reporting.

**Fonctionnalites**

| Fonctionnalite | Detail |
|---|---|
| Template Board Pack VC | 10 slides : cover, business update, pipeline, revenues, revenue breakdown, SaaS KPIs, cash forecast, income statement, payroll, roadmap |
| Template Reporting PME | 8 slides : resume executif, CA et marges, tresorerie, P&L, effectifs, projets, risques, perspectives |
| Agregation automatique | Consolidation des donnees depuis tous les modules |
| Narrative IA | Generation des commentaires de management par section |
| Export PDF | Generation d'un PDF formate et signe |
| Export PPTX | Generation d'un fichier PowerPoint editable |
| Calendrier de reporting | Planification et rappels automatiques des echeances |

**Automatisation**

| Automatisation | Detail |
|---|---|
| Agregation des donnees | Consolidation automatique depuis comptabilite, paie, CRM |
| Narrative IA | Redaction automatique des commentaires de gestion |
| Generation des exports | Creation automatique du PDF et PPTX a chaque cloture |
| Rappels calendrier | Notifications aux contributeurs avant les echeances |

---

### 3e — Comptabilite analytique

**Description** : Module de ventilation analytique permettant de piloter la performance par axes librement definis (business unit, projet, client, geographie). Genere un P&L analytique et calcule les marges et couts de revient par segment.

**Fonctionnalites**

| Fonctionnalite | Detail |
|---|---|
| Axes analytiques libres | Definition illimitee d'axes (BU, projet, client, geo, canal, etc.) |
| Ventilation automatique | Application des cles de repartition par compte et axe |
| P&L analytique | Compte de resultat segmente par axe analytique |
| Marges par segment | Calcul automatique des marges brute et nette par axe |
| Couts de revient | Calcul des couts complets par produit ou service |
| Cles de repartition | Definition et gestion des cles de ventilation des charges indirectes |

**Automatisation**

| Automatisation | Detail |
|---|---|
| Ventilation automatique | Application des cles a chaque import de donnees comptables |
| Calcul des marges | Mise a jour en temps reel des marges par segment |
| Alertes de derive | Notification si la marge d'un segment passe sous le seuil cible |

---

### 3f — Pricing & rentabilite (V3)

**Description** : Module d'analyse de la rentabilite par produit, client et projet. Permet de simuler l'impact de changements de prix et de recevoir des recommandations IA pour optimiser la grille tarifaire.

**Fonctionnalites**

| Fonctionnalite | Detail |
|---|---|
| Rentabilite par produit | Marge et contribution par ligne de produit ou service |
| Rentabilite par client | Analyse du profit par compte client |
| Rentabilite par projet | Suivi des couts et marges par projet |
| Analyse de prix | Etude de l'elasticite et du positionnement tarifaire |
| Simulation de prix | Modelisation de l'impact d'une variation de prix sur le P&L |
| Recommandation IA | Suggestion d'optimisation tarifaire fondee sur les donnees |

**Automatisation**

| Automatisation | Detail |
|---|---|
| Calcul de la rentabilite | Mise a jour automatique apres import des reels |
| Simulation temps reel | Recalcul instantane du P&L apres modification des prix |
| Recommandation IA | Analyse et proposition de la grille tarifaire optimale |

---

---

## Entrees / Sorties par sous-module

### 3a — KPIs & Tableaux de bord

| | Detail |
|---|---|
| **Entrees** | Donnees d'abonnement (Stripe, GoCardless), revenus comptabilises (4a), couts marketing (4b), effectifs (5c), donnees clients (CRM ou import) |
| **Sorties** | MRR, ARR, churn rate, NRR, GRR, CAC, LTV, ARPU, Rule of 40, burn multiple, magic number, cohort analysis, benchmarks sectoriels, commentaires IA |
| **Dependances** | Connecteurs paiement (Stripe, GoCardless), 4a (AR), 4b (AP), 5c (Admin personnel) |
| **Consommateurs** | 1 (Daily CFO), 3c (Scenario Planner), 3d (Reporting), 9c (Predictive Risk) |

### 3b — Budget, Forecast & Variance

| | Detail |
|---|---|
| **Entrees** | Historique comptable (4), budget N-1, forecast precedent, effectifs prevus (5c), projections de CA (3a), charges previsionnelles |
| **Sorties** | Budget annuel approuve (par ligne P&L, departement, projet), forecast glissant, variance analysis, waterfall charts, commentaires IA sur ecarts |
| **Dependances** | 4 (Comptabilite), 3a (KPIs), 5c (Admin personnel) |
| **Consommateurs** | 1 (Daily CFO), 2a (Cash Forecast), 3c (Scenario Planner), 3d (Reporting) |

### 3c — Scenario Planner

| | Detail |
|---|---|
| **Entrees** | P&L actuel (4), tresorerie (2a), KPIs (3a), effectifs (5c), budget (3b), variables utilisateur (langage naturel) |
| **Sorties** | Scenarios modelises (impact P&L + tresorerie + runway), analyses de sensibilite, recommandations IA, comparaison 3 scenarios |
| **Dependances** | 2a (Cash Forecast), 3a (KPIs), 3b (Budget), 4 (Comptabilite) |
| **Consommateurs** | 3d (Reporting), 9a (Chat RAG) |

### 3d — Reporting investisseurs & board

| | Detail |
|---|---|
| **Entrees** | KPIs (3a), P&L et tresorerie (2a, 4), budget et variance (3b), donnees de cloture (4g), highlights/lowlights (saisie utilisateur ou IA) |
| **Sorties** | Board pack complet (PDF/PPTX/Google Slides), narratives IA, investor update, historique des packs |
| **Dependances** | 2a (Cash Forecast), 3a (KPIs), 3b (Budget), 4g (Cloture) |
| **Consommateurs** | 8c (Data Room) |

### 3e — Comptabilite analytique

| | Detail |
|---|---|
| **Entrees** | Ecritures comptables (4), regles de ventilation (config utilisateur), cles de repartition, axes analytiques |
| **Sorties** | P&L analytique (par departement, projet, produit, client), marges par segment, couts de revient |
| **Dependances** | 4 (Comptabilite) |
| **Consommateurs** | 3b (Budget — reel analytique vs budget), 1 (Daily CFO) |

---

## Phasage

| Phase | Sous-modules inclus | Contenu |
|---|---|---|
| MVP | 3a, 3b, 3d | KPIs & Tableaux de bord, Budget/Forecast/Variance, Reporting investisseurs & board |
| V2 | 3c, 3e | Scenario Planner, Comptabilite analytique |
| V3 | 3f | Pricing & rentabilite |

---

## Connecteurs

| Connecteur | Sous-modules | Donnees recuperees |
|---|---|---|
| Stripe | 3a, 3b, 3d | MRR, ARR, churn, transactions, revenus recurrents |
| Hubspot (CRM) | 3a, 3d | Pipeline commercial, ARR signe, forecast commercial |
| Module Comptabilite (interne) | 3b, 3d, 3e, 3f | Grand livre, journaux, balance, P&L reel |
| Module Paie (interne) | 3b, 3d | Masse salariale, effectifs, charges sociales |
