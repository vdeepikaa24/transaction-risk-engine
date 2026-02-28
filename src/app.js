import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import checkoutRoute from "./routes/checkout.js";
import adminRoute from "./routes/admin.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/checkout", checkoutRoute);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});