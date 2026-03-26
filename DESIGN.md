# DESIGN.md — AI CFO Lab
## Spécifications de design — MVP (5 features)

Dernière mise à jour : 2026-03-24
Auteur : Product Designer (rôle AI)
Stack : Next.js 14 · TypeScript · Tailwind CSS v4 · shadcn/ui · Recharts · Lucide React

---

## Table des matières

1. [Principes de design](#1-principes-de-design)
2. [Sélecteur de société (composant global)](#2-sélecteur-de-société)
3. [Layout général](#3-layout-général)
4. [Feature 1 — Synthèse financière quotidienne](#4-feature-1--synthèse-financière-quotidienne)
5. [Feature 2 — Pilotage de trésorerie & runway](#5-feature-2--pilotage-de-trésorerie--runway)
6. [Feature 3 — Traitement automatique des factures](#6-feature-3--traitement-automatique-des-factures)
7. [Feature 4 — Tableau de bord KPIs SaaS](#7-feature-4--tableau-de-bord-kpis-saas)
8. [Feature 5 — Clôture mensuelle automatisée](#8-feature-5--clôture-mensuelle-automatisée)
9. [Composants transversaux](#9-composants-transversaux)

---

## 1. Principes de design

### Philosophie visuelle

Le design doit communiquer : **clarté professionnelle, intelligence discrète, confiance immédiate.**
Pas un outil comptable gris. Pas un dashboard startup coloré et superficiel.
Un équilibre entre la rigueur d'un cabinet de conseil et la fluidité d'un produit tech moderne.

Principe directeur : **"Chaque pixel doit servir une décision."**

Le design fonctionne à deux niveaux :
- **Usage normal** (CEO seul devant son écran) — densité d'information, interactivité fine
- **Mode démo live** (présentateur debout, écran projeté à 2–3m) — lisibilité grande distance, hiérarchie visuelle forte, animations qui signalent l'intelligence

### Références design

Inspirations croisées marché français/européen et américain :

| Référence | Ce qu'on retient |
|---|---|
| **Mercury** (US) | Retenue visuelle, quasi-monochrome, whitespace généreux, sensation de "calme" |
| **Stripe** (US) | Architecture d'information : progressive disclosure (summary → detail → raw data) |
| **Pennylane** (FR) | Layout comptable moderne, command palette Cmd+K, IA intégrée aux formulaires |
| **Pigment** (FR) | Dashboard FP&A enterprise, collaboration, ombres colorées subtiles |
| **Runway** (US) | Design-forward en FP&A, model canvas visuel, palette désaturée |
| **Linear** (US) | Cmd+K comme navigation primaire, keyboard-first, densité par la typo (pas les bordures) |
| **Qonto** (FR) | Design system rigoureux (tokens, dark mode WCAG AA, cross-platform) |
| **Ramp** (US) | Dashboard "value-first" (métrique héro = ce qui compte le plus pour l'utilisateur) |

**Positionnement AI-CFO-Lab :** On vise la **retenue de Mercury** (fond blanc, palette sobre) avec l'**architecture de Stripe** (progressive disclosure) et les **interactions de Linear** (Cmd+K, keyboard shortcuts). Le violet IA reste notre signature visuelle unique — aucune des références ci-dessus n'utilise le violet exclusivement pour l'IA.

---

### Palette de couleurs

#### Couleurs primaires

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Primaire | Indigo profond | `#1E3A5F` | Sidebar, headers, textes principaux |
| Primaire hover | Indigo interactif | `#2563EB` | Liens, boutons primaires, focus states |
| Accent | Électrique | `#3B82F6` | CTA, éléments actifs, barres de graphiques principales |

#### Couleurs secondaires

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Surface | Blanc pur | `#FFFFFF` | Fond des cards |
| Fond général | Gris perle | `#F8FAFC` | Background de page |
| Fond sidebar | Ardoise foncée | `#0F1C2E` | Navigation principale |
| Frontière | Gris clair | `#E2E8F0` | Séparateurs, borders de cards |

#### Couleurs AI (signature visuelle exclusive)

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| AI primaire | Violet intelligence | `#7C3AED` | Badge "AI", highlights d'insights |
| AI fond | Lavande douce | `#EDE9FE` | Fond des blocs AI |
| AI bordure | Violet interactif | `#8B5CF6` | Bordure gauche des cards AI |

> **Règle absolue :** Le violet (`#7C3AED` et ses dérivés) est réservé exclusivement aux éléments produits par l'AI. Il ne doit jamais apparaître sur une donnée brute ou calculée mécaniquement. Cette cohérence chromatique est le socle de la transparence AI.

#### Couleurs sémantiques (alertes et états)

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Critique | Rouge alarme | `#DC2626` | Runway < 3 mois, anomalie facture, churn en accélération |
| Critique fond | Rose très clair | `#FEF2F2` | Fond de carte en alerte critique |
| Attention | Ambre | `#D97706` | Runway 3–6 mois, indicateur en dégradation |
| Attention fond | Jaune très clair | `#FFFBEB` | Fond de carte en état d'attention |
| Succès | Vert forêt | `#059669` | Tendance positive, objectif atteint, étape validée |
| Succès fond | Vert très clair | `#ECFDF5` | Fond de carte positive |
| Neutre | Gris bleuté | `#64748B` | Métadonnées, labels secondaires, timestamps |
| Neutre fond | Gris très clair | `#F1F5F9` | Tags neutres, badges d'état |

---

### Typographie

**Font family principale :** `Inter` (Google Fonts)
Raison : lisibilité exceptionnelle à toutes tailles, caractère chiffres tabulaires natif, universellement perçue comme professionnelle et tech.

**Font family code/chiffres financiers :** `JetBrains Mono` (ou `font-variant-numeric: tabular-nums` sur Inter)
Usage : montants monétaires en tableaux, codes de référence, timestamps.

#### Échelle typographique

| Nom | Taille | Weight | Line-height | Usage |
|-----|--------|--------|-------------|-------|
| Display | 48px / 3rem | 800 | 1.1 | Chiffre clé en mode démo plein écran |
| H1 | 32px / 2rem | 700 | 1.2 | Titre de page |
| H2 | 24px / 1.5rem | 600 | 1.3 | Titre de section |
| H3 | 18px / 1.125rem | 600 | 1.4 | Titre de card |
| Body Large | 16px / 1rem | 400 | 1.6 | Texte de synthèse AI, narration |
| Body | 14px / 0.875rem | 400 | 1.5 | Corps de texte standard |
| Caption | 12px / 0.75rem | 400 | 1.5 | Métadonnées, sources, timestamps |
| Label | 11px / 0.6875rem | 600 | 1.4 | Labels de graphiques, badges |

#### Règles typographiques

- Les **montants financiers positifs** (tendance favorable) s'affichent en `#059669` bold
- Les **montants financiers négatifs** (tendance défavorable) s'affichent en `#DC2626` bold
- Les **chiffres clés** sur les KPI cards utilisent le weight 700 minimum, jamais moins
- Les **insights AI** utilisent Body Large en italique légère (`font-style: italic`) pour se distinguer subtilement du texte calculé

---

### Espacement et grille

**Grille principale :** 12 colonnes, gouttière 24px, margin latérale 32px
**Grille dense (tableaux):** 8px base unit

#### Échelle d'espacement (multiples de 4)

```
4px   — micro-espacement (entre icône et label)
8px   — espacement intra-composant
12px  — padding interne cards compact
16px  — padding standard (p-4)
24px  — espacement entre cards (gap-6)
32px  — padding de section (p-8)
48px  — espacement entre sections majeures
64px  — marge de page en mode présentation
```

**Border radius :**
- Cards : `12px` (rounded-xl)
- Badges / Tags : `6px` (rounded-md)
- Boutons : `8px` (rounded-lg)
- Inputs : `8px` (rounded-lg)
- Modals : `16px` (rounded-2xl)

**Ombres :**
```
card-default  : 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)
card-hover    : 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)
card-elevated : 0 8px 24px rgba(0,0,0,0.12)
modal         : 0 20px 60px rgba(0,0,0,0.20)
```

---

### Ton visuel : sérieux mais vivant

- **Pas de gradients violents** — seulement des dégradés subtils (5% d'opacité) pour signaler des zones AI
- **Animations purposées** : durée 150–300ms, easing `ease-out`. Rien ne bouge sans raison
- **Micro-interactions** : les chiffres "comptent" (animation counter) à l'apparition d'une KPI card — effet calculette qui rassure
- **Icônes** : uniquement Lucide React, stroke-width 1.5, jamais remplis (outline only pour cohérence)
- **Illustrations** : aucune (trop infantilisant pour le persona CEO). Les graphiques font office de visuels
- **Dark mode** : non prévu au MVP. L'interface claire maximise la lisibilité en démo projetée

### Command palette (Cmd+K)

Pattern emprunté à Linear/Pennylane — navigation et actions rapides au clavier.

**Ouverture :** `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)

**Composant :** `CommandDialog` de shadcn/ui (basé sur cmdk)

**Structure :**
```
┌──────────────────────────────────────────────┐
│  🔍 Rechercher une page, une action...       │
├──────────────────────────────────────────────┤
│  NAVIGATION                                  │
│  ↳ Synthèse du jour                         │
│  ↳ Trésorerie & Runway                      │
│  ↳ KPIs SaaS                                │
│  ↳ Clôture mensuelle                        │
│  ↳ Factures clients (O2C)                   │
│  ↳ Factures fournisseurs (P2P)              │
│                                              │
│  ACTIONS                                     │
│  ↳ Changer de société                       │
│  ↳ Exporter en PDF                          │
│  ↳ Mode présentation                        │
│  ↳ Rafraîchir les données                   │
│                                              │
│  SOCIÉTÉS                                    │
│  ↳ Mécaform (PME Industrielle)              │
│  ↳ NovaSaaS (Startup SaaS)                  │
│  ↳ ShopExpress (E-commerce)                 │
└──────────────────────────────────────────────┘
```

**Comportement :**
- Recherche fuzzy sur les noms de pages, actions et sociétés
- Résultats filtrés en temps réel pendant la frappe
- Navigation au clavier : `↑↓` pour se déplacer, `Enter` pour sélectionner, `Esc` pour fermer
- Les raccourcis clavier sont affichés à droite de chaque action (ex: `⌘⇧P` pour le mode présentation)

### Raccourcis clavier

| Raccourci | Action |
|---|---|
| `Cmd+K` | Command palette |
| `Cmd+Shift+P` | Mode présentation |
| `Cmd+E` | Exporter en PDF |
| `Cmd+1` à `Cmd+6` | Navigation directe vers le module 1 à 6 |
| `Escape` | Fermer modal / Quitter mode présentation |
| `?` | Afficher la liste des raccourcis |

### Conventions data visualization FP&A

Conventions universelles respectées sur tous les graphiques financiers :

| Convention | Implémentation |
|---|---|
| **Actuals** (réel) | Lignes pleines, barres opaques |
| **Forecast** (prévisionnel) | Lignes dashed (`strokeDasharray="6 4"`), barres à 50% d'opacité |
| **Budget** | Lignes pointillées fines (`strokeDasharray="2 2"`), gris `#94A3B8` |
| **Variance favorable** | Vert `#059669` |
| **Variance défavorable** | Rouge `#DC2626` |
| **Waterfall — augmentation** | Vert `#059669` |
| **Waterfall — diminution** | Rouge `#DC2626` |
| **Waterfall — total** | Bleu accent `#3B82F6` |

**Palette charts (séries multiples) :**
Palette désaturée pour éviter l'effet "arc-en-ciel" — max 6 couleurs :
```
Série 1 : #3B82F6 (bleu accent)
Série 2 : #8B5CF6 (violet)
Série 3 : #06B6D4 (cyan)
Série 4 : #F59E0B (ambre)
Série 5 : #10B981 (émeraude)
Série 6 : #F43F5E (rose)
```

### IA contextuelle (inline)

L'IA ne vit pas dans une page séparée — elle est **intégrée inline** à côté des données qu'elle contextualise.

**Patterns d'intégration IA :**

| Pattern | Usage | Exemple |
|---|---|---|
| **Insight card** | Bloc AI sous un graphique ou KPI | "Le churn a augmenté de 2 pts — principalement dû au segment Enterprise" |
| **Explain this** | Bouton `[✦ Expliquer]` à côté d'une variance ou anomalie | Click → popover avec explication IA de la variance |
| **Inline annotation** | Texte AI incrusté dans un tooltip enrichi | Survol d'un KPI → tooltip avec mini-analyse IA |
| **Chat contextuel** | Panneau latéral (Sheet) avec chat IA pré-rempli du contexte de la page | "Pose une question sur cette clôture" |

**Règles visuelles IA :**
- Tout contenu IA est précédé du badge `[✦ AI]` en violet `#7C3AED`
- Les blocs IA utilisent le fond lavande `#EDE9FE` avec bordure gauche 3px `#8B5CF6`
- Les sources sont cliquables (lien vers la donnée traçable via `Traced<T>`)
- Badge de confiance optionnel : "Basé sur 12 mois de données" en caption gris

---

## 2. Sélecteur de société

### Rôle

Permet de switcher entre les 3 sociétés fictives lors d'une démo. Présent sur toutes les pages, toujours visible, jamais intrusif.

### Position

**En haut de la sidebar**, au-dessus de la navigation principale. Hauteur fixe : 72px.

### Composant shadcn/ui

`Select` (Radix Select) — rendu comme un dropdown custom avec avatar de société.

### Structure visuelle

```
┌─────────────────────────────────┐
│  [Logo] Acier Dupont SAS        │  ← Nom de la société active
│         PME Industrielle    [▼] │  ← Type de société + chevron
└─────────────────────────────────┘
```

**Ouvert (dropdown) :**
```
┌─────────────────────────────────┐
│  [●] Acier Dupont SAS           │  ← Sélectionné (checkmark violet)
│      PME Industrielle           │
├─────────────────────────────────┤
│  [○] NovaSaaS                   │
│      Startup SaaS B2B           │
├─────────────────────────────────┤
│  [○] MaisonsClick               │
│      E-commerce B2C             │
└─────────────────────────────────┘
```

### Comportement

- Changer de société **recharge toutes les données** de la page active avec un loading state bref (skeleton 400ms)
- La société sélectionnée est **persistée en localStorage** pour la session de démo
- Un **badge de couleur** distingue les sociétés :
  - PME Industrielle → `#1E3A5F` (bleu marine)
  - Startup SaaS → `#7C3AED` (violet)
  - E-commerce → `#059669` (vert)
- En mode démo, un **tooltip au survol** affiche les métriques clés de la société (MRR, CA, salariés) — pour que le présentateur puisse orienter la démo

### Noms fictifs des sociétés (définitifs pour la démo)

| ID | Nom | Secteur | Couleur |
|----|-----|---------|---------|
| `pme-industrielle` | **Acier Dupont SAS** | PME Industrielle — 80 sal. — 8M€ CA | `#1E3A5F` |
| `startup-saas` | **NovaSaaS** | Startup SaaS B2B — 25 sal. — 150K€ MRR | `#7C3AED` |
| `ecommerce` | **MaisonsClick** | E-commerce B2C — 15 sal. — 3M€ CA | `#059669` |

---

## 3. Layout général

### Structure de navigation

**Choix : Sidebar fixe à gauche**

Raison : La sidebar est le standard de facto des dashboards financiers B2B (Pennylane, Ramp, Brex, QuickBooks). Le CEO cible la reconnaît immédiatement. Elle libère la totalité de la largeur pour le contenu.

**Dimensions :**
- Sidebar : 240px de large, hauteur 100vh, fond `#0F1C2E`
- Sidebar réduite (mode présentation) : 64px (icônes seules)
- Contenu : `calc(100vw - 240px)`, fond `#F8FAFC`

### Structure de la sidebar

```
┌──────────────────────┐
│  [Sélecteur société] │  72px — fond #162235
├──────────────────────┤
│  AI CFO Lab          │  16px — logo + nom plateforme
│  [spark icon]        │
├──────────────────────┤
│  NAVIGATION          │  11px label section
│                      │
│  [LayoutDashboard]   │
│  Synthèse du jour    │  ← Module 1
│                      │
│  [TrendingUp]        │
│  Trésorerie          │  ← Module 2
│                      │
│  [ArrowRightLeft]    │
│  Factures clients    │  ← Module 3a (O2C)
│                      │
│  [Receipt]           │
│  Factures fourniss.  │  ← Module 3b (P2P)
│                      │
│  [BarChart3]         │
│  KPIs SaaS           │  ← Module 4
│                      │
│  [CheckSquare]       │
│  Clôture mensuelle   │  ← Module 5
├──────────────────────┤
│  V2                  │  11px label section — opacity 50%
│  [Users]             │
│  Connecteur SIRH     │  ← Module 6 (disabled)
│  [MessageSquare]     │
│  Conseiller IA       │  ← Module 7 (disabled)
│  [Calculator]        │
│  Crédit Impôt Rech.  │  ← Module 8 (disabled)
│  [FileSpreadsheet]   │
│  Reporting CSE       │  ← Module 9 (disabled)
│  [GitBranch]         │
│  Scenario Planner    │  ← Module 10 (disabled)
├──────────────────────┤  (push to bottom)
│  [Settings]          │
│  Paramètres          │
│  [HelpCircle]        │
│  Support             │
└──────────────────────┘
```

**Item de navigation actif :**
- Fond : `#2563EB` avec opacity 15% → rectangle arrondi (rounded-lg)
- Texte : `#FFFFFF` weight 600
- Icône : couleur `#3B82F6`
- Barre gauche : 3px solid `#3B82F6`

**Item désactivé (H2) :**
- Opacity 40%
- Badge `BIENTÔT` en `#64748B` — caption size
- Non cliquable

---

### Structure d'une page type

```
┌─────────┬──────────────────────────────────────────────┐
│         │  [PAGE HEADER]                               │
│         │  Titre de page     [Date/Période]  [Actions] │
│         │  Sous-titre bref                             │
│ SIDEBAR │────────────────────────────────────────────── │
│  240px  │  [CONTENT AREA]                              │
│         │                                              │
│         │  [Bloc primaire / Hero]                      │
│         │                                              │
│         │  [Grille de cards]                           │
│         │                                              │
│         │  [Section secondaire]                        │
│         │                                              │
└─────────┴──────────────────────────────────────────────┘
```

**Page header :**
- Hauteur : 72px
- Fond : `#FFFFFF`, border-bottom 1px `#E2E8F0`
- Padding horizontal : 32px
- Contient : breadcrumb + titre H1, sélecteur de période (si applicable), bouton(s) d'action principaux

**Content area :**
- Padding : 32px
- Max-width : 1440px (centré)
- Scroll vertical, pas horizontal

---

### Mode présentation (demo live)

Activé par un bouton `[Présentation]` dans le header, ou raccourci clavier `Cmd+Shift+P`.

**Ce que le mode présentation change :**
- Sidebar se réduit à 64px (icônes seules) → gain de 176px de largeur
- Header se compresse à 48px
- Font-size global augmente de 15% (via CSS custom property `--demo-scale: 1.15`)
- Les cards KPI passent en font Display (48px) pour les chiffres clés
- Un **badge rouge pulsant** `DÉMO LIVE` apparaît en haut à droite pour signaler clairement que c'est une démonstration sur données fictives
- Les animations AI (typing effect, progress bars) s'activent automatiquement
- Curseur custom : crosshair désactivé → pointer standard pour faciliter la navigation au clavier

**Sortie du mode :** touche `Escape` ou bouton `[Quitter la présentation]`

---

## 4. Feature 1 — Synthèse financière quotidienne

### Concept

Le CEO arrive le matin. En 30 secondes, il sait l'essentiel : santé financière, alertes actives, recommandation prioritaire. En langage naturel, rédigé par l'AI, avec les chiffres en ancres cliquables vers la source.

---

### Layout de la page

```
PAGE HEADER
  Titre : "Synthèse du jour"
  Sous-titre : "Lundi 24 mars 2026 — Acier Dupont SAS"
  Bouton : [Rafraîchir] [Partager par email]

────────────────────────────────────────────────────────

ROW 1 — HERO AI BRIEF (pleine largeur)
┌──────────────────────────────────────────────────────┐
│  [✦ Badge "AI Insight" violet]  Généré il y a 8 min  │
│                                                      │
│  "Bonjour. Votre trésorerie disponible est de        │
│   487 230 € [↗], en hausse de 12% vs. la semaine    │
│   dernière. Attention : le client Schneider Electric  │
│   affiche un retard de paiement de 34 jours sur      │
│   une facture de 68 000 € [!]. Si ce retard          │
│   persiste, votre runway passe de 7,2 à 5,8 mois.   │
│                                                      │
│   Action recommandée : relance client aujourd'hui."  │
│                                                      │
│  [Voir la facture concernée →]                       │
└──────────────────────────────────────────────────────┘

ROW 2 — KPI CARDS (4 colonnes)
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Tréso.   │ │ Runway   │ │ Factures │ │ Alertes  │
│ 487K€    │ │ 7,2 mois │ │ 3 en att.│ │ 2 active │
│ ↑ +12%   │ │ ↓ -3 sem │ │ 68K€ hdû │ │ 1 crit.  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

ROW 3 — DEUX COLONNES (2/3 + 1/3)

COL GAUCHE (8/12) — Timeline des événements financiers
┌──────────────────────────────────────────┐
│  AUJOURD'HUI                             │
│  ● 09:00 — Virement reçu SNCF 45 000€  │
│  ● 14:00 — Échéance TVA — 23 400€       │
│  ● — — Relance planifiée Schneider       │
│                                          │
│  CETTE SEMAINE                           │
│  ● Mer. — Paiement fournisseur Arcelor   │
│  ● Jeu. — Conseil d'admin mensuel        │
│  ● Ven. — Clôture T1 (dans 7 jours)     │
└──────────────────────────────────────────┘

COL DROITE (4/12) — Thermomètre santé financière
┌────────────────────────┐
│  SANTÉ FINANCIÈRE      │
│                        │
│  ████████░░  75/100    │
│  [✦ AI] Score global   │
│                        │
│  Liquidité     ✓ Bien  │
│  Rentabilité   ⚠ Moyen │
│  Croissance    ✓ Bien  │
│  Risque client ✗ Alerte│
└────────────────────────┘

ROW 4 — HISTORIQUE DES SYNTHÈSES
  Accordéon : synthèses des 7 derniers jours (collapsed par défaut)
```

---

### Composants shadcn/ui

| Composant | Usage |
|-----------|-------|
| `Card` + `CardHeader` + `CardContent` | Container des KPI cards et sections |
| `Badge` | Badge "AI Insight", statuts des alertes |
| `Accordion` | Historique des synthèses précédentes |
| `Alert` + `AlertDescription` | Bloc d'alerte critique (Schneider) |
| `Button` | Actions : Rafraîchir, Partager, Voir la facture |
| `Skeleton` | État de chargement de la synthèse AI |
| `Tooltip` | Sur chaque chiffre cliquable : "Voir la source" |
| `Separator` | Séparation entre sections de la timeline |

---

### Graphiques Recharts

**Aucun graphique complexe sur cette page.** La feature 1 est narrative. Un seul micro-graphique :

**Sparkline Trésorerie (30 jours)**
- Type : `AreaChart` Recharts réduit à 200×60px (sparkline)
- Données : solde trésorerie quotidien sur 30 jours
- Couleur : `#3B82F6`, aire sous courbe avec opacity 20%
- Pas d'axes, pas de tooltip (juste la tendance visuelle)
- Intégré directement dans la KPI card Trésorerie

---

### Éléments AI

**Badge "AI Insight"** (violet, avec icône étincelle `✦`) précède tout bloc généré par l'AI.

**Texte avec ancres cliquables :**
- Les montants dans le texte AI apparaissent en `font-weight: 600` et couleur `#2563EB`
- Underline pointillée au survol → cursor pointer → click = modal source
- Exemple : "487 230 €" → click → sheet latérale montrant le solde bancaire de la veille, horodaté

**Indicateur de fraîcheur :**
- "Généré il y a 8 min" en caption gris → si > 1h, badge orange "Données anciennes — Rafraîchir"

**Animation génération (mode démo) :**
- Le texte AI apparaît caractère par caractère (typing effect, 40ms/char)
- Icône `Loader2` (spin) pendant la génération, remplacée par `CheckCircle2` vert à la fin

---

### États

**Chargement :**
- Skeleton de la card Hero AI : rectangle 100% × 120px animé (pulse)
- Skeleton des 4 KPI cards : 4 blocs 25% × 80px
- Durée simulée en démo : 1.2 secondes

**Vide (aucune donnée) :**
- Illustration textuelle : "Aucune donnée financière disponible pour cette société. Commencez par connecter vos sources de données."
- Bouton primaire : [Configurer les sources]
- Jamais sur la démo (les 3 sociétés ont toujours des données)

---

### Moments "wow"

1. **Le chiffre invisible** : Dans le texte AI, la phrase sur le retard Schneider Electric est surlignée en ambre `#FFFBEB` à l'apparition, avec une légère animation `pulse` sur le montant 68 000 €. Le présentateur dit : "Vous voyez ce retard ? Votre logiciel comptable ne vous aurait jamais dit que ça raccourcit votre runway de 3 semaines."

2. **Le brief en temps réel** : En cliquant sur [Rafraîchir] en démo, le typing effect rejoue. Effet : l'AI "réfléchit" en direct devant le CEO.

---

## 5. Feature 2 — Pilotage de trésorerie & runway

### Concept

Le CEO voit en temps réel combien de mois il lui reste — et peut jouer avec 3 scénarios pour comprendre les leviers. Le "compte à rebours" est le moment émotionnellement le plus fort de la démo.

---

### Layout de la page

```
PAGE HEADER
  Titre : "Pilotage de trésorerie & Runway"
  Sous-titre : "Prévisions sur 13 semaines — NovaSaaS"
  Contrôles : [Sélecteur période : 13 sem / 6 mois / 12 mois]  [Exporter PDF]

────────────────────────────────────────────────────────

ROW 1 — HERO RUNWAY (pleine largeur, fond dégradé subtil)
┌──────────────────────────────────────────────────────┐
│                                                      │
│   RUNWAY                           CASH ACTUEL       │
│   ██████████████████░░░░  7,2 mois 487 230 €         │
│                                                      │
│   Date d'épuisement estimée : 24 octobre 2026        │
│   [✦ AI] Scénario central — basé sur burn rate       │
│   moyen des 90 derniers jours (67 400 €/mois)        │
│                                                      │
│   ← Scénario actif : ● Central ○ Pessimiste ○ Opt.  │
└──────────────────────────────────────────────────────┘

ROW 2 — GRAPHIQUE PRINCIPAL (8/12) + MÉTRIQUES (4/12)

COL GAUCHE — Graphique prévisionnel trésorerie
┌──────────────────────────────────────────┐
│  Solde de trésorerie — 13 semaines       │
│                                          │
│  [AreaChart multi-scénarios]             │
│   Courbe verte = Optimiste               │
│   Courbe bleue = Central (actif)         │
│   Courbe rouge = Pessimiste              │
│   Zone hachurée = Zone critique (< 50K€) │
│                                          │
│  Légende + tooltip interactif            │
└──────────────────────────────────────────┘

COL DROITE — Métriques clés
┌────────────────────────┐
│  Burn rate net         │
│  67 400 €/mois         │
│  ↑ +8% vs M-1          │
│                        │
│  MRR entrant           │
│  150 000 €/mois        │
│  ↑ +3% vs M-1          │
│                        │
│  Cash-out prochain     │
│  Vendredi — Salaires   │
│  98 500 €              │
│                        │
│  DSO moyen             │
│  38 jours              │
│  [✦ AI] +5j vs. sect.  │
└────────────────────────┘

ROW 3 — SIMULATEUR DE SCÉNARIOS (pleine largeur)
┌──────────────────────────────────────────────────────┐
│  SIMULATEUR — Jouez avec les hypothèses              │
│                                                      │
│  Scénario Pessimiste     Scénario Central    Scénar. Optimiste
│  ┌────────────────┐    ┌────────────────┐   ┌────────────────┐
│  │ Churn rate     │    │ Churn rate     │   │ Churn rate     │
│  │ [Slider 8%]   │    │ [Slider 4%]   │   │ [Slider 2%]   │
│  │ Nouv. clients  │    │ Nouv. clients  │   │ Nouv. clients  │
│  │ [Slider -20%] │    │ [Slider +0%]  │   │ [Slider +15%] │
│  │ Runway résult. │    │ Runway résult. │   │ Runway résult. │
│  │ 4,8 mois 🔴    │    │ 7,2 mois 🟡    │   │ 11,1 mois 🟢   │
│  └────────────────┘    └────────────────┘   └────────────────┘
└──────────────────────────────────────────────────────┘

ROW 4 — TABLEAU CASHFLOW 13 SEMAINES (pleine largeur)
  DataTable paginée par mois, colonnes :
  Semaine | Encaissements | Décaissements | Solde | Variation | Alerte
  Lignes de semaines futures en opacity 70% (prévisionnel)
  Lignes passées en opacity 100% (réel)
  Toggle : [Réel] [Prévisionnel] [Réel + Prévisionnel]
```

---

### Composants shadcn/ui

| Composant | Usage |
|-----------|-------|
| `Card` | Containers sections |
| `RadioGroup` | Sélecteur de scénario (Pessimiste / Central / Optimiste) |
| `Slider` | Paramètres du simulateur (churn rate, growth rate) |
| `Progress` | Barre de progression runway (jauge horizontale) |
| `Badge` | État du runway (critique / attention / bien) |
| `Table` + `TableRow` | Tableau cashflow 13 semaines |
| `Tabs` | Toggle Réel / Prévisionnel |
| `Select` | Sélecteur de période (13 sem / 6 mois / 12 mois) |
| `Tooltip` | Détail au survol des points du graphique |
| `Sheet` | Détail d'une ligne cashflow (slide-over latéral) |

---

### Graphiques Recharts

**Graphique principal : Prévisionnel trésorerie multi-scénarios**
- Type : `ComposedChart` (Area + Line)
- Axe X : semaines (W1 à W13, ou mois selon période)
- Axe Y : solde en milliers d'euros
- 3 courbes :
  - Optimiste : `AreaChart`, couleur `#059669`, opacity 30%, ligne dashed
  - Central : `AreaChart`, couleur `#3B82F6`, opacity 40%, ligne pleine
  - Pessimiste : `AreaChart`, couleur `#DC2626`, opacity 30%, ligne dashed
- Zone de référence critique (RefArea) : `< 50 000€`, fond `#FEF2F2` haché
- `ReferenceLine` horizontale à 0€ : rouge, `strokeDasharray="4 4"`
- Tooltip custom : affiche les 3 valeurs + variance entre scénarios
- Animation : `isAnimationActive={true}`, duration 800ms

**Sparklines dans les métriques :**
- Burn rate : `LineChart` 60×30px, 12 points, couleur selon tendance
- MRR : `LineChart` 60×30px, 12 points, couleur `#059669`

---

### Éléments AI

**Scénarios générés par l'AI :**
- Les valeurs par défaut des sliders sont calculées par l'AI à partir de l'historique
- Badge `[✦ AI]` sur chaque scénario au-dessus du slider
- Tooltip sur le badge : "Basé sur votre historique des 90 derniers jours"

**Insight sur la date d'épuisement :**
- La phrase "Date d'épuisement estimée : 24 octobre 2026" est dans un bloc fond `#EDE9FE`, bordure gauche 3px `#7C3AED`
- Un `(?)` icône `Info` en violet ouvre un popover expliquant le calcul

---

### Moments "wow"

1. **Le compte à rebours** : La jauge de runway en ROW 1 utilise une animation CSS sur 1 seconde à l'entrée sur la page. Si le runway est < 6 mois pour NovaSaaS, la couleur de la jauge passe automatiquement à l'ambre. Le présentateur laisse le silence agir.

2. **Le slider qui change tout** : En démo, le présentateur glisse le churn rate de 4% à 8% dans le scénario pessimiste. Le graphique se met à jour en temps réel (debounce 100ms). La date d'épuisement passe de octobre à juillet. La couleur de la jauge vire au rouge. Personne n'a besoin d'expliquer.

3. **Le coût anodin** : L'AI signale qu'un abonnement outil de 890€/mois (Figma Enterprise inutilisé) raccourcit le runway de 11 jours. Chiffre annodé dans l'insight AI, cliquable pour voir la facture source.

---

## 6. Feature 3 — Traitement automatique des factures

### Concept

Le CEO (ou son équipe) uploade une facture. L'AI l'extrait, la classe, détecte les anomalies, et l'intègre au cashflow. La traçabilité est totale.

---

### Layout de la page

```
PAGE HEADER
  Titre : "Traitement des factures"
  Sous-titre : "3 factures en attente de validation"
  Boutons : [Uploader une facture]  [Exporter]

────────────────────────────────────────────────────────

ROW 1 — ZONE D'UPLOAD + LISTE (split 50/50 ou 60/40)

COL GAUCHE (5/12) — Zone d'upload
┌─────────────────────────────────┐
│                                 │
│  [CloudUpload icon — grand]     │
│  Déposez une facture ici        │
│  PDF, JPG, PNG — max 10 Mo     │
│                                 │
│  [Parcourir les fichiers]       │
│                                 │
│  ── Ou utilisez une facture ──  │
│  ── de démonstration ──         │
│  [Facture Arcelor.pdf]          │
│  [Facture EDF.pdf]              │
│  [Facture suspecte.pdf] 🔴      │
└─────────────────────────────────┘

COL DROITE (7/12) — Liste des factures récentes
┌─────────────────────────────────────────┐
│  FACTURES EN ATTENTE (3)                │
│  ─────────────────────────────────────  │
│  [!] Arcelor Mittal    68 000€  34j  🔴 │
│      Anomalie détectée             [→]  │
│  ─────────────────────────────────────  │
│  [○] EDF Pro           2 340€   À j  ✓ │
│                                    [→]  │
│  ─────────────────────────────────────  │
│  [○] SFR Business      890€     À j  ✓ │
│                                    [→]  │
│                                         │
│  TRAITÉES CE MOIS (24)                  │
│  [Voir toutes →]                        │
└─────────────────────────────────────────┘

ROW 2 — DETAIL FACTURE (affiché après sélection d'une facture)
┌────────────────────────────────────────────────────────┐
│  FACTURE — Arcelor Mittal France                        │
│  [✦ AI] Extrait automatiquement — Confiance : 94%      │
│                                                        │
│  [Aperçu PDF — 40%] │ [Données extraites — 60%]        │
│                     │                                  │
│  [vignette PDF      │  Fournisseur  : Arcelor Mittal   │
│   cliquable pour    │  N° facture   : FM-2026-0892     │
│   plein écran]      │  Date émission: 15 mars 2026     │
│                     │  Date échéance: 14 avril 2026    │
│                     │  Montant HT   : 56 667 €         │
│                     │  TVA (20%)    : 11 333 €         │
│                     │  Montant TTC  : 68 000 €         │
│                     │  Catégorie    : Matières premières│
│                     │                                  │
│                     │  [✦ AI — ANOMALIE DÉTECTÉE]       │
│                     │  ┌────────────────────────────┐  │
│                     │  │ 🔴 Le montant TTC (68 000€)│  │
│                     │  │ dépasse le plafond habituel│  │
│                     │  │ Arcelor (+40% vs. moyenne).│  │
│                     │  │ Vérifier avant validation. │  │
│                     │  └────────────────────────────┘  │
│                     │                                  │
│                     │  [Valider]  [Rejeter]  [Déléguer]│
└────────────────────────────────────────────────────────┘

ROW 3 — TIMELINE D'AUDIT DE LA FACTURE
┌──────────────────────────────────────────────────────┐
│  AUDIT TRAIL                                         │
│  14:32 — Upload par [admin] — Arcelor Mittal.pdf     │
│  14:32 — [✦ AI] Extraction lancée                    │
│  14:33 — [✦ AI] Données extraites (confiance 94%)    │
│  14:33 — [✦ AI] Anomalie détectée : +40% vs. hist.  │
│  14:33 — Notification envoyée à CEO                  │
│  En attente de validation humaine                    │
└──────────────────────────────────────────────────────┘
```

---

### Composants shadcn/ui

| Composant | Usage |
|-----------|-------|
| `Card` | Container de chaque facture dans la liste |
| `Badge` | Statut facture (En attente / Validée / Anomalie) |
| `Alert` | Bloc d'anomalie détectée par l'AI |
| `Progress` | Indicateur de confiance de l'extraction AI (94%) |
| `Button` | Valider / Rejeter / Déléguer / Uploader |
| `Dialog` | Confirmation de validation / rejet |
| `Sheet` | Détail complet d'une facture (slide-over) |
| `Table` | Liste des factures traitées ce mois |
| `Tabs` | Switcher : En attente / Traitées / Anomalies |
| `Input` | Correction manuelle d'un champ extrait |

**Zone d'upload :**
- Composant custom `DropzoneArea` basé sur `react-dropzone`
- Fond `#F8FAFC`, bordure dashed `#CBD5E1`, rounded-xl
- Au survol / drag-over : fond `#EDE9FE`, bordure `#7C3AED` (couleur AI = l'AI reçoit le fichier)

---

### Graphiques Recharts

**Pas de graphique complexe** sur cette feature. Un seul élément visuel :

**Mini bar chart "Volume de factures ce mois"**
- Type : `BarChart` horizontal, 60×30px (sparkline)
- Données : nombre de factures par jour sur 30 jours
- Couleur : `#3B82F6`
- Intégré dans le header de la liste

---

### Éléments AI

**Extraction AI :**
- L'indicateur de confiance (`94%`) utilise le composant `Progress` en violet `#7C3AED`
- Chaque champ extrait automatiquement a un fond légèrement teinté `#EDE9FE`
- Si un champ a une confiance < 80% : fond `#FFFBEB`, badge `⚠ Vérifier`
- Les champs saisis manuellement n'ont aucun teinté AI

**Anomalie détectée :**
- Bloc `Alert` avec variant destructive custom : fond `#FEF2F2`, bordure `#DC2626`, icône `AlertTriangle`
- Badge violet `[✦ AI]` dans le titre de l'alerte pour identifier clairement la source
- Explication en langage naturel, pas de jargon technique

---

### Moments "wow"

1. **La facture suspecte** : En démo, cliquer sur "Facture suspecte.pdf" dans les exemples. L'extraction se lance (animation 1.5 secondes), puis l'anomalie apparaît avec une animation slide-down. Le présentateur dit : "Votre comptable l'aurait peut-être manquée. L'AI l'a repérée en 3 secondes."

2. **Le score de confiance** : La progress bar de confiance se remplit en 800ms avec un `ease-out`. L'effet visuel signifie : "L'AI a analysé et elle est sûre à 94%." Subtilement rassurant.

---

## 7. Feature 4 — Tableau de bord KPIs SaaS

### Concept

La page de référence pour NovaSaaS. Toutes les métriques qu'un investisseur ou un CEO SaaS regarde chaque semaine — avec les tendances et les commentaires AI qui contextualisent.

> Cette page s'adapte selon la société sélectionnée. Pour Acier Dupont (PME Industrielle), elle affiche les KPIs industriels (BFR, DSO, DPO, marge brute). Pour MaisonsClick (E-commerce), elle affiche CA par catégorie, taux de conversion, CAC publicitaire.

---

### Layout de la page

```
PAGE HEADER
  Titre : "KPIs SaaS"  [Sous-titre adaptatif selon société]
  Période : [Juin 2025 ←  → Mars 2026]  [Comparer vs. M-1 / vs. N-1]
  Export : [PDF Board Pack]

────────────────────────────────────────────────────────

ROW 1 — KPI CARDS PRIMAIRES (4 colonnes pour NovaSaaS)
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ MRR      │ │ ARR      │ │ Churn    │ │ NRR      │
│ 150 000€ │ │ 1,8M€    │ │ 3,2%     │ │ 108%     │
│ ↑ +3%/m  │ │ ↑ +38%/y │ │ ↑ +0,4pt │ │ ↓ -2pt   │
│[sparkline]│ │[sparkline]│ │[spark]  │ │[sparkline]│
└──────────┘ └──────────┘ └──────────┘ └──────────┘

ROW 2 — KPI CARDS SECONDAIRES (4 colonnes)
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ CAC      │ │ LTV      │ │ LTV/CAC  │ │ Payback  │
│ 1 850€   │ │ 14 200€  │ │ 7,7x     │ │ 14 mois  │
│ ↓ -5%    │ │ ↑ +8%    │ │ ↑ Good   │ │ → stable │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

ROW 3 — GRAPHIQUES PRINCIPAUX (split 60/40)

COL GAUCHE (7/12) — Évolution MRR 12 mois
┌──────────────────────────────────────────┐
│  MRR — 12 derniers mois                  │
│  [BarChart empilé : MRR Expansion +      │
│   New MRR + Churned MRR (négatif)]       │
│                                          │
│  Barres vertes : MRR entrant             │
│  Barres violettes : MRR expansion        │
│  Barres rouges (négatives) : Churned MRR │
│                                          │
│  [✦ AI] "La croissance ralentit depuis   │
│   janvier. L'expansion compense le churn │
│   mais la new acquisition est en baisse."│
└──────────────────────────────────────────┘

COL DROITE (5/12) — Répartition du churn
┌────────────────────────────┐
│  Analyse du churn — Mars   │
│  [PieChart / DonutChart]   │
│                            │
│  [✦ AI] Commentaire :      │
│  "Le churn Plan Starter    │
│   représente 68% des       │
│   désabonnements. Les      │
│   clients Plan Pro ont     │
│   un churn quasi nul."     │
└────────────────────────────┘

ROW 4 — GRAPHIQUES SECONDAIRES (3 colonnes)

COL 1 (4/12) — Évolution CAC/LTV
┌────────────────────────┐
│  CAC vs. LTV — 12 mois │
│  [LineChart 2 courbes] │
│  Vert : LTV            │
│  Orange : CAC          │
│  Ratio affiché dessous │
└────────────────────────┘

COL 2 (4/12) — Cohortes de rétention
┌────────────────────────┐
│  Rétention par cohorte │
│  [Heatmap — triangl.]  │
│  (table colorée)       │
│  Vert foncé = rét. élevée│
│  Rouge = churn fort    │
└────────────────────────┘

COL 3 (4/12) — Burn rate & Runway
┌────────────────────────┐
│  Runway NovaSaaS       │
│  [Progress vertical]   │
│  7,2 mois              │
│  ██████░░░░░           │
│  Burn : 67 400€/m      │
│  [→ Voir trésorerie]   │
└────────────────────────┘

ROW 5 — INSIGHT AI GLOBAL (pleine largeur)
┌──────────────────────────────────────────────────────┐
│  [✦ ANALYSE AI — NovaSaaS — Mars 2026]               │
│                                                      │
│  "Points forts : LTV/CAC de 7,7x — excellent         │
│   (benchmark SaaS B2B : 3x minimum). NRR > 100%      │
│   indique une expansion nette des clients existants.  │
│                                                      │
│   Point de vigilance : le churn mensuel est passé    │
│   de 2,8% à 3,2% sur 3 mois consécutifs. Si cette   │
│   tendance continue, votre ARR peak sera en juin.    │
│   Recommandation : lancer une campagne de rétention  │
│   ciblée Plan Starter dans les 30 prochains jours."  │
└──────────────────────────────────────────────────────┘
```

---

### Composants shadcn/ui

| Composant | Usage |
|-----------|-------|
| `Card` | Toutes les KPI cards et sections graphiques |
| `Badge` | Tendances (↑ / ↓ / →) + badges AI |
| `Tabs` | Switcher entre vues (MRR / Cohortes / CAC) |
| `Select` | Sélecteur de période et comparaison |
| `Button` | Export PDF, filtres |
| `HoverCard` | Définition d'une métrique SaaS au survol |
| `Tooltip` | Explication détaillée d'un point de graphique |
| `Popover` | Formule de calcul d'une métrique (LTV = ?) |

**HoverCard pour les métriques :** Au survol du label "LTV", une card apparaît avec la définition, la formule utilisée, et la donnée source. Essentiel pour la crédibilité en démo.

---

### Graphiques Recharts

**Graphique 1 : MRR Waterfall (évolution 12 mois)**
- Type : `ComposedChart` avec `Bar` groupées
- Données : par mois → New MRR, Expansion MRR, Contraction MRR, Churned MRR
- Couleurs : New `#059669` / Expansion `#7C3AED` / Contraction `#D97706` / Churned `#DC2626`
- `ReferenceLine` à y=0
- Tooltip custom affichant le net MRR et la variation

**Graphique 2 : Donut Churn par segment**
- Type : `PieChart` avec `innerRadius`
- Données : % churn par plan (Starter / Pro / Enterprise)
- Couleurs : `#DC2626` / `#D97706` / `#059669`
- Label central : taux de churn global

**Graphique 3 : LineChart CAC vs. LTV**
- Type : `LineChart` avec 2 `Line`
- Axe Y gauche : valeur en € (0 à 20 000)
- Courbe LTV : `#059669`, strokeWidth 2
- Courbe CAC : `#D97706`, strokeWidth 2, dashed
- `ReferenceLine` au ratio LTV/CAC = 3x (seuil minimal)

**Graphique 4 : Table de cohortes (heatmap)**
- Rendu en `Table` shadcn/ui avec cellules colorées programmatiquement
- Couleurs : échelle `#ECFDF5` (100%) → `#FEF2F2` (0%)
- Pas de Recharts — pur CSS/Table

---

### Moments "wow"

1. **L'alerte churn silencieuse** : L'insight AI mentionne que le churn est en hausse depuis 3 mois. La card "Churn 3,2%" a son badge en ambre `#D97706` (et non vert). Au clic sur le badge, un popover montre la courbe des 3 derniers mois avec une `ReferenceLine` sur le seuil. Le présentateur : "Votre comptable ne vous aurait jamais dit ça."

2. **Le LTV/CAC en temps réel** : En démo avancée, modifier le CAC dans un champ → le ratio se recalcule → le commentaire AI se régénère.

---

## 8. Feature 5 — Clôture mensuelle automatisée

### Concept

La clôture de fin de mois est la tâche la plus laborieuse de la finance PME. L'AI pré-remplit la checklist, rédige les commentaires de variance, et génère un draft de reporting. Le CEO valide, corrige, publie.

---

### Layout de la page

```
PAGE HEADER
  Titre : "Clôture mensuelle — Février 2026"
  Sous-titre : "7 étapes • 5 validées • 2 en attente"
  Progression : [████████████░░░░  71%]
  Boutons : [Générer le rapport draft] [Historique des clôtures]

────────────────────────────────────────────────────────

ROW 1 — PROGRESS OVERVIEW (pleine largeur)
┌──────────────────────────────────────────────────────┐
│  AVANCEMENT CLÔTURE FÉVRIER 2026                     │
│  [ProgressBar 71% — fond vert]                       │
│  Débuté le 1er mars • Délai cible : 7 mars           │
│  [✦ AI] "À ce rythme, vous terminerez le 5 mars,    │
│   2 jours avant le délai. Bravo."                    │
└──────────────────────────────────────────────────────┘

ROW 2 — CHECKLIST (7/12) + RÉSUMÉ CHIFFRÉ (5/12)

COL GAUCHE — Checklist intelligente
┌──────────────────────────────────────────┐
│  ÉTAPES DE CLÔTURE                       │
│                                          │
│  [✓] 1. Rapprochement bancaire           │
│       Validé le 1 mars — par IA + humain │
│       [Voir le détail →]                 │
│                                          │
│  [✓] 2. Lettrage des comptes clients     │
│       92% lettré automatiquement         │
│       [✦ AI] 8% en attente d'action      │
│       [Voir les écarts →]                │
│                                          │
│  [✓] 3. Saisie des OD (opérations div.) │
│       4 OD pré-remplies par AI           │
│       [Valider les OD →]                 │
│                                          │
│  [✓] 4. Calcul des amortissements       │
│       Automatique — aucune action        │
│                                          │
│  [✓] 5. Provisions & charges à payer    │
│       [✦ AI] 3 provisions suggérées     │
│       [Revoir les provisions →]          │
│                                          │
│  [○] 6. Contrôle TVA                    │  ← En cours
│       [✦ AI] Pré-remplissage en cours…  │
│       [████░░░░  60%]                    │
│                                          │
│  [○] 7. Draft reporting & commentaires  │  ← À faire
│       [Générer avec AI →]               │
└──────────────────────────────────────────┘

COL DROITE — Résumé P&L préliminaire
┌────────────────────────────────┐
│  P&L PRÉLIMINAIRE — Fév. 2026  │
│                                │
│  CA réalisé      487 230 €     │
│  vs. budget      +3,2%  ↑      │
│  vs. N-1         +18%   ↑      │
│                                │
│  Charges         341 000 €     │
│  vs. budget      -1,8%  ↑ bien │
│                                │
│  Marge brute     29,9%         │
│  EBITDA          72 400 €      │
│  Marge EBITDA    14,9%         │
│                                │
│  [✦ AI] Points de variance     │
│  "Le poste 'Déplacements'      │
│   est 42% au-dessus du budget. │
│   Détail disponible."          │
│  [Voir la variance →]          │
└────────────────────────────────┘

ROW 3 — DRAFT DE REPORTING (pleine largeur, après génération)
┌──────────────────────────────────────────────────────┐
│  [✦ AI] DRAFT COMMENTAIRES — Février 2026            │
│  Généré en 3,2 secondes                              │
│  ─────────────────────────────────────────────────── │
│  "Février 2026 affiche un chiffre d'affaires de      │
│   487 230 €, en progression de 18% par rapport à     │
│   février 2025 et de 3,2% au-dessus du budget.       │
│   Cette performance est portée principalement par    │
│   la ligne Acier Laminé (+24% vs. N-1).              │
│                                                      │
│   Le taux de marge brute s'établit à 29,9%, en       │
│   légère baisse vs. le mois précédent (-0,4 pt)      │
│   en raison de la hausse du prix des matières        │
│   premières (+7% sur acier en Q1 2026)..."           │
│                                                      │
│  [Modifier le texte] [Approuver et finaliser]        │
│  [Exporter PDF] [Envoyer au board]                   │
└──────────────────────────────────────────────────────┘
```

---

### Composants shadcn/ui

| Composant | Usage |
|-----------|-------|
| `Progress` | Avancement global de la clôture |
| `Checkbox` | Chaque étape de la checklist |
| `Accordion` | Détail dépliable de chaque étape validée |
| `Card` | Résumé P&L et blocs d'information |
| `Badge` | Statut de chaque étape (Validé / En cours / À faire) |
| `Button` | Actions (Valider, Générer, Exporter) |
| `Textarea` | Édition du draft de commentaires AI |
| `Dialog` | Confirmation de finalisation de clôture |
| `Alert` | Avertissements sur les étapes bloquantes |
| `Separator` | Entre les étapes de la checklist |

---

### Graphiques Recharts

**Graphique variance budget (dans le détail P&L)**
- Type : `BarChart` horizontal
- Données : écart budget par poste de charge (%)
- Couleurs : barres positives (au-dessus du budget) en `#DC2626`, négatives (économies) en `#059669`
- `ReferenceLine` à 0%
- Tooltip : valeur absolue de l'écart en €

---

### Éléments AI

**Étapes pré-remplies par l'AI :**
- Badge `[✦ AI]` sur chaque élément généré automatiquement
- Texte : "4 OD pré-remplies par l'AI — vérifiez avant validation"
- L'humain doit toujours valider — jamais d'auto-validation

**Draft de reporting :**
- Bloc entier dans fond `#EDE9FE`, bordure gauche 3px `#7C3AED`
- Badge `[✦ AI DRAFT]` en header
- Le texte est éditable inline (Textarea) — invite à personnaliser
- Mention discrète en caption : "Ce texte est un point de départ. Vous restez responsable de son contenu."

---

### Moments "wow"

1. **Le rapport en 3 secondes** : En démo, cliquer sur [Générer avec AI →] à l'étape 7. Un loader apparaît 2 secondes, puis le draft de reporting apparaît avec un effet de typing. Le présentateur : "Ça vous prendrait combien de temps à écrire ça manuellement ?"

2. **La variance invisible** : L'AI signale que le poste "Déplacements" est 42% au-dessus du budget. Clique → drill-down → note de frais non approuvée de 3 400€. Le CEO n'avait pas vu.

---

## 9. Composants transversaux

### 9.1 Carte KPI (KPI Card)

Composant utilisé sur toutes les pages. Conçu pour être lisible à 3 mètres.

**Structure :**
```
┌──────────────────────────────┐
│  [Icône]  Label KPI          │  ← H3, 18px, gris neutre
│                              │
│  487 230 €                   │  ← Display, 32–48px, #1E3A5F
│                              │
│  ↑ +12% vs. semaine préc.    │  ← Badge tendance + caption
│  [sparkline 80×24px]         │  ← Recharts LineChart minimal
│                              │
│  [✦ AI] Commentaire optionnel│  ← Body 14px, violet, italique
│         sur 2 lignes max     │
└──────────────────────────────┘
```

**Variantes de couleur selon état :**
- Nominal : fond `#FFFFFF`, border `#E2E8F0`
- Positif : fond `#ECFDF5`, border `#059669` (2px)
- Attention : fond `#FFFBEB`, border `#D97706` (2px)
- Critique : fond `#FEF2F2`, border `#DC2626` (2px)

**Comportement au clic :**
- Cursor pointer sur toute la card
- Hover : `card-hover` shadow + transform: translateY(-1px)
- Click : ouvre un `Sheet` (slide-over droit) avec le détail de la métrique, sa source, et l'historique

**En mode démo :**
- Font-size du chiffre principal passe à 48px (Display)
- Commentaire AI masqué si trop long (seules les 2 premières lignes visibles)

---

### 9.2 Badge "AI Insight"

Composant inline signal que l'information vient de l'AI, pas d'un calcul pur.

**Rendu :**
```
[✦ AI]
```

**Spécifications :**
- Fond : `#EDE9FE`
- Texte : `#7C3AED`, weight 600, size 11px, uppercase
- Icône : `Sparkles` (Lucide), 12px, couleur `#7C3AED`
- Border radius : 4px
- Padding : 2px 6px
- Border : 1px solid `#8B5CF6` avec opacity 30%

**Versions :**
- `[✦ AI]` — compact, inline dans du texte
- `[✦ AI Insight]` — medium, en header de bloc
- `[✦ Généré par l'IA]` — long, pour les drafts complets

**Règle d'usage :**
- NE JAMAIS utiliser sur un chiffre calculé mécaniquement (solde bancaire, total facture)
- TOUJOURS utiliser sur : insights narratifs, détections d'anomalies, prévisions, recommandations, textes rédigés, scores

---

### 9.3 Alerte financière

Composant pour les alertes opérationnelles. 3 niveaux de sévérité.

**Structure :**
```
┌─────────────────────────────────────────────┐
│  [AlertTriangle]  ALERTE CRITIQUE           │  ← Couleur selon sévérité
│                                             │
│  Titre de l'alerte en une ligne             │
│  Description concise sur 2-3 lignes.        │
│  [✦ AI] Recommandation AI optionnelle.      │
│                                             │
│  [Action principale]  [Ignorer]             │
└─────────────────────────────────────────────┘
```

**Sévérités :**

| Niveau | Fond | Bordure | Icône | Icône couleur |
|--------|------|---------|-------|---------------|
| Critique | `#FEF2F2` | `#DC2626` (3px gauche) | `AlertTriangle` | `#DC2626` |
| Attention | `#FFFBEB` | `#D97706` (3px gauche) | `AlertCircle` | `#D97706` |
| Info / Opportunité | `#EFF6FF` | `#2563EB` (3px gauche) | `Info` | `#2563EB` |

**Exemples d'usage :**
- Critique : "Runway < 3 mois" ou "Anomalie facture +40%"
- Attention : "Runway entre 3 et 6 mois" ou "Churn en hausse 3 mois consécutifs"
- Info : "Opportunité : renégociation fournisseur détectée"

---

### 9.4 Timeline d'audit

Composant de traçabilité. Visible sur la feature Factures et Clôture mensuelle. Accessible depuis toute card KPI via le Sheet de détail.

**Structure :**
```
AUDIT TRAIL — Facture FM-2026-0892
──────────────────────────────────
● 14:32:01  Upload par [julien@novasaas.fr]
            Arcelor_Mittal_FM2026-0892.pdf — 2.3 Mo

● 14:32:03  [✦ AI] Extraction OCR lancée
            Modèle : claude-3-5-sonnet-20241022

● 14:32:07  [✦ AI] Extraction terminée
            Confiance : 94% — 8 champs extraits

● 14:32:07  [✦ AI] Anomalie détectée
            Montant +40% vs. historique fournisseur

● 14:32:08  Notification envoyée
            CEO + Comptable notifiés par email

● En attente  Validation humaine requise
```

**Spécifications visuelles :**
- Container : fond `#F8FAFC`, border 1px `#E2E8F0`, rounded-lg, padding 16px
- Ligne verticale : 2px solid `#E2E8F0` reliant les points
- Point humain (`●`) : `#3B82F6`, 8px
- Point AI (`●`) : `#7C3AED`, 8px, légère aura glow `box-shadow: 0 0 0 3px #EDE9FE`
- Point en attente : `○` outline, `#D97706`
- Timestamp : `JetBrains Mono`, 11px, `#64748B`
- Action humaine : texte `#1E3A5F`
- Action AI : texte `#7C3AED` + badge `[✦ AI]` inline
- Détail technique : caption italique `#64748B` sous l'action

**Règle d'or :** Chaque action AI dans la timeline affiche obligatoirement le modèle utilisé et l'horodatage précis au second. L'auditabilité n'est pas optionnelle.

---

## Annexe — Checklist design system

### Avant le premier sprint de développement

- [ ] Importer `Inter` et `JetBrains Mono` via `next/font`
- [ ] Configurer les custom properties CSS dans `globals.css` (toutes les couleurs en CSS vars)
- [ ] Créer les tokens Tailwind dans `tailwind.config.ts` pour les couleurs AI
- [ ] Initialiser les composants shadcn/ui : Card, Badge, Alert, Button, Dialog, Sheet, Slider, Progress, Tabs, Select, Table, Accordion, Checkbox, Textarea, Tooltip, HoverCard, Popover, Separator, RadioGroup, Input
- [ ] Créer le composant `AIBadge` (réutilisable, 3 variantes)
- [ ] Créer le composant `KPICard` (réutilisable, 4 états couleur)
- [ ] Créer le composant `FinancialAlert` (3 niveaux de sévérité)
- [ ] Créer le composant `AuditTimeline`
- [ ] Créer le composant `CompanySelector`
- [ ] Mettre en place le layout avec sidebar et le routing Next.js App Router
- [ ] Implémenter le mode présentation (Cmd+Shift+P)
- [ ] Configurer Recharts avec le thème couleurs du design system

### Règles de code à respecter

- Toute valeur chiffrée issue de l'AI porte un attribut `data-source="ai"` dans le DOM (pour l'accessibilité et l'audit)
- Toute valeur chiffrée issue d'un calcul porte `data-source="computed"`
- Toute valeur chiffrée brute (import bancaire, ERP) porte `data-source="raw"`
- Les composants AI acceptent une prop `source?: string` pour afficher la provenance dans le tooltip
- Les animations respectent `prefers-reduced-motion` — toutes les animations peuvent être désactivées

---

*DESIGN.md — AI CFO Lab — v1.0 — 2026-03-24*
