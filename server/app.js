import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Cloud-Based File Storage System API");
});
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

export default app;
