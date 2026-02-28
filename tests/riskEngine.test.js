import { calculateRisk } from "../src/services/riskEngine.js";

describe("Transaction Risk Engine", () => {

  test("Low risk transaction", () => {
    const result = calculateRisk({
      amount: 1000,
      accountAgeDays: 365,
      countryMismatch: false,
      transactionsPerHour: 1
    });

    expect(result.totalScore).toBeLessThan(60);
  });

  test("High risk transaction", () => {
    const result = calculateRisk({
      amount: 30000,
      accountAgeDays: 5,
      countryMismatch: true,
      transactionsPerHour: 10
    });

    expect(result.totalScore).toBeGreaterThanOrEqual(60);
  });

  test("Score never exceeds 100", () => {
    const result = calculateRisk({
      amount: 100000,
      accountAgeDays: 1,
      countryMismatch: true,
      transactionsPerHour: 50
    });

    expect(result.totalScore).toBeLessThanOrEqual(100);
  });

});