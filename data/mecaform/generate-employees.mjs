#!/usr/bin/env node
// Génère les 47 employés production/logistique manquants pour Mécaform
// pour atteindre l'effectif cible de 82 salariés.
// Exécution : node generate-employees.mjs > employees-new.json

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pools de noms (représentatifs Rhône-Alpes, industrie mécanique)
const firstNamesMale = [
  'Jean-Luc', 'Michel', 'Patrick', 'Didier', 'Thierry', 'Christian', 'Alain',
  'Pascal', 'Bernard', 'Philippe', 'Hervé', 'Fabrice', 'Olivier', 'Stéphane',
  'Frédéric', 'Laurent', 'Vincent', 'Sébastien', 'Nicolas', 'Julien', 'Mathieu',
  'Romain', 'Maxime', 'Anthony', 'Kevin', 'Florian', 'Mehdi', 'Karim',
  'Mohamed', 'Youssef', 'Saïd', 'Abdelkader', 'Mustapha', 'Jorge', 'Carlos',
  'Joao', 'Miguel', 'Antonio', 'Dragan', 'Ahmet'
];
const firstNamesFemale = [
  'Sandrine', 'Nathalie', 'Valérie', 'Sylvie', 'Christine', 'Martine',
  'Corinne', 'Stéphanie', 'Céline', 'Émilie', 'Aurélie', 'Sarah', 'Fatima',
  'Amina', 'Nadia'
];
const lastNames = [
  'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Petit', 'Durand',
  'Leroy', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Garcia',
  'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier', 'Morel', 'Girard',
  'Bonnet', 'Dupuis', 'Lambert', 'Fontaine', 'Rousseau', 'Masson', 'Henry',
  'Rolland', 'Carpentier', 'Gauthier', 'Perez', 'Da Silva', 'Gonzalez',
  'Lopez', 'Nguyen', 'Benali', 'Amrani', 'Cherif', 'Haddad', 'Kovac',
  'Popescu', 'Silva', 'Ferreira', 'Alves', 'Costa'
];

// Répartition par rôle (47 total)
const roles = [
  { count: 14, title: 'Opérateur régleur CNC', dept: 'Production', manager: 'MF-007',
    salRange: [2200, 2800], coefRange: [35, 45], classRange: ['C6', 'C7'] },
  { count: 10, title: 'Opérateur usinage conventionnel', dept: 'Production', manager: 'MF-007',
    salRange: [1950, 2400], coefRange: [28, 38], classRange: ['B4', 'C6'] },
  { count: 8, title: 'Soudeur TIG/MIG', dept: 'Production', manager: 'MF-008',
    salRange: [2100, 2600], coefRange: [32, 42], classRange: ['B5', 'C7'] },
  { count: 6, title: 'Opérateur assemblage', dept: 'Production', manager: 'MF-008',
    salRange: [1900, 2300], coefRange: [25, 35], classRange: ['A2', 'B5'] },
  { count: 5, title: 'Opérateur contrôle / finition', dept: 'Production', manager: 'MF-009',
    salRange: [2000, 2450], coefRange: [30, 40], classRange: ['B4', 'C6'] },
  { count: 4, title: 'Manutentionnaire / cariste', dept: 'Logistique', manager: 'MF-024',
    salRange: [1900, 2200], coefRange: [25, 32], classRange: ['A2', 'B4'] },
];

// Distribution ancienneté pour atteindre moyenne ~8 ans
// (sur 47 profils, fin 2025)
const seniorityBuckets = [
  { count: 8,  yearsRange: [15, 22] }, // seniors (hired 2003-2010)
  { count: 15, yearsRange: [8, 14]  }, // established (hired 2011-2017)
  { count: 18, yearsRange: [3, 7]   }, // medium (hired 2018-2022)
  { count: 6,  yearsRange: [0, 2]   }, // juniors (hired 2023-2024)
];

// PRNG déterministe (seed fixe pour reproductibilité)
let seed = 42;
const rand = () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};
const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

// Âge cohérent avec l'ancienneté : âge à l'embauche ≥ 18 ans
const computeBirthDate = (hireYear, minAgeAtHire = 18, maxAgeAtHire = 55) => {
  const ageAtHire = randInt(minAgeAtHire, maxAgeAtHire);
  const birthYear = hireYear - ageAtHire;
  const birthMonth = randInt(1, 12);
  const birthDay = randInt(1, 28);
  return `${birthYear}-${String(birthMonth).padStart(2,'0')}-${String(birthDay).padStart(2,'0')}`;
};

// Numéro SS fictif : 1/2 + YY + MM + 69234 + 3-digit increment
const buildSSN = (isMale, birthDate, increment) => {
  const genderDigit = isMale ? '1' : '2';
  const yy = birthDate.slice(2, 4);
  const mm = birthDate.slice(5, 7);
  const inc = String(increment).padStart(3, '0');
  return `${genderDigit}${yy}${mm}69234${inc}`;
};

// Construire la liste des ancienneté à assigner (mélangée)
const seniorityPool = [];
for (const bucket of seniorityBuckets) {
  for (let i = 0; i < bucket.count; i++) {
    seniorityPool.push(randInt(bucket.yearsRange[0], bucket.yearsRange[1]));
  }
}
// Mélanger
for (let i = seniorityPool.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [seniorityPool[i], seniorityPool[j]] = [seniorityPool[j], seniorityPool[i]];
}

