import express from "express";
import { calculateRisk } from "../services/riskEngine.js";

const router = express.Router();

router.post("/risk-preview", (req, res) => {
  const riskResult = calculateRisk(req.body);
  res.json(riskResult);
});

export default router;