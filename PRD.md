# PRD — AI CFO Lab

## Product Requirements Document

Dernière mise à jour : 2026-03-26

---

## 1. Vision

### Mission

AI CFO Lab est une **couche d'orchestration intelligente** qui connecte les systèmes existants (comptabilité, paie, banque, SIRH) et y ajoute l'automatisation, le contrôle et l'intelligence que ces outils ne fournissent pas individuellement.

La plateforme ne remplace pas Pennylane, Silae ou Qonto — elle les relie, les fait travailler ensemble, et automatise les processus transverses (clôture, reporting, conformité, déclarations) qui aujourd'hui nécessitent une intervention humaine constante.

L'objectif est de permettre à une personne augmentée par la plateforme de piloter ce qui nécessite traditionnellement une équipe de 3 à 6 personnes — en **évitant de recruter** plutôt qu'en supprimant des postes.

### Contexte marché

Cette vision s'inscrit dans une transformation profonde des fonctions corporate validée par l'ensemble des grands cabinets de conseil :

- **McKinsey** : 44% des CFOs déploient GenAI sur 5+ cas d'usage. L'IA pourrait automatiser jusqu'à 70% des activités finance d'ici 2030
- **Deloitte** : concept formalisé de "Lights Out Finance" — opérations financières touchless. 87% des CFOs considèrent l'IA comme critique pour 2026
- **Gartner** : d'ici 2030, 80%+ des fonctions finance embarqueront de l'autonomie IA dans leurs processus core
- **PwC** : l'IA permet de rediriger 60% du temps des équipes finance vers l'analyse, avec +40% de précision sur les forecasts
- **Bessemer Venture Partners** : la thèse "Vertical AI" (janvier 2026) prédit que l'IA verticale va dépasser les plus gros SaaS verticaux historiques

**Nuance importante (Gartner)** : malgré 90% d'adoption, moins de 10% des fonctions finance verront des réductions d'effectifs effectives à court terme. Le pattern dominant est l'**augmentation** — faire plus avec la même équipe, pas l'élimination de postes.

### Timeline estimée de la transformation

| Période | Maturité du marché |
|---|---|
| **2026-2027** | Early adopters. Seulement 5% des TPE/PME françaises utilisent des solutions d'automatisation IA (France Num 2025). Phase d'éducation du marché. L'investissement IA privé en Europe reste 24x inférieur aux US. |
| **2028-2030** | Adoption mainstream si la réglementation se clarifie (EU AI Act, RGPD). Les PME progressistes auront une longueur d'avance significative sur leurs concurrentes. |
| **2030+** | Mass-market pour la finance autonome en PME européennes. La fonction finance "lights out" devient le standard pour les opérations transactionnelles. |

AI CFO Lab est **2-3 ans en avance** sur la demande mainstream française — un avantage first-mover qui nécessite de la patience et une exécution progressive.

### Double positionnement

| Positionnement | Description | Cible |
|---|---|---|
| **Plateforme SaaS** | Solution clé en main, self-service. L'entreprise connecte ses outils existants, et la plateforme orchestre ses opérations Finance/RH/Juridique avec supervision humaine minimale | TPE, PME, startups |
| **Outil de conseil** | Les modules sont utilisés par un consultant (DAF externalisé, cabinet de conseil) pour transformer et digitaliser les départements Finance/RH/Juridique d'une entreprise cliente | Cabinets de conseil, DAF à temps partagé, intégrateurs |

### Modèle de scaling par taille d'entreprise

| Taille | Effectif traditionnel Finance+RH | Avec AI CFO Lab | Gain |
|---|---|---|---|
| **TPE (1-10 sal.)** | 0-1 personne + expert-comptable | Plateforme seule + expert-comptable | Pas besoin d'embaucher |
| **Petite PME (10-25 sal.)** | 1 DAF temps partiel + 1 RH | 1 personne Finance+RH augmentée par la plateforme | ÷2 |
| **PME (25-80 sal.)** | 1 DAF + 1 comptable + 1 RH | 1 DAF augmenté + la plateforme | ÷3 |
| **Grande PME (80-250 sal.)** | 1 DAF + 2-3 comptables + 1 contrôleur + 1-2 RH | 1 DAF + 1 comptable + 1 RH augmentés | ÷2 à ÷3 |

### Ce que la plateforme est — et ce qu'elle n'est pas

| La plateforme EST | La plateforme N'EST PAS |
|---|---|
| Une couche d'orchestration qui connecte les outils existants | Un remplacement de Pennylane, Sage ou Silae |
| Un moteur d'automatisation des processus transverses (clôture, reporting, déclarations) | Un logiciel de comptabilité ou de paie |
| Une intelligence IA qui contextualise, alerte et recommande | Un calculateur qui remplace l'expert-comptable |
| Un outil qui augmente les capacités d'une personne | Un système qui supprime des postes |
| Un accélérateur de conformité française | Un générateur de décisions sans supervision humaine |

### Principes fondamentaux

1. **Orchestration, pas remplacement** — la plateforme connecte et automatise les systèmes existants (Pennylane, Silae, Qonto, Lucca) plutôt que de les concurrencer. La valeur est dans l'intelligence transverse, pas dans la saisie
2. **Augmentation humaine** — une personne augmentée par la plateforme fait le travail de 3. L'IA élimine le travail répétitif pour que l'humain se concentre sur le jugement, la stratégie et les relations
3. **Contrôle humain simple et adéquat** — l'interface de validation est conçue pour qu'un non-expert puisse comprendre ce que l'IA propose et l'approuver/rejeter en quelques secondes
4. **Traçabilité totale** — chaque action automatisée, chaque décision IA, chaque validation humaine est loggée et auditable. Séparation stricte entre calcul déterministe et contextualisation IA
5. **Conformité française native** — la plateforme intègre nativement les obligations réglementaires françaises (Code du travail, CGI, PCG, RGPD, EU AI Act)
6. **Exécution progressive** — commencer par la finance (cœur de valeur), étendre à la RH et au juridique. Ne pas s'éparpiller — faire peu de choses mais les faire excellemment

---

## 2. Page d'accueil — Présentation de l'offre

### Description

Page publique de présentation de l'offre AI CFO Lab. Ce n'est pas une page technique listant des modules — c'est une page d'offre centrée sur la **proposition de valeur** : un DAF virtuel augmenté par l'IA qui pilote la fonction Finance et Comptabilité des TPE, PME et startups françaises.

L'angle central est **la Finance** — trésorerie, budget, comptabilité, conformité fiscale, audit, pilotage. La RH et le Juridique sont des extensions de l'offre, pertinentes pour les petites structures où le DAF porte aussi ces casquettes.

### Inspirations landing page

Patterns retenus après benchmark des concurrents et références design :