// Construire liste des postes (47 entrées)
const positionPool = [];
for (const role of roles) {
  for (let i = 0; i < role.count; i++) {
    positionPool.push(role);
  }
}

// 85% hommes environ (industrie mécanique)
const genderPool = [];
const nMales = Math.round(47 * 0.85);
for (let i = 0; i < nMales; i++) genderPool.push(true);
for (let i = 0; i < 47 - nMales; i++) genderPool.push(false);
for (let i = genderPool.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [genderPool[i], genderPool[j]] = [genderPool[j], genderPool[i]];
}

const employees = [];
const usedNames = new Set();
// Noms déjà pris par les 35 existants
const existingLastNames = new Set([
  'Morel','Garnier','Fabre','Dupont','Perrault','Vallet','Chabrier','Reynaud',
  'Blanchard','Mallet','Fontaine','Guillot','Berger','Tissot','Chauvin','Bourgeois',
  'Devaux','Prost','Clément','Arnaud','Moulin','Rivière','Laporte','Roux','Collet',
  'Marchal','Benzema','Perrin','Giraud','El Amrani','Dubois','Lefebvre','Brun',
  'Lemaire','Muller'
]);

for (let i = 0; i < 47; i++) {
  const id = `MF-${String(36 + i).padStart(3, '0')}`;
  const isMale = genderPool[i];
  const role = positionPool[i];
  const seniority = seniorityPool[i];
  const hireYear = 2025 - seniority;
  // Pour seniority=0 (embauche 2025), répartir sur les mois
  const hireMonth = seniority === 0 ? randInt(1, 11) : randInt(1, 12);
  const hireDay = randInt(1, 28);
  const hireDate = `${hireYear}-${String(hireMonth).padStart(2,'0')}-${String(hireDay).padStart(2,'0')}`;

  // Nom unique
  let firstName, lastName, nameKey;
  let attempts = 0;
  do {
    firstName = pick(isMale ? firstNamesMale : firstNamesFemale);
    lastName = pick(lastNames);
    nameKey = `${firstName} ${lastName}`;
    attempts++;
  } while ((usedNames.has(nameKey) || existingLastNames.has(lastName)) && attempts < 50);
  usedNames.add(nameKey);

  const birthDate = computeBirthDate(hireYear);
  const ssn = buildSSN(isMale, birthDate, 100 + i);

  // Salaire corrélé à l'ancienneté : bornes interpolées
  const [salMin, salMax] = role.salRange;
  const senioritySalRatio = Math.min(seniority / 15, 1); // capé à 15 ans
  const baseSalary = Math.round((salMin + (salMax - salMin) * (0.3 + 0.7 * senioritySalRatio)) / 50) * 50;

  // Coefficient & classification
  const [coefMin, coefMax] = role.coefRange;
  const coef = Math.round(coefMin + (coefMax - coefMin) * senioritySalRatio);
  const classification = senioritySalRatio > 0.5 ? role.classRange[1] : role.classRange[0];

  // Prime production
  const primeAmount = Math.round((1000 + 800 * senioritySalRatio) / 50) * 50;

  employees.push({
    id,
    first_name: firstName,
    last_name: lastName,
    date_of_birth: birthDate,
    social_security_number: ssn,
    hire_date: hireDate,
    end_date: null,
    contract_type: 'CDI',
    job_title: role.title,
    department: role.dept,
    manager_id: role.manager,
    status: 'non_cadre',
    coefficient: coef,
    classification,
    working_time: '39h',
    heures_supp_structurelles: 4,
    base_salary_monthly: baseSalary,
    benefits: {
      mutuelle: { employer_pct: 60, monthly_total: 55 },
      tickets_restaurant: { face_value: 8.00, employer_pct: 60, days_per_month: 20 },
      transport: null,
      vehicle: null
    },
    annual_bonus: { type: 'prime_production', amount: primeAmount }
  });
}

// Charger le fichier existant pour récupérer les 35 employés détaillés
const existingFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'employees.json'), 'utf8'));
const existing = existingFile.detailed_employees;

// Construire le nouveau fichier avec schéma harmonisé
const newFile = {
  company: 'Mécaform',
  last_updated: '2026-04-05',
  employees: [...existing, ...employees]
};

// Vérification : total = 82
console.error(`Total employees: ${newFile.employees.length}`);
console.error(`Production ops: ${newFile.employees.filter(e => e.department === 'Production' && e.manager_id !== 'MF-001' && e.manager_id !== 'MF-003').length}`);
console.error(`Logistique: ${newFile.employees.filter(e => e.department === 'Logistique').length}`);
console.error(`Average seniority of new 47: ${(employees.reduce((s, e) => s + (2025 - parseInt(e.hire_date.slice(0,4))), 0) / 47).toFixed(1)} years`);
console.error(`Average salary of new 47: ${Math.round(employees.reduce((s, e) => s + e.base_salary_monthly, 0) / 47)}€`);

// Output à stdout
console.log(JSON.stringify(newFile, null, 2));
