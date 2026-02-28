import express from "express";
import { FRAUD_THRESHOLD } from "../config/config.js";
import { calculateRisk } from "../services/riskEngine.js";

const router = express.Router();
console.log("New version of checkout route running");

router.post("/risk", (req, res) => {
  console.log("Request hit /checkout/risk");

  const riskResult = calculateRisk(req.body);

  const THRESHOLD = FRAUD_THRESHOLD || 75;
  const status = riskResult.totalScore >= THRESHOLD ? "blocked" : "allowed";

  console.log("Status:", status);

  res.json({
    status,
    totalScore: riskResult.totalScore,
    breakdown: riskResult.breakdown,
  });
});

export default router;
