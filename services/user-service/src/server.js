import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.use("/api/v1/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ User Service DB Connected"))
  .catch((err) => console.error("DB connection error:", err));

app.listen(process.env.PORT || 4001, () =>
  console.log(`🚀 User Service running on port ${process.env.PORT || 4001}`)
);
