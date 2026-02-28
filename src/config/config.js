import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const FRAUD_THRESHOLD = Number(process.env.FRAUD_THRESHOLD) || 60;

export const WEIGHTS = {
  amount: 1.0,
  age: 1.0,
  country: 1.0,
  velocity: 1.0
};