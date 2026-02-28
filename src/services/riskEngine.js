import { WEIGHTS } from "../config/config.js";

export function calculateRisk(data) {
  let amountRisk = 0;
  let ageRisk = 0;
  let countryRisk = 0;
  let velocityRisk = 0;

  // Amount Rule
  if (data.amount > 20000) amountRisk = 30;
  else if (data.amount >= 5000) amountRisk = 15;
  else amountRisk = 5;

  // Account Age Rule
  if (data.accountAgeDays < 30) ageRisk = 25;
  else if (data.accountAgeDays <= 180) ageRisk = 10;
  else ageRisk = 0;

  // Country Rule
  if (data.countryMismatch) countryRisk = 20;

  // Velocity Rule
  if (data.transactionsPerHour > 5) velocityRisk = 25;
  else if (data.transactionsPerHour >= 3) velocityRisk = 10;
  else velocityRisk = 0;

  const total =
    amountRisk * WEIGHTS.amount +
    ageRisk * WEIGHTS.age +
    countryRisk * WEIGHTS.country +
    velocityRisk * WEIGHTS.velocity;

  return {
    totalScore: Math.min(total, 100),
    breakdown: {
      amountRisk,
      ageRisk,
      countryRisk,
      velocityRisk
    }
  };
}