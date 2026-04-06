#!/usr/bin/env node
/**
 * Generateur FEC 2025 — Propello SAS
 * Produit un FEC 12 mois conforme article A.47 A-1 du LPF
 * 18 champs normes, ecritures equilibrees
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================
// CONFIGURATION
// ============================================================

const MONTHS = [
  { m: '01', days: 31, label: 'Janvier' },
  { m: '02', days: 28, label: 'Fevrier' },
  { m: '03', days: 31, label: 'Mars' },
  { m: '04', days: 30, label: 'Avril' },
  { m: '05', days: 31, label: 'Mai' },
  { m: '06', days: 30, label: 'Juin' },
  { m: '07', days: 31, label: 'Juillet' },
  { m: '08', days: 31, label: 'Aout' },
  { m: '09', days: 30, label: 'Septembre' },
  { m: '10', days: 31, label: 'Octobre' },
  { m: '11', days: 30, label: 'Novembre' },
  { m: '12', days: 31, label: 'Decembre' },
];

// MRR targets from financial-summary.json (2025 actual)
const MRR_TARGETS = {
  '01': 216300, '02': 226200, '03': 237500, '04': 248100,
  '05': 258800, '06': 269000, '07': 278400, '08': 284900,
  '09': 292100, '10': 298400, '11': 302500, '12': 305800,
};

let ecritureNum = 0;
const entries = [];

function nextEcritureNum() {
  ecritureNum++;
  return `ECR-2025-${String(ecritureNum).padStart(5, '0')}`;
}

function r2(n) { return Math.round(n * 100) / 100; }

function addEntry(journal, journalLib, date, compteNum, compteLib, compAuxNum, compAuxLib, pieceRef, pieceDate, ecritureLib, debit, credit, ecrNum) {
  entries.push({
    JournalCode: journal,
    JournalLib: journalLib,
    EcritureNum: ecrNum,
    EcritureDate: date,
    CompteNum: compteNum,
    CompteLib: compteLib,
    CompAuxNum: compAuxNum || '',
    CompAuxLib: compAuxLib || '',
    PieceRef: pieceRef,
    PieceDate: pieceDate || date,
    EcritureLib: ecritureLib,
    Debit: r2(debit),
    Credit: r2(credit),
    EcrtureLet: '',
    DateLet: '',
    ValidDate: date,
    Montantdevise: '',
    Idevise: ''
  });
}

// ============================================================
// ECRITURE D'OUVERTURE (A-NOUVEAUX)
// ============================================================
function generateAN() {
  const balanceData = JSON.parse(readFileSync(join(__dirname, 'balance-ouverture-2024.json'), 'utf8'));
  const date = '20250101';
  const pieceRef = 'AN-2025';

  // Collect all accounts with their net solde, then create balanced entries per class
  const allComptes = [];
  function collectComptes(section) {
    if (!section || !section.comptes) return;
    for (const c of section.comptes) {
      if (c.debit > 0 || c.credit > 0) allComptes.push(c);
    }
  }
  for (const section of Object.values(balanceData.actif)) {
    if (typeof section === 'object' && section.comptes) collectComptes(section);
  }
  for (const section of Object.values(balanceData.passif)) {
    if (typeof section === 'object' && section.comptes) collectComptes(section);
  }

  // Group by class (1-5) and create one balanced ecriture per class
  const classes = {};
  for (const c of allComptes) {
    const cls = c.compte.charAt(0);
    if (!classes[cls]) classes[cls] = [];
    classes[cls].push(c);
  }

  for (const [cls, comptes] of Object.entries(classes)) {
    const ecrNum = nextEcritureNum();
    let totalDebit = 0;
    let totalCredit = 0;
    for (const c of comptes) {
      if (c.debit > 0) {
        addEntry('AN', 'A-Nouveaux', date, c.compte, c.libelle, '', '', pieceRef, date, 'Reprise solde N-1', c.debit, 0, ecrNum);
        totalDebit += c.debit;
      }
      if (c.credit > 0) {
        addEntry('AN', 'A-Nouveaux', date, c.compte, c.libelle, '', '', pieceRef, date, 'Reprise solde N-1', 0, c.credit, ecrNum);
        totalCredit += c.credit;
      }
    }
    // Add balancing entry to 890000 (bilan d'ouverture) to ensure each class entry balances
    const ecart = r2(totalDebit - totalCredit);
    if (Math.abs(ecart) > 0.01) {
      if (ecart > 0) {
        addEntry('AN', 'A-Nouveaux', date, '890000', 'Bilan d\'ouverture (contrepartie)', '', '', pieceRef, date, 'Contrepartie AN classe ' + cls, 0, ecart, ecrNum);
      } else {
        addEntry('AN', 'A-Nouveaux', date, '890000', 'Bilan d\'ouverture (contrepartie)', '', '', pieceRef, date, 'Contrepartie AN classe ' + cls, Math.abs(ecart), 0, ecrNum);
      }
    }
  }

  // Affectation du resultat N-1 au report a nouveau
  const ecrAffect = nextEcritureNum();
  addEntry('OD', 'Operations Diverses', date, '120000', 'Resultat de l\'exercice 2024', '', '', 'AGO-2025', date, 'Affectation resultat 2024 en report a nouveau', 78500, 0, ecrAffect);
  addEntry('OD', 'Operations Diverses', date, '119000', 'Report a nouveau debiteur', '', '', 'AGO-2025', date, 'Affectation resultat 2024 en report a nouveau', 0, 78500, ecrAffect);
}

// ============================================================
// JOURNAL VE — VENTES
// ============================================================

// Named clients with their plans and MRR
const NAMED_CLIENTS = [
  { id: 'CLI-001', name: 'Groupe Altimeo', aux: '411ALT', plan: 'Enterprise', mrr: 999, start: '2022-03', churnMonth: null },
  { id: 'CLI-002', name: 'TechVision', aux: '411TEC', plan: 'Enterprise', mrr: 999, start: '2022-06', churnMonth: null },
  { id: 'CLI-003', name: 'BioNature Labs', aux: '411BIO', plan: 'Enterprise', mrr: 999, start: '2023-01', churnMonth: null },
  { id: 'CLI-004', name: 'NordExpress Logistics', aux: '411NOR', plan: 'Enterprise', mrr: 999, start: '2023-04', churnMonth: null },
  { id: 'CLI-005', name: 'Meridian Finance', aux: '411MER', plan: 'Enterprise', mrr: 999, start: '2023-09', churnMonth: null },
  { id: 'CLI-006', name: 'GreenTech Solutions', aux: '411GRE', plan: 'Enterprise', mrr: 999, start: '2024-01', churnMonth: null },
  { id: 'CLI-007', name: 'Innov\'RH', aux: '411INN', plan: 'Enterprise', mrr: 999, start: '2024-06', churnMonth: null },
  { id: 'CLI-008', name: 'DataPulse', aux: '411DAT', plan: 'Enterprise', mrr: 999, start: '2025-02', churnMonth: null },
  { id: 'CLI-009', name: 'Axiome Consulting', aux: '411AXI', plan: 'Pro', mrr: 499, start: '2022-04', churnMonth: null },
  { id: 'CLI-010', name: 'MediaSphere', aux: '411MED', plan: 'Pro', mrr: 499, start: '2022-09', churnMonth: null },
  { id: 'CLI-011', name: 'Nexus Pharma', aux: '411NEX', plan: 'Pro', mrr: 499, start: '2023-03', churnMonth: null },
  { id: 'CLI-012', name: 'UrbanCraft', aux: '411URB', plan: 'Pro', mrr: 499, start: '2023-07', churnMonth: null },
  { id: 'CLI-013', name: 'Voltaire Education', aux: '411VOL', plan: 'Pro', mrr: 499, start: '2024-02', churnMonth: null },
  { id: 'CLI-014', name: 'Artisan Digital', aux: '411ART', plan: 'Pro', mrr: 499, start: '2024-05', churnMonth: null },
  { id: 'CLI-015', name: 'Pragma Avocats', aux: '411PRA', plan: 'Pro', mrr: 499, start: '2024-09', churnMonth: null },
  { id: 'CLI-016', name: 'CloudFactory', aux: '411CLO', plan: 'Pro', mrr: 499, start: '2025-03', churnMonth: null },
  { id: 'CLI-017', name: 'Finastra Group', aux: '411FIN', plan: 'Enterprise', mrr: 999, start: '2025-05', churnMonth: null },
  { id: 'CLI-018', name: 'EcoMotion', aux: '411ECO', plan: 'Starter', mrr: 199, start: '2023-11', churnMonth: null },
  { id: 'CLI-019', name: 'Atelier Gastronomique', aux: '411ATG', plan: 'Starter', mrr: 199, start: '2024-08', churnMonth: '10' },
  { id: 'CLI-020', name: 'Sparkline Analytics', aux: '411SPA', plan: 'Pro', mrr: 499, start: '2025-07', churnMonth: null },
];

function generateVE() {
  let factNum = 0;

  for (const month of MONTHS) {
    const mrrTarget = MRR_TARGETS[month.m];
    const mi = parseInt(month.m);
    const date = `2025${month.m}05`; // Factures emises le 5 du mois

    // Named client invoices
    for (const client of NAMED_CLIENTS) {
      const startM = client.start.split('-');
      const startYear = parseInt(startM[0]);
      const startMonth = parseInt(startM[1]);

      if (startYear > 2025 || (startYear === 2025 && startMonth > mi)) continue;
      if (client.churnMonth && mi >= parseInt(client.churnMonth)) continue;

      factNum++;
      const facRef = `FA-2025-${String(factNum).padStart(4, '0')}`;
      const ecrNum = nextEcritureNum();
      const ht = client.mrr;
      const tva = r2(ht * 0.20);
      const ttc = r2(ht + tva);

      addEntry('VE', 'Journal des Ventes', date, '411000', 'Clients', client.aux, client.name, facRef, date,
        `${facRef} — ${client.name} — Abo ${client.plan} ${month.label} 2025`, ttc, 0, ecrNum);
      addEntry('VE', 'Journal des Ventes', date, '706100', 'Prestations de services — Abonnements SaaS', '', '', facRef, date,
        `${facRef} — ${client.name} — Abo ${client.plan} ${month.label} 2025`, 0, ht, ecrNum);
      addEntry('VE', 'Journal des Ventes', date, '445710', 'TVA collectee 20%', '', '', facRef, date,
        `${facRef} — ${client.name} — TVA 20%`, 0, tva, ecrNum);
    }

    // Bulk invoice for remaining Starter/Pro clients
    // Calculate how much MRR is needed from bulk to match target
    let namedMRR = 0;
    for (const client of NAMED_CLIENTS) {
      const startM = client.start.split('-');
      const startYear = parseInt(startM[0]);
      const startMonth = parseInt(startM[1]);
      if (startYear > 2025 || (startYear === 2025 && startMonth > mi)) continue;
      if (client.churnMonth && mi >= parseInt(client.churnMonth)) continue;
      namedMRR += client.mrr;
    }

    const bulkMRR = mrrTarget - namedMRR;
    if (bulkMRR > 0) {
      factNum++;
      const facRef = `FA-2025-${String(factNum).padStart(4, '0')}`;
      const ecrNum = nextEcritureNum();
      const ht = bulkMRR;
      const tva = r2(ht * 0.20);
      const ttc = r2(ht + tva);

      addEntry('VE', 'Journal des Ventes', date, '411000', 'Clients', '411DIV', 'Clients divers — portefeuille', facRef, date,
        `${facRef} — Facturation groupee portefeuille clients ${month.label} 2025`, ttc, 0, ecrNum);
      addEntry('VE', 'Journal des Ventes', date, '706100', 'Prestations de services — Abonnements SaaS', '', '', facRef, date,
        `${facRef} — Abonnements SaaS portefeuille ${month.label} 2025`, 0, ht, ecrNum);
      addEntry('VE', 'Journal des Ventes', date, '445710', 'TVA collectee 20%', '', '', facRef, date,
        `${facRef} — TVA collectee 20% portefeuille ${month.label}`, 0, tva, ecrNum);
    }
  }
}

// ============================================================
// JOURNAL AC — ACHATS
// ============================================================

const ACHATS_RECURRENTS = [
  { fournisseur: 'Amazon Web Services', aux: '401AWS', compte: '613500', lib: 'Hebergement cloud AWS', amounts: [3100, 3150, 3200, 3250, 3300, 3350, 3400, 3200, 3500, 3550, 3600, 3650] },
  { fournisseur: 'Stripe', aux: '401STR', compte: '622700', lib: 'Commissions Stripe sur encaissements', amounts: [3800, 3950, 4150, 4350, 4500, 4700, 4850, 4950, 5100, 5200, 5250, 5350] },
  { fournisseur: 'Wework', aux: '401WEW', compte: '613200', lib: 'Location coworking WeWork Paris 12', amounts: [8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500] },
  { fournisseur: 'Slack Technologies', aux: '401SLA', compte: '651100', lib: 'Abonnement Slack Business+', amounts: [390, 390, 390, 420, 420, 420, 420, 420, 420, 420, 420, 420] },
  { fournisseur: 'GitHub', aux: '401GIT', compte: '651100', lib: 'Abonnement GitHub Team', amounts: [330, 330, 330, 350, 350, 350, 350, 350, 350, 350, 350, 350] },
  { fournisseur: 'Notion Labs', aux: '401NOT', compte: '651100', lib: 'Abonnement Notion Team', amounts: [260, 260, 260, 280, 280, 280, 280, 280, 280, 280, 280, 280] },
  { fournisseur: 'Figma', aux: '401FIG', compte: '651100', lib: 'Abonnement Figma Professional', amounts: [180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180] },
  { fournisseur: 'HubSpot', aux: '401HUB', compte: '651100', lib: 'Abonnement HubSpot Marketing+Sales Pro', amounts: [780, 780, 780, 800, 800, 800, 800, 800, 800, 800, 800, 800] },
  { fournisseur: 'Alan', aux: '401ALA', compte: '645400', lib: 'Mutuelle collective Alan', amounts: [2100, 2100, 2100, 2100, 2100, 2200, 2200, 2200, 2200, 2200, 2300, 2300] },
  { fournisseur: 'Google Ireland', aux: '401GOO', compte: '623400', lib: 'Google Ads + Workspace', amounts: [3200, 3400, 3600, 3500, 3300, 3000, 2800, 2500, 3800, 4000, 3500, 3200] },
  { fournisseur: 'LinkedIn Ireland', aux: '401LIN', compte: '623400', lib: 'LinkedIn Ads + Sales Navigator', amounts: [2300, 2500, 2700, 2600, 2400, 2200, 2000, 1800, 2800, 3000, 2600, 2300] },
  { fournisseur: 'Silae', aux: '401SIL', compte: '651100', lib: 'Abonnement logiciel paie Silae', amounts: [340, 340, 340, 350, 350, 350, 350, 350, 350, 350, 350, 350] },
];

const ACHATS_PONCTUELS = [
  // Expert-comptable — trimestriel
  { fournisseur: 'Cabinet Deloitte', aux: '401DEL', compte: '622600', lib: 'Honoraires expert-comptable T1', month: '03', amount: 7500 },
  { fournisseur: 'Cabinet Deloitte', aux: '401DEL', compte: '622600', lib: 'Honoraires expert-comptable T2', month: '06', amount: 7500 },
  { fournisseur: 'Cabinet Deloitte', aux: '401DEL', compte: '622600', lib: 'Honoraires expert-comptable T3', month: '09', amount: 7500 },
  { fournisseur: 'Cabinet Deloitte', aux: '401DEL', compte: '622600', lib: 'Honoraires expert-comptable T4 + cloture', month: '12', amount: 10000 },
  // Avocat — ponctuel
  { fournisseur: 'Cabinet Veil Jourde', aux: '401VEI', compte: '622600', lib: 'Honoraires avocat — revue BSPCE pool', month: '02', amount: 4500 },
  { fournisseur: 'Cabinet Veil Jourde', aux: '401VEI', compte: '622600', lib: 'Honoraires avocat — contrats commerciaux', month: '05', amount: 3000 },
  { fournisseur: 'Cabinet Veil Jourde', aux: '401VEI', compte: '622600', lib: 'Honoraires avocat — droit social', month: '09', amount: 5500 },
  { fournisseur: 'Cabinet Veil Jourde', aux: '401VEI', compte: '622600', lib: 'Honoraires avocat — corporate annuel', month: '11', amount: 5000 },
  // Freelance dev — Q1-Q2 seulement (avant embauche Elodie en janv)
  { fournisseur: 'Dev-Connect', aux: '401DEV', compte: '611100', lib: 'Freelance dev fullstack — mission jan', month: '01', amount: 6000 },
  { fournisseur: 'Dev-Connect', aux: '401DEV', compte: '611100', lib: 'Freelance dev fullstack — mission fev', month: '02', amount: 5400 },
  { fournisseur: 'Dev-Connect', aux: '401DEV', compte: '611100', lib: 'Freelance dev fullstack — mission mars', month: '03', amount: 4800 },
];

let achatNum = 0;

function generateAC() {
  for (let mi = 0; mi < 12; mi++) {
    const month = MONTHS[mi];
    const date = `2025${month.m}15`; // Factures fournisseurs recues mi-mois

    // Recurring purchases
    for (const achat of ACHATS_RECURRENTS) {
      achatNum++;
      const facRef = `FF-2025-${String(achatNum).padStart(4, '0')}`;
      const ecrNum = nextEcritureNum();
      const ht = achat.amounts[mi];

      // For non-EU suppliers (AWS, Stripe, Slack, GitHub, Notion, Figma) — autoliquidation TVA
      const isNonEU = ['401AWS', '401STR', '401SLA', '401GIT', '401NOT', '401FIG'].includes(achat.aux);
      // For EU suppliers (HubSpot, Google, LinkedIn) — autoliquidation TVA intracommunautaire
      const isEU = ['401HUB', '401GOO', '401LIN'].includes(achat.aux);

      if (isNonEU || isEU) {
        // Autoliquidation: charge HT, TVA deductible et TVA due simultanement
        const tva = r2(ht * 0.20);
        addEntry('AC', 'Journal des Achats', date, achat.compte, achat.lib, '', '', facRef, date,
          `${facRef} — ${achat.fournisseur} — ${month.label} 2025`, ht, 0, ecrNum);
        addEntry('AC', 'Journal des Achats', date, '445660', 'TVA deductible sur ABS (autoliquidation)', '', '', facRef, date,
          `TVA autoliquidee — ${achat.fournisseur}`, tva, 0, ecrNum);
        addEntry('AC', 'Journal des Achats', date, '445710', 'TVA collectee (autoliquidation)', '', '', facRef, date,
          `TVA autoliquidee — ${achat.fournisseur}`, 0, tva, ecrNum);
        addEntry('AC', 'Journal des Achats', date, '401000', 'Fournisseurs', achat.aux, achat.fournisseur, facRef, date,
          `${facRef} — ${achat.fournisseur} — ${month.label} 2025`, 0, ht, ecrNum);
      } else {
        // Fournisseur francais — TVA classique 20%
        const tva = r2(ht * 0.20);
        const ttc = r2(ht + tva);
        addEntry('AC', 'Journal des Achats', date, achat.compte, achat.lib, '', '', facRef, date,
          `${facRef} — ${achat.fournisseur} — ${month.label} 2025`, ht, 0, ecrNum);
        addEntry('AC', 'Journal des Achats', date, '445660', 'TVA deductible sur ABS', '', '', facRef, date,
          `TVA deductible — ${achat.fournisseur}`, tva, 0, ecrNum);
        addEntry('AC', 'Journal des Achats', date, '401000', 'Fournisseurs', achat.aux, achat.fournisseur, facRef, date,
          `${facRef} — ${achat.fournisseur} — ${month.label} 2025`, 0, ttc, ecrNum);
      }
    }

    // Ponctual purchases
    for (const achat of ACHATS_PONCTUELS) {
      if (achat.month !== month.m) continue;
      achatNum++;
      const facRef = `FF-2025-${String(achatNum).padStart(4, '0')}`;
      const ecrNum = nextEcritureNum();
      const ht = achat.amount;
      const tva = r2(ht * 0.20);
      const ttc = r2(ht + tva);

      addEntry('AC', 'Journal des Achats', date, achat.compte, achat.lib, '', '', facRef, date,
        `${facRef} — ${achat.fournisseur}`, ht, 0, ecrNum);
      addEntry('AC', 'Journal des Achats', date, '445660', 'TVA deductible sur ABS', '', '', facRef, date,
        `TVA deductible — ${achat.fournisseur}`, tva, 0, ecrNum);
      addEntry('AC', 'Journal des Achats', date, '401000', 'Fournisseurs', achat.aux, achat.fournisseur, facRef, date,
        `${facRef} — ${achat.fournisseur}`, 0, ttc, ecrNum);
    }
  }
}

// ============================================================
// JOURNAL PA — PAIE
// ============================================================

const EMPLOYEES = JSON.parse(readFileSync(join(__dirname, 'employees.json'), 'utf8')).employees;

// Taux cotisations 2025 (simplifies mais realistes)
const TAUX = {
  // Part salariale
  ss_maladie_sal: 0.0000,        // 0% salariale depuis 2018
  ss_vieillesse_plaf_sal: 0.0690, // 6.90%
  ss_vieillesse_deplaf_sal: 0.0040, // 0.40%
  chomage_sal: 0.0000,            // 0% depuis oct 2018
  retraite_t1_sal: 0.0386,        // 3.86% AGIRC-ARRCO T1
  retraite_t2_sal: 0.1081,        // 10.81% AGIRC-ARRCO T2 (cadres)
  csg_deductible: 0.0680,         // 6.80% sur 98.25% du brut
  csg_non_deductible: 0.0240,     // 2.40% sur 98.25% du brut
  crds: 0.0050,                   // 0.50% sur 98.25% du brut
  prevoyance_sal: 0.0050,
  mutuelle_sal: 0.00,             // Part salariale = 40% du forfait (gere hors taux)
  // Part patronale
  ss_maladie_pat: 0.0700,        // 7% (13% - 6% reduction Fillon approx)
  ss_vieillesse_plaf_pat: 0.0855,
  ss_vieillesse_deplaf_pat: 0.0190,
  allocations_fam_pat: 0.0345,    // 3.45% (taux reduit < 3.5 SMIC)
  chomage_pat: 0.0405,
  ags_pat: 0.0015,
  retraite_t1_pat: 0.0629,
  retraite_t2_pat: 0.1629,
  at_mp_pat: 0.0090,             // Taux AT/MP bureau
  fnal_pat: 0.0050,              // FNAL >= 50 salaries... pour Propello <50 = 0.10% plafonné
  formation_pat: 0.0100,
  apprentissage_pat: 0.0068,
  prevoyance_pat: 0.0150,
  transport_pat: 0.0175,         // VT IDF 1.75%
};

const PMSS_2025 = 3925; // Plafond mensuel SS 2025

function generatePA() {
  for (let mi = 0; mi < 12; mi++) {
    const month = MONTHS[mi];
    const date = `2025${month.m}28`; // Ecritures de paie fin de mois
    const mIndex = parseInt(month.m);

    let totalBrut = 0;
    let totalNetAPayer = 0;
    let totalCotSal = 0;
    let totalCotPat = 0;
    let totalPAS = 0;
    let totalURSSAF = 0;
    let totalRetraite = 0;
    let totalPrevMut = 0;
    // Detailed cotisations salariales tracking
    let totalCotSalURSSAF = 0;
    let totalCotSalRetraite = 0;
    let totalCotSalPrevMut = 0;

    // Filter employees active this month
    const activeEmps = EMPLOYEES.filter(emp => {
      const hireDate = new Date(emp.hire_date);
      const hireYear = hireDate.getFullYear();
      const hireMonth = hireDate.getMonth() + 1;
      if (hireYear > 2025 || (hireYear === 2025 && hireMonth > mIndex)) return false;
      if (emp.end_date) {
        const endDate = new Date(emp.end_date);
        if (endDate < new Date(2025, mIndex - 1, 1)) return false;
      }
      return true;
    });

    for (const emp of activeEmps) {
      const brut = emp.base_salary_monthly;
      const isCadre = emp.status === 'cadre';

      // Cotisations salariales
      const baseSS = Math.min(brut, PMSS_2025);
      const baseDeplafonee = brut;
      const baseCSG = brut * 0.9825;

      let cotSal = 0;
      cotSal += baseSS * TAUX.ss_vieillesse_plaf_sal;
      cotSal += baseDeplafonee * TAUX.ss_vieillesse_deplaf_sal;
      cotSal += baseSS * TAUX.retraite_t1_sal;
      if (isCadre && brut > PMSS_2025) {
        cotSal += (brut - PMSS_2025) * TAUX.retraite_t2_sal;
      }
      cotSal += baseDeplafonee * TAUX.prevoyance_sal;
      const csg = baseCSG * (TAUX.csg_deductible + TAUX.csg_non_deductible + TAUX.crds);
      cotSal += csg;

      // Mutuelle part salariale
      const mutSal = emp.benefits.mutuelle.monthly_total * (1 - emp.benefits.mutuelle.employer_pct / 100);
      cotSal += mutSal;

      // Net avant PAS
      const netImposable = brut - cotSal + baseCSG * (TAUX.csg_non_deductible + TAUX.crds);

      // PAS (taux moyen simplifie par tranche)
      let tauxPAS = 0;
      if (netImposable < 1600) tauxPAS = 0;
      else if (netImposable < 2500) tauxPAS = 0.03;
      else if (netImposable < 3500) tauxPAS = 0.07;
      else if (netImposable < 4500) tauxPAS = 0.11;
      else if (netImposable < 6000) tauxPAS = 0.15;
      else tauxPAS = 0.18;

      const pas = r2(netImposable * tauxPAS);
      const netAPayer = r2(brut - cotSal - pas);
      totalPAS += pas;

      // Salarial cotisation split for this employee
      // URSSAF part: SS vieillesse + CSG/CRDS
      const empCotSalURSSAF = r2(
        baseSS * TAUX.ss_vieillesse_plaf_sal +
        baseDeplafonee * TAUX.ss_vieillesse_deplaf_sal +
        csg
      );
      // Retraite part
      const empCotSalRetraite = r2(
        baseSS * TAUX.retraite_t1_sal +
        (isCadre && brut > PMSS_2025 ? (brut - PMSS_2025) * TAUX.retraite_t2_sal : 0)
      );
      // Prevoyance/Mutuelle part
      const empCotSalPrevMut = r2(
        baseDeplafonee * TAUX.prevoyance_sal + mutSal
      );

      totalCotSalURSSAF += empCotSalURSSAF;
      totalCotSalRetraite += empCotSalRetraite;
      totalCotSalPrevMut += empCotSalPrevMut;

      // Cotisations patronales
      let cotPat = 0;
      cotPat += baseDeplafonee * TAUX.ss_maladie_pat;
      cotPat += baseSS * TAUX.ss_vieillesse_plaf_pat;
      cotPat += baseDeplafonee * TAUX.ss_vieillesse_deplaf_pat;
      cotPat += baseDeplafonee * TAUX.allocations_fam_pat;
      cotPat += baseDeplafonee * TAUX.chomage_pat;
      cotPat += baseDeplafonee * TAUX.ags_pat;
      cotPat += baseSS * TAUX.retraite_t1_pat;
      if (isCadre && brut > PMSS_2025) {
        cotPat += (brut - PMSS_2025) * TAUX.retraite_t2_pat;
      }
      cotPat += baseDeplafonee * TAUX.at_mp_pat;
      cotPat += baseDeplafonee * TAUX.fnal_pat;
      cotPat += baseDeplafonee * TAUX.formation_pat;
      cotPat += baseDeplafonee * TAUX.apprentissage_pat;
      cotPat += baseDeplafonee * TAUX.prevoyance_pat;
      cotPat += baseDeplafonee * TAUX.transport_pat;

      // Mutuelle part patronale
      const mutPat = emp.benefits.mutuelle.monthly_total * (emp.benefits.mutuelle.employer_pct / 100);
      cotPat += mutPat;

      totalBrut += brut;
      totalNetAPayer += netAPayer;
      totalCotSal += r2(cotSal);
      totalCotPat += r2(cotPat);

      // Repartition des charges patronales
      // URSSAF: SS + AT/MP + chomage + AGS + alloc fam + FNAL + transport + formation + apprentissage + CSG/CRDS
      const urssaf_part = r2(
        baseDeplafonee * (TAUX.ss_maladie_pat + TAUX.ss_vieillesse_deplaf_pat + TAUX.allocations_fam_pat + TAUX.chomage_pat + TAUX.ags_pat + TAUX.at_mp_pat + TAUX.fnal_pat + TAUX.formation_pat + TAUX.apprentissage_pat + TAUX.transport_pat) +
        baseSS * TAUX.ss_vieillesse_plaf_pat
      );
      const retraite_part = r2(
        baseSS * TAUX.retraite_t1_pat +
        (isCadre && brut > PMSS_2025 ? (brut - PMSS_2025) * TAUX.retraite_t2_pat : 0)
      );
      const prev_mut_part = r2(baseDeplafonee * TAUX.prevoyance_pat + mutPat);

      totalURSSAF += urssaf_part;
      totalRetraite += retraite_part;
      totalPrevMut += prev_mut_part;
    }

    // Arrondir les totaux
    totalBrut = r2(totalBrut);
    totalNetAPayer = r2(totalNetAPayer);
    totalCotSal = r2(totalCotSal);
    totalCotPat = r2(totalCotPat);
    totalPAS = r2(totalPAS);
    totalURSSAF = r2(totalURSSAF);
    totalRetraite = r2(totalRetraite);
    totalPrevMut = r2(totalPrevMut);
    totalCotSalURSSAF = r2(totalCotSalURSSAF);
    totalCotSalRetraite = r2(totalCotSalRetraite);
    totalCotSalPrevMut = r2(totalCotSalPrevMut);

    const ecrNum = nextEcritureNum();
    const pieceRef = `PA-2025-${month.m}`;

    // DEBIT: 641 Remunerations du personnel (salaires bruts)
    addEntry('PA', 'Journal de Paie', date, '641000', 'Remunerations du personnel', '', '', pieceRef, date,
      `Salaires bruts ${month.label} 2025 — ${activeEmps.length} salaries`, totalBrut, 0, ecrNum);

    // DEBIT: 645 Charges de securite sociale (charges patronales)
    addEntry('PA', 'Journal de Paie', date, '645100', 'Cotisations URSSAF patronales', '', '', pieceRef, date,
      `Charges patronales URSSAF ${month.label} 2025`, totalURSSAF, 0, ecrNum);
    addEntry('PA', 'Journal de Paie', date, '645200', 'Cotisations retraite patronales AGIRC-ARRCO', '', '', pieceRef, date,
      `Charges patronales retraite ${month.label} 2025`, totalRetraite, 0, ecrNum);
    addEntry('PA', 'Journal de Paie', date, '645300', 'Cotisations prevoyance et mutuelle patronales', '', '', pieceRef, date,
      `Charges patronales prevoyance/mutuelle ${month.label} 2025`, totalPrevMut, 0, ecrNum);

    // CREDIT: 421 Personnel — remunerations dues (net a payer)
    addEntry('PA', 'Journal de Paie', date, '421000', 'Personnel — remunerations dues', '', '', pieceRef, date,
      `Net a payer ${month.label} 2025`, 0, totalNetAPayer, ecrNum);

    // CREDIT: 442100 PAS (prelevement a la source)
    addEntry('PA', 'Journal de Paie', date, '442100', 'Etat — prelevement a la source', '', '', pieceRef, date,
      `PAS ${month.label} 2025`, 0, totalPAS, ecrNum);

    // CREDIT: 431 URSSAF (cotisations salariales + patronales)
    addEntry('PA', 'Journal de Paie', date, '431000', 'Securite sociale — URSSAF', '', '', pieceRef, date,
      `URSSAF ${month.label} 2025 (sal+pat)`, 0, r2(totalCotSalURSSAF + totalURSSAF), ecrNum);

    // CREDIT: 437100 Retraite complementaire (salariale + patronale)
    addEntry('PA', 'Journal de Paie', date, '437100', 'Retraite complementaire AGIRC-ARRCO', '', '', pieceRef, date,
      `AGIRC-ARRCO ${month.label} 2025 (sal+pat)`, 0, r2(totalCotSalRetraite + totalRetraite), ecrNum);

    // CREDIT: 437300 Mutuelle / Prevoyance (salariale + patronale)
    addEntry('PA', 'Journal de Paie', date, '437300', 'Mutuelle et prevoyance', '', '', pieceRef, date,
      `Mutuelle/Prevoyance ${month.label} 2025 (sal+pat)`, 0, r2(totalCotSalPrevMut + totalPrevMut), ecrNum);
  }
}

// ============================================================
// JOURNAL BQ — BANQUE
// ============================================================
function generateBQ() {
  for (let mi = 0; mi < 12; mi++) {
    const month = MONTHS[mi];
    const mrrTarget = MRR_TARGETS[month.m];
    const mIndex = parseInt(month.m);

    // --- Encaissements clients (autour du 20 du mois) ---
    const encDate = `2025${month.m}20`;
    const ecrEnc = nextEcritureNum();
    const encTTC = r2(mrrTarget * 1.20);

    // For realism, add a small delta for late payments / early payments
    // Some months have outstanding receivables
    const encaisse = mi === 0
      ? r2(encTTC + 62400) // Janvier: on encaisse aussi le solde clients N-1
      : encTTC;

    addEntry('BQ', 'Banque Qonto', encDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-ENC`, encDate,
      `Encaissements clients ${month.label} 2025`, encaisse, 0, ecrEnc);
    addEntry('BQ', 'Banque Qonto', encDate, '411000', 'Clients', '', '', `BQ-${month.m}-ENC`, encDate,
      `Encaissements clients ${month.label} 2025`, 0, encaisse, ecrEnc);

    // --- Paiement salaires (dernier jour ouvre) ---
    // Get net a payer from PA entries for this month
    const paEntries = entries.filter(e =>
      e.JournalCode === 'PA' &&
      e.EcritureDate.startsWith(`2025${month.m}`) &&
      e.CompteNum === '421000'
    );
    const netAPayer = paEntries.reduce((sum, e) => sum + e.Credit, 0);

    if (netAPayer > 0) {
      const salDate = `2025${month.m}${month.days}`;
      const ecrSal = nextEcritureNum();
      addEntry('BQ', 'Banque Qonto', salDate, '421000', 'Personnel — remunerations dues', '', '', `BQ-${month.m}-SAL`, salDate,
        `Virement salaires ${month.label} 2025`, netAPayer, 0, ecrSal);
      addEntry('BQ', 'Banque Qonto', salDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-SAL`, salDate,
        `Virement salaires ${month.label} 2025`, 0, netAPayer, ecrSal);
    }

    // --- Paiement charges sociales (15 du mois suivant = dans le meme mois comptablement, simplifie au 15) ---
    if (mi > 0) {
      const prevMonth = MONTHS[mi - 1];
      const chargesDate = `2025${month.m}15`;

      // URSSAF
      const urssafEntries = entries.filter(e =>
        e.JournalCode === 'PA' &&
        e.EcritureDate.startsWith(`2025${prevMonth.m}`) &&
        e.CompteNum === '431000'
      );
      const urssafDue = urssafEntries.reduce((sum, e) => sum + e.Credit, 0);
      if (urssafDue > 0) {
        const ecrURSSAF = nextEcritureNum();
        addEntry('BQ', 'Banque Qonto', chargesDate, '431000', 'Securite sociale — URSSAF', '', '', `BQ-${month.m}-URSSAF`, chargesDate,
          `Paiement URSSAF ${prevMonth.label} 2025`, urssafDue, 0, ecrURSSAF);
        addEntry('BQ', 'Banque Qonto', chargesDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-URSSAF`, chargesDate,
          `Paiement URSSAF ${prevMonth.label} 2025`, 0, urssafDue, ecrURSSAF);
      }

      // Retraite
      const retEntries = entries.filter(e =>
        e.JournalCode === 'PA' &&
        e.EcritureDate.startsWith(`2025${prevMonth.m}`) &&
        e.CompteNum === '437100'
      );
      const retDue = retEntries.reduce((sum, e) => sum + e.Credit, 0);
      if (retDue > 0) {
        const ecrRet = nextEcritureNum();
        addEntry('BQ', 'Banque Qonto', chargesDate, '437100', 'Retraite complementaire AGIRC-ARRCO', '', '', `BQ-${month.m}-RET`, chargesDate,
          `Paiement AGIRC-ARRCO ${prevMonth.label} 2025`, retDue, 0, ecrRet);
        addEntry('BQ', 'Banque Qonto', chargesDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-RET`, chargesDate,
          `Paiement AGIRC-ARRCO ${prevMonth.label} 2025`, 0, retDue, ecrRet);
      }

      // Prevoyance/Mutuelle
      const prevEntries = entries.filter(e =>
        e.JournalCode === 'PA' &&
        e.EcritureDate.startsWith(`2025${prevMonth.m}`) &&
        e.CompteNum === '437300'
      );
      const prevDue = prevEntries.reduce((sum, e) => sum + e.Credit, 0);
      if (prevDue > 0) {
        const ecrPrev = nextEcritureNum();
        addEntry('BQ', 'Banque Qonto', chargesDate, '437300', 'Mutuelle et prevoyance', '', '', `BQ-${month.m}-PREV`, chargesDate,
          `Paiement mutuelle/prevoyance ${prevMonth.label} 2025`, prevDue, 0, ecrPrev);
        addEntry('BQ', 'Banque Qonto', chargesDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-PREV`, chargesDate,
          `Paiement mutuelle/prevoyance ${prevMonth.label} 2025`, 0, prevDue, ecrPrev);
      }

      // PAS (prelevement a la source) — verse le mois suivant
      const pasEntries = entries.filter(e =>
        e.JournalCode === 'PA' &&
        e.EcritureDate.startsWith(`2025${prevMonth.m}`) &&
        e.CompteNum === '442100'
      );
      const pasDue = pasEntries.reduce((sum, e) => sum + e.Credit, 0);
      if (pasDue > 0) {
        const ecrPAS = nextEcritureNum();
        addEntry('BQ', 'Banque Qonto', chargesDate, '442100', 'Etat — prelevement a la source', '', '', `BQ-${month.m}-PAS`, chargesDate,
          `Paiement PAS ${prevMonth.label} 2025`, pasDue, 0, ecrPAS);
        addEntry('BQ', 'Banque Qonto', chargesDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-PAS`, chargesDate,
          `Paiement PAS ${prevMonth.label} 2025`, 0, pasDue, ecrPAS);
      }
    }

    // --- Paiement fournisseurs (25 du mois) ---
    const frnDate = `2025${month.m}25`;
    const frnEntries = entries.filter(e =>
      e.JournalCode === 'AC' &&
      e.EcritureDate.startsWith(`2025${month.m}`) &&
      e.CompteNum === '401000'
    );
    const frnDue = frnEntries.reduce((sum, e) => sum + e.Credit, 0);
    if (frnDue > 0) {
      const ecrFrn = nextEcritureNum();
      addEntry('BQ', 'Banque Qonto', frnDate, '401000', 'Fournisseurs', '', '', `BQ-${month.m}-FRN`, frnDate,
        `Paiement fournisseurs ${month.label} 2025`, frnDue, 0, ecrFrn);
      addEntry('BQ', 'Banque Qonto', frnDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-FRN`, frnDate,
        `Paiement fournisseurs ${month.label} 2025`, 0, frnDue, ecrFrn);
    }

    // --- TVA (payment on the 20th for previous month) ---
    if (mi > 0) {
      const tvaDate = `2025${month.m}20`;
      // We'll calculate TVA payment in OD journal
    }

    // --- Remboursement pret BPI (mensuel, 5000 EUR) ---
    const bpiDate = `2025${month.m}05`;
    const ecrBPI = nextEcritureNum();
    const bpiCapital = 3333.33; // ~40K/an sur 3 ans restants
    const bpiInteret = 416.67;  // ~5K/an interets
    const bpiTotal = r2(bpiCapital + bpiInteret);

    addEntry('BQ', 'Banque Qonto', bpiDate, '164100', 'Emprunt BPI', '', '', `BQ-${month.m}-BPI`, bpiDate,
      `Remboursement pret BPI — capital ${month.label}`, bpiCapital, 0, ecrBPI);
    addEntry('BQ', 'Banque Qonto', bpiDate, '661100', 'Interets des emprunts', '', '', `BQ-${month.m}-BPI`, bpiDate,
      `Remboursement pret BPI — interets ${month.label}`, bpiInteret, 0, ecrBPI);
    addEntry('BQ', 'Banque Qonto', bpiDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${month.m}-BPI`, bpiDate,
      `Remboursement pret BPI ${month.label}`, 0, bpiTotal, ecrBPI);
  }
}

// ============================================================
// JOURNAL OD — OPERATIONS DIVERSES
// ============================================================
function generateOD() {
  // --- TVA mensuelle ---
  for (let mi = 0; mi < 12; mi++) {
    const month = MONTHS[mi];
    const date = `2025${month.m}${month.days}`;
    const mrrTarget = MRR_TARGETS[month.m];

    // TVA collectee sur ventes (ventes FR 20%)
    const tvaCollecteeVentes = r2(mrrTarget * 0.20);

    // TVA collectee autoliquidation (achats non-EU et EU)
    let tvAutoLiq = 0;
    const acRecurr = ACHATS_RECURRENTS.filter(a =>
      ['401AWS', '401STR', '401SLA', '401GIT', '401NOT', '401FIG', '401HUB', '401GOO', '401LIN'].includes(a.aux)
    );
    for (const a of acRecurr) {
      tvAutoLiq += r2(a.amounts[mi] * 0.20);
    }

    const tvaCollecteeTotale = r2(tvaCollecteeVentes + tvAutoLiq);

    // TVA deductible: autoliquidation (meme montant) + achats FR
    let tvaDeductFR = 0;
    const acFR = ACHATS_RECURRENTS.filter(a =>
      !['401AWS', '401STR', '401SLA', '401GIT', '401NOT', '401FIG', '401HUB', '401GOO', '401LIN'].includes(a.aux)
    );
    for (const a of acFR) {
      tvaDeductFR += r2(a.amounts[mi] * 0.20);
    }
    // Achats ponctuels (tous FR)
    for (const a of ACHATS_PONCTUELS) {
      if (a.month === month.m) {
        tvaDeductFR += r2(a.amount * 0.20);
      }
    }

    const tvaDeductTotale = r2(tvAutoLiq + tvaDeductFR);
    const tvaAPayer = r2(tvaCollecteeTotale - tvaDeductTotale);

    // Ecriture de TVA
    const ecrTVA = nextEcritureNum();
    const pieceRef = `TVA-2025-${month.m}`;

    addEntry('OD', 'Operations Diverses', date, '445710', 'TVA collectee', '', '', pieceRef, date,
      `Liquidation TVA ${month.label} 2025 — solde collectee`, tvaCollecteeTotale, 0, ecrTVA);
    addEntry('OD', 'Operations Diverses', date, '445660', 'TVA deductible sur ABS', '', '', pieceRef, date,
      `Liquidation TVA ${month.label} 2025 — solde deductible`, 0, tvaDeductTotale, ecrTVA);

    if (tvaAPayer > 0) {
      addEntry('OD', 'Operations Diverses', date, '445510', 'TVA a decaisser', '', '', pieceRef, date,
        `TVA a decaisser ${month.label} 2025`, 0, tvaAPayer, ecrTVA);
    } else {
      addEntry('OD', 'Operations Diverses', date, '445670', 'Credit de TVA', '', '', pieceRef, date,
        `Credit de TVA ${month.label} 2025`, Math.abs(tvaAPayer), 0, ecrTVA);
    }

    // Paiement TVA (dans le journal BQ, le mois suivant)
    if (mi < 11 && tvaAPayer > 0) {
      const nextMonth = MONTHS[mi + 1];
      const tvaPayDate = `2025${nextMonth.m}20`;
      const ecrTVAPay = nextEcritureNum();
      addEntry('BQ', 'Banque Qonto', tvaPayDate, '445510', 'TVA a decaisser', '', '', `BQ-${nextMonth.m}-TVA`, tvaPayDate,
        `Paiement TVA ${month.label} 2025`, tvaAPayer, 0, ecrTVAPay);
      addEntry('BQ', 'Banque Qonto', tvaPayDate, '512100', 'Banque Qonto EUR', '', '', `BQ-${nextMonth.m}-TVA`, tvaPayDate,
        `Paiement TVA ${month.label} 2025`, 0, tvaAPayer, ecrTVAPay);
    }
  }

  // --- Dotations aux amortissements (mensuel) ---
  const immoData = JSON.parse(readFileSync(join(__dirname, 'immobilisations.json'), 'utf8'));

  for (let mi = 0; mi < 12; mi++) {
    const month = MONTHS[mi];
    const date = `2025${month.m}${month.days}`;
    const ecrAmort = nextEcritureNum();
    const pieceRef = `AMORT-2025-${month.m}`;

    let totalDotMensuelle = 0;
    const dotByCompte = {};

    for (const immo of immoData.immobilisations) {
      if (immo.dotation_annuelle_2025 === 0) continue;

      // Check if still amortizing this month
      const mensuelle = immo.dotation_mensuelle;
      const cumulAvant = immo.cumul_amortissements_31_12_2024 + mensuelle * mi;
      if (cumulAvant >= immo.valeur_brute) continue;

      const dotMois = Math.min(mensuelle, immo.valeur_brute - cumulAvant);
      totalDotMensuelle += dotMois;

      const cptAmort = immo.compte_amortissement;
      dotByCompte[cptAmort] = (dotByCompte[cptAmort] || 0) + dotMois;
    }

    if (totalDotMensuelle > 0) {
      addEntry('OD', 'Operations Diverses', date, '681120', 'Dotations aux amortissements des immobilisations', '', '', pieceRef, date,
        `Dotation amortissements ${month.label} 2025`, r2(totalDotMensuelle), 0, ecrAmort);

      for (const [cpt, montant] of Object.entries(dotByCompte)) {
        const lib = cpt.startsWith('2803') ? 'Amort. immobilisations incorporelles' :
                    cpt.startsWith('2805') ? 'Amort. logiciels' :
                    cpt.startsWith('2818') ? 'Amort. immobilisations corporelles' : 'Amortissements';
        addEntry('OD', 'Operations Diverses', date, cpt, lib, '', '', pieceRef, date,
          `Dotation amortissements ${month.label} 2025`, 0, r2(montant), ecrAmort);
      }
    }
  }

  // --- Provision conges payes (ajustement annuel en decembre) ---
  {
    const date = '20251231';
    const ecrCP = nextEcritureNum();
    // Provision CP = ~10% de la masse salariale + charges patronales ~45%
    // On ajuste la provision de 68K (N-1) a ~75K (N)
    const ajustementCP = 7000;
    addEntry('OD', 'Operations Diverses', date, '641200', 'Conges payes — dotation provision', '', '', 'PROV-CP-2025', date,
      'Dotation provision conges payes 2025', ajustementCP, 0, ecrCP);
    addEntry('OD', 'Operations Diverses', date, '153000', 'Provisions pour charges — conges payes', '', '', 'PROV-CP-2025', date,
      'Dotation provision conges payes 2025', 0, ajustementCP, ecrCP);
  }

  // --- CIR (Credit d'Impot Recherche) ---
  {
    const date = '20251231';
    const ecrCIR = nextEcritureNum();
    // CIR = 30% des depenses R&D eligibles
    // Depenses R&D 2025 : ~5 devs + CTO a ~50% R&D + R&D activee
    // Estimation: ~280K de depenses R&D eligibles => CIR ~84K
    const cir2025 = 84000;
    addEntry('OD', 'Operations Diverses', date, '448600', 'Etat — CIR a recevoir', '', '', 'CIR-2025', date,
      'Credit d\'impot recherche 2025', cir2025, 0, ecrCIR);
    addEntry('OD', 'Operations Diverses', date, '699500', 'CIR — produit d\'impot', '', '', 'CIR-2025', date,
      'Credit d\'impot recherche 2025', 0, cir2025, ecrCIR);

    // Encaissement CIR N-1 (52K) en juillet
    const ecrCIRN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250715', '512100', 'Banque Qonto EUR', '', '', 'BQ-07-CIR', '20250715',
      'Encaissement CIR 2024', 52000, 0, ecrCIRN1);
    addEntry('BQ', 'Banque Qonto', '20250715', '448600', 'Etat — CIR a recevoir', '', '', 'BQ-07-CIR', '20250715',
      'Encaissement CIR 2024', 0, 52000, ecrCIRN1);
  }

  // --- Charges constatees d'avance (CCA) ---
  {
    // Reprise CCA N-1 (14 500 EUR)
    const ecrRepriseCCA = nextEcritureNum();
    addEntry('OD', 'Operations Diverses', '20250101', '613200', 'Locations immobilieres (WeWork)', '', '', 'CCA-REP-2025', '20250101',
      'Reprise CCA N-1 — loyer WeWork jan 2025', 8500, 0, ecrRepriseCCA);
    addEntry('OD', 'Operations Diverses', '20250101', '651100', 'Abonnements logiciels', '', '', 'CCA-REP-2025', '20250101',
      'Reprise CCA N-1 — abonnements jan 2025', 6000, 0, ecrRepriseCCA);
    addEntry('OD', 'Operations Diverses', '20250101', '486000', 'Charges constatees d\'avance', '', '', 'CCA-REP-2025', '20250101',
      'Reprise CCA N-1', 0, 14500, ecrRepriseCCA);

    // Nouveaux CCA au 31/12/2025
    const ecrNewCCA = nextEcritureNum();
    addEntry('OD', 'Operations Diverses', '20251231', '486000', 'Charges constatees d\'avance', '', '', 'CCA-2025', '20251231',
      'CCA — loyer WeWork jan 2026 + abonnements prepaid', 16200, 0, ecrNewCCA);
    addEntry('OD', 'Operations Diverses', '20251231', '613200', 'Locations immobilieres (WeWork)', '', '', 'CCA-2025', '20251231',
      'CCA — loyer WeWork jan 2026', 0, 8500, ecrNewCCA);
    addEntry('OD', 'Operations Diverses', '20251231', '651100', 'Abonnements logiciels', '', '', 'CCA-2025', '20251231',
      'CCA — abonnements jan 2026 prepaid', 0, 7700, ecrNewCCA);
  }

  // --- Produits constates d'avance (PCA) ---
  {
    // Reprise PCA N-1 (72K abonnements annuels prepaid)
    const ecrReprisePCA = nextEcritureNum();
    addEntry('OD', 'Operations Diverses', '20250101', '467000', 'Produits constates d\'avance', '', '', 'PCA-REP-2025', '20250101',
      'Reprise PCA N-1 — abonnements annuels', 72000, 0, ecrReprisePCA);
    addEntry('OD', 'Operations Diverses', '20250101', '706100', 'Prestations de services — Abonnements SaaS', '', '', 'PCA-REP-2025', '20250101',
      'Reprise PCA N-1 — reconnaissance CA abonnements annuels', 0, 72000, ecrReprisePCA);

    // Nouveaux PCA au 31/12/2025 (quelques clients Enterprise payent annuellement)
    const ecrNewPCA = nextEcritureNum();
    addEntry('OD', 'Operations Diverses', '20251231', '706100', 'Prestations de services — Abonnements SaaS', '', '', 'PCA-2025', '20251231',
      'PCA — abonnements annuels factures d\'avance', 85000, 0, ecrNewPCA);
    addEntry('OD', 'Operations Diverses', '20251231', '467000', 'Produits constates d\'avance', '', '', 'PCA-2025', '20251231',
      'PCA — abonnements annuels non encore livres', 0, 85000, ecrNewPCA);
  }

  // --- R&D activee 2025 (capitalisation) ---
  {
    const date = '20251231';
    const ecrRD = nextEcritureNum();
    // On active 260K de R&D en 2025 (v4.0 + debut v5)
    // Note: la v4.0 (260K) est deja dans le bilan d'ouverture car activee au 31/12/2024
    // En 2025, on active les travaux de la v5.0
    const rdActivee2025 = 280000;
    addEntry('OD', 'Operations Diverses', date, '203100', 'Frais de R&D actives', '', '', 'RD-2025', date,
      'Activation R&D 2025 — Propello v5.0 (NLP + connecteurs SIRH)', rdActivee2025, 0, ecrRD);
    addEntry('OD', 'Operations Diverses', date, '721000', 'Production immobilisee — immobilisations incorporelles', '', '', 'RD-2025', date,
      'Transfert charges — R&D activee 2025', 0, rdActivee2025, ecrRD);
  }

  // --- Paiement charges sociales dec N-1 (en janvier) ---
  {
    // On paie en janvier les charges de dec N-1 (soldes d'ouverture)
    // URSSAF
    const ecrURSSAFN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250115', '431000', 'URSSAF', '', '', 'BQ-01-URSSAF-N1', '20250115',
      'Paiement URSSAF decembre 2024', 86000, 0, ecrURSSAFN1);
    addEntry('BQ', 'Banque Qonto', '20250115', '512100', 'Banque Qonto EUR', '', '', 'BQ-01-URSSAF-N1', '20250115',
      'Paiement URSSAF decembre 2024', 0, 86000, ecrURSSAFN1);

    // Retraite
    const ecrRetN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250115', '437100', 'Retraite complementaire', '', '', 'BQ-01-RET-N1', '20250115',
      'Paiement AGIRC-ARRCO decembre 2024', 28000, 0, ecrRetN1);
    addEntry('BQ', 'Banque Qonto', '20250115', '512100', 'Banque Qonto EUR', '', '', 'BQ-01-RET-N1', '20250115',
      'Paiement AGIRC-ARRCO decembre 2024', 0, 28000, ecrRetN1);

    // Prevoyance/Mutuelle
    const ecrPrevN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250115', '437300', 'Mutuelle et prevoyance', '', '', 'BQ-01-PREV-N1', '20250115',
      'Paiement mutuelle/prevoyance decembre 2024', 4800, 0, ecrPrevN1);
    addEntry('BQ', 'Banque Qonto', '20250115', '512100', 'Banque Qonto EUR', '', '', 'BQ-01-PREV-N1', '20250115',
      'Paiement mutuelle/prevoyance decembre 2024', 0, 4800, ecrPrevN1);

    // Paiement salaires dec N-1
    const ecrSalN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250103', '421000', 'Personnel — remunerations dues', '', '', 'BQ-01-SAL-N1', '20250103',
      'Virement salaires decembre 2024', 142000, 0, ecrSalN1);
    addEntry('BQ', 'Banque Qonto', '20250103', '512100', 'Banque Qonto EUR', '', '', 'BQ-01-SAL-N1', '20250103',
      'Virement salaires decembre 2024', 0, 142000, ecrSalN1);

    // Paiement TVA dec N-1
    const ecrTVAN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250120', '445510', 'TVA a decaisser', '', '', 'BQ-01-TVA-N1', '20250120',
      'Paiement TVA decembre 2024', 28500, 0, ecrTVAN1);
    addEntry('BQ', 'Banque Qonto', '20250120', '512100', 'Banque Qonto EUR', '', '', 'BQ-01-TVA-N1', '20250120',
      'Paiement TVA decembre 2024', 0, 28500, ecrTVAN1);

    // Paiement fournisseurs N-1 (solde 85400 + FNP 12000)
    const ecrFrnN1 = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250110', '401000', 'Fournisseurs', '', '', 'BQ-01-FRN-N1', '20250110',
      'Paiement fournisseurs decembre 2024', 85400, 0, ecrFrnN1);
    addEntry('BQ', 'Banque Qonto', '20250110', '512100', 'Banque Qonto EUR', '', '', 'BQ-01-FRN-N1', '20250110',
      'Paiement fournisseurs decembre 2024', 0, 85400, ecrFrnN1);

    // Reprise FNP
    const ecrFNP = nextEcritureNum();
    addEntry('OD', 'Operations Diverses', '20250101', '408000', 'Fournisseurs — factures non parvenues', '', '', 'FNP-REP-2025', '20250101',
      'Reprise FNP N-1', 12000, 0, ecrFNP);
    addEntry('OD', 'Operations Diverses', '20250101', '611100', 'Sous-traitance / Prestations externes', '', '', 'FNP-REP-2025', '20250101',
      'Reprise FNP N-1', 0, 12000, ecrFNP);

    // Nouveaux FNP au 31/12/2025
    const ecrNewFNP = nextEcritureNum();
    addEntry('OD', 'Operations Diverses', '20251231', '611100', 'Sous-traitance / Prestations externes', '', '', 'FNP-2025', '20251231',
      'FNP — prestations recues non facturees', 15000, 0, ecrNewFNP);
    addEntry('OD', 'Operations Diverses', '20251231', '408000', 'Fournisseurs — factures non parvenues', '', '', 'FNP-2025', '20251231',
      'FNP — prestations recues non facturees', 0, 15000, ecrNewFNP);
  }

  // --- Levee de fonds complementaire (Serie A bridge) en juin 2025 ---
  {
    const ecrLevee = nextEcritureNum();
    addEntry('BQ', 'Banque Qonto', '20250615', '512100', 'Banque Qonto EUR', '', '', 'BQ-06-LEVEE', '20250615',
      'Apport en compte courant d\'associe — bridge Seed Ventures', 1000000, 0, ecrLevee);
    addEntry('BQ', 'Banque Qonto', '20250615', '455000', 'Comptes courants d\'associes', '', '', 'BQ-06-LEVEE', '20250615',
      'Apport CCA Seed Ventures — bridge pre-Serie A', 0, 1000000, ecrLevee);
  }
}

// ============================================================
// MAIN — Generate and write
// ============================================================

console.log('Generating FEC 2025 for Propello SAS...');

generateAN();
console.log(`  A-Nouveaux: ${entries.length} lignes`);

const beforeVE = entries.length;
generateVE();
console.log(`  Journal VE (Ventes): ${entries.length - beforeVE} lignes`);

const beforeAC = entries.length;
generateAC();
console.log(`  Journal AC (Achats): ${entries.length - beforeAC} lignes`);

const beforePA = entries.length;
generatePA();
console.log(`  Journal PA (Paie): ${entries.length - beforePA} lignes`);

const beforeBQ = entries.length;
generateBQ();
console.log(`  Journal BQ (Banque): ${entries.length - beforeBQ} lignes`);

const beforeOD = entries.length;
generateOD();
console.log(`  Journal OD (Operations Diverses): ${entries.length - beforeOD} lignes`);

console.log(`\nTotal: ${entries.length} lignes d'ecritures`);

// Validation: check all entries are balanced
let errors = 0;
const byEcrNum = {};
for (const e of entries) {
  if (!byEcrNum[e.EcritureNum]) byEcrNum[e.EcritureNum] = [];
  byEcrNum[e.EcritureNum].push(e);
}

for (const [num, lines] of Object.entries(byEcrNum)) {
  const totalDebit = lines.reduce((s, l) => s + l.Debit, 0);
  const totalCredit = lines.reduce((s, l) => s + l.Credit, 0);
  if (Math.abs(totalDebit - totalCredit) > 0.02) {
    console.error(`  ERREUR: Ecriture ${num} desequilibree: debit=${totalDebit.toFixed(2)} credit=${totalCredit.toFixed(2)} ecart=${(totalDebit - totalCredit).toFixed(2)}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('\nValidation: Toutes les ecritures sont equilibrees.');
} else {
  console.error(`\nValidation: ${errors} ecritures desequilibrees!`);
}

// Sort by date then by EcritureNum
entries.sort((a, b) => {
  if (a.EcritureDate !== b.EcritureDate) return a.EcritureDate.localeCompare(b.EcritureDate);
  return a.EcritureNum.localeCompare(b.EcritureNum);
});

// Write FEC
const fec = {
  metadata: {
    company: 'Propello SAS',
    siren: '912345678',
    exercice_debut: '2025-01-01',
    exercice_fin: '2025-12-31',
    generated_at: new Date().toISOString(),
    total_entries: entries.length,
    total_ecritures: Object.keys(byEcrNum).length,
    journaux: ['AN', 'VE', 'AC', 'PA', 'BQ', 'OD'],
    format: 'Article A.47 A-1 du LPF — 18 champs normes'
  },
  ecritures: entries
};

writeFileSync(join(__dirname, 'fec-2025.json'), JSON.stringify(fec, null, 2));
console.log('\nFEC ecrit dans fec-2025.json');

// ============================================================
// GENERATE BALANCE DE CLOTURE
// ============================================================
console.log('\nCalcul de la balance de cloture...');

const balances = {};

// Start from opening balance
const balOuv = JSON.parse(readFileSync(join(__dirname, 'balance-ouverture-2024.json'), 'utf8'));
function loadBalanceSection(section) {
  if (!section || !section.comptes) return;
  for (const c of section.comptes) {
    if (!balances[c.compte]) balances[c.compte] = { libelle: c.libelle, debit: 0, credit: 0 };
    balances[c.compte].debit += c.debit;
    balances[c.compte].credit += c.credit;
  }
}
// Don't load opening balance — the AN journal already carries it

// Apply all FEC entries
for (const e of entries) {
  if (!balances[e.CompteNum]) balances[e.CompteNum] = { libelle: e.CompteLib, debit: 0, credit: 0 };
  balances[e.CompteNum].debit += e.Debit;
  balances[e.CompteNum].credit += e.Credit;
}

// Compute soldes
const balanceCloture = {};
let totalActif = 0;
let totalPassif = 0;

for (const [compte, data] of Object.entries(balances)) {
  const solde = r2(data.debit - data.credit);
  balanceCloture[compte] = {
    compte,
    libelle: data.libelle,
    total_debit: r2(data.debit),
    total_credit: r2(data.credit),
    solde_debiteur: solde > 0 ? solde : 0,
    solde_crediteur: solde < 0 ? Math.abs(solde) : 0
  };

  // Classify actif/passif
  const classe = parseInt(compte.charAt(0));
  if (classe >= 1 && classe <= 5) {
    if (solde > 0) totalActif += solde;
    else totalPassif += Math.abs(solde);
  }
}

// Compute resultat
let produits = 0;
let charges = 0;
for (const [compte, data] of Object.entries(balances)) {
  const classe = parseInt(compte.charAt(0));
  const solde = r2(data.debit - data.credit);
  if (classe === 6) charges += solde > 0 ? solde : 0;
  if (classe === 7) produits += solde < 0 ? Math.abs(solde) : 0;
}
const resultat = r2(produits - charges);

const cloture = {
  metadata: {
    company: 'Propello SAS',
    siren: '912345678',
    date: '2025-12-31',
    type: 'balance_cloture',
    description: 'Bilan de cloture au 31/12/2025 — resultat de l\'ouverture + FEC 2025'
  },
  resultat_exercice: {
    produits: r2(produits),
    charges: r2(charges),
    resultat: resultat,
    type: resultat >= 0 ? 'benefice' : 'perte'
  },
  comptes: Object.values(balanceCloture).sort((a, b) => a.compte.localeCompare(b.compte)),
  controle: {
    total_actif_bilan: r2(totalActif),
    total_passif_bilan: r2(totalPassif),
    resultat_a_affecter: resultat,
    note: 'Le resultat de l\'exercice doit etre affecte au passif (compte 120000 ou 129000) pour equilibrer le bilan'
  }
};

writeFileSync(join(__dirname, 'balance-cloture-2025.json'), JSON.stringify(cloture, null, 2));
console.log('Balance de cloture ecrite dans balance-cloture-2025.json');

// ============================================================
// GENERATE TVA CA3
// ============================================================
console.log('\nGeneration des declarations TVA CA3...');

for (let mi = 0; mi < 12; mi++) {
  const month = MONTHS[mi];
  const mrrTarget = MRR_TARGETS[month.m];

  const tvaCollecteeVentes = r2(mrrTarget * 0.20);

  let tvAutoLiq = 0;
  const acRecurr = ACHATS_RECURRENTS.filter(a =>
    ['401AWS', '401STR', '401SLA', '401GIT', '401NOT', '401FIG', '401HUB', '401GOO', '401LIN'].includes(a.aux)
  );
  for (const a of acRecurr) {
    tvAutoLiq += r2(a.amounts[mi] * 0.20);
  }

  let tvaDeductFR = 0;
  const acFR = ACHATS_RECURRENTS.filter(a =>
    !['401AWS', '401STR', '401SLA', '401GIT', '401NOT', '401FIG', '401HUB', '401GOO', '401LIN'].includes(a.aux)
  );
  for (const a of acFR) {
    tvaDeductFR += r2(a.amounts[mi] * 0.20);
  }
  for (const a of ACHATS_PONCTUELS) {
    if (a.month === month.m) tvaDeductFR += r2(a.amount * 0.20);
  }

  const tvaDeductTotale = r2(tvAutoLiq + tvaDeductFR);
  const tvaCollecteeTotale = r2(tvaCollecteeVentes + tvAutoLiq);
  const tvaAPayer = r2(tvaCollecteeTotale - tvaDeductTotale);

  const ca3 = {
    metadata: {
      company: 'Propello SAS',
      siren: '912345678',
      tva_number: 'FR56912345678',
      periode: `2025-${month.m}`,
      type: 'CA3',
      date_depot: mi < 11 ? `2025-${MONTHS[mi + 1].m}-20` : '2026-01-20'
    },
    base_imposable: {
      ventes_france_20pct: mrrTarget,
      acquisitions_intracommunautaires: r2(acRecurr.filter(a => ['401HUB', '401GOO', '401LIN'].includes(a.aux)).reduce((s, a) => s + a.amounts[mi], 0)),
      importations_services: r2(acRecurr.filter(a => ['401AWS', '401STR', '401SLA', '401GIT', '401NOT', '401FIG'].includes(a.aux)).reduce((s, a) => s + a.amounts[mi], 0))
    },
    tva_collectee: {
      ventes_20pct: tvaCollecteeVentes,
      autoliquidation_20pct: r2(tvAutoLiq),
      total: tvaCollecteeTotale
    },
    tva_deductible: {
      biens_et_services_france: tvaDeductFR,
      autoliquidation: r2(tvAutoLiq),
      total: tvaDeductTotale
    },
    solde: {
      tva_a_payer: tvaAPayer > 0 ? tvaAPayer : 0,
      credit_tva: tvaAPayer < 0 ? Math.abs(tvaAPayer) : 0
    }
  };

  writeFileSync(join(__dirname, `tva-ca3/2025-${month.m}.json`), JSON.stringify(ca3, null, 2));
}
console.log('Declarations TVA CA3 ecrites dans tva-ca3/');

// ============================================================
// GENERATE RELEVES BANCAIRES
// ============================================================
console.log('\nGeneration des releves bancaires...');

const bankEntries = entries.filter(e => e.JournalCode === 'BQ' && e.CompteNum === '512100');

// Group by month
for (let mi = 0; mi < 12; mi++) {
  const month = MONTHS[mi];
  const monthEntries = bankEntries.filter(e => e.EcritureDate.startsWith(`2025${month.m}`));

  // Calculate running balance
  let soldeDebut = mi === 0 ? 1354000 : 0; // Will be computed
  if (mi > 0) {
    // Sum all prior months
    const priorEntries = bankEntries.filter(e => e.EcritureDate < `2025${month.m}01`);
    soldeDebut = 1354000;
    for (const e of priorEntries) {
      soldeDebut += e.Debit - e.Credit;
    }
  }

  const mouvements = monthEntries.map(e => ({
    date: e.EcritureDate,
    libelle: e.EcritureLib,
    reference: e.PieceRef,
    debit: e.Credit > 0 ? e.Credit : 0, // Bank statement: sortie = debit
    credit: e.Debit > 0 ? e.Debit : 0,  // Bank statement: entree = credit
    type: e.Debit > 0 ? 'credit' : 'debit'
  }));

  let soldeFin = soldeDebut;
  for (const m of mouvements) {
    soldeFin += m.credit - m.debit;
  }

  // Add a few unreconciled movements for realism (small amounts)
  const unreconciled = [];
  if (mi === 2) { // Mars — commission bancaire
    unreconciled.push({
      date: `2025${month.m}28`,
      libelle: 'Commission tenue de compte Qonto',
      reference: 'QONTO-COM-03',
      debit: 29.00,
      credit: 0,
      type: 'debit',
      reconciled: false
    });
    soldeFin -= 29.00;
  }
  if (mi === 5) { // Juin — frais Wise
    unreconciled.push({
      date: `2025${month.m}15`,
      libelle: 'Frais de change Wise EUR/USD',
      reference: 'WISE-FX-06',
      debit: 45.50,
      credit: 0,
      type: 'debit',
      reconciled: false
    });
    soldeFin -= 45.50;
  }
  if (mi === 8) { // Septembre — remboursement note de frais
    unreconciled.push({
      date: `2025${month.m}22`,
      libelle: 'Remb. note de frais Thomas Renault — SaaStr Paris',
      reference: 'NDF-TR-09',
      debit: 856.00,
      credit: 0,
      type: 'debit',
      reconciled: false
    });
    soldeFin -= 856.00;
  }
  if (mi === 11) { // Decembre — interets crediteurs
    unreconciled.push({
      date: `2025${month.m}31`,
      libelle: 'Interets crediteurs compte remunere Qonto',
      reference: 'QONTO-INT-12',
      debit: 0,
      credit: 125.00,
      type: 'credit',
      reconciled: false
    });
    soldeFin += 125.00;
  }

  const releve = {
    metadata: {
      bank: 'Qonto',
      iban: 'FR7630006000011234567890125',
      bic: 'QNTOFRP1XXX',
      compte: 'Propello SAS — Compte courant principal',
      periode: `2025-${month.m}`,
      devise: 'EUR'
    },
    solde_debut: r2(soldeDebut),
    solde_fin: r2(soldeFin),
    mouvements: [...mouvements.map(m => ({ ...m, reconciled: true })), ...unreconciled].sort((a, b) => a.date.localeCompare(b.date)),
    rapprochement: {
      total_mouvements: mouvements.length + unreconciled.length,
      mouvements_rapproches: mouvements.length,
      mouvements_non_rapproches: unreconciled.length,
      ecart_rapprochement: r2(unreconciled.reduce((s, u) => s + u.credit - u.debit, 0))
    }
  };

  writeFileSync(join(__dirname, `releves-bancaires/2025-${month.m}.json`), JSON.stringify(releve, null, 2));
}
console.log('Releves bancaires ecrits dans releves-bancaires/');

// ============================================================
// GENERATE METRIQUES SaaS (from financial-summary but recomputed)
// ============================================================
console.log('\nGeneration des metriques SaaS...');

const metriques = {
  metadata: {
    company: 'Propello SAS',
    description: 'Metriques SaaS mensuelles 2025 — coherentes avec le FEC et les factures',
    source: 'Calcule a partir du journal des ventes et des donnees financieres'
  },
  monthly: []
};

// Use data from financial-summary.json for 2025
const finSummary = JSON.parse(readFileSync(join(__dirname, 'financial-summary.json'), 'utf8'));
const data2025 = finSummary.data.filter(d => d.period.startsWith('2025') && d.type === 'actual');

for (const d of data2025) {
  const mi = parseInt(d.period.split('-')[1]) - 1;
  const month = MONTHS[mi];

  // Compute some additional metrics
  const grossBurn = d.payroll + 25000; // payroll + opex
  const netBurn = d.net_burn;
  const arpu = r2(d.mrr / d.active_customers);
  const ltvCAC = r2(d.ltv_estimated / d.cac);
  const grr = r2(100 - d.churn_rate_pct);

  metriques.monthly.push({
    period: d.period,
    mrr: d.mrr,
    arr: d.arr,
    new_mrr: d.new_mrr,
    expansion_mrr: d.expansion_mrr,
    contraction_mrr: d.expansion_mrr < 0 ? Math.abs(d.expansion_mrr) : 0,
    churned_mrr: d.churned_mrr,
    net_new_mrr: r2(d.new_mrr + d.expansion_mrr - d.churned_mrr),
    active_customers: d.active_customers,
    logo_churn: Math.round(d.churned_mrr / arpu), // approximate
    nrr_pct: d.nrr_pct,
    grr_pct: grr,
    arpu: arpu,
    cac: d.cac,
    ltv: d.ltv_estimated,
    ltv_cac_ratio: ltvCAC,
    gross_burn: grossBurn,
    net_burn: Math.abs(netBurn),
    cash: d.cash_available,
    runway_months: d.runway_months,
    headcount: d.headcount_fte
  });
}

writeFileSync(join(__dirname, 'metriques-saas.json'), JSON.stringify(metriques, null, 2));
console.log('Metriques SaaS ecrites dans metriques-saas.json');

// ============================================================
// GENERATE TEMPS R&D
// ============================================================
console.log('\nGeneration des feuilles de temps R&D...');

// R&D eligible employees: CTO + 8 devs + data engineer + DevOps
const rdEmployees = EMPLOYEES.filter(e =>
  ['Tech'].includes(e.department) || e.job_title.includes('CTO')
).map(e => ({
  id: e.id,
  name: `${e.first_name} ${e.last_name}`,
  title: e.job_title,
  hire_date: e.hire_date,
  salary: e.base_salary_monthly,
  rd_ratio: e.job_title.includes('CTO') ? 0.50 :
            e.job_title.includes('Lead') ? 0.60 :
            e.job_title.includes('Data') ? 0.70 :
            e.job_title.includes('DevOps') ? 0.40 :
            e.job_title.includes('alternant') ? 0.30 :
            0.55 // Other devs
}));

const tempsRD = {
  metadata: {
    company: 'Propello SAS',
    exercice: '2025',
    description: 'Feuilles de temps R&D pour le CIR — repartition temps eligible/non-eligible par developpeur et par mois',
    projets_rd: [
      { code: 'PRJ-AI', label: 'IA predictive RH (NLP turnover/absenteisme)', eligible_cir: true },
      { code: 'PRJ-CONN', label: 'Connecteurs SIRH universels (API unifiee)', eligible_cir: true },
      { code: 'PRJ-BDESE', label: 'Generation automatique BDESE', eligible_cir: true },
      { code: 'PRJ-MAINT', label: 'Maintenance corrective et evolutive', eligible_cir: false },
      { code: 'PRJ-INFRA', label: 'Infrastructure et DevOps', eligible_cir: false }
    ]
  },
  employees: [],
  monthly_totals: [],
  annual_summary: {
    total_heures_travaillees: 0,
    total_heures_rd: 0,
    total_heures_non_rd: 0,
    ratio_rd_global: 0,
    cout_salarial_rd_eligible: 0,
    charges_patronales_rd: 0,
    assiette_cir: 0,
    cir_estime: 0
  }
};

let totalHeursTrav = 0;
let totalHeursRD = 0;
let totalCoutRD = 0;

for (const emp of rdEmployees) {
  const empData = {
    id: emp.id,
    name: emp.name,
    title: emp.title,
    monthly: []
  };

  let empTotalTrav = 0;
  let empTotalRD = 0;

  for (let mi = 0; mi < 12; mi++) {
    const month = MONTHS[mi];
    const mIndex = parseInt(month.m);

    // Check if employed this month
    const hireDate = new Date(emp.hire_date);
    if (hireDate.getFullYear() > 2025 || (hireDate.getFullYear() === 2025 && hireDate.getMonth() + 1 > mIndex)) {
      continue;
    }

    const joursOuvres = Math.round(month.days * 5 / 7) - (mi === 7 ? 15 : mi === 11 ? 5 : mi === 3 ? 2 : 0); // Vacances
    const heuresTrav = joursOuvres * 7.5; // Forfait jours ~ 7.5h/jour equiv
    const heuresRD = Math.round(heuresTrav * emp.rd_ratio);
    const heuresNonRD = heuresTrav - heuresRD;

    empData.monthly.push({
      period: `2025-${month.m}`,
      jours_ouvres: joursOuvres,
      heures_travaillees: heuresTrav,
      heures_rd: heuresRD,
      heures_non_rd: heuresNonRD,
      ratio_rd: r2(heuresRD / heuresTrav),
      projets: emp.rd_ratio >= 0.50 ? [
        { code: 'PRJ-AI', heures: Math.round(heuresRD * 0.40) },
        { code: 'PRJ-CONN', heures: Math.round(heuresRD * 0.35) },
        { code: 'PRJ-BDESE', heures: Math.round(heuresRD * 0.25) }
      ] : [
        { code: 'PRJ-AI', heures: Math.round(heuresRD * 0.30) },
        { code: 'PRJ-CONN', heures: Math.round(heuresRD * 0.40) },
        { code: 'PRJ-BDESE', heures: Math.round(heuresRD * 0.30) }
      ]
    });

    empTotalTrav += heuresTrav;
    empTotalRD += heuresRD;
  }

  empData.annual_total = {
    heures_travaillees: empTotalTrav,
    heures_rd: empTotalRD,
    ratio_rd: r2(empTotalRD / empTotalTrav),
    cout_salarial_rd: r2(emp.salary * 12 * (empTotalRD / empTotalTrav))
  };

  tempsRD.employees.push(empData);
  totalHeursTrav += empTotalTrav;
  totalHeursRD += empTotalRD;
  totalCoutRD += empData.annual_total.cout_salarial_rd;
}

const chargesPatRD = r2(totalCoutRD * 0.45); // ~45% charges patronales
tempsRD.annual_summary = {
  total_heures_travaillees: totalHeursTrav,
  total_heures_rd: totalHeursRD,
  total_heures_non_rd: totalHeursTrav - totalHeursRD,
  ratio_rd_global: r2(totalHeursRD / totalHeursTrav),
  cout_salarial_rd_eligible: r2(totalCoutRD),
  charges_patronales_rd: chargesPatRD,
  assiette_cir: r2(totalCoutRD + chargesPatRD),
  cir_estime: r2((totalCoutRD + chargesPatRD) * 0.30)
};

writeFileSync(join(__dirname, 'temps-rd.json'), JSON.stringify(tempsRD, null, 2));
console.log('Feuilles de temps R&D ecrites dans temps-rd.json');

// ============================================================
// GENERATE BALANCE AGEE
// ============================================================
console.log('\nGeneration de la balance agee...');

const balanceAgee = {
  metadata: {
    company: 'Propello SAS',
    date: '2025-12-31',
    description: 'Balance agee clients et fournisseurs au 31/12/2025'
  },
  clients: {
    total: 0,
    tranches: {
      '0_30j': 0,
      '31_60j': 0,
      '61_90j': 0,
      'plus_90j': 0
    },
    detail: []
  },
  fournisseurs: {
    total: 0,
    tranches: {
      '0_30j': 0,
      '31_60j': 0,
      '61_90j': 0,
      'plus_90j': 0
    },
    detail: []
  }
};

// Clients: MRR dec = 305 800 TTC = ~367K
// Most clients pay by card (immediate) or wire (30 days)
// At year-end: december invoices mostly outstanding = ~60% of MRR TTC
const decMRR_TTC = r2(305800 * 1.20);
const clientsDue = r2(decMRR_TTC * 0.60); // ~220K

balanceAgee.clients.total = clientsDue;
balanceAgee.clients.tranches['0_30j'] = r2(clientsDue * 0.75);
balanceAgee.clients.tranches['31_60j'] = r2(clientsDue * 0.15);
balanceAgee.clients.tranches['61_90j'] = r2(clientsDue * 0.07);
balanceAgee.clients.tranches['plus_90j'] = r2(clientsDue * 0.03);

// Detail for named clients
for (const client of NAMED_CLIENTS) {
  if (client.churnMonth && parseInt(client.churnMonth) <= 12) continue;
  const startM = client.start.split('-');
  if (parseInt(startM[0]) > 2025 || (parseInt(startM[0]) === 2025 && parseInt(startM[1]) > 12)) continue;

  const ttc = r2(client.mrr * 1.20);
  const isPayer = client.id === 'CLI-004' || client.id === 'CLI-011' || client.id === 'CLI-015' || client.id === 'CLI-017';

  balanceAgee.clients.detail.push({
    client_id: client.id,
    client_name: client.name,
    compte_auxiliaire: client.aux,
    solde: isPayer ? r2(ttc * 2) : ttc, // Retardataires: 2 mois de solde
    tranche: isPayer ? '31_60j' : '0_30j',
    derniere_facture: `2025-12-05`,
    dernier_paiement: isPayer ? '2025-11-20' : '2025-12-20'
  });
}

// Fournisseurs: mostly current (paid monthly)
const frnDue = 42000; // ~1 month of suppliers
balanceAgee.fournisseurs.total = frnDue;
balanceAgee.fournisseurs.tranches['0_30j'] = r2(frnDue * 0.85);
balanceAgee.fournisseurs.tranches['31_60j'] = r2(frnDue * 0.10);
balanceAgee.fournisseurs.tranches['61_90j'] = r2(frnDue * 0.05);
balanceAgee.fournisseurs.tranches['plus_90j'] = 0;

writeFileSync(join(__dirname, 'balance-agee-2025.json'), JSON.stringify(balanceAgee, null, 2));
console.log('Balance agee ecrite dans balance-agee-2025.json');

console.log('\n=== Generation terminee ===');
console.log(`Fichiers generes:`);
console.log(`  - fec-2025.json (${entries.length} lignes)`);
console.log(`  - balance-cloture-2025.json`);
console.log(`  - tva-ca3/ (12 fichiers)`);
console.log(`  - releves-bancaires/ (12 fichiers)`);
console.log(`  - metriques-saas.json`);
console.log(`  - temps-rd.json`);
console.log(`  - balance-agee-2025.json`);