| Pattern | Inspiration | Application |
|---|---|---|
| Hero narratif animé | Linear (séquence interactive d'un workflow) | Séquence animée : question → le Virtual CFO tire les données → réponse avec graphique |
| "Old way vs. New way" | Ramp | Section "Avant / Avec AI CFO Lab" |
| Problem → Solution | Abacum, Ramp | Nommer les douleurs avant de montrer les capacités |
| Social proof empilé | Mercury (5 types sur une page) | Métriques + logos connecteurs + badges sécurité + testimonial |
| Double CTA | Tous | "Explorer la démo" + "Demander un accès" |
| Sécurité visible | Stacks, Abacum, Clockwork | Badges RGPD, hébergement souverain Scaleway |
| Persona-based sections | Agicap, Parallel | "Pour qui ?" avec 4 profils concrets |

### Structure de la page (scroll vertical, ~10 sections)

---

#### Section 1 — Hero

Le hero raconte une histoire en animation : un dirigeant ouvre la plateforme le matin et voit son briefing financier apparaître.

| Élément | Détail |
|---|---|
| **Headline** | "Votre DAF virtuel est prêt." |
| **Sous-titre** | "AI CFO Lab connecte vos outils financiers, automatise vos opérations et vous donne chaque matin la visibilité d'un DAF senior." |
| **Cible** | TPE · PME · Startups |
| **CTA principal** | "Explorer la démo" → accès direct avec données fictives, sans inscription |
| **CTA secondaire** | "Demander un accès" |
| **Visuel** | Animation séquentielle : (1) le brief du matin apparaît avec les KPIs héro → (2) une alerte de trésorerie pulse → (3) le chat Virtual CFO répond à "Quel est mon runway ?" avec un graphique sourcé. Inspiré de la narration interactive de Linear. |

Fond blanc, typographie large, whitespace généreux (retenue Mercury). Le violet IA (`#7C3AED`) apparaît uniquement sur les éléments d'intelligence (badge IA, réponse du chat).

---

#### Section 2 — Bandeau connecteurs

*"Se connecte à vos outils. Ne les remplace pas."*

Logos en défilement horizontal : Pennylane · Sage · Cegid · Qonto · Revolut · Silae · PayFit · Lucca · Stripe · Bridge

Ce bandeau établit immédiatement le positionnement d'orchestration : la plateforme est une couche intelligente au-dessus de l'écosystème existant.

---

#### Section 3 — Le problème

Structure "problem-agitate" inspirée d'Abacum. Pas de features ici — juste les douleurs du dirigeant.

**Headline section :** *"Vous reconnaissez-vous ?"*

| Douleur | Détail |
|---|---|
| "Je n'ai aucune visibilité sur ma tréso" | Vous découvrez les problèmes de cash quand il est trop tard. Votre expert-comptable vous donne des chiffres une fois par an. |
| "Ma clôture prend 3 semaines" | Rapprochements manuels, écritures de cut-off oubliées, allers-retours avec le comptable. |
| "Je passe mon temps sur l'admin au lieu de piloter" | Déclarations TVA, relances fournisseurs, bulletins de paie — l'opérationnel dévore le stratégique. |
| "J'ai 5 outils qui ne se parlent pas" | Pennylane d'un côté, Qonto de l'autre, Silae encore ailleurs. Aucune vue consolidée. |

---

#### Section 4 — La solution (offre)

**Headline section :** *"Une plateforme. Toute votre finance."*

Présentation de l'offre en blocs visuels. Chaque bloc est une card avec icône, titre, description et screenshot miniature. Le cœur de l'offre est la Finance — les extensions apparaissent en second plan.

##### Bloc hero — Virtual CFO (pleine largeur)

Card mise en avant, plus grande que les autres. C'est le concept central de la plateforme.

> **Votre DAF virtuel, disponible 24/7**
>
> Posez n'importe quelle question financière en langage naturel. Le Virtual CFO interroge toutes vos données, répond avec des sources traçables, et anticipe les risques avant qu'ils ne deviennent des crises.

- "Quel est mon DSO ce mois ?" — réponse instantanée avec source
- Mémoire de chaque clôture, chaque décision, chaque alerte
- Alerte proactive à 90 jours si un risque se forme
- Apprend de vos validations et rejets pour s'adapter à votre style

*Visuel : screenshot du chat Virtual CFO avec une réponse sourcée et un graphique inline.*

##### Bloc — Daily CFO

> **Chaque matin, votre briefing financier.**
>
> Cash disponible, alertes, actions recommandées, score de santé — tout ce que vous devez savoir en 30 secondes. Envoyé par email, Slack ou notification PWA.

*Visuel : screenshot du brief matinal avec les KPIs héro.*

##### Bloc — Pilotage financier

> **Trésorerie, budget, KPIs — pilotez en temps réel.**
>
> Cash forecast 13 semaines, runway, budget vs actuals, KPIs SaaS, scenario planning, board pack investisseurs. Le pilotage financier d'un DAF senior, automatisé.

*Visuel : screenshot du dashboard FP&A avec graphiques de tendance.*

##### Bloc — Comptabilité automatisée

> **Votre comptabilité tourne. Vous ne validez que l'essentiel.**
>
> Facturation, fournisseurs, paie, clôture mensuelle en 8 jours, déclarations fiscales pré-remplies, états financiers annuels. L'IA fait le travail — vous gardez le contrôle.

*Visuel : screenshot de la clôture mensuelle avec la barre de progression par bloc.*

##### Bloc — Audit & conformité

> **Toujours prêt pour un audit.**
>
> Contrôle interne automatisé, dossier CAC pré-constitué, data room peuplée en continu, conformité RGPD et piste d'audit fiable. Vous n'êtes plus jamais pris au dépourvu.

*Visuel : screenshot de la data room avec le score de complétude.*

---

#### Section 5 — Extensions (RH & Juridique)

**Headline section :** *"Dans une PME, le DAF porte aussi d'autres casquettes."*

Sous-texte : *Pour les structures où la même personne gère Finance, RH et Juridique, la plateforme couvre ces fonctions complémentaires.*

Présentées en 2 cards côte à côte, visuellement plus légères que les blocs Finance (taille réduite, couleur plus discrète).

| Extension RH | Extension Juridique |
|---|---|
| Administration du personnel, contrats, DPAE | Secrétariat juridique, AG, PV, registres |
| Temps, absences, congés, planning | Cap table, BSPCE, augmentations de capital |
| CSE, BDESE (131 indicateurs), index égalité F/H | Contrats, baux, alertes d'échéances |
| Recrutement, onboarding/offboarding | Assurances (RC Pro, D&O, cyber, homme-clé) |
| Entretiens, formation, OPCO | |
| Rémunération, avantages, épargne salariale | |
| DUERP, santé, sécurité | |

---

#### Section 6 — Old way vs. New way

Inspiré du pattern Ramp. Comparaison visuelle en deux colonnes.

**Headline section :** *"Avant / Avec AI CFO Lab"*

| | Avant | Avec AI CFO Lab |
|---|---|---|
| **Visibilité** | Chiffres 1x/mois (au mieux). Expert-comptable 1x/an. | Briefing quotidien. KPIs temps réel. |
| **Clôture** | 15-20 jours. Mails, Excel, allers-retours. | 8 jours. Automatisée, bloc par bloc. |
| **Déclarations** | Manuelles, stress des échéances. | Pré-remplies, vous validez en un clic. |
| **Trésorerie** | Vérifiée sur le site de la banque. | Cash forecast 13 semaines, alertes de seuil. |
| **Questions financières** | Attendre le prochain RDV avec le comptable. | Réponse instantanée du Virtual CFO. |
| **Outils** | 5 outils qui ne se parlent pas. | Une plateforme qui les connecte tous. |

---

#### Section 7 — Pour qui ?

**Headline section :** *"Conçu pour ceux qui font tourner l'entreprise."*

4 cards horizontales, chacune avec un profil :

| Profil | Sa douleur | Ce qui change |
|---|---|---|
| **Dirigeant de TPE** | Pas de DAF. Zéro visibilité financière entre les RDV annuels avec l'expert-comptable. | Un DAF virtuel chaque matin. Compta automatisée. Expert-comptable pour la validation. |
| **DAF de PME** | Submergé par la clôture, les déclarations, la paie, le CSE. Zéro temps pour le pilotage. | L'opérationnel tourne seul. Le DAF pilote la stratégie et la croissance. |
| **Fondateur de startup** | Finance entre deux meetings. Déclarations en retard. Pas de board pack. | Brief quotidien. Clôture automatisée. Board pack en un clic. KPIs investisseurs temps réel. |
| **DAF externalisé / consultant** | Jongle entre 5 clients. Temps perdu à collecter les données et faire des reportings manuels. | La plateforme collecte et automatise. Le consultant fait du conseil à haute valeur. |

---

#### Section 8 — Sécurité & conformité

**Headline section :** *"Vos données financières méritent le plus haut niveau de protection."*

| Élément | Détail |
|---|---|
| **Hébergement souverain** | Données sensibles hébergées en France (Scaleway). Conformité RGPD native. |
| **Chiffrement** | AES-256 au repos, TLS 1.3 en transit |
| **Traçabilité** | Chaque action IA est loggée et auditable. Piste d'audit fiable. |
| **Séparation calcul / IA** | Les chiffres sont déterministes. L'IA contextualise mais ne calcule jamais. |

Badges visuels : RGPD · Hébergement France · Scaleway · Chiffrement AES-256

---

#### Section 9 — Démo interactive

**Headline section :** *"Voyez par vous-même."*

| Élément | Détail |
|---|---|
| **Sélecteur d'entreprise** | 3 entreprises fictives avec des profils différents (documentées dans `COMPANIES.md`) |
| **Accès sans inscription** | Le visiteur clique et entre directement dans l'interface |
| **Données réalistes** | Métriques, briefs, rapports pré-calculés à partir des datasets fictifs |

Le sélecteur est le même composant que celui de la plateforme (cf. DESIGN.md §2). Le visiteur vit l'expérience comme un vrai utilisateur.

---

#### Section 10 — CTA final

| Élément | Détail |
|---|---|
| **Headline** | "Votre DAF virtuel est prêt." |
| **Sous-texte** | "Explorez la démo avec des données fictives, ou demandez un accès pour connecter vos propres outils." |
| **CTA principal** | "Explorer la démo" |
| **CTA secondaire** | "Demander un accès" |

Le headline du CTA final reprend celui du hero — boucle narrative.

---

### Niveau d'automatisation

N/A — page de présentation avec données fictives pré-calculées.

---

## 3. Module 1 — Daily CFO

### Description

Briefing financier quotidien automatisé à destination du dirigeant ou du responsable financier. Chaque matin, la plateforme agrège les données de tous les modules, détecte les événements significatifs, et produit un résumé actionnable en langage naturel.

C'est le point d'entrée quotidien dans la plateforme — le dirigeant d'une TPE qui n'a pas de DAF ouvre cette page et sait en 30 secondes ce qui nécessite son attention.

### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Brief du matin** | Synthèse en langage naturel générée par l'IA : trésorerie, alertes, événements du jour, actions recommandées |
| **KPIs héro** | 4-5 métriques clés du jour (cash disponible, runway, factures en attente, alertes actives) |
| **Détection d'anomalies** | L'IA identifie les écarts significatifs vs tendance (baisse de cash inhabituelle, facture anormalement élevée, retard de paiement nouveau) |
| **Calendrier financier** | Événements du jour et de la semaine (échéances fiscales, paiements prévus, clôtures, meetings CSE) |
| **Actions recommandées** | Liste priorisée d'actions à effectuer (relance client, validation facture, déclaration à soumettre) avec lien direct vers le module concerné |
| **Score de santé financière** | Score composite (0-100) calculé à partir des indicateurs clés, avec décomposition par axe (liquidité, rentabilité, croissance, risque) |
| **Historique des briefs** | Consultation des briefs passés, recherche par date |
| **Push notifications** | Envoi du brief par email, Slack ou notification PWA selon les préférences |

### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Agrégation des données | 🟢 100% auto | Collecte automatique depuis tous les modules |
| Génération du brief | 🟢 100% auto | IA génère le texte chaque matin |
| Détection d'anomalies | 🟢 100% auto | Algorithmes de détection d'écarts |
| Actions recommandées | 🟡 Auto + validation | L'IA propose, l'humain exécute |
| Score de santé | 🟢 100% auto | Calcul déterministe + pondération IA |

---

## 4. Module 2 — Cash Management

### Description

Gestion complète de la trésorerie : prévisions, suivi bancaire, gestion de la dette et des financements. C'est le module vital pour toute entreprise — le cash est la première cause de défaillance des PME françaises.

---

### 2a — Cash Forecast

#### Description

Prévisions de trésorerie à court et moyen terme. Plan de trésorerie glissant permettant d'anticiper les besoins de financement et d'éviter les ruptures de cash.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Plan de trésorerie glissant** | Prévision sur 13 semaines (court terme) et 12 mois (moyen terme), mise à jour automatiquement |
| **3 scénarios** | Pessimiste, central, optimiste — avec paramètres ajustables (churn, croissance, délais paiement) |
| **Cash position temps réel** | Solde consolidé multi-banques, actualisé quotidiennement via les connecteurs bancaires |
| **Burn rate** | Calcul automatique du burn rate net et brut, tendance sur 3/6/12 mois |
| **Runway** | Nombre de mois restants au rythme actuel, avec date d'épuisement estimée par scénario |
| **Alertes de seuil** | Notifications quand le cash passe sous un seuil défini ou quand le runway < 6 mois |
| **Prévision d'encaissements** | Basé sur les factures clients en cours (AR), probabilité de paiement par facture |
| **Prévision de décaissements** | Basé sur les factures fournisseurs (AP), échéances fiscales, salaires, emprunts |
| **Analyse du BFR** | Suivi du Besoin en Fonds de Roulement (DSO, DPO, DIO), tendances et alertes |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Collecte des soldes bancaires | 🟢 100% auto | Via connecteurs bancaires (Bridge, Qonto, Revolut) |
| Calcul burn rate / runway | 🟢 100% auto | Déterministe, basé sur l'historique |
| Prévisions d'encaissements | 🟡 Auto + ajustement | IA prédit les dates de paiement, l'humain peut corriger |
| Scénarios | 🟡 Auto + paramétrage | Paramètres par défaut calculés par l'IA, ajustables par l'utilisateur |
| Alertes | 🟢 100% auto | Déclenchement automatique sur seuils |

---

### 2b — Banque

#### Description

Interface unifiée de suivi bancaire multi-établissements. Rapprochement bancaire automatisé, catégorisation des mouvements, et vue consolidée des soldes.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Vue consolidée multi-banques** | Soldes et mouvements de tous les comptes bancaires dans une interface unique |
| **Rapprochement bancaire automatique** | Matching automatique entre les mouvements bancaires et les écritures comptables |
| **Catégorisation intelligente** | L'IA catégorise les mouvements par nature (salaires, loyer, abonnements, revenus clients) |
| **Détection des anomalies** | Mouvements inhabituels (montant, fréquence, bénéficiaire inconnu), doublons |
| **Frais bancaires** | Suivi et comptabilisation automatique des frais, agios, commissions |
| **Virements et prélèvements** | Préparation des ordres de virement (fournisseurs, salaires) avec workflow de validation |
| **Soldes intra-day** | Suivi des soldes en temps réel pour les comptes connectés via API |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Import des mouvements | 🟢 100% auto | Via connecteurs bancaires |
| Rapprochement | 🟡 90% auto | Matching automatique, écarts signalés pour revue |
| Catégorisation | 🟡 85% auto | IA catégorise, l'humain valide les cas ambigus |
| Comptabilisation frais | 🟢 100% auto | Règles automatiques |
| Ordres de virement | 🔴 Humain requis | L'IA prépare, l'humain valide et signe |

---

### 2c — Dette & emprunts

#### Description

Suivi et gestion des emprunts bancaires, lignes de crédit, et autres instruments de dette. Tableau d'amortissement, suivi des covenants, et alertes sur les échéances.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Registre des emprunts** | Liste complète des emprunts actifs : montant initial, taux, durée, échéances, garanties |
| **Tableaux d'amortissement** | Génération et suivi automatique, décomposition capital/intérêts |
| **Suivi des covenants** | Monitoring des ratios financiers imposés par les banques (gearing, DSCR, leverage), alertes si proche du seuil |
| **Échéancier de remboursement** | Vue consolidée de toutes les échéances à venir, intégré au Cash Forecast |
| **Simulation de nouvel emprunt** | Impact d'un nouvel emprunt sur la trésorerie, les ratios et les covenants existants |
| **Comptabilisation automatique** | Écritures d'intérêts, de remboursement de capital, et de frais financiers |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Tableaux d'amortissement | 🟢 100% auto | Calcul déterministe |
| Suivi des covenants | 🟢 100% auto | Calcul des ratios + alertes |
| Écritures comptables | 🟢 100% auto | Génération automatique à chaque échéance |
| Simulation | 🟡 Auto + paramétrage | L'utilisateur entre les termes, l'IA calcule l'impact |
| Négociation bancaire | 🔴 Humain requis | La plateforme prépare les éléments, l'humain négocie |

---

### 2d — Relations BPI France

#### Description

Suivi des financements BPI France : prêts, garanties, avances remboursables, subventions. BPI est un partenaire incontournable des PME innovantes françaises.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Registre des financements BPI** | Suivi de tous les dispositifs actifs : prêts d'amorçage, garanties, avances innovation, aides |
| **Échéancier** | Calendrier des remboursements, périodes de franchise, dates clés |
| **Suivi des conditions** | Obligations de reporting, conditions suspensives, jalons à respecter |
| **Préparation des dossiers** | Assistance IA pour la constitution des dossiers de demande (données financières pré-remplies) |
| **Reporting BPI** | Génération automatique des reportings exigés par BPI (avancement, indicateurs financiers) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Suivi des échéances | 🟢 100% auto | Alertes automatiques |
| Reporting BPI | 🟡 Auto + validation | L'IA génère le rapport, l'humain valide avant envoi |
| Constitution de dossier | 🟡 Auto + validation | Données pré-remplies depuis la plateforme, l'humain complète et valide |
| Relation avec BPI | 🔴 Humain requis | Contact humain obligatoire |

---

### 2e — Affacturage / Dailly

#### Description

Gestion des solutions de financement du BFR : cession Dailly, affacturage. Suivi des cessions, des réserves, et de l'impact sur la trésorerie.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Sélection des créances** | Identification automatique des créances éligibles à la cession (montant, ancienneté, qualité du débiteur) |
| **Suivi des cessions** | Registre des créances cédées, montants financés, réserves retenues, coût de l'affacturage |
| **Impact trésorerie** | Simulation de l'impact d'une cession sur le cash disponible et le coût financier |
| **Réconciliation** | Rapprochement automatique entre les paiements reçus et les créances cédées |
| **Coût comparatif** | Comparaison du coût de l'affacturage vs. découvert vs. Dailly vs. attente du paiement |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Identification créances éligibles | 🟢 100% auto | Règles + scoring IA |
| Suivi des cessions | 🟢 100% auto | Mise à jour automatique |
| Décision de cession | 🔴 Humain requis | L'IA recommande, l'humain décide |
| Réconciliation | 🟡 90% auto | Matching automatique, exceptions manuelles |

---

## 5. Module 3 — FP&A

### Description

Financial Planning & Analysis — le cerveau analytique de l'entreprise. Ce module transforme les données brutes des autres modules en insights actionnables, projections et supports de décision pour le dirigeant et les investisseurs.

---

### 3a — KPIs SaaS

#### Description

Tableau de bord des métriques SaaS calculées automatiquement. Chaque KPI est accompagné de sa tendance, d'un benchmark sectoriel et d'un commentaire IA contextualisant la performance.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Métriques de revenus** | MRR, ARR, MRR growth rate, décomposition MRR (new, expansion, contraction, churn) |
| **Métriques de rétention** | Logo churn, revenue churn, NRR (Net Revenue Retention), GRR (Gross Revenue Retention) |
| **Métriques d'acquisition** | CAC, CAC payback period, nouveaux clients/mois, pipeline conversion |
| **Unit economics** | LTV, ratio LTV/CAC, ARPU/ARPA |
| **Métriques d'efficacité** | Rule of 40, burn multiple, magic number, SaaS quick ratio |
| **Tendances 12 mois** | Sparklines et graphiques de tendance pour chaque KPI |
| **Benchmark sectoriel** | Positionnement vs. médianes sectorielles (par taille, stade, géographie) |
| **Commentaire IA par KPI** | Analyse automatique de la tendance, détection des inflexions, recommandations |
| **Cohort analysis** | Analyse par cohorte de clients (rétention, expansion, revenue par cohorte mensuelle) |
| **Alertes** | Churn en accélération, CAC payback > 18 mois, LTV/CAC < 3, NRR < 100% |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul des KPIs | 🟢 100% auto | Déterministe, depuis les données de facturation/abonnement |
| Commentaires IA | 🟢 100% auto | Génération automatique par Claude |
| Benchmarks | 🟢 100% auto | Comparaison aux bases de référence (Bessemer, OpenView) |
| Alertes | 🟢 100% auto | Seuils configurables |
| Cohort analysis | 🟢 100% auto | Calcul automatique depuis l'historique clients |

---

### 3b — Budget, Forecast & Variance Analysis

#### Description

Cycle budgétaire complet : construction du budget annuel avec les opérationnels, forecast glissant mis à jour trimestriellement, et analyse des écarts entre réel et budget. C'est le cœur du pilotage financier.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Construction budgétaire** | Budget annuel par ligne de P&L, par département, par projet. Templates pré-remplis depuis l'historique |
| **Workflow de validation** | Circuit d'approbation : responsable de département → DAF → direction générale |
| **Forecast glissant** | Re-forecast trimestriel (ou mensuel) intégrant les données réelles déjà connues |
| **Variance analysis** | Comparaison automatique réel vs budget vs forecast, avec écarts en valeur et en % |
| **Waterfall charts** | Ponts budget-to-actual décomposant les écarts par catégorie |
| **Commentaires IA sur les écarts** | Explication automatique des écarts significatifs ("Le dépassement de 15K€ sur le recrutement est dû à l'embauche non budgétée d'un senior dev en mars") |
| **Versioning** | Historique des versions du budget et des forecasts, comparaison entre versions |
| **Drill-down** | Navigation du niveau consolidé vers le détail par département, par compte, par mois |
| **Export** | Export Excel, PDF pour les présentations au board |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Pré-remplissage budget | 🟡 Auto + ajustement | IA propose un budget basé sur N-1 + tendances, l'humain ajuste |
| Collecte des actuals | 🟢 100% auto | Depuis la comptabilité |
| Calcul des écarts | 🟢 100% auto | Déterministe |
| Commentaires IA | 🟢 100% auto | Analyse et explication des écarts |
| Forecast | 🟡 Auto + validation | IA propose le re-forecast, l'humain valide |
| Approbation budget | 🔴 Humain requis | Workflow de validation obligatoire |

---

### 3c — Scenario Planner

#### Description

Modélisation financière interactive et conversationnelle. Le dirigeant pose une question en langage naturel ("Que se passe-t-il si je recrute 5 personnes au T3 ?") et voit l'impact en temps réel sur le P&L, la trésorerie et le runway.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Interface conversationnelle** | Questions en langage naturel → modélisation automatique |
| **Variables ajustables** | Effectifs, CA, pricing, churn, charges, investissements, levée de fonds |
| **Impact temps réel** | Modification d'une variable → mise à jour instantanée du P&L, cash forecast, runway |
| **Comparaison de scénarios** | Jusqu'à 3 scénarios côte à côte |
| **Sauvegarde et partage** | Scénarios nommés, partageables avec le board ou les investisseurs |
| **Sensibilités** | Analyse de sensibilité : quel levier a le plus d'impact sur le runway ? |
| **Recommandation IA** | "Pour atteindre la rentabilité en 18 mois, voici les 3 leviers les plus efficaces..." |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Modélisation | 🟢 100% auto | Calculs déterministes basés sur les variables |
| Compréhension langage naturel | 🟢 100% auto | IA traduit la question en paramètres |
| Recommandations | 🟢 100% auto | IA analyse les sensibilités |
| Décisions | 🔴 Humain requis | L'outil informe, l'humain décide |

---

### 3d — Slide Deck VC

#### Description

Génération automatique d'un board pack investisseurs complet en un clic. Format standard attendu par les VCs, avec les KPIs, le P&L, la trésorerie et les highlights/lowlights du mois.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Template board pack** | Format standard VC : executive summary, KPIs, P&L, cash, highlights, lowlights, asks |
| **Agrégation automatique** | Données tirées de tous les modules (KPIs SaaS, trésorerie, budget, clôture) |
| **Narrative IA** | Résumé exécutif et commentaires générés automatiquement |
| **Personnalisation par investisseur** | Adaptation du contenu selon le profil (seed, série A, dette) |
| **Export multi-format** | PDF, PowerPoint, Google Slides |
| **Historique** | Archive des board packs précédents, comparaison mois par mois |
| **Calendrier de reporting** | Rappels automatiques des dates d'envoi aux investisseurs |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Agrégation données | 🟢 100% auto | Depuis tous les modules |
| Génération du deck | 🟡 Auto + revue | IA génère, l'humain relit avant envoi |
| Narrative | 🟡 Auto + revue | IA rédige, l'humain ajuste le ton |
| Envoi | 🔴 Humain requis | Validation obligatoire avant diffusion |

---

### 3e — Comptabilité analytique

#### Description

Ventilation des charges et produits par axes analytiques (centres de coûts, projets, business units). Permet de comprendre la rentabilité par segment et d'alimenter le pilotage budgétaire.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Axes analytiques** | Définition libre des axes : département, projet, produit, client, BU |
| **Ventilation automatique** | Affectation automatique des charges aux axes analytiques selon des règles et l'IA |
| **P&L analytique** | Compte de résultat par axe (P&L par département, par projet, par produit) |
| **Marges par segment** | Calcul de la marge brute et de la marge de contribution par segment |
| **Coûts de revient** | Calcul du coût complet par produit/service |
| **Clés de répartition** | Définition et application de clés de répartition pour les charges indirectes |
| **Comparaison** | Écarts entre segments, évolution temporelle, benchmark interne |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Ventilation analytique | 🟡 80% auto | IA affecte selon l'historique et les règles, l'humain valide les cas ambigus |
| Calcul des marges | 🟢 100% auto | Déterministe |
| Clés de répartition | 🟡 Auto + paramétrage | L'humain définit les clés, le calcul est automatique |
| P&L analytique | 🟢 100% auto | Agrégation automatique |

---

## 6. Module 4 — Comptabilité

### Description

Tenue comptable complète conforme aux normes françaises (PCG). Ce module couvre l'ensemble du cycle comptable : comptabilité clients et fournisseurs, paie, immobilisations, clôture et production des états financiers. L'objectif est d'automatiser au maximum la saisie et le contrôle, en ne sollicitant l'humain que pour les validations critiques.

---

### 4a — Accounts Receivable (AR)

#### Description

Gestion du cycle client complet : de la facturation à l'encaissement. Suivi des créances, relances automatisées, aging report et prévision d'encaissements.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Facturation** | Émission de factures conformes (mentions légales, TVA, Factur-X), envoi automatique |
| **Suivi des créances** | Balance auxiliaire 411, balance âgée par client |
| **Aging report** | Répartition des créances par tranche (0-30j, 31-60j, 61-90j, 90j+) |
| **DSO** | Calcul automatique du Days Sales Outstanding, tendance et benchmark |
| **Plan de relance automatisé** | Dunning par paliers (J, J+30, J+45, J+60, J+75) avec emails personnalisés par l'IA |
| **Prévision d'encaissements** | IA prédit la date de paiement probable de chaque facture, basé sur l'historique du client |
| **Scoring client** | Score de risque par client (historique de paiement, montant exposé, secteur) |
| **Gestion des litiges** | Suivi des contestations, avoirs, workflow de résolution |
| **Lettrage automatique** | Rapprochement automatique entre paiements reçus et factures |
| **Revenue recognition** | Reconnaissance du revenu conforme aux normes (abonnements SaaS : étalement, PCA) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Émission de factures | 🟡 Auto + validation | IA pré-remplit, l'humain valide avant envoi |
| Relances | 🟢 100% auto | Emails automatiques selon le plan de relance |
| Lettrage | 🟡 90% auto | Matching automatique, écarts signalés |
| Scoring client | 🟢 100% auto | IA calcule le score |
| Revenue recognition | 🟢 100% auto | Règles comptables appliquées automatiquement |
| Gestion des litiges | 🔴 Humain requis | L'IA détecte et catégorise, l'humain résout |

---

### 4b — Accounts Payable (AP)

#### Description

Gestion du cycle fournisseur complet : de la réception de la facture au paiement. Three-way matching, workflow de validation, conformité LME et optimisation des délais de paiement.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Réception de factures** | Import automatique (email, scan, API), extraction OCR/IA des données |
| **Three-way matching** | Rapprochement automatique bon de commande / réception / facture |
| **Workflow de validation** | Circuit d'approbation par montant : < 1K€ auto, 1-10K€ manager, > 10K€ DAF |
| **Balance auxiliaire 401** | Suivi des dettes fournisseurs, balance âgée |
| **DPO** | Days Payable Outstanding, optimisation des délais de paiement |
| **Conformité LME** | Alertes si dépassement des délais légaux (60j ou 45j fin de mois), risque d'amende DGCCRF |
| **Préparation des paiements** | Génération des ordres de virement par lot (batch SEPA), échéancier de paiement |
| **Spend analytics** | Analyse des dépenses par catégorie, fournisseur, département. Détection des doublons |
| **Gestion des exceptions** | Écarts prix/quantité, factures sans commande, montants inhabituels |
| **FNP** | Calcul automatique des Factures Non Parvenues en fin de mois |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Extraction de factures | 🟡 95% auto | OCR/IA extrait les données, l'humain valide les cas incertains |
| Three-way matching | 🟡 90% auto | Matching automatique, écarts signalés |
| Comptabilisation | 🟢 100% auto | Écriture générée automatiquement après validation |
| Détection de doublons | 🟢 100% auto | IA détecte les factures en double |
| Préparation paiements | 🟡 Auto + signature | Lot préparé automatiquement, signature humaine requise |
| Conformité LME | 🟢 100% auto | Alertes automatiques |

---

### 4c — Paie & charges sociales

#### Description

Comptabilisation de la paie : intégration des données de paie depuis les connecteurs SIRH (Silae, PayFit, Lucca), génération des écritures comptables, suivi de la masse salariale et des charges sociales.

Note : la plateforme ne remplace pas le logiciel de paie — elle consomme ses données et les intègre dans la comptabilité.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Import des données de paie** | Récupération automatique des données depuis Silae, PayFit, Lucca via connecteurs |
| **Écritures de paie** | Génération automatique des écritures comptables (salaires bruts, charges patronales, charges salariales, nets à payer) |
| **Suivi de la masse salariale** | Évolution mensuelle, par département, par catégorie, comparaison au budget |
| **Charges sociales** | Suivi des charges patronales par organisme (URSSAF, retraite, prévoyance, mutuelle) |
| **DSN** | Vérification de cohérence entre les données de paie et la DSN |
| **Écritures de régularisation** | Ajustements de charges, régularisations de fin d'année |
| **Coût chargé par employé** | Calcul du coût total employeur par salarié (salaire + charges + avantages) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Import des données | 🟢 100% auto | Via connecteurs SIRH |
| Écritures comptables | 🟢 100% auto | Génération automatique selon le schéma comptable |
| Suivi masse salariale | 🟢 100% auto | Calculs et tableaux de bord automatiques |
| Contrôle de cohérence | 🟢 100% auto | Vérification automatique DSN vs écritures |
| Régularisations | 🟡 Auto + validation | L'IA détecte et propose, le comptable valide |

---

### 4d — Provisions congés payés

#### Description

Calcul et comptabilisation automatique des provisions pour congés payés. Obligation comptable mensuelle, basée sur les droits acquis et les charges sociales associées.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Calcul de la provision** | Méthode du 1/10e ou maintien de salaire (le plus favorable), charges sociales incluses |
| **Suivi des droits** | Droits acquis, droits pris, solde par salarié et global |
| **Écriture automatique** | OD de provision mensuelle (débit 6412 / crédit 4282) |
| **Reprise de provision** | Calcul automatique de la reprise lors de la prise de congés |
| **Reporting** | Évolution de la provision dans le temps, impact sur le résultat |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul | 🟢 100% auto | Déterministe, depuis les données SIRH |
| Écritures | 🟢 100% auto | OD mensuelle automatique |
| Suivi des droits | 🟢 100% auto | Depuis les connecteurs SIRH |

---

### 4e — Immobilisations & amortissements

#### Description

Gestion du registre des immobilisations : acquisition, amortissement, cession, mise au rebut. Calcul automatique des dotations aux amortissements et intégration dans la clôture.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Registre des immobilisations** | Inventaire complet : date d'acquisition, valeur d'origine, durée d'amortissement, mode (linéaire/dégressif), localisation |
| **Calcul des amortissements** | Dotations mensuelles automatiques (linéaire, dégressif, par composants) |
| **Écritures automatiques** | Dotations aux amortissements (débit 681x / crédit 28xx), mensuelles |
| **Cessions et mises au rebut** | Calcul de la plus/moins-value, écritures de sortie |
| **Immobilisations en cours** | Suivi des immobilisations en cours de production (compte 23x), mise en service |
| **Production immobilisée** | Comptabilisation de la production immobilisée (R&D capitalisée → comptes 203/232) |
| **Impairment test** | Test de dépréciation des actifs, provision si valeur recouvrable < VNC |
| **Tableau des immobilisations** | État récapitulatif pour l'annexe des comptes annuels |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul amortissements | 🟢 100% auto | Déterministe selon le plan d'amortissement |
| Écritures mensuelles | 🟢 100% auto | OD automatiques |
| Cessions | 🟡 Auto + validation | L'IA calcule la plus/moins-value, l'humain valide |
| Production immobilisée | 🟡 Auto + validation | Nécessite la qualification du temps R&D (lien avec CIR) |

---

### 4f — Notes de frais

#### Description

Gestion dématérialisée des notes de frais : soumission, vérification automatique de conformité, approbation et comptabilisation.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Soumission mobile** | Photo du justificatif → extraction automatique (montant, date, fournisseur, TVA) |
| **Vérification de conformité** | Contrôle automatique : plafonds respectés, justificatif présent, TVA récupérable, politique de frais |
| **Workflow d'approbation** | Circuit manager → comptabilité, avec délégation si absence |
| **Comptabilisation** | Écriture automatique après approbation (charge + TVA déductible) |
| **Remboursement** | Intégration au cycle de paiement (virement avec la paie ou séparé) |
| **Politique de frais** | Paramétrage des plafonds par catégorie (repas, transport, hébergement) |
| **Détection de fraude** | IA détecte les anomalies (doublons, montants inhabituels, week-ends) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Extraction OCR | 🟡 95% auto | IA extrait, l'humain vérifie les cas incertains |
| Vérification conformité | 🟢 100% auto | Règles automatiques |
| Détection fraude | 🟢 100% auto | IA détecte les anomalies |
| Comptabilisation | 🟢 100% auto | Après approbation |
| Approbation | 🔴 Humain requis | Le manager approuve |

---

### 4g — Clôture mensuelle

#### Description

Processus de clôture comptable mensuelle automatisé. Checklist de 8 blocs séquentiels (J+1 à J+8 après la fin du mois), avec progression visuelle et détection d'anomalies par l'IA. C'est le nœud central qui agrège les données de tous les sous-modules comptables.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Checklist 8 blocs** | Progression séquentielle : banque (J+1), AP (J+2), AR (J+3), paie (J+5), impôts (J+5), provisions & cut-off (J+5), contrôles (J+7), reporting (J+8) |
| **Dashboard de progression** | Vue d'ensemble : % de complétion par bloc, statut (vert/orange/rouge), deadline |
| **Pré-clôture automatique** | Génération automatique des écritures de cut-off (CCA, PCA, FNP, FAE) |
| **Contrôle de la balance** | Comparaison M vs M-1, détection IA des variations anormales (> seuil configurable) |
| **Comptes d'attente** | Alerte si soldes résiduels sur les comptes 47x |
| **Rapprochement inter-modules** | Vérification de cohérence entre AR, AP, banque, paie |
| **Génération P&L mensuel** | Compte de résultat mensuel automatique après clôture |
| **Archivage** | Dossier de clôture archivé (écritures, contrôles, validations, piste d'audit) |
| **Lock period** | Verrouillage de la période après validation, empêchant toute modification |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Écritures de cut-off | 🟡 Auto + validation | L'IA génère CCA/PCA/FNP/FAE, le comptable valide |
| Contrôle de balance | 🟢 100% auto | Détection automatique des anomalies |
| P&L mensuel | 🟢 100% auto | Agrégation automatique |
| Archivage | 🟢 100% auto | Dossier généré et archivé automatiquement |
| Validation finale | 🔴 Humain requis | Le DAF valide la clôture et verrouille la période |

---

### 4h — Production des états financiers annuels

#### Description

Génération automatique des états financiers annuels à partir des données de clôture : bilan, compte de résultat, tableau de flux de trésorerie et annexe. Conformes aux normes françaises (PCG).

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Bilan** | Actif (immobilisations, créances, trésorerie) et passif (capitaux propres, dettes), détail par poste |
| **Compte de résultat** | Par nature (charges/produits) conforme PCG, avec comparatif N-1 |
| **Tableau de flux de trésorerie** | Méthode indirecte : flux opérationnels, d'investissement, de financement |
| **Annexe simplifiée** | Règles et méthodes comptables, tableau des immobilisations, tableau des provisions, engagements hors bilan, événements post-clôture |
| **Liasse fiscale** | Pré-remplissage des formulaires CERFA 2050 à 2059 |
| **Rapport de gestion** | Assistance IA à la rédaction du rapport de gestion annuel |
| **Export** | PDF mise en page professionnelle, XBRL (si requis) |
| **Comparatif N vs N-1** | Toutes les données avec comparaison à l'exercice précédent |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Génération des états | 🟢 100% auto | Agrégation depuis la comptabilité |
| Liasse fiscale | 🟡 Auto + validation | Pré-remplie, l'expert-comptable ou le DAF valide |
| Annexe | 🟡 Auto + rédaction | IA pré-remplit, l'humain complète les notes spécifiques |
| Rapport de gestion | 🟡 Auto + revue | IA rédige un draft, l'humain ajuste |
| Approbation AG | 🔴 Humain requis | Les comptes doivent être approuvés en AG |

---

### 4i — Facturation électronique

#### Description

Conformité avec l'obligation française de facturation électronique (e-invoicing et e-reporting). Émission et réception de factures au format structuré via les Plateformes de Dématérialisation Partenaires (PDP) ou Chorus Pro.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Émission Factur-X** | Génération de factures au format Factur-X (PDF + XML structuré) |
| **Envoi via PDP** | Transmission automatique aux plateformes de dématérialisation |
| **Réception** | Import automatique des factures reçues depuis les PDP |
| **E-reporting** | Transmission des données de transaction à l'administration fiscale (B2C, international) |
| **Statut de cycle de vie** | Suivi du statut de chaque facture (déposée, reçue, acceptée, rejetée, payée) |
| **Conformité des mentions** | Vérification automatique des mentions obligatoires sur chaque facture |
| **Archivage à valeur probante** | Conservation des factures électroniques conforme aux normes fiscales (10 ans) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Génération Factur-X | 🟢 100% auto | Format généré automatiquement |
| Envoi/réception | 🟢 100% auto | Via les connecteurs PDP |
| Vérification conformité | 🟢 100% auto | Contrôle automatique des mentions |
| E-reporting | 🟢 100% auto | Transmission automatique |
| Archivage | 🟢 100% auto | Stockage conforme automatique |

---

### 4j — FEC (Fichier des Écritures Comptables)

#### Description

Génération et maintenance du Fichier des Écritures Comptables au format normé par l'administration fiscale. Obligation légale en cas de contrôle fiscal (article L47 A-I du LPF). Le FEC sert également de base d'échange avec les auditeurs externes, les commissaires aux comptes, et pour l'export des données comptables françaises en vue d'une consolidation groupe (alimentation du mapping PCG → comptes groupe dans le sous-module 4k).

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Génération FEC** | Export au format normé (18 champs obligatoires, encodage UTF-8, séparateur tabulation) |
| **Contrôle de conformité** | Vérification automatique : complétude des champs, cohérence des écritures, équilibre débit/crédit |
| **Test FEC** | Auto-test du fichier avant remise (simulant les contrôles de l'administration) |
| **Archivage** | Conservation du FEC par exercice, accessible rapidement en cas de contrôle |
| **Piste d'audit fiable (PAF)** | Documentation du chemin de la facture à l'écriture comptable |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Génération | 🟢 100% auto | Export automatique depuis la comptabilité |
| Contrôle conformité | 🟢 100% auto | Tests automatiques |
| Archivage | 🟢 100% auto | Stockage automatique par exercice |

---

### 4k — Mapping PCG / IFRS & consolidation groupe

#### Description

Mapping automatique entre le plan comptable français (PCG) et les référentiels groupe (IFRS, US GAAP, plan de comptes groupe). Permet à une filiale française d'exporter ses données comptables dans le format attendu par la maison mère pour la consolidation, à partir du FEC ou des écritures comptables.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Table de mapping** | Correspondance entre chaque compte PCG utilisé et le compte groupe/IFRS cible. Configurable par l'utilisateur ou pré-rempli depuis un template |
| **Mapping automatique des écritures** | À partir du FEC ou du grand livre, génération automatique des écritures au format groupe |
| **Retraitements IFRS** | Identification et calcul des retraitements récurrents (crédit-bail → IFRS 16, provisions réglementées, amortissements dérogatoires, activation des frais de développement) |
| **Package de consolidation** | Export structuré prêt à être importé dans le système de consolidation groupe (SAP BPC, Oracle HFM, Tagetik, ou format Excel standardisé) |
| **Réconciliation inter-comptes** | Rapprochement des transactions intragroupe (comptes courants, refacturation, management fees) |
| **Reporting au format groupe** | P&L et bilan au format groupe, avec les axes analytiques attendus par la maison mère |
| **Calendrier de reporting** | Alertes sur les deadlines de remontée des données au groupe (clôture hard close, soft close) |
| **Écarts de conversion** | Gestion des écarts de conversion si la devise groupe diffère de l'EUR |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Mapping des comptes | 🟡 Auto + paramétrage | L'IA propose un mapping initial, l'humain valide et ajuste |
| Conversion des écritures | 🟢 100% auto | Application automatique de la table de mapping |
| Retraitements IFRS | 🟡 Auto + validation | L'IA identifie et calcule les retraitements, le comptable valide |
| Package de consolidation | 🟢 100% auto | Génération automatique au format cible |
| Réconciliation intragroupe | 🟡 Auto + validation | Matching automatique, écarts signalés pour revue |

---

## 7. Module 5 — RH

### Description

Gestion des ressources humaines couvrant l'ensemble des obligations légales françaises et des processus RH opérationnels. L'objectif est d'automatiser l'administration RH courante pour permettre à une seule personne (ou au dirigeant lui-même dans une TPE) de gérer l'ensemble des obligations.

---

### 5a — Gestion du CSE

#### Description

Gestion complète du Comité Social et Économique : suivi des élus et mandats, organisation des réunions, gestion des budgets, préparation des consultations obligatoires, PV et archivage.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Registre des élus** | Liste des membres titulaires et suppléants, mandats, dates d'élection, renouvellement |
| **Heures de délégation** | Suivi des heures utilisées par élu, mutualisation, report, alertes dépassement |
| **Calendrier des réunions** | Planification automatique (mensuelle > 50 sal., bimestrielle > 11 sal.), convocations |
| **Préparation des réunions** | Ordre du jour automatique basé sur les consultations obligatoires du calendrier |
| **3 consultations obligatoires** | Orientations stratégiques, situation économique et financière, politique sociale — checklist et données pré-remplies depuis les modules Finance et RH |
| **Budget de fonctionnement** | Calcul automatique (0,20% de la masse salariale > 50 sal.), suivi des dépenses |
| **Budget ASC** | Budget activités sociales et culturelles, suivi des dépenses |
| **PV de réunions** | Assistance IA à la rédaction des procès-verbaux |
| **Archivage** | Conservation de tous les documents CSE (PV, consultations, avis) |
| **Élections professionnelles** | Calcul des seuils, calendrier électoral, protocole d'accord préélectoral |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Suivi heures délégation | 🟢 100% auto | Compteurs automatiques |
| Calendrier réunions | 🟢 100% auto | Planification automatique |
| Préparation consultations | 🟡 Auto + revue | Données pré-remplies, l'humain complète |
| PV de réunions | 🟡 Auto + validation | IA rédige un draft, le secrétaire CSE valide |
| Calcul budgets | 🟢 100% auto | Déterministe sur la masse salariale |
| Élections | 🟡 Auto + pilotage | La plateforme calcule et planifie, l'humain exécute |

---

### 5b — Reporting BDESE

#### Description

Production automatique de la Base de Données Économiques, Sociales et Environnementales. 131 indicateurs réglementaires répartis en 10 rubriques, mis à disposition des représentants du personnel.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **131 indicateurs** | Calcul automatique des indicateurs réglementaires (R. 2312-8 et R. 2312-9) |
| **10 rubriques** | Investissement social, investissement matériel, égalité pro, fonds propres, rémunérations, ASC, flux financiers, sous-traitance, transferts, environnement |
| **Alimentation multi-sources** | Données agrégées depuis Comptabilité, Paie, RH, Impôts |
| **Comparatif N / N-1 / N-2** | Historique sur 3 ans glissants |
| **Checklist de complétude** | Vérification par rubrique, alertes si données manquantes |
| **Mise à disposition** | Accès sécurisé pour les élus CSE, notification de mise à jour |
| **Export** | PDF par rubrique ou intégral |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul des indicateurs | 🟢 100% auto | Depuis les données des modules Finance et RH |
| Complétude | 🟢 100% auto | Détection automatique des données manquantes |
| Mise à disposition | 🟢 100% auto | Publication automatique après validation |
| Validation | 🔴 Humain requis | Le DAF/DRH valide avant publication |

---

### 5c — Administration du personnel

#### Description

Gestion du dossier salarié de l'embauche à la sortie : contrats, registres obligatoires, formalités administratives. Socle de données alimentant tous les autres sous-modules RH.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Dossier salarié** | Fiche complète : identité, contrat, qualification, rémunération, rattachement hiérarchique |
| **Registre unique du personnel** | Tenu automatiquement, conforme aux obligations légales |
| **DPAE** | Déclaration Préalable à l'Embauche — pré-remplie et transmise automatiquement |
| **Contrats de travail** | Génération automatique depuis des templates (CDI, CDD, alternance, stage) avec clauses adaptées |
| **Avenants** | Génération des avenants (changement de poste, de rémunération, de temps de travail) |
| **Visites médicales** | Suivi des dates de visite (embauche, périodique, reprise), alertes de rappel |
| **Affiliations** | Mutuelle, prévoyance — gestion des affiliations et radiations |
| **Documents de fin de contrat** | Certificat de travail, attestation France Travail, solde de tout compte, portabilité |
| **Organigramme** | Visualisation automatique de la structure hiérarchique |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Registre du personnel | 🟢 100% auto | Mis à jour automatiquement à chaque mouvement |
| DPAE | 🟡 Auto + validation | Pré-remplie, l'humain valide avant envoi |
| Contrats | 🟡 Auto + validation | IA génère depuis le template, l'humain vérifie et signe |
| Visites médicales | 🟢 100% auto | Rappels automatiques |
| Documents de sortie | 🟡 Auto + validation | Générés automatiquement, l'humain vérifie |

---

### 5d — Recrutement

#### Description

Gestion du processus de recrutement : de la définition du besoin à l'intégration. Suivi des candidatures, assistance IA pour le tri et la rédaction, analytics.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Fiche de poste** | Génération assistée par IA depuis la description du besoin |
| **Diffusion** | Publication automatique sur les jobboards (France Travail, LinkedIn, Welcome to the Jungle) |
| **Suivi des candidatures** | Pipeline visuel (kanban) : reçu → pré-qualifié → entretien → offre → embauché |
| **Pré-qualification IA** | Scoring automatique des CV par rapport à la fiche de poste |
| **Planification entretiens** | Intégration calendrier, proposition de créneaux automatique |
| **Grille d'entretien** | Templates de grille d'évaluation par type de poste |
| **KPIs recrutement** | Time-to-hire, cost-per-hire, taux de conversion par étape, source d'acquisition |
| **Vivier** | Base de candidats pour les postes futurs |
| **Conformité** | Vérification non-discrimination, OETH (obligation d'emploi travailleurs handicapés) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Rédaction offre | 🟡 Auto + revue | IA rédige, l'humain ajuste |
| Diffusion | 🟢 100% auto | Publication multi-plateformes |
| Pré-qualification | 🟡 Auto + validation | IA score, l'humain décide qui rencontrer |
| Planification | 🟢 100% auto | Matching automatique des disponibilités |
| Décision d'embauche | 🔴 Humain requis | Décision humaine obligatoire |

---

### 5e — Onboarding / Offboarding

#### Description

Parcours structurés d'intégration et de départ. Checklists automatisées pour ne rien oublier (accès, matériel, formations, documents).

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Parcours d'onboarding** | Checklist configurable : jour 1, semaine 1, mois 1, mois 3 |
| **Kit de bienvenue** | Demande automatique de matériel, création des accès, envoi du livret d'accueil |
| **Rapport d'étonnement** | Questionnaire automatique à M+1 |
| **Suivi période d'essai** | Rappels des dates clés (fin, renouvellement), alertes manager |
| **Parcours d'offboarding** | Checklist de sortie : restitution matériel, clôture accès, passation, documents de fin de contrat |
| **Entretien de départ** | Questionnaire automatique + analyse IA des tendances (raisons de départ) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Checklists | 🟢 100% auto | Déclenchées automatiquement à l'embauche/départ |
| Demandes de matériel/accès | 🟡 Auto + exécution | La plateforme génère les demandes, l'IT exécute |
| Rappels période d'essai | 🟢 100% auto | Alertes automatiques |
| Analyse des départs | 🟢 100% auto | IA analyse les tendances |

---

### 5f — Gestion des temps & absences

#### Description

Suivi du temps de travail et des absences : congés payés, RTT, maladie, télétravail. Conformité avec les obligations légales françaises (35h, forfait jours, repos).

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Suivi du temps de travail** | Déclaratif ou pointage, conforme aux 35h ou forfait jours |
| **Gestion des congés** | Demande, validation, solde, planning d'équipe, compteurs (CP, RTT, ancienneté) |
| **Absences** | Suivi maladie, AT/MP, congé maternité/paternité, événements familiaux |
| **Forfait jours** | Suivi du nombre de jours travaillés (218j/an), alertes de charge de travail |
| **Heures supplémentaires** | Comptabilisation, majoration, repos compensateur |
| **Télétravail** | Suivi des jours de télétravail, conformité avec la charte/accord |
| **Planning d'équipe** | Vue consolidée des présences/absences par équipe |
| **Absentéisme** | Taux d'absentéisme, tendances, alertes si > seuil |
| **CET** | Compte Épargne-Temps : alimentation, utilisation, monétisation |
| **Export paie** | Transmission des éléments variables de paie au logiciel de paie |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Compteurs | 🟢 100% auto | Mise à jour automatique |
| Workflow de validation congés | 🟡 Auto + validation | Demande automatique, le manager valide |
| Export paie | 🟢 100% auto | Transmission automatique des éléments variables |
| Alertes absentéisme | 🟢 100% auto | Détection automatique des tendances |
| Suivi forfait jours | 🟢 100% auto | Compteur + alertes de charge |

---

### 5g — Formation & entretiens professionnels

#### Description

Gestion du plan de formation et des entretiens professionnels obligatoires (tous les 2 ans + bilan à 6 ans). Suivi des obligations légales et du budget formation.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Plan de formation** | Recueil des besoins, arbitrage budgétaire, suivi de réalisation |
| **Entretien professionnel** | Obligation tous les 2 ans — planification, trame, suivi, archivage |
| **Bilan à 6 ans** | Vérification des 3 critères (formation, certification, progression) — alerte 3 000€/salarié si non conforme |
| **Budget formation** | Suivi des dépenses vs. budget, prise en charge OPCO |
| **Relations OPCO** | Demandes de financement, suivi des accords, soldes |
| **Catalogue de formations** | Suggestions IA basées sur les besoins identifiés et les compétences manquantes |
| **CPF** | Information des salariés sur leurs droits CPF |
| **Reporting** | Heures de formation par salarié, par département, taux d'accès à la formation |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Planification entretiens | 🟢 100% auto | Rappels automatiques aux dates obligatoires |
| Bilan 6 ans | 🟢 100% auto | Vérification automatique des 3 critères |
| Suivi budget | 🟢 100% auto | Depuis les données comptables |
| Suggestions formation | 🟡 Auto + validation | IA recommande, l'humain décide |
| Entretien professionnel | 🔴 Humain requis | L'entretien est humain, la plateforme l'outille |

---

### 5h — Entretiens annuels (performance)

#### Description

Campagne d'entretiens annuels d'évaluation : fixation des objectifs, évaluation de la performance, plan de développement. Non obligatoire légalement mais standard de marché.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Campagne d'entretiens** | Lancement, suivi de complétion, rappels |
| **Grille d'évaluation** | Templates configurables par métier/niveau |
| **Objectifs** | Fixation, suivi en cours d'année, évaluation en fin de période |
| **Auto-évaluation** | Le salarié remplit sa partie avant l'entretien |
| **Calibration / People Review** | Vue consolidée pour la direction, identification des talents et des sous-performances |
| **Plan de développement** | Actions de développement issues de l'entretien (formation, mentoring, mobilité) |
| **Historique** | Consultation des entretiens passés |
| **Analytics** | Distribution des notes, corrélation performance/rémunération, turnover par performance |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Lancement campagne | 🟢 100% auto | Planification et rappels automatiques |
| Analytics | 🟢 100% auto | Calculs et visualisations automatiques |
| Calibration | 🟡 Auto + décision | La plateforme visualise, la direction arbitre |
| L'entretien lui-même | 🔴 Humain requis | Échange manager/collaborateur |

---

### 5i — Rémunération & avantages

#### Description

Pilotage de la politique de rémunération et gestion complète des avantages salariés — y compris les avantages légaux, conventionnels (branche/CCN), négociés (CSE/accord d'entreprise) et facultatifs.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Grilles salariales** | Bandes de rémunération par poste, niveau, ancienneté |
| **Benchmark** | Comparaison aux données marché par poste et localisation |
| **Revue salariale annuelle** | Simulation des augmentations, impact sur la masse salariale, workflow de validation |
| **NAO** | Négociation Annuelle Obligatoire (> 50 sal. avec DS) — préparation des données |
| **Rémunération variable** | Calcul des bonus, commissions, primes sur objectifs |
| **Simulation** | Impact d'une politique de rémunération sur le P&L et la trésorerie |
| **Épargne salariale** | Suivi PEE, PERCOL, abondement employeur |
| **Surcomplémentaire retraite (article 83/PERO)** | Cotisations employeur, suivi des contrats, conformité fiscale |
| **Titres restaurant** | Attribution, valeur faciale, part employeur/salarié, suivi des droits |
| **Transport** | Prise en charge 50% Navigo (obligatoire), forfait mobilité durable (vélo, covoiturage) |
| **Chèques vacances / CESU** | Attribution, plafonds d'exonération, suivi budgétaire |
| **Avantages conventionnels (CCN/branche)** | Primes d'ancienneté, jours de congé supplémentaires, indemnités spécifiques prévues par la convention collective applicable |
| **Avantages négociés (accord d'entreprise/CSE)** | Avantages votés ou négociés : jours enfant malade, télétravail étendu, primes exceptionnelles, subventions CSE (culture, sport, vacances) |
| **Avantages en nature** | Véhicule de fonction, logement, matériel informatique — évaluation forfaitaire ou réelle, impact paie |
| **Registre des avantages** | Vue consolidée de tous les avantages par salarié : légaux, conventionnels, négociés, facultatifs — avec le coût employeur associé |
| **Coût total employeur** | Calcul du package complet par salarié (salaire fixe + variable + charges + tous avantages) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Benchmark | 🟡 Auto + sources | Données agrégées, l'humain interprète |
| Simulation augmentations | 🟢 100% auto | Impact calculé automatiquement |
| Calcul variable | 🟢 100% auto | Depuis les objectifs et les résultats |
| Suivi des avantages | 🟢 100% auto | Compteurs, droits, attribution automatiques |
| Coût total employeur | 🟢 100% auto | Agrégation de tous les éléments |
| Décisions de rémunération | 🔴 Humain requis | Le manager et la direction décident |

---

### 5j — Index égalité F/H

#### Description

Calcul et publication de l'index d'égalité professionnelle femmes-hommes. Obligation annuelle pour les entreprises > 50 salariés (5 indicateurs, note sur 100).

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Calcul des 5 indicateurs** | Écart de rémunération, écart d'augmentations, écart de promotions, retour congé maternité, hautes rémunérations |
| **Score global** | Note sur 100 points, avec détail par indicateur |
| **Objectifs de progression** | Si score < 75/100, définition et suivi des mesures correctives |
| **Publication** | Rappel de l'obligation de publication (site internet + CSE + DREETS) |
| **Historique** | Évolution du score sur les années précédentes |
| **Simulation** | Impact de mesures correctives sur le score futur |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul de l'index | 🟢 100% auto | Depuis les données de paie et d'effectifs |
| Alertes de publication | 🟢 100% auto | Rappel à la date légale (1er mars) |
| Simulation | 🟢 100% auto | Calcul d'impact automatique |
| Définition des mesures | 🔴 Humain requis | La direction définit le plan d'action |

---

### 5k — Santé, sécurité & DUERP

#### Description

Gestion de la santé et sécurité au travail. Tenue du Document Unique d'Évaluation des Risques Professionnels (DUERP), suivi des AT/MP, prévention des risques psychosociaux.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **DUERP** | Document Unique — identification des risques par unité de travail, évaluation, plan d'action. Obligatoire dès le 1er salarié, conservation 40 ans |
| **Mise à jour annuelle** | Rappel et workflow de mise à jour (obligatoire > 11 sal.) |
| **AT/MP** | Déclaration des accidents du travail et maladies professionnelles (formulaire CERFA pré-rempli) |
| **Suivi des visites médicales** | Planification et suivi (embauche, périodique, reprise après arrêt > 30j) |
| **RPS** | Évaluation des risques psychosociaux (questionnaires, indicateurs d'alerte) |
| **Référent harcèlement** | Désignation et suivi du référent harcèlement sexuel (obligation CSE) |
| **Plan de prévention** | Actions de prévention, suivi de réalisation, budget |
| **C2P** | Compte Professionnel de Prévention — déclaration des facteurs d'exposition via DSN |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Rappels et planification | 🟢 100% auto | Dates obligatoires, renouvellements |
| Déclaration AT | 🟡 Auto + validation | Formulaire pré-rempli, l'humain valide |
| Questionnaires RPS | 🟡 Auto + analyse | Distribution automatique, IA analyse les résultats |
| DUERP | 🔴 Humain requis | L'évaluation des risques nécessite une visite terrain |

---

## 8. Module 6 — Impôts

### Description

Gestion de l'ensemble des obligations fiscales françaises : calcul, déclaration, paiement et optimisation. La plateforme calcule automatiquement les montants dus, prépare les déclarations et alerte sur les échéances — l'humain valide avant soumission.

---

### 6a — TVA

#### Description

Gestion complète de la TVA : calcul, déclaration CA3 (mensuelle ou trimestrielle), TVA intracommunautaire, autoliquidation.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Calcul automatique** | TVA collectée, TVA déductible, TVA à reverser — depuis les écritures comptables |
| **Déclaration CA3** | Pré-remplissage automatique de la déclaration mensuelle ou trimestrielle |
| **TVA intracommunautaire** | Gestion des acquisitions et livraisons intracommunautaires, autoliquidation |
| **État récapitulatif** | DEB/EMEBI automatique pour les échanges intracommunautaires |
| **Contrôle de cohérence** | Vérification CA déclaré vs CA comptable, TVA déductible vs factures |
| **Échéancier** | Alertes sur les dates de déclaration et de paiement |
| **Crédit de TVA** | Suivi et demande de remboursement si crédit persistant |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul | 🟢 100% auto | Depuis la comptabilité |
| Pré-remplissage CA3 | 🟢 100% auto | Automatique |
| Contrôle cohérence | 🟢 100% auto | Vérifications automatiques |
| Soumission | 🔴 Humain requis | Le DAF valide et soumet |

---

### 6b — CFE / CVAE

#### Description

Gestion de la Contribution Économique Territoriale (CET = CFE + CVAE). Calcul des acomptes et soldes, suivi des échéances.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Calcul CFE** | Estimation basée sur la valeur locative des locaux |
| **Calcul CVAE** | Calcul de la valeur ajoutée, taux applicable, acomptes et solde |
| **Plafonnement CET** | Vérification du plafonnement à 1,625% de la valeur ajoutée |
| **Échéancier** | Dates d'acomptes (juin, septembre) et de solde (décembre) |
| **Déclarations** | Pré-remplissage des formulaires 1447-C (CFE) et 1330-CVAE |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calculs | 🟢 100% auto | Déterministe |
| Pré-remplissage | 🟢 100% auto | Automatique |
| Soumission | 🔴 Humain requis | Validation obligatoire |

---

### 6c — CIR — Crédit Impôt Recherche

#### Description

Gestion complète du Crédit d'Impôt Recherche : identification des projets éligibles, suivi des temps R&D, calcul de l'assiette, contrôles de cohérence et constitution du dossier justificatif. Le CIR représente jusqu'à 30% des dépenses de R&D — c'est un enjeu financier majeur pour les PME innovantes.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Référentiel projets R&D** | Fiche par projet : description, verrous technologiques, état de l'art, qualification MESRI, catégorie |
| **Référentiel collaborateurs** | Coût chargé, qualification (chercheur, ingénieur, technicien), éligibilité CIR |
| **Suivi des temps** | Saisie des temps par projet, fractions de jour (1.0, 0.5, 0.25), contrainte ≤ 1.0j/jour |
| **4 contrôles automatiques** | Cohérence temps/travaillé, réconciliation paie, ventilation 100%, alerte taux CIR > 90% |
| **Calcul de l'assiette** | Dépenses personnel + forfait fonctionnement 43% + sous-traitance + amortissements R&D + brevets |
| **Workflow de validation** | Ingénieur → manager → DAF → verrouillé |
| **Production immobilisée** | Lien projets R&D → produits → immobilisations (comptes 203/232) |
| **Dossier justificatif** | Assistance IA pour la rédaction des fiches techniques (verrous, état de l'art, travaux réalisés) |
| **Formulaire 2069-A** | Pré-remplissage et génération PDF |
| **Rescrit fiscal** | Assistance à la procédure de rescrit CIR |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Suivi des temps | 🟡 Saisie humaine + contrôles auto | Le collaborateur saisit, la plateforme contrôle |
| Calcul de l'assiette | 🟢 100% auto | Déterministe |
| 4 contrôles | 🟢 100% auto | Alertes automatiques |
| Fiches techniques | 🟡 Auto + validation | IA rédige un draft, l'ingénieur complète et valide |
| Formulaire 2069-A | 🟢 100% auto | Pré-rempli depuis les données |
| Qualification des projets | 🔴 Humain requis | L'expert évalue l'éligibilité |
| Dépôt du dossier | 🔴 Humain requis | Validation DAF obligatoire |

---

### 6d — Impôt sur les sociétés (IS)

#### Description

Calcul de l'impôt sur les sociétés : résultat fiscal, acomptes trimestriels, liquidation annuelle. Intégration avec la liasse fiscale.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Résultat fiscal** | Passage du résultat comptable au résultat fiscal (réintégrations, déductions) |
| **Calcul de l'IS** | Taux normal (25%), taux réduit PME (15% sur les premiers 42 500€) |
| **Acomptes trimestriels** | Calcul et échéancier des 4 acomptes (mars, juin, septembre, décembre) |
| **Provision mensuelle** | Estimation de l'IS mensuel (1/12e) pour la clôture |
| **Liquidation** | Calcul du solde d'IS, relevé de solde (formulaire 2572) |
| **Carry-back / Report** | Suivi des déficits reportables (en avant ou en arrière) |
| **Crédits d'impôt** | Imputation du CIR, CII, CICE historique sur l'IS dû |
| **Liasse fiscale** | Alimentation automatique des formulaires 2050-2059 |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul résultat fiscal | 🟡 Auto + validation | L'IA propose les réintégrations/déductions, l'humain valide |
| Acomptes | 🟢 100% auto | Calcul et échéancier automatiques |
| Provision mensuelle | 🟢 100% auto | 1/12e automatique |
| Liasse fiscale | 🟡 Auto + validation | Pré-remplie, l'expert-comptable ou le DAF valide |
| Soumission | 🔴 Humain requis | Validation obligatoire |

---

### 6e — Participation / Intéressement

#### Description

Calcul de la participation (obligatoire > 50 salariés) et de l'intéressement (facultatif). Gestion des accords, calcul de la réserve, répartition entre salariés.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Calcul de la réserve de participation** | Formule légale : ½ × (B - 5% C) × S/VA |
| **Simulation** | Impact sur le résultat et la trésorerie avant la clôture |
| **Répartition** | Calcul de la part individuelle (proportionnelle au salaire, uniforme, ou mixte) |
| **Accord d'intéressement** | Suivi de l'accord, calcul selon les critères définis (financiers, qualitatifs) |
| **Versement** | Choix du salarié (versement immédiat vs. épargne salariale PEE/PERCOL) |
| **Forfait social** | Calcul des charges patronales applicables |
| **Déclarations** | Formulaires de dépôt d'accord, déclaration à la DREETS |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Calcul participation | 🟢 100% auto | Formule légale, déterministe |
| Répartition | 🟢 100% auto | Selon les règles de l'accord |
| Simulation | 🟢 100% auto | Avant clôture |
| Choix du salarié | 🔴 Humain requis | Chaque salarié choisit |
| Accord | 🔴 Humain requis | Négociation et signature |

---

## 9. Module 7 — Juridique / Corporate

### Description

Gestion du secrétariat juridique, de la vie sociale de l'entreprise, des contrats et des assurances. Dans une PME, ces fonctions sont quasi systématiquement rattachées au DAF.

---

### 7a — Secrétariat juridique

#### Description

Gestion de la vie juridique de l'entreprise : assemblées, conseils d'administration, registres légaux, formalités au greffe.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **AG et PV** | Convocation, ordre du jour, rédaction assistée des PV (IA), archivage |
| **Conseil d'administration** | Planification, préparation des dossiers, PV |
| **Registres légaux** | Registre des mouvements de titres, registre des décisions, registre des bénéficiaires effectifs |
| **Approbation des comptes** | Workflow complet : préparation → AG → dépôt au greffe (dans les 6 mois) |
| **Dépôt des comptes** | Préparation et suivi du dépôt au greffe du tribunal de commerce |
| **Formalités** | Modification de statuts, changement de dirigeant, augmentation de capital → formalités assistées |
| **Veille juridique** | Alertes sur les changements réglementaires impactant l'entreprise |
| **Délégations de pouvoir** | Registre des délégations, alertes de renouvellement |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Planification AG/CA | 🟢 100% auto | Calendrier et rappels |
| Rédaction PV | 🟡 Auto + validation | IA rédige un draft, le président valide |
| Registres | 🟢 100% auto | Mis à jour automatiquement |
| Dépôt au greffe | 🟡 Auto + signature | Dossier préparé automatiquement, signature humaine |
| Veille juridique | 🟢 100% auto | IA surveille les changements réglementaires |

---

### 7b — Cap table & BSPCE

#### Description

Gestion de la table de capitalisation, des instruments d'equity (BSPCE, BSA, AGA) et des opérations sur capital. Critique pour les startups — souvent géré dans un tableur fragile.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Table de capitalisation** | Répartition du capital par associé, dilution, valorisation |
| **BSPCE** | Suivi des plans : attributions, vesting (cliff + linéaire), exercice, expiration |
| **BSA / AGA** | Suivi similaire aux BSPCE avec les spécificités fiscales propres |
| **Augmentation de capital** | Gestion complète : décision d'AG/CA, bulletin de souscription, DPS (droit préférentiel de souscription), prime d'émission, formalités au greffe, mise à jour des statuts |
| **Réduction de capital** | Coup d'accordéon, rachat d'actions, annulation de titres |
| **Simulation de dilution** | Impact d'un nouveau tour de table sur les associés existants |
| **Valorisation** | Historique des valorisations (409A/fair market value pour les BSPCE) |
| **Fiscalité** | Calcul de l'impact fiscal pour le bénéficiaire (plus-value d'acquisition, plus-value de cession) |
| **Waterfall analysis** | Simulation de la répartition du produit de cession selon les préférences de liquidation |
| **Pacte d'associés** | Suivi des clauses clés (tag-along, drag-along, anti-dilution, liquidation preferences) |
| **Export** | Data room format pour les investisseurs |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Suivi vesting | 🟢 100% auto | Calendrier automatique, alertes cliff/exercice |
| Simulation dilution | 🟢 100% auto | Calculs instantanés |
| Waterfall | 🟢 100% auto | Simulation automatique |
| Formalités augmentation de capital | 🟡 Auto + signature | Documents générés automatiquement, signature et dépôt humains |
| Attribution | 🔴 Humain requis | Décision du board |
| Valorisation | 🔴 Humain requis | Exercice de valorisation par un expert |

---

### 7c — Contrats & baux

#### Description

Gestion du portefeuille de contrats de l'entreprise : clients, fournisseurs, baux commerciaux, partenariats. Suivi des échéances, des renouvellements et des conditions.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Registre des contrats** | Base centralisée : parties, objet, montant, durée, conditions de résiliation |
| **Alertes d'échéances** | Rappels avant renouvellement, résiliation, révision de prix |
| **Baux commerciaux** | Suivi spécifique : indexation (ILC/ILAT), charges, renouvellement triennal |
| **Extraction IA** | Import d'un contrat PDF → extraction automatique des clauses clés (durée, montant, pénalités, préavis) |
| **Analyse de risque** | IA identifie les clauses défavorables ou les engagements importants |
| **Archivage** | Stockage sécurisé des originaux numériques |
| **Obligations de vigilance** | Vérification URSSAF, Kbis, assurance des sous-traitants |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Alertes | 🟢 100% auto | Rappels automatiques |
| Extraction IA | 🟡 Auto + validation | IA extrait les clauses, l'humain vérifie |
| Indexation baux | 🟢 100% auto | Calcul automatique selon l'indice |
| Négociation | 🔴 Humain requis | L'IA prépare les éléments, l'humain négocie |
| Vigilance sous-traitants | 🟡 Auto + suivi | Vérifications automatiques, relances des pièces manquantes |

---

### 7d — Assurances

#### Description

Gestion du portefeuille complet d'assurances de l'entreprise : suivi des polices, échéances, sinistres, optimisation annuelle. Couvre toutes les assurances nécessaires à l'activité, y compris celles exigées par les investisseurs.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Registre des polices** | Base centralisée de toutes les polices actives avec conditions, franchises, plafonds de garantie |
| **RC Professionnelle** | Responsabilité civile professionnelle — couverture des dommages causés aux clients dans le cadre de l'activité |
| **RC Exploitation** | Dommages causés aux tiers dans le cadre de l'exploitation (locaux, événements) |
| **Multirisque locaux** | Incendie, dégât des eaux, vol, bris de glace, catastrophes naturelles |
| **Cyber-risques** | Violation de données, ransomware, interruption de service, frais de notification RGPD |
| **D&O (Directors & Officers)** | Responsabilité des dirigeants et mandataires sociaux — souvent exigée par les VCs |
| **Homme-clé** | Assurance sur les fondateurs/dirigeants clés — souvent exigée par les VCs et les banques |
| **Garantie financière** | Caution, garantie à première demande — exigée selon les secteurs d'activité |
| **Perte d'exploitation** | Compensation de la perte de marge brute en cas de sinistre |
| **Flotte automobile** | Véhicules de société et de fonction |
| **Protection juridique** | Prise en charge des frais de procédure judiciaire |
| **Responsabilité environnementale** | Pollution, atteinte à la biodiversité — obligatoire pour certains secteurs |
| **Mutuelle & prévoyance** | Contrat employeur : mutuelle (ANI obligatoire), prévoyance (CCN), portabilité |
| **Échéancier** | Dates de renouvellement, de résiliation (loi Hamon, loi Chatel), de révision |
| **Suivi des sinistres** | Déclaration, suivi de l'indemnisation, historique, ratio sinistres/primes |
| **Analyse de couverture** | IA évalue si la couverture est adaptée à l'activité, la taille et les exigences des investisseurs |
| **Benchmark** | Comparaison des primes avec le marché par taille et secteur |
| **Optimisation** | Recommandations IA : polices manquantes, sur-couverture, opportunités de regroupement |
| **Checklist investisseurs** | Vérification que toutes les assurances exigées par les VCs/banques sont en place (D&O, homme-clé, cyber, RC Pro) |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Alertes échéances | 🟢 100% auto | Rappels automatiques |
| Analyse de couverture | 🟡 Auto + expert | IA analyse, un courtier ou expert valide |
| Déclaration sinistre | 🟡 Auto + validation | Formulaire pré-rempli, l'humain complète |
| Choix des polices | 🔴 Humain requis | Décision de la direction |

---

## 10. Module 8 — Audit & Compliance

### Description

Contrôle interne, relations avec les auditeurs, data room et conformité réglementaire. Ce module garantit que l'entreprise est toujours prête pour un audit (fiscal, CAC, investisseur) et respecte ses obligations de conformité.

---

### 8a — Contrôle interne

#### Description

Mise en place et suivi des procédures de contrôle interne financier : séparation des tâches, workflows de validation, détection des anomalies.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Matrice de séparation des tâches** | Définition des rôles et habilitations (qui peut quoi), détection des conflits |
| **Workflows de validation** | Seuils d'approbation par montant et par nature de dépense |
| **Cartographie des risques** | Identification et évaluation des risques financiers, plan de mitigation |
| **Détection d'anomalies** | IA analyse en continu les transactions pour détecter les patterns inhabituels |
| **Anti-fraude** | Détection de factures fictives, doublons, paiements vers des comptes inconnus |
| **Procédures documentées** | Base de procédures internes (achats, ventes, paie, trésorerie) |
| **Auto-évaluation** | Questionnaire périodique de conformité des procédures |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Détection d'anomalies | 🟢 100% auto | IA en continu |
| Anti-fraude | 🟢 100% auto | Alertes automatiques |
| Matrice d'habilitations | 🟡 Auto + paramétrage | L'humain définit les règles, le système les applique |
| Cartographie des risques | 🟡 Auto + jugement | IA propose, la direction valide |

---

### 8b — Relations CAC

#### Description

Gestion de la relation avec le Commissaire aux Comptes : préparation des documents, planning d'intervention, suivi des recommandations.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Préparation de l'audit** | Dossier de travail pré-constitué (balance, grand livre, pièces justificatives, rapprochements) |
| **Planning d'intervention** | Calendrier des interventions (intérimaire, finale), préparation des interlocuteurs |
| **Réponse aux questions** | Base de réponses aux demandes du CAC, avec pièces jointes |
| **Suivi des recommandations** | Registre des recommandations du CAC, plan d'action, suivi de mise en œuvre |
| **Lettre d'affirmation** | Assistance à la rédaction de la lettre d'affirmation |
| **Seuils d'audit** | Vérification des seuils de nomination/maintien du CAC |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Dossier de travail | 🟢 100% auto | Constitué automatiquement depuis la comptabilité |
| Suivi recommandations | 🟡 Auto + action | La plateforme suit, l'humain exécute |
| Planning | 🟢 100% auto | Planification et rappels automatiques |
| L'audit lui-même | 🔴 Humain requis | Échange humain avec le CAC |

---

### 8c — Data Room

#### Description

Espace sécurisé de mise à disposition de documents pour les événements nécessitant une due diligence : levée de fonds, M&A, audit, financement bancaire.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Data room virtuelle** | Espace structuré par catégorie (corporate, finance, RH, fiscal, juridique, IP) |
| **Peuplement automatique** | Alimentation depuis tous les modules — les documents sont déjà dans la plateforme |
| **Checklist par type d'opération** | Templates : levée de fonds seed/A/B, M&A sell-side, financement bancaire, contrôle fiscal |
| **Gestion des accès** | Droits par utilisateur/groupe, watermarking, traçabilité des consultations |
| **Index et recherche** | Recherche full-text dans tous les documents |
| **Complétude** | Score de complétude par catégorie, alerte si pièces manquantes |
| **Q&A** | Module de questions-réponses pour les auditeurs/investisseurs, avec workflow de validation |
| **Export** | Téléchargement par lot, avec table des matières |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Peuplement | 🟢 100% auto | Documents collectés depuis tous les modules |
| Checklist complétude | 🟢 100% auto | Vérification automatique |
| Gestion des accès | 🟡 Auto + décision | La plateforme applique, l'humain décide qui a accès |
| Q&A | 🟡 Auto + validation | IA propose les réponses, l'humain valide avant envoi |

---

### 8d — Conformité, gestion des données & RGPD

#### Description

Gestion transversale de la conformité réglementaire et de la protection des données. La plateforme manipule des données hautement sensibles (données personnelles salariés, données financières, données fiscales, données de santé AT/MP) — ce sous-module garantit leur protection, leur localisation et leur traitement conforme au RGPD et aux réglementations françaises.

#### Fonctionnalités — RGPD & protection des données

| Fonctionnalité | Description |
|---|---|
| **Registre des traitements (article 30)** | Inventaire automatique de tous les traitements de données personnelles effectués par la plateforme : finalité, base légale, catégories de données, destinataires, durées de conservation |
| **DPO (Délégué à la Protection des Données)** | Désignation, coordonnées, suivi des missions. Tableau de bord du DPO avec vue consolidée de la conformité |
| **PIA / AIPD** | Analyse d'Impact relative à la Protection des Données — obligatoire pour les traitements à risque élevé (profilage, données sensibles RH, scoring IA). Templates pré-remplis, workflow de validation |
| **Base légale par traitement** | Documentation de la base légale pour chaque traitement (contrat, obligation légale, intérêt légitime, consentement) |
| **Droits des personnes** | Gestion des demandes d'accès (article 15), rectification (16), effacement (17), portabilité (20), opposition (21). Workflow de traitement avec délai de réponse (1 mois) |
| **Consentements** | Recueil, stockage et preuve des consentements par finalité. Gestion du retrait de consentement |
| **Sous-traitants (article 28)** | Registre des sous-traitants ayant accès aux données personnelles, clauses contractuelles, évaluation de conformité |
| **Transferts hors UE** | Cartographie des flux de données, vérification des garanties appropriées (clauses contractuelles types, décision d'adéquation). Alerte si un sous-traitant est soumis au Cloud Act |
| **Violations de données (article 33-34)** | Procédure de notification à la CNIL (72h) et aux personnes concernées, registre des violations, plan de remédiation |
| **Privacy by design** | Chaque nouveau module ou fonctionnalité est évalué du point de vue RGPD avant mise en production |

#### Fonctionnalités — Localisation & souveraineté des données

| Fonctionnalité | Description |
|---|---|
| **Cartographie des données** | Visualisation de l'emplacement physique de chaque catégorie de données (France, UE, hors UE) |
| **Hébergement souverain** | Données personnelles et financières sensibles hébergées en France via Scaleway. Données non sensibles sur AWS EU |
| **Chiffrement** | Chiffrement au repos (AES-256) et en transit (TLS 1.3). Clés de chiffrement gérées par le client ou la plateforme |
| **Pseudonymisation / Anonymisation** | Pseudonymisation des données personnelles dans les environnements de développement et de test. Anonymisation pour les exports analytiques |
| **Séparation des tenants** | Isolation stricte des données entre clients (multi-tenant avec isolation logique ou physique selon le plan) |
| **Backup & PRA** | Plan de Reprise d'Activité : backups chiffrés, réplication géographique France, RTO/RPO définis par criticité |

#### Fonctionnalités — Archivage & conformité réglementaire

| Fonctionnalité | Description |
|---|---|
| **Durées de conservation** | Application automatique par catégorie : 10 ans comptable, 6 ans fiscal, 5 ans social/RH, 5 ans contrats, 40 ans DUERP, 3 ans recrutement |
| **Archivage à valeur probante** | Conservation conforme NF Z 42-013 pour les documents à valeur légale (factures, contrats, PV) |
| **Purge automatique** | Suppression automatique à expiration, avec alerte préalable et possibilité de prolongation motivée |
| **Piste d'audit fiable (PAF)** | Documentation du cycle facture → écriture → paiement, conforme aux exigences fiscales |

#### Fonctionnalités — Conformité générale

| Fonctionnalité | Description |
|---|---|
| **Lanceur d'alerte** | Dispositif de recueil des signalements (obligatoire > 50 salariés, loi Waserman 2022), confidentialité du lanceur, workflow de traitement |
| **DAS2** | Déclaration des honoraires versés > 1 200€/an par bénéficiaire |
| **Affichages obligatoires** | Checklist des affichages obligatoires dans les locaux, alertes si manquant |
| **Veille réglementaire** | IA surveille les évolutions légales (RGPD, Code du travail, CGI, lois de finances) et alerte sur les impacts pour l'entreprise |
| **Loi Sapin II** | Cartographie des risques de corruption, code de conduite, formation, dispositif d'alerte interne |
| **Tableau de bord conformité** | Score de conformité global avec décomposition par axe (RGPD, fiscal, social, corporate), actions correctives priorisées |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Registre des traitements | 🟡 Auto + mise à jour | Pré-rempli depuis les modules, l'humain met à jour lors de nouveaux traitements |
| Droits des personnes | 🟡 Auto + validation | La plateforme prépare la réponse (extraction des données), le DPO valide avant envoi |
| PIA / AIPD | 🟡 Auto + expertise | IA pré-remplit l'analyse, le DPO complète et valide |
| Archivage & purge | 🟢 100% auto | Application automatique des durées de conservation |
| PAF | 🟢 100% auto | Documentation automatique du cycle |
| DAS2 | 🟢 100% auto | Détection et calcul depuis les écritures comptables |
| Veille réglementaire | 🟢 100% auto | IA surveille les sources officielles |
| Notification violations | 🟡 Auto + décision | La plateforme détecte et prépare la notification, le DPO décide de notifier la CNIL |
| Lanceur d'alerte | 🟡 Plateforme + humain | La plateforme reçoit, un référent humain traite |
| Tableau de bord conformité | 🟢 100% auto | Score calculé automatiquement depuis tous les modules |

---

## 11. Module 9 — Virtual CFO

### Description

Intelligence artificielle financière évolutive. Ce module est le cerveau IA de la plateforme — il transforme les données brutes des 8 autres modules en intelligence actionnable. Il évolue en 5 niveaux de maturité, de l'assistant conversationnel basique au DAF virtuel autonome.

---

### 9a — Chat RAG

#### Description

Interface conversationnelle où le dirigeant pose n'importe quelle question financière en langage naturel. Le système interroge toutes les données de la plateforme via RAG (Retrieval-Augmented Generation) et répond avec des sources traçables.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Chat en langage naturel** | "Quel est mon DSO ce mois ?", "Pourquoi ma marge a baissé ?", "Combien me coûte le CIR ?" |
| **RAG multi-modules** | Recherche dans les données de tous les modules (comptabilité, trésorerie, RH, fiscal) |
| **Réponses sourcées** | Chaque chiffre cité renvoie à sa source traçable (`Traced<T>`) |
| **Historique des conversations** | Consultation des échanges passés |
| **Questions prédéfinies** | Suggestions contextuelles ("Avez-vous pensé à vérifier votre runway ?") |
| **Multi-format** | Réponses texte, tableaux, graphiques selon la question |
| **Alertes proactives** | Le chat signale spontanément les anomalies détectées |

#### Automatisation : 🟢 100% auto

---

### 9b — Financial Memory

#### Description

Mémoire financière historique de l'entreprise. Le système indexe chaque décision, chaque brief, chaque alerte, et les utilise pour contextualiser les analyses futures.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Base vectorielle** | Indexation de tous les événements financiers (clôtures, décisions, alertes, briefs) |
| **Contextualisation** | "La dernière fois que le DSO a dépassé 60j, vous aviez décidé de renforcer les relances — ça avait fonctionné en 3 semaines" |
| **Recherche sémantique** | "Quand est-ce qu'on a eu un problème de trésorerie ?" → résultats pertinents |
| **Apprentissage continu** | Le système s'enrichit à chaque interaction, chaque clôture, chaque décision |
| **Timeline financière** | Frise chronologique des événements marquants de l'entreprise |

#### Automatisation : 🟢 100% auto — enrichissement continu et transparent

---

### 9c — Predictive Risk

#### Description

Détection proactive de crises financières à 90 jours par croisement de signaux faibles. Le système ne se contente pas de reporter le passé — il anticipe les problèmes.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Croisement de signaux** | DSO dégradé + churn montant + burn accéléré + BFR tendu = alerte de crise |
| **Scoring de risque** | Score global (0-100) avec décomposition par facteur de risque |
| **Alertes à 90 jours** | "Si la tendance actuelle se poursuit, risque de rupture de trésorerie en juillet" |
| **Recommandations de mitigation** | Actions priorisées pour éviter la crise (réduire les coûts, accélérer les encaissements, négocier un crédit) |
| **Back-testing** | Vérification du modèle sur les données historiques ("le système aurait-il détecté la crise de 2025 ?") |

#### Automatisation : 🟢 100% auto pour la détection — les actions correctives sont humaines

---

### 9d — Autonomous Actions

#### Description

Le système exécute des actions dans un périmètre défini et validé par le dirigeant. Niveau d'autonomie configurable, avec supervision humaine obligatoire pour les actions irréversibles.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Périmètre d'autonomie** | Le dirigeant définit ce que le système peut faire seul (ex: relances < 10K€, reporting hebdo) |
| **Actions automatiques** | Relances clients, envoi de reportings, alertes proactives, préparation de déclarations |
| **Workflow d'approbation** | Les actions hors périmètre sont proposées et attendent validation |
| **Audit trail** | Chaque action autonome est loggée, justifiée et réversible si possible |
| **Kill switch** | Désactivation instantanée de l'autonomie à tout moment |
| **Reporting d'activité** | Résumé quotidien des actions exécutées par le système |

#### Automatisation

| Élément | Niveau | Détail |
|---|---|---|
| Actions dans le périmètre | 🟢 100% auto | Exécutées automatiquement |
| Actions hors périmètre | 🔴 Humain requis | Proposition + validation |
| Configuration périmètre | 🔴 Humain requis | Le dirigeant définit les limites |

---

### 9e — CFO Twin

#### Description

DAF virtuel calibré sur les préférences et le style de décision du dirigeant. Le système apprend des validations, des rejets et des commentaires successifs pour converger vers le jugement du décideur.

#### Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Profil de décision** | Le système construit un profil des préférences (tolérance au risque, priorités, style de communication) |
| **Réponses calibrées** | Les analyses et recommandations sont formulées dans le style attendu par le dirigeant |
| **Apprentissage continu** | Chaque validation/rejet affine le modèle |
| **Mode "que ferait le DAF ?"** | Le système peut répondre à des collaborateurs en mimant le style de décision du dirigeant |
| **Garde-fous** | Le système ne dépasse jamais le périmètre d'autonomie défini, même s'il "sait" ce que le dirigeant ferait |
| **Transparence** | Le système explique toujours pourquoi il recommande telle action ("basé sur vos 3 dernières décisions similaires") |

#### Automatisation : 🟢 L'apprentissage est automatique — les décisions finales restent humaines tant que le dirigeant ne les délègue pas explicitement.

---

## 12. Connecteurs (infrastructure transverse)

Documentés dans `ARCHITECTURE.md`. Les connecteurs ne sont pas un module visible dans l'interface utilisateur — ils sont l'infrastructure qui alimente tous les modules.

| Catégorie | Connecteurs |
|---|---|
| **Comptabilité** | Pennylane, Sage, Cegid |
| **SIRH / Paie** | Lucca, Silae, PayFit |
| **Banque** | Bridge API, Qonto, Revolut Business |
| **Paiements** | Stripe, GoCardless |
| **Administration fiscale** | Impots.gouv, URSSAF / net-entreprises |
| **Corporate / Cap table** | Ledgy, Carta, Capdesk |
| **Greffe / Formalités** | Infogreffe |
| **Formation** | OPCO (portails) |
| **Cloud / Infrastructure** | AWS, Scaleway (souverain) |

---

## 13. Principes transversaux

### Traçabilité

Chaque valeur numérique affichée dans la plateforme est wrappée dans un type `Traced<T>` portant sa source (ex: `"pennylane/trial_balance/2025-06"` ou `"startup-saas.json#2025-06"`). L'utilisateur peut toujours remonter à l'origine d'un chiffre.

### Séparation calcul / IA

Les **calculators** produisent des chiffres déterministes et vérifiables. L'**IA** contextualise, explique et recommande — mais ne calcule jamais. Cette séparation garantit la fiabilité des données financières.

### Human-in-the-loop

L'IA propose, l'humain valide. Trois niveaux de contrôle :

| Niveau | Exemples | Intervention humaine |
|---|---|---|
| 🟢 **Full auto** | Calcul de KPIs, alertes, rapprochement bancaire | Aucune — l'humain consulte |
| 🟡 **Auto + validation** | Écritures de clôture, déclarations fiscales, contrats générés | L'humain approuve/rejette |
| 🔴 **Humain requis** | Signature de virements, décisions stratégiques, négociations | L'humain agit, la plateforme assiste |

### Conformité française

La plateforme intègre nativement les obligations réglementaires françaises :
- Code du travail (CSE, BDESE, entretiens professionnels, DUERP)
- Code Général des Impôts (TVA, IS, CIR, CFE/CVAE)
- Plan Comptable Général (PCG)
- RGPD
- Facturation électronique (Factur-X, PDP)
- Loi Waserman (lanceur d'alerte)
- Loi Sapin II (anti-corruption, bonnes pratiques)
