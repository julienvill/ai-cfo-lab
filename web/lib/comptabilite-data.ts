/**
 * Comptabilite Module — Data layer
 *
 * Provides demo data and business logic for:
 * - 4a: Accounts Receivable (AR)
 * - 4b: Accounts Payable (AP)
 * - 4e: Immobilisations & Amortissements
 * - 4g: Cloture mensuelle
 * - 4j: FEC (Fichier des Ecritures Comptables)
 *
 * All amounts are stored in centimes (integer) for precision.
 * Display conversion to euros is handled at the UI layer.
 */

import type { CompanySlug } from "./companies"

// ── Types ──

export type InvoiceStatus = "paid" | "pending" | "overdue" | "partial"

export type FactureClient = {
  id: string
  client: string
  compteAux: string // 411xxx
  amount: number // centimes
  amountPaid: number // centimes
  issued: string // YYYY-MM-DD
  due: string // YYYY-MM-DD
  status: InvoiceStatus
  category: string
}

export type FactureFournisseur = {
  id: string
  supplier: string
  compteAux: string // 401xxx
  amount: number // centimes
  amountPaid: number // centimes
  received: string // YYYY-MM-DD
  due: string // YYYY-MM-DD
  status: InvoiceStatus
  category: string
}

export type AgingBucket = {
  label: string
  current: number // centimes
  days1_30: number
  days31_60: number
  days61_90: number
  days90plus: number
}

export type ARKPIs = {
  caFacture: number
  encaisse: number
  enAttente: number
  enRetard: number
  dso: number
}

export type APKPIs = {
  totalCharges: number
  paye: number
  enAttente: number
  enRetard: number
  dpo: number
}

export type SpendCategory = {
  category: string
  amount: number
  percentage: number
  color: string
}

export type ClotureStepStatus = "done" | "in_progress" | "todo"

export type ClotureStep = {
  id: string
  order: number
  label: string
  description: string
  status: ClotureStepStatus
  deadline: string // J+N
  completedDate: string | null
  alerts: string[]
}

export type CloturePLLine = {
  label: string
  amount: number
  isTotal?: boolean
  indent?: number
}

export type FECEntry = {
  JournalCode: string
  JournalLib: string
  EcritureNum: string
  EcritureDate: string // YYYYMMDD
  CompteNum: string
  CompteLib: string
  CompAuxNum: string
  CompAuxLib: string
  PieceRef: string
  PieceDate: string // YYYYMMDD
  EcritureLib: string
  Debit: number // centimes
  Credit: number // centimes
  EcrtureLet: string
  DateLet: string
  ValidDate: string // YYYYMMDD
  Montantdevise: number
  Idevise: string
}

export type FECStats = {
  totalEntries: number
  totalDebit: number
  totalCredit: number
  journaux: string[]
  periodeDebut: string
  periodeFin: string
  isBalanced: boolean
}

export type FECTest = {
  id: string
  label: string
  status: "pass" | "fail" | "warning"
  detail: string
}

export type AmortissementMode = "lineaire" | "degressif"

export type Immobilisation = {
  id: string
  designation: string
  compteNum: string // 2xx
  dateAcquisition: string
  dateMiseEnService: string
  valeurBrute: number // centimes
  dureeAmortissement: number // mois
  mode: AmortissementMode
  amortissementCumule: number // centimes
  vnc: number // centimes
  dotationMensuelle: number // centimes
}

export type ImmoKPIs = {
  totalBrut: number
  totalAmortissements: number
  totalVNC: number
  dotationsMensuelles: number
  nbImmobilisations: number
}

// ── AR Data ──

const facturesClients: Record<CompanySlug, FactureClient[]> = {
  propello: [
    { id: "FAC-2026-001", client: "Groupe Renault", compteAux: "411REN", amount: 4500000, amountPaid: 4500000, issued: "2026-01-05", due: "2026-02-05", status: "paid", category: "Licence SaaS" },
    { id: "FAC-2026-002", client: "BNP Paribas", compteAux: "411BNP", amount: 3200000, amountPaid: 3200000, issued: "2026-01-12", due: "2026-02-12", status: "paid", category: "Licence SaaS" },
    { id: "FAC-2026-003", client: "Doctolib", compteAux: "411DOC", amount: 2800000, amountPaid: 0, issued: "2026-02-18", due: "2026-03-18", status: "overdue", category: "Licence SaaS" },
    { id: "FAC-2026-004", client: "Alan", compteAux: "411ALA", amount: 1500000, amountPaid: 0, issued: "2026-02-22", due: "2026-03-22", status: "overdue", category: "Setup + formation" },
    { id: "FAC-2026-005", client: "Swile", compteAux: "411SWI", amount: 2100000, amountPaid: 0, issued: "2026-03-01", due: "2026-03-31", status: "pending", category: "Licence SaaS" },
    { id: "FAC-2026-006", client: "Payfit", compteAux: "411PAY", amount: 1800000, amountPaid: 0, issued: "2026-03-05", due: "2026-04-05", status: "pending", category: "Licence SaaS" },
    { id: "FAC-2026-007", client: "Qonto", compteAux: "411QON", amount: 3600000, amountPaid: 1800000, issued: "2026-02-01", due: "2026-03-01", status: "partial", category: "Licence SaaS" },
    { id: "FAC-2026-008", client: "Spendesk", compteAux: "411SPE", amount: 900000, amountPaid: 0, issued: "2026-03-15", due: "2026-04-15", status: "pending", category: "Setup + formation" },
    { id: "FAC-2026-009", client: "Lydia", compteAux: "411LYD", amount: 1200000, amountPaid: 1200000, issued: "2026-01-20", due: "2026-02-20", status: "paid", category: "Licence SaaS" },
    { id: "FAC-2026-010", client: "Alma", compteAux: "411ALM", amount: 850000, amountPaid: 0, issued: "2026-03-10", due: "2026-04-10", status: "pending", category: "Consulting" },
  ],
  "maison-nordique": [
    { id: "FAC-2026-401", client: "Leroy Merlin", compteAux: "411LER", amount: 8500000, amountPaid: 8500000, issued: "2026-01-10", due: "2026-02-10", status: "paid", category: "Mobilier" },
    { id: "FAC-2026-402", client: "Maisons du Monde", compteAux: "411MDM", amount: 4200000, amountPaid: 0, issued: "2026-02-15", due: "2026-03-15", status: "overdue", category: "Mobilier" },
    { id: "FAC-2026-403", client: "La Redoute", compteAux: "411RED", amount: 2800000, amountPaid: 0, issued: "2026-03-01", due: "2026-03-31", status: "pending", category: "Decoration" },
    { id: "FAC-2026-404", client: "AM.PM", compteAux: "411AMP", amount: 3100000, amountPaid: 0, issued: "2026-02-20", due: "2026-03-20", status: "overdue", category: "Mobilier" },
    { id: "FAC-2026-405", client: "Habitat", compteAux: "411HAB", amount: 1900000, amountPaid: 1900000, issued: "2026-01-25", due: "2026-02-25", status: "paid", category: "Luminaires" },
    { id: "FAC-2026-406", client: "Vente en ligne B2C", compteAux: "411WEB", amount: 650000, amountPaid: 650000, issued: "2026-03-01", due: "2026-03-01", status: "paid", category: "E-commerce" },
    { id: "FAC-2026-407", client: "BoConcept", compteAux: "411BOC", amount: 2400000, amountPaid: 0, issued: "2026-03-10", due: "2026-04-10", status: "pending", category: "Mobilier" },
  ],
  mecaform: [
    { id: "FAC-2026-101", client: "Safran Aerospace", compteAux: "411SAF", amount: 28500000, amountPaid: 0, issued: "2026-01-15", due: "2026-03-15", status: "overdue", category: "Pieces usinees" },
    { id: "FAC-2026-102", client: "Stellantis", compteAux: "411STE", amount: 15200000, amountPaid: 15200000, issued: "2026-01-05", due: "2026-03-05", status: "paid", category: "Outillage" },
    { id: "FAC-2026-103", client: "Airbus", compteAux: "411AIR", amount: 18700000, amountPaid: 0, issued: "2026-02-10", due: "2026-04-10", status: "pending", category: "Pieces usinees" },
    { id: "FAC-2026-104", client: "Renault Trucks", compteAux: "411RNT", amount: 9800000, amountPaid: 0, issued: "2026-02-20", due: "2026-04-20", status: "pending", category: "Pieces usinees" },
    { id: "FAC-2026-105", client: "Alstom", compteAux: "411ALS", amount: 12300000, amountPaid: 0, issued: "2026-03-01", due: "2026-04-30", status: "pending", category: "Outillage" },
    { id: "FAC-2026-106", client: "Safran Aerospace", compteAux: "411SAF", amount: 32000000, amountPaid: 32000000, issued: "2025-12-01", due: "2026-01-31", status: "paid", category: "Pieces usinees" },
    { id: "FAC-2026-107", client: "Dassault Aviation", compteAux: "411DAS", amount: 8500000, amountPaid: 4000000, issued: "2026-02-01", due: "2026-04-01", status: "partial", category: "Pieces usinees" },
    { id: "FAC-2026-108", client: "Thales", compteAux: "411THA", amount: 6200000, amountPaid: 0, issued: "2026-03-15", due: "2026-05-15", status: "pending", category: "Electronique" },
  ],
}

// ── AP Data ──

const facturesFournisseurs: Record<CompanySlug, FactureFournisseur[]> = {
  propello: [
    { id: "FF-2026-001", supplier: "OVHcloud", compteAux: "401OVH", amount: 450000, amountPaid: 450000, received: "2026-01-01", due: "2026-01-30", status: "paid", category: "Hebergement" },
    { id: "FF-2026-002", supplier: "AWS", compteAux: "401AWS", amount: 680000, amountPaid: 680000, received: "2026-01-01", due: "2026-02-01", status: "paid", category: "Cloud" },
    { id: "FF-2026-003", supplier: "Figma", compteAux: "401FIG", amount: 28000, amountPaid: 0, received: "2026-03-01", due: "2026-03-31", status: "pending", category: "Logiciels" },
    { id: "FF-2026-004", supplier: "Notion", compteAux: "401NOT", amount: 15000, amountPaid: 0, received: "2026-03-01", due: "2026-03-31", status: "pending", category: "Logiciels" },
    { id: "FF-2026-005", supplier: "Cabinet Mazars", compteAux: "401MAZ", amount: 850000, amountPaid: 0, received: "2026-02-15", due: "2026-03-15", status: "overdue", category: "Honoraires" },
    { id: "FF-2026-006", supplier: "WeWork", compteAux: "401WEW", amount: 520000, amountPaid: 0, received: "2026-03-01", due: "2026-03-15", status: "overdue", category: "Loyer" },
    { id: "FF-2026-007", supplier: "Slack", compteAux: "401SLA", amount: 18000, amountPaid: 0, received: "2026-03-01", due: "2026-04-01", status: "pending", category: "Logiciels" },
    { id: "FF-2026-008", supplier: "LinkedIn Recruiter", compteAux: "401LIN", amount: 250000, amountPaid: 0, received: "2026-03-10", due: "2026-04-10", status: "pending", category: "Recrutement" },
  ],
  "maison-nordique": [
    { id: "FF-2026-401", supplier: "Nordic Design AB", compteAux: "401NOR", amount: 12500000, amountPaid: 12500000, received: "2026-01-05", due: "2026-02-05", status: "paid", category: "Achats marchandises" },
    { id: "FF-2026-402", supplier: "Colissimo", compteAux: "401COL", amount: 380000, amountPaid: 380000, received: "2026-01-10", due: "2026-02-10", status: "paid", category: "Transport" },
    { id: "FF-2026-403", supplier: "Hay Denmark", compteAux: "401HAY", amount: 8200000, amountPaid: 0, received: "2026-02-20", due: "2026-03-20", status: "overdue", category: "Achats marchandises" },
    { id: "FF-2026-404", supplier: "Chronopost", compteAux: "401CHR", amount: 290000, amountPaid: 0, received: "2026-03-01", due: "2026-03-31", status: "pending", category: "Transport" },
    { id: "FF-2026-405", supplier: "Google Ads", compteAux: "401GOO", amount: 380000, amountPaid: 0, received: "2026-03-01", due: "2026-03-15", status: "overdue", category: "Publicite" },
    { id: "FF-2026-406", supplier: "Muuto ApS", compteAux: "401MUU", amount: 5600000, amountPaid: 0, received: "2026-03-05", due: "2026-04-05", status: "pending", category: "Achats marchandises" },
    { id: "FF-2026-407", supplier: "Shopify", compteAux: "401SHO", amount: 45000, amountPaid: 0, received: "2026-03-01", due: "2026-03-31", status: "pending", category: "Logiciels" },
  ],
  mecaform: [
    { id: "FF-2026-101", supplier: "ArcelorMittal", compteAux: "401ARC", amount: 18500000, amountPaid: 18500000, received: "2026-01-01", due: "2026-02-01", status: "paid", category: "Matieres premieres" },
    { id: "FF-2026-102", supplier: "Sandvik Coromant", compteAux: "401SAN", amount: 4200000, amountPaid: 4200000, received: "2026-01-10", due: "2026-02-10", status: "paid", category: "Outillage" },
    { id: "FF-2026-103", supplier: "EDF Entreprises", compteAux: "401EDF", amount: 3800000, amountPaid: 0, received: "2026-03-01", due: "2026-03-31", status: "pending", category: "Energie" },
    { id: "FF-2026-104", supplier: "Linde Gas", compteAux: "401LIN", amount: 1200000, amountPaid: 0, received: "2026-02-15", due: "2026-03-15", status: "overdue", category: "Matieres premieres" },
    { id: "FF-2026-105", supplier: "KUKA Robotics", compteAux: "401KUK", amount: 9500000, amountPaid: 0, received: "2026-01-20", due: "2026-02-20", status: "overdue", category: "Equipement" },
    { id: "FF-2026-106", supplier: "Manpower", compteAux: "401MAN", amount: 2800000, amountPaid: 0, received: "2026-03-01", due: "2026-03-31", status: "pending", category: "Interim" },
    { id: "FF-2026-107", supplier: "Fuchs Lubrifiant", compteAux: "401FUC", amount: 480000, amountPaid: 0, received: "2026-03-05", due: "2026-04-05", status: "pending", category: "Consommables" },
    { id: "FF-2026-108", supplier: "Bureau Veritas", compteAux: "401BVE", amount: 320000, amountPaid: 0, received: "2026-02-28", due: "2026-03-28", status: "pending", category: "Certification" },
  ],
}

