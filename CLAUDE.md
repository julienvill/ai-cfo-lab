# AI CFO Lab — Platform

## Organisation des specs

La documentation produit est eclatee en fichiers separes :

| Fichier | Contenu |
|---|---|
| `PRD.md` | Vision, principes, positionnement, landing page |
| `MODULES.md` | Index de tous les modules et sous-modules avec statut et priorite |
| `ROADMAP.md` | Phasage MVP / V2 / V3, dependances, timeline |
| `ARCHITECTURE.md` | Stack technique, connecteurs, infrastructure |
| `DESIGN.md` | Design system, couleurs, typographie, composants |
| `COMPANIES.md` | Fiches des 3 societes demo |

### Specs par module

Chaque module a son fichier `SPEC.md` dans son repertoire d'app :

| Module | Spec |
|---|---|
| Cash Management | `web/app/app/tresorerie/SPEC.md` |
| Reports (ex-FP&A) | `web/app/app/reports/SPEC.md` |
| Comptabilite | `web/app/app/comptabilite/SPEC.md` |
| RH | `web/app/app/rh/SPEC.md` |
| Impots | `web/app/app/impots/SPEC.md` |
| Juridique | `web/app/app/juridique/SPEC.md` |

### Specs detaillees de sous-modules

Certains sous-modules ont une spec autonome en complement de la spec module :

| Sous-module | Spec |
|---|---|
| CIR (Credit Impot Recherche) | `web/app/app/impots/cir/SPEC.md` |
| Mapping PCG / Groupe | `web/app/app/comptabilite/mapping-groupe/SPEC.md` |

## Inventaire des outils

Apres tout ajout ou suppression de dependance (npm, pip, ou autre), invoquer l'agent **toolkeeper**
au niveau `/Users/julien/Dev/` pour mettre a jour `TOOLS.md`.
Voir `~/Dev/CLAUDE.md` pour les details.
