import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);
import poolRoutes from "./routes/poolRoutes.js";
app.use("/api/pool", poolRoutes);


// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use("/api", limiter);

mongoose.connect(process.env.MONGO_URI, {
    dbName: "flutter_app",  // 🔥 Ensure the same database name as your Flutter app
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("✅ MongoDB Connected to flutter_app"))
    .catch(err => {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
    });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