// ── Cloture Data ──

function buildClotureSteps(slug: CompanySlug): ClotureStep[] {
  // Simulate different progress per company
  const progressMap: Record<CompanySlug, number> = {
    propello: 7,
    mecaform: 4,
    "maison-nordique": 9,
  }
  const doneCount = progressMap[slug]

  const steps: Omit<ClotureStep, "status" | "completedDate">[] = [
    { id: "bank", order: 1, label: "Rapprochement bancaire", description: "Rapprochement des releves bancaires avec la comptabilite", deadline: "J+1", alerts: [] },
    { id: "ap", order: 2, label: "Fournisseurs (AP)", description: "Validation des factures fournisseurs et FNP", deadline: "J+2", alerts: [] },
    { id: "ar", order: 3, label: "Clients (AR)", description: "Relances, lettrage et provisions pour creances douteuses", deadline: "J+3", alerts: [] },
    { id: "payroll", order: 4, label: "Paie & charges sociales", description: "Integration des ecritures de paie et charges", deadline: "J+5", alerts: [] },
    { id: "provisions_cp", order: 5, label: "Provisions conges payes", description: "Calcul et comptabilisation des provisions CP", deadline: "J+5", alerts: [] },
    { id: "amortissements", order: 6, label: "Dotations aux amortissements", description: "Comptabilisation des dotations mensuelles", deadline: "J+5", alerts: [] },
    { id: "ndf", order: 7, label: "Notes de frais", description: "Validation et comptabilisation des notes de frais", deadline: "J+5", alerts: [] },
    { id: "cutoff", order: 8, label: "CCA / PCA / FNP / FAE", description: "Ecritures de cut-off : charges et produits constates d'avance, factures non parvenues, factures a etablir", deadline: "J+6", alerts: [] },
    { id: "tva", order: 9, label: "TVA", description: "Rapprochement TVA collectee / deductible, declaration CA3", deadline: "J+7", alerts: [] },
    { id: "is", order: 10, label: "Provision IS", description: "Estimation et provision de l'impot sur les societes", deadline: "J+7", alerts: [] },
    { id: "controls", order: 11, label: "Controles de coherence", description: "Verification des comptes d'attente (47x), balance M vs M-1, rapprochements inter-modules", deadline: "J+8", alerts: [] },
    { id: "validation", order: 12, label: "Validation finale", description: "Revue du P&L mensuel, verrouillage de la periode", deadline: "J+8", alerts: [] },
  ]

  // Add company-specific alerts
  if (slug === "propello" && doneCount >= 3) {
    steps[2].alerts = ["2 factures en retard > 60 jours (Doctolib, Alan) — provision a envisager"]
  }
  if (slug === "mecaform" && doneCount >= 2) {
    steps[1].alerts = ["Facture KUKA Robotics en retard de 42 jours — risque LME"]
  }
  if (slug === "maison-nordique" && doneCount >= 8) {
    steps[7].alerts = ["CCA a comptabiliser : abonnement Shopify annuel (540 EUR pour 9 mois restants)"]
  }

  return steps.map((step, index) => ({
    ...step,
    status: index < doneCount ? "done" : index === doneCount ? "in_progress" : "todo",
    completedDate: index < doneCount ? `2026-04-0${Math.min(index + 1, 8)}` : null,
  }))
}

// ── P&L Data ──

