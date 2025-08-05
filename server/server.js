import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT} => http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB error:", err));
