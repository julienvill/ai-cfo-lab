# COMPANIES.md — AI CFO Lab

## Sociétés fictives de démo

Dernière mise à jour : 2026-04-05

Ce document est la **source unique de vérité** sur les 3 sociétés fictives utilisées pour la démo. Les profils ci-dessous reflètent les datasets réellement générés dans `data/{slug}/company.json` et `data/{slug}/financial-summary.json`.

---

## Les 3 sociétés

| Slug (dossier/ID) | Nom affiché | Secteur | Forme | Effectif | CA / MRR annuel | Couleur démo |
|---|---|---|---|---|---|---|
| `propello` | **Propello** | Startup SaaS B2B (reporting RH) | SAS | ~25 | MRR ~150 K€ (ARR ~1,8 M€) | `#7C3AED` (violet) |
| `mecaform` | **Mécaform** | PME Industrielle (mécanique aéro/auto) | SA | ~80 | CA ~8 M€ | `#1E3A5F` (bleu marine) |
| `maison-nordique` | **Maison Nordique** | E-commerce B2C (mobilier scandinave) | SARL | ~15 | CA ~3 M€ | `#059669` (vert) |

---

## Conventions de nommage

- **Slug** (dossier `data/`, ID en base, URL) : en minuscules, sans accent, avec tiret pour les mots composés → `propello`, `mecaform`, `maison-nordique`
- **Nom affiché** (UI, documentation, démo) : orthographe française complète avec accents → **Propello**, **Mécaform**, **Maison Nordique**
- **Pas de noms alternatifs** : ne pas utiliser "NovaSaaS", "Acier Dupont", "MaisonsClick", "ShopExpress" — ces noms sont obsolètes.

---

## Profils détaillés

### Propello — Startup SaaS B2B

- **Forme juridique** : SAS, capital 50 K€
- **Fondée** : 2021, siège Paris (75012)
- **Effectif** : ~25 salariés (headcount_fte variable selon périodes)
- **Activité** : SaaS B2B d'automatisation de reporting RH pour PME françaises
- **MRR / ARR** : MRR ~150 K€ cible, ARR ~1,8 M€
- **Convention collective** : Syntec (IDCC 1486)
- **Exercice** : 01/01 → 31/12
- **Particularités** : MRR/ARR, CIR, BSPCE, tour de table seed (Seed Ventures Fund I), feuilles de temps R&D, compte Wise USD pour fournisseurs internationaux
- **Enjeu latent démo** : churn croissant silencieux depuis août 2025 (NRR passe sous 100% en nov.)

### Mécaform — PME Industrielle

- **Forme juridique** : SA, capital 500 K€
- **Fondée** : 2003, siège Villefranche-sur-Saône (69400)
- **Effectif** : ~80 salariés
- **Activité** : Fabricant de pièces métalliques de précision pour l'aéronautique et l'automobile
- **CA annuel** : ~8 M€
- **Convention collective** : Métallurgie (IDCC 3248)
- **Exercice** : 01/01 → 31/12
- **Particularités** : sous-traitance aéro/auto, parc machines, BFR long, stocks valorisés CMUP, certifications EN 9100 / IATF 16949, en-cours de production
- **Enjeu latent démo** : client majeur (30% CA) paie en retard croissant depuis sept. 2025 → dégradation DSO
- **Seule société >50 sal.** : démos RH CSE/BDESE (Module 5a, 5b), CSSCT, budget fonctionnement CSE, index égalité F/H, consultations annuelles

### Maison Nordique — E-commerce B2C

- **Forme juridique** : SARL, capital 30 K€
- **Fondée** : 2019, siège Nantes (44000)
- **Effectif** : ~15 salariés
- **Activité** : Vente en ligne de mobilier et décoration d'inspiration scandinave
- **CA annuel** : ~3 M€
- **Convention collective** : Commerce de détail non alimentaire (IDCC 2216)
- **Exercice** : 01/01 → 31/12
- **Particularités** : saisonnalité Q4 très forte (Noël = 35% du CA), import Scandinavie, déclarations douanières, stocks valorisés CMUP, taux de retour par produit/catégorie
- **Enjeu latent démo** : catégorie Luminaires vendue à perte nette (retours 22%) masquée par marge brute apparente 38%

---

## Cohérence avec les datasets JSON

Les dossiers `data/propello/`, `data/mecaform/`, `data/maison-nordique/` contiennent les datasets fictifs correspondants. Voir `docs/data-inventory.md` pour l'inventaire détaillé des données générées.

**Sources authoritatives** :
- `data/{slug}/company.json` → identité, effectif, forme juridique, cap table
- `data/{slug}/financial-summary.json` → MRR/CA, notes narratives (latent issues, saisonnalité)