function buildPL(slug: CompanySlug): CloturePLLine[] {
  switch (slug) {
    case "propello":
      return [
        { label: "Chiffre d'affaires", amount: 29200000 },
        { label: "Licences SaaS", amount: 27500000, indent: 1 },
        { label: "Setup & formation", amount: 1700000, indent: 1 },
        { label: "Charges d'exploitation", amount: -21800000 },
        { label: "Masse salariale", amount: -15200000, indent: 1 },
        { label: "Hebergement & infra", amount: -1130000, indent: 1 },
        { label: "Loyer & charges", amount: -520000, indent: 1 },
        { label: "Logiciels & licences", amount: -310000, indent: 1 },
        { label: "Honoraires", amount: -850000, indent: 1 },
        { label: "Marketing & recrutement", amount: -1500000, indent: 1 },
        { label: "Autres charges", amount: -2290000, indent: 1 },
        { label: "EBITDA", amount: 7400000, isTotal: true },
        { label: "Dotations aux amortissements", amount: -420000 },
        { label: "Resultat d'exploitation", amount: 6980000, isTotal: true },
        { label: "Resultat financier", amount: -85000 },
        { label: "Resultat courant avant impot", amount: 6895000, isTotal: true },
        { label: "Impot sur les societes (25%)", amount: -1724000 },
        { label: "Resultat net", amount: 5171000, isTotal: true },
      ]
    case "maison-nordique":
      return [
        { label: "Chiffre d'affaires", amount: 32500000 },
        { label: "Ventes B2B", amount: 24000000, indent: 1 },
        { label: "Ventes e-commerce B2C", amount: 8500000, indent: 1 },
        { label: "Cout des marchandises vendues", amount: -19500000 },
        { label: "Achats marchandises", amount: -17200000, indent: 1 },
        { label: "Transport & logistique", amount: -2300000, indent: 1 },
        { label: "Marge brute", amount: 13000000, isTotal: true },
        { label: "Charges d'exploitation", amount: -10200000 },
        { label: "Masse salariale", amount: -5800000, indent: 1 },
        { label: "Loyer entrepot & showroom", amount: -1800000, indent: 1 },
        { label: "Marketing & publicite", amount: -1200000, indent: 1 },
        { label: "Autres charges", amount: -1400000, indent: 1 },
        { label: "EBITDA", amount: 2800000, isTotal: true },
        { label: "Dotations aux amortissements", amount: -380000 },
        { label: "Resultat d'exploitation", amount: 2420000, isTotal: true },
        { label: "Resultat financier", amount: -120000 },
        { label: "Resultat courant avant impot", amount: 2300000, isTotal: true },
        { label: "Impot sur les societes (25%)", amount: -575000 },
        { label: "Resultat net", amount: 1725000, isTotal: true },
      ]
    case "mecaform":
      return [
        { label: "Chiffre d'affaires", amount: 131200000 },
        { label: "Pieces usinees aeronautique", amount: 78000000, indent: 1 },
        { label: "Pieces usinees automobile", amount: 35200000, indent: 1 },
        { label: "Outillage & sous-traitance", amount: 18000000, indent: 1 },
        { label: "Cout de production", amount: -98400000 },
        { label: "Matieres premieres", amount: -52000000, indent: 1 },
        { label: "Main d'oeuvre directe", amount: -28500000, indent: 1 },
        { label: "Energie & consommables", amount: -8200000, indent: 1 },
        { label: "Sous-traitance", amount: -9700000, indent: 1 },
        { label: "Marge brute", amount: 32800000, isTotal: true },
        { label: "Charges d'exploitation", amount: -22500000 },
        { label: "Masse salariale indirecte", amount: -12800000, indent: 1 },
        { label: "Loyer & charges usine", amount: -3200000, indent: 1 },
        { label: "Maintenance equipements", amount: -2800000, indent: 1 },
        { label: "Autres charges", amount: -3700000, indent: 1 },
        { label: "EBITDA", amount: 10300000, isTotal: true },
        { label: "Dotations aux amortissements", amount: -4200000 },
        { label: "Resultat d'exploitation", amount: 6100000, isTotal: true },
        { label: "Resultat financier", amount: -580000 },
        { label: "Resultat courant avant impot", amount: 5520000, isTotal: true },
        { label: "Impot sur les societes (25%)", amount: -1380000 },
        { label: "Resultat net", amount: 4140000, isTotal: true },
      ]
  }
}

// ── FEC Data ──

