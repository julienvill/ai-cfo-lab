# PRD — AI CFO Lab

## Product Requirements Document

Derniere mise a jour : 2026-04-11

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

## 3. Modules

Les specs detaillees de chaque module sont dans des fichiers `SPEC.md` dedies.
Voir [`MODULES.md`](MODULES.md) pour l'index complet et [`ROADMAP.md`](ROADMAP.md) pour le phasage.

| # | Module | Spec |
|---|--------|------|
| 1 | Daily CFO | Briefing quotidien — spec ci-dessous |
| 2 | Cash Management | [`tresorerie/SPEC.md`](web/app/app/tresorerie/SPEC.md) |
| 3 | Reports (ex-FP&A) | [`reports/SPEC.md`](web/app/app/reports/SPEC.md) |
| 4 | Comptabilite | [`comptabilite/SPEC.md`](web/app/app/comptabilite/SPEC.md) |
| 5 | RH | [`rh/SPEC.md`](web/app/app/rh/SPEC.md) |
| 6 | Impots | [`impots/SPEC.md`](web/app/app/impots/SPEC.md) |
| 7 | Juridique / Corporate | [`juridique/SPEC.md`](web/app/app/juridique/SPEC.md) |
| 8 | Audit & Compliance | A creer |
| 9 | Virtual CFO | A creer |

### Module 1 — Daily CFO

Briefing financier quotidien automatise. Chaque matin, la plateforme agrege les donnees de tous les modules, detecte les evenements significatifs, et produit un resume actionnable en langage naturel.

| Fonctionnalite | Description |
|---|---|
| **Brief du matin** | Synthese IA : tresorerie, alertes, evenements du jour, actions recommandees |
| **KPIs hero** | 4-5 metriques cles (cash disponible, runway, factures en attente, alertes actives) |
| **Detection d'anomalies** | Ecarts significatifs vs tendance |
| **Calendrier financier** | Echeances fiscales, paiements prevus, clotures, meetings CSE |
| **Actions recommandees** | Liste priorisee avec lien direct vers le module concerne |
| **Score de sante financiere** | Score composite (0-100) par axe (liquidite, rentabilite, croissance, risque) |
| **Push notifications** | Email, Slack ou notification PWA |

---

## 4. Principes transversaux

### Tracabilite

Chaque valeur numerique affichee dans la plateforme est wrappee dans un type `Traced<T>` portant sa source (ex: `"pennylane/trial_balance/2025-06"` ou `"startup-saas.json#2025-06"`). L'utilisateur peut toujours remonter a l'origine d'un chiffre.

### Separation calcul / IA

Les **calculators** produisent des chiffres deterministes et verifiables. L'**IA** contextualise, explique et recommande — mais ne calcule jamais. Cette separation garantit la fiabilite des donnees financieres.

### Human-in-the-loop

L'IA propose, l'humain valide. Trois niveaux de controle :

| Niveau | Exemples | Intervention humaine |
|---|---|---|
| 🟢 **Full auto** | Calcul de KPIs, alertes, rapprochement bancaire | Aucune — l'humain consulte |
| 🟡 **Auto + validation** | Ecritures de cloture, declarations fiscales, contrats generes | L'humain approuve/rejette |
| 🔴 **Humain requis** | Signature de virements, decisions strategiques, negociations | L'humain agit, la plateforme assiste |

### Conformite francaise

La plateforme integre nativement les obligations reglementaires francaises :
- Code du travail (CSE, BDESE, entretiens professionnels, DUERP)
- Code General des Impots (TVA, IS, CIR, CFE/CVAE)
- Plan Comptable General (PCG)
- RGPD
- Facturation electronique (Factur-X, PDP)
- Loi Waserman (lanceur d'alerte)
- Loi Sapin II (anti-corruption, bonnes pratiques)

---

## 5. Documents associes

| Document | Contenu |
|---|---|
| [`MODULES.md`](MODULES.md) | Index des 9 modules / 56 sous-modules, statut, priorite |
| [`ROADMAP.md`](ROADMAP.md) | Phasage MVP / V2 / V3, dependances inter-modules |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Stack technique, connecteurs, infrastructure |
| [`DESIGN.md`](DESIGN.md) | Design system, couleurs, typographie, composants |
| [`COMPANIES.md`](COMPANIES.md) | Fiches des 3 societes demo |