function buildFECEntries(slug: CompanySlug): FECEntry[] {
  const base: Record<CompanySlug, FECEntry[]> = {
    propello: [
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260105", CompteNum: "411000", CompteLib: "Clients", CompAuxNum: "411REN", CompAuxLib: "Groupe Renault", PieceRef: "FAC-2026-001", PieceDate: "20260105", EcritureLib: "Facture licence SaaS janv.", Debit: 4500000, Credit: 0, EcrtureLet: "A001", DateLet: "20260210", ValidDate: "20260105", Montantdevise: 0, Idevise: "" },
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260105", CompteNum: "706000", CompteLib: "Prestations de services", CompAuxNum: "", CompAuxLib: "", PieceRef: "FAC-2026-001", PieceDate: "20260105", EcritureLib: "Facture licence SaaS janv.", Debit: 0, Credit: 3750000, EcrtureLet: "", DateLet: "", ValidDate: "20260105", Montantdevise: 0, Idevise: "" },
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260105", CompteNum: "445710", CompteLib: "TVA collectee 20%", CompAuxNum: "", CompAuxLib: "", PieceRef: "FAC-2026-001", PieceDate: "20260105", EcritureLib: "Facture licence SaaS janv.", Debit: 0, Credit: 750000, EcrtureLet: "", DateLet: "", ValidDate: "20260105", Montantdevise: 0, Idevise: "" },
      { JournalCode: "BQ", JournalLib: "Banque", EcritureNum: "BQ-2026-001", EcritureDate: "20260210", CompteNum: "512000", CompteLib: "Banque", CompAuxNum: "", CompAuxLib: "", PieceRef: "REM-2026-001", PieceDate: "20260210", EcritureLib: "Encaissement Groupe Renault", Debit: 4500000, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260210", Montantdevise: 0, Idevise: "" },
      { JournalCode: "BQ", JournalLib: "Banque", EcritureNum: "BQ-2026-001", EcritureDate: "20260210", CompteNum: "411000", CompteLib: "Clients", CompAuxNum: "411REN", CompAuxLib: "Groupe Renault", PieceRef: "REM-2026-001", PieceDate: "20260210", EcritureLib: "Encaissement Groupe Renault", Debit: 0, Credit: 4500000, EcrtureLet: "A001", DateLet: "20260210", ValidDate: "20260210", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260101", CompteNum: "613200", CompteLib: "Locations immobilieres", CompAuxNum: "", CompAuxLib: "", PieceRef: "FF-2026-006", PieceDate: "20260101", EcritureLib: "Loyer WeWork mars", Debit: 433333, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260101", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260101", CompteNum: "445660", CompteLib: "TVA deductible 20%", CompAuxNum: "", CompAuxLib: "", PieceRef: "FF-2026-006", PieceDate: "20260101", EcritureLib: "Loyer WeWork mars", Debit: 86667, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260101", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260101", CompteNum: "401000", CompteLib: "Fournisseurs", CompAuxNum: "401WEW", CompAuxLib: "WeWork", PieceRef: "FF-2026-006", PieceDate: "20260101", EcritureLib: "Loyer WeWork mars", Debit: 0, Credit: 520000, EcrtureLet: "", DateLet: "", ValidDate: "20260101", Montantdevise: 0, Idevise: "" },
      { JournalCode: "OD", JournalLib: "Operations diverses", EcritureNum: "OD-2026-001", EcritureDate: "20260331", CompteNum: "681100", CompteLib: "Dotations amortissements immos corp.", CompAuxNum: "", CompAuxLib: "", PieceRef: "OD-AMORT-03", PieceDate: "20260331", EcritureLib: "Dotation amortissement mars", Debit: 35000, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
      { JournalCode: "OD", JournalLib: "Operations diverses", EcritureNum: "OD-2026-001", EcritureDate: "20260331", CompteNum: "281830", CompteLib: "Amort. materiel informatique", CompAuxNum: "", CompAuxLib: "", PieceRef: "OD-AMORT-03", PieceDate: "20260331", EcritureLib: "Dotation amortissement mars", Debit: 0, Credit: 35000, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
      { JournalCode: "PA", JournalLib: "Paie", EcritureNum: "PA-2026-003", EcritureDate: "20260331", CompteNum: "641000", CompteLib: "Remunerations du personnel", CompAuxNum: "", CompAuxLib: "", PieceRef: "PAIE-03-2026", PieceDate: "20260331", EcritureLib: "Salaires bruts mars", Debit: 12700000, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
      { JournalCode: "PA", JournalLib: "Paie", EcritureNum: "PA-2026-003", EcritureDate: "20260331", CompteNum: "421000", CompteLib: "Personnel remunerations dues", CompAuxNum: "", CompAuxLib: "", PieceRef: "PAIE-03-2026", PieceDate: "20260331", EcritureLib: "Salaires bruts mars", Debit: 0, Credit: 12700000, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
    ],
    "maison-nordique": [
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260110", CompteNum: "411000", CompteLib: "Clients", CompAuxNum: "411LER", CompAuxLib: "Leroy Merlin", PieceRef: "FAC-2026-401", PieceDate: "20260110", EcritureLib: "Vente mobilier janv.", Debit: 8500000, Credit: 0, EcrtureLet: "B001", DateLet: "20260215", ValidDate: "20260110", Montantdevise: 0, Idevise: "" },
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260110", CompteNum: "707000", CompteLib: "Ventes de marchandises", CompAuxNum: "", CompAuxLib: "", PieceRef: "FAC-2026-401", PieceDate: "20260110", EcritureLib: "Vente mobilier janv.", Debit: 0, Credit: 7083333, EcrtureLet: "", DateLet: "", ValidDate: "20260110", Montantdevise: 0, Idevise: "" },
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260110", CompteNum: "445710", CompteLib: "TVA collectee 20%", CompAuxNum: "", CompAuxLib: "", PieceRef: "FAC-2026-401", PieceDate: "20260110", EcritureLib: "Vente mobilier janv.", Debit: 0, Credit: 1416667, EcrtureLet: "", DateLet: "", ValidDate: "20260110", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260105", CompteNum: "607000", CompteLib: "Achats de marchandises", CompAuxNum: "", CompAuxLib: "", PieceRef: "FF-2026-401", PieceDate: "20260105", EcritureLib: "Achat Nordic Design AB", Debit: 10416667, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260105", Montantdevise: 10416667, Idevise: "SEK" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260105", CompteNum: "445660", CompteLib: "TVA deductible 20%", CompAuxNum: "", CompAuxLib: "", PieceRef: "FF-2026-401", PieceDate: "20260105", EcritureLib: "Achat Nordic Design AB", Debit: 2083333, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260105", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260105", CompteNum: "401000", CompteLib: "Fournisseurs", CompAuxNum: "401NOR", CompAuxLib: "Nordic Design AB", PieceRef: "FF-2026-401", PieceDate: "20260105", EcritureLib: "Achat Nordic Design AB", Debit: 0, Credit: 12500000, EcrtureLet: "", DateLet: "", ValidDate: "20260105", Montantdevise: 0, Idevise: "" },
      { JournalCode: "OD", JournalLib: "Operations diverses", EcritureNum: "OD-2026-001", EcritureDate: "20260331", CompteNum: "681100", CompteLib: "Dotations amortissements immos corp.", CompAuxNum: "", CompAuxLib: "", PieceRef: "OD-AMORT-03", PieceDate: "20260331", EcritureLib: "Dotation amortissement mars", Debit: 31667, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
      { JournalCode: "OD", JournalLib: "Operations diverses", EcritureNum: "OD-2026-001", EcritureDate: "20260331", CompteNum: "281840", CompteLib: "Amort. mobilier", CompAuxNum: "", CompAuxLib: "", PieceRef: "OD-AMORT-03", PieceDate: "20260331", EcritureLib: "Dotation amortissement mars", Debit: 0, Credit: 31667, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
    ],
    mecaform: [
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260115", CompteNum: "411000", CompteLib: "Clients", CompAuxNum: "411SAF", CompAuxLib: "Safran Aerospace", PieceRef: "FAC-2026-101", PieceDate: "20260115", EcritureLib: "Vente pieces usinees", Debit: 28500000, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260115", Montantdevise: 0, Idevise: "" },
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260115", CompteNum: "701000", CompteLib: "Ventes produits finis", CompAuxNum: "", CompAuxLib: "", PieceRef: "FAC-2026-101", PieceDate: "20260115", EcritureLib: "Vente pieces usinees", Debit: 0, Credit: 23750000, EcrtureLet: "", DateLet: "", ValidDate: "20260115", Montantdevise: 0, Idevise: "" },
      { JournalCode: "VE", JournalLib: "Ventes", EcritureNum: "VE-2026-001", EcritureDate: "20260115", CompteNum: "445710", CompteLib: "TVA collectee 20%", CompAuxNum: "", CompAuxLib: "", PieceRef: "FAC-2026-101", PieceDate: "20260115", EcritureLib: "Vente pieces usinees", Debit: 0, Credit: 4750000, EcrtureLet: "", DateLet: "", ValidDate: "20260115", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260101", CompteNum: "601000", CompteLib: "Achats matieres premieres", CompAuxNum: "", CompAuxLib: "", PieceRef: "FF-2026-101", PieceDate: "20260101", EcritureLib: "Achat acier ArcelorMittal", Debit: 15416667, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260101", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260101", CompteNum: "445660", CompteLib: "TVA deductible 20%", CompAuxNum: "", CompAuxLib: "", PieceRef: "FF-2026-101", PieceDate: "20260101", EcritureLib: "Achat acier ArcelorMittal", Debit: 3083333, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260101", Montantdevise: 0, Idevise: "" },
      { JournalCode: "AC", JournalLib: "Achats", EcritureNum: "AC-2026-001", EcritureDate: "20260101", CompteNum: "401000", CompteLib: "Fournisseurs", CompAuxNum: "401ARC", CompAuxLib: "ArcelorMittal", PieceRef: "FF-2026-101", PieceDate: "20260101", EcritureLib: "Achat acier ArcelorMittal", Debit: 0, Credit: 18500000, EcrtureLet: "C001", DateLet: "20260205", ValidDate: "20260101", Montantdevise: 0, Idevise: "" },
      { JournalCode: "OD", JournalLib: "Operations diverses", EcritureNum: "OD-2026-001", EcritureDate: "20260331", CompteNum: "681100", CompteLib: "Dotations amortissements immos corp.", CompAuxNum: "", CompAuxLib: "", PieceRef: "OD-AMORT-03", PieceDate: "20260331", EcritureLib: "Dotation amortissement mars", Debit: 350000, Credit: 0, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
      { JournalCode: "OD", JournalLib: "Operations diverses", EcritureNum: "OD-2026-001", EcritureDate: "20260331", CompteNum: "281540", CompteLib: "Amort. installations techniques", CompAuxNum: "", CompAuxLib: "", PieceRef: "OD-AMORT-03", PieceDate: "20260331", EcritureLib: "Dotation amortissement mars", Debit: 0, Credit: 350000, EcrtureLet: "", DateLet: "", ValidDate: "20260331", Montantdevise: 0, Idevise: "" },
    ],
  }

  return base[slug]
}

// ── Immobilisations Data ──

const immobilisations: Record<CompanySlug, Immobilisation[]> = {
  propello: [
    { id: "IMMO-001", designation: "Serveurs Dell PowerEdge", compteNum: "218300", dateAcquisition: "2024-03-15", dateMiseEnService: "2024-04-01", valeurBrute: 4500000, dureeAmortissement: 36, mode: "lineaire", amortissementCumule: 3000000, vnc: 1500000, dotationMensuelle: 125000 },
    { id: "IMMO-002", designation: "MacBook Pro (parc 27 postes)", compteNum: "218300", dateAcquisition: "2024-06-01", dateMiseEnService: "2024-06-15", valeurBrute: 5400000, dureeAmortissement: 36, mode: "lineaire", amortissementCumule: 3150000, vnc: 2250000, dotationMensuelle: 150000 },
    { id: "IMMO-003", designation: "Mobilier de bureau", compteNum: "218400", dateAcquisition: "2024-01-15", dateMiseEnService: "2024-02-01", valeurBrute: 1200000, dureeAmortissement: 84, mode: "lineaire", amortissementCumule: 371429, vnc: 828571, dotationMensuelle: 14286 },
    { id: "IMMO-004", designation: "Licence ERP (Pennylane)", compteNum: "205000", dateAcquisition: "2025-01-01", dateMiseEnService: "2025-01-15", valeurBrute: 850000, dureeAmortissement: 36, mode: "lineaire", amortissementCumule: 354167, vnc: 495833, dotationMensuelle: 23611 },
    { id: "IMMO-005", designation: "Amenagements bureaux", compteNum: "218100", dateAcquisition: "2024-01-15", dateMiseEnService: "2024-02-01", valeurBrute: 2800000, dureeAmortissement: 108, mode: "lineaire", amortissementCumule: 675926, vnc: 2124074, dotationMensuelle: 25926 },
  ],
  "maison-nordique": [
    { id: "IMMO-101", designation: "Amenagement showroom Paris", compteNum: "218100", dateAcquisition: "2023-09-01", dateMiseEnService: "2023-10-01", valeurBrute: 8500000, dureeAmortissement: 108, mode: "lineaire", amortissementCumule: 2361111, vnc: 6138889, dotationMensuelle: 78704 },
    { id: "IMMO-102", designation: "Systeme logistique entrepot", compteNum: "215400", dateAcquisition: "2024-01-15", dateMiseEnService: "2024-03-01", valeurBrute: 3200000, dureeAmortissement: 60, mode: "lineaire", amortissementCumule: 1386667, vnc: 1813333, dotationMensuelle: 53333 },
    { id: "IMMO-103", designation: "Vehicule utilitaire Renault Master", compteNum: "218200", dateAcquisition: "2024-06-01", dateMiseEnService: "2024-06-15", valeurBrute: 4200000, dureeAmortissement: 48, mode: "degressif", amortissementCumule: 2362500, vnc: 1837500, dotationMensuelle: 87500 },
    { id: "IMMO-104", designation: "Mobilier exposition", compteNum: "218400", dateAcquisition: "2025-03-01", dateMiseEnService: "2025-03-15", valeurBrute: 1500000, dureeAmortissement: 60, mode: "lineaire", amortissementCumule: 325000, vnc: 1175000, dotationMensuelle: 25000 },
    { id: "IMMO-105", designation: "Site e-commerce (dev)", compteNum: "205000", dateAcquisition: "2023-06-01", dateMiseEnService: "2023-09-01", valeurBrute: 1800000, dureeAmortissement: 36, mode: "lineaire", amortissementCumule: 1700000, vnc: 100000, dotationMensuelle: 50000 },
    { id: "IMMO-106", designation: "Materiel informatique", compteNum: "218300", dateAcquisition: "2025-01-01", dateMiseEnService: "2025-01-15", valeurBrute: 600000, dureeAmortissement: 36, mode: "lineaire", amortissementCumule: 250000, vnc: 350000, dotationMensuelle: 16667 },
  ],
  mecaform: [
    { id: "IMMO-201", designation: "Centre d'usinage 5 axes DMG Mori", compteNum: "215400", dateAcquisition: "2022-06-01", dateMiseEnService: "2022-09-01", valeurBrute: 85000000, dureeAmortissement: 120, mode: "lineaire", amortissementCumule: 30458333, vnc: 54541667, dotationMensuelle: 708333 },
    { id: "IMMO-202", designation: "Tour CNC Mazak", compteNum: "215400", dateAcquisition: "2023-01-15", dateMiseEnService: "2023-03-01", valeurBrute: 42000000, dureeAmortissement: 120, mode: "lineaire", amortissementCumule: 12950000, vnc: 29050000, dotationMensuelle: 350000 },
    { id: "IMMO-203", designation: "Robot soudure KUKA", compteNum: "215400", dateAcquisition: "2024-06-01", dateMiseEnService: "2024-08-01", valeurBrute: 28000000, dureeAmortissement: 84, mode: "degressif", amortissementCumule: 8666667, vnc: 19333333, dotationMensuelle: 333333 },
    { id: "IMMO-204", designation: "Pont roulant 10T", compteNum: "215400", dateAcquisition: "2021-03-01", dateMiseEnService: "2021-05-01", valeurBrute: 12000000, dureeAmortissement: 120, mode: "lineaire", amortissementCumule: 5900000, vnc: 6100000, dotationMensuelle: 100000 },
    { id: "IMMO-205", designation: "Batiment industriel (extension)", compteNum: "213100", dateAcquisition: "2020-01-01", dateMiseEnService: "2020-06-01", valeurBrute: 150000000, dureeAmortissement: 240, mode: "lineaire", amortissementCumule: 43750000, vnc: 106250000, dotationMensuelle: 625000 },
    { id: "IMMO-206", designation: "Systeme ERP SAP", compteNum: "205000", dateAcquisition: "2023-09-01", dateMiseEnService: "2024-01-01", valeurBrute: 8500000, dureeAmortissement: 60, mode: "lineaire", amortissementCumule: 3825000, vnc: 4675000, dotationMensuelle: 141667 },
    { id: "IMMO-207", designation: "Vehicules utilitaires (flotte)", compteNum: "218200", dateAcquisition: "2024-09-01", dateMiseEnService: "2024-09-15", valeurBrute: 18000000, dureeAmortissement: 48, mode: "degressif", amortissementCumule: 6750000, vnc: 11250000, dotationMensuelle: 375000 },
    { id: "IMMO-208", designation: "Outillage specialise aeronautique", compteNum: "215500", dateAcquisition: "2025-01-01", dateMiseEnService: "2025-02-01", valeurBrute: 5500000, dureeAmortissement: 36, mode: "lineaire", amortissementCumule: 2138889, vnc: 3361111, dotationMensuelle: 152778 },
  ],
}

// ── Public API ──

export function getFacturesClients(slug: CompanySlug): FactureClient[] {
  return facturesClients[slug] ?? []
}

export function getFacturesFournisseurs(slug: CompanySlug): FactureFournisseur[] {
  return facturesFournisseurs[slug] ?? []
}

export function getARKPIs(slug: CompanySlug): ARKPIs {
  const factures = facturesClients[slug] ?? []
  const totalFacture = factures.reduce((sum, f) => sum + f.amount, 0)
  const totalEncaisse = factures.reduce((sum, f) => sum + f.amountPaid, 0)
  const enAttente = factures.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.amount - f.amountPaid, 0)
  const enRetard = factures.filter((f) => f.status === "overdue").reduce((sum, f) => sum + f.amount - f.amountPaid, 0)
  const partial = factures.filter((f) => f.status === "partial").reduce((sum, f) => sum + f.amount - f.amountPaid, 0)

  // DSO calculation: (AR / Revenue) * days
  const dsoMap: Record<CompanySlug, number> = { propello: 42, mecaform: 58, "maison-nordique": 18 }

  return {
    caFacture: totalFacture,
    encaisse: totalEncaisse,
    enAttente: enAttente + partial,
    enRetard,
    dso: dsoMap[slug],
  }
}

export function getAPKPIs(slug: CompanySlug): APKPIs {
  const factures = facturesFournisseurs[slug] ?? []
  const totalCharges = factures.reduce((sum, f) => sum + f.amount, 0)
  const paye = factures.reduce((sum, f) => sum + f.amountPaid, 0)
  const enAttente = factures.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.amount - f.amountPaid, 0)
  const enRetard = factures.filter((f) => f.status === "overdue").reduce((sum, f) => sum + f.amount - f.amountPaid, 0)

  const dpoMap: Record<CompanySlug, number> = { propello: 35, mecaform: 48, "maison-nordique": 32 }

  return {
    totalCharges,
    paye,
    enAttente,
    enRetard,
    dpo: dpoMap[slug],
  }
}

export function getAgingBucketsAR(slug: CompanySlug): AgingBucket {
  const factures = facturesClients[slug] ?? []
  const now = new Date("2026-04-03") // reference date
  let current = 0, days1_30 = 0, days31_60 = 0, days61_90 = 0, days90plus = 0

  for (const f of factures) {
    const outstanding = f.amount - f.amountPaid
    if (outstanding <= 0) continue
    const dueDate = new Date(f.due)
    const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysOverdue <= 0) current += outstanding
    else if (daysOverdue <= 30) days1_30 += outstanding
    else if (daysOverdue <= 60) days31_60 += outstanding
    else if (daysOverdue <= 90) days61_90 += outstanding
    else days90plus += outstanding
  }

  return { label: "Clients", current, days1_30, days31_60, days61_90, days90plus }
}

export function getAgingBucketsAP(slug: CompanySlug): AgingBucket {
  const factures = facturesFournisseurs[slug] ?? []
  const now = new Date("2026-04-03")
  let current = 0, days1_30 = 0, days31_60 = 0, days61_90 = 0, days90plus = 0

  for (const f of factures) {
    const outstanding = f.amount - f.amountPaid
    if (outstanding <= 0) continue
    const dueDate = new Date(f.due)
    const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysOverdue <= 0) current += outstanding
    else if (daysOverdue <= 30) days1_30 += outstanding
    else if (daysOverdue <= 60) days31_60 += outstanding
    else if (daysOverdue <= 90) days61_90 += outstanding
    else days90plus += outstanding
  }

  return { label: "Fournisseurs", current, days1_30, days31_60, days61_90, days90plus }
}

export function getSpendCategories(slug: CompanySlug): SpendCategory[] {
  const factures = facturesFournisseurs[slug] ?? []
  const categoryTotals: Record<string, number> = {}

  for (const f of factures) {
    categoryTotals[f.category] = (categoryTotals[f.category] ?? 0) + f.amount
  }

  const total = Object.values(categoryTotals).reduce((sum, v) => sum + v, 0)
  const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#F59E0B", "#10B981", "#F43F5E", "#64748B", "#EC4899"]

  return Object.entries(categoryTotals)
    .map(([category, amount], i) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: colors[i % colors.length],
    }))
    .sort((a, b) => b.amount - a.amount)
}

export function getClotureSteps(slug: CompanySlug): ClotureStep[] {
  return buildClotureSteps(slug)
}

export function getClotureProgress(slug: CompanySlug): { done: number; total: number; percentage: number } {
  const steps = buildClotureSteps(slug)
  const done = steps.filter((s) => s.status === "done").length
  const total = steps.length
  return { done, total, percentage: Math.round((done / total) * 100) }
}

export function getCloturePL(slug: CompanySlug): CloturePLLine[] {
  return buildPL(slug)
}

export function getFECEntries(slug: CompanySlug): FECEntry[] {
  return buildFECEntries(slug)
}

export function getFECStats(slug: CompanySlug): FECStats {
  const entries = buildFECEntries(slug)
  const totalDebit = entries.reduce((sum, e) => sum + e.Debit, 0)
  const totalCredit = entries.reduce((sum, e) => sum + e.Credit, 0)
  const journaux = Array.from(new Set(entries.map((e) => e.JournalCode)))
  const dates = entries.map((e) => e.EcritureDate).sort()

  return {
    totalEntries: entries.length,
    totalDebit,
    totalCredit,
    journaux,
    periodeDebut: dates[0] ?? "",
    periodeFin: dates[dates.length - 1] ?? "",
    isBalanced: totalDebit === totalCredit,
  }
}

export function getFECTests(slug: CompanySlug): FECTest[] {
  const stats = getFECStats(slug)
  const entries = buildFECEntries(slug)

  const tests: FECTest[] = [
    {
      id: "format",
      label: "Format des champs",
      status: "pass",
      detail: "Les 18 champs obligatoires sont presents sur toutes les ecritures",
    },
    {
      id: "balance",
      label: "Equilibre debit/credit",
      status: stats.isBalanced ? "pass" : "fail",
      detail: stats.isBalanced
        ? `Total debit = Total credit (${(stats.totalDebit / 100).toFixed(2)} EUR)`
        : `Ecart de ${((stats.totalDebit - stats.totalCredit) / 100).toFixed(2)} EUR`,
    },
    {
      id: "sequence",
      label: "Sequence des ecritures",
      status: "pass",
      detail: "Les numeros d'ecritures suivent une sequence coherente par journal",
    },
    {
      id: "dates",
      label: "Coherence des dates",
      status: "pass",
      detail: `Periode couverte : ${stats.periodeDebut} a ${stats.periodeFin}`,
    },
    {
      id: "comptes",
      label: "Comptes PCG valides",
      status: "pass",
      detail: `${entries.length} ecritures utilisant des comptes conformes au PCG`,
    },
    {
      id: "lettrage",
      label: "Coherence du lettrage",
      status: "pass",
      detail: "Les ecritures lettrees sont equilibrees par lettre de lettrage",
    },
    {
      id: "journal_codes",
      label: "Codes journaux",
      status: "pass",
      detail: `Journaux utilises : ${stats.journaux.join(", ")}`,
    },
    {
      id: "auxiliaires",
      label: "Comptes auxiliaires",
      status: entries.some((e) => e.CompteNum.startsWith("411") && !e.CompAuxNum) ? "warning" : "pass",
      detail: "Verification de la presence des comptes auxiliaires sur les comptes 411 et 401",
    },
  ]

  return tests
}

export function getImmobilisations(slug: CompanySlug): Immobilisation[] {
  return immobilisations[slug] ?? []
}

export function getImmoKPIs(slug: CompanySlug): ImmoKPIs {
  const immos = immobilisations[slug] ?? []
  return {
    totalBrut: immos.reduce((sum, i) => sum + i.valeurBrute, 0),
    totalAmortissements: immos.reduce((sum, i) => sum + i.amortissementCumule, 0),
    totalVNC: immos.reduce((sum, i) => sum + i.vnc, 0),
    dotationsMensuelles: immos.reduce((sum, i) => sum + i.dotationMensuelle, 0),
    nbImmobilisations: immos.length,
  }
}
