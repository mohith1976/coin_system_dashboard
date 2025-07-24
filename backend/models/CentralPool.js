import mongoose from "mongoose";

const CentralPoolSchema = new mongoose.Schema({
  totalCoins: { type: Number, required: true, default: 50000000 },
  lastUpdated: { type: Date, default: Date.now },
  isGenerating: { type: Boolean, default: true }, // Controls coin generation
  dailyLimit: { type: Number, default: 10000 }, // Daily coin limit
  weeklyLimit: { type: Number, default: 70000 }, // Weekly coin limit
  isFrozen: { type: Boolean, default: false } // Freeze/unfreeze system
});

// 🔥 Explicitly set the collection name to match your Flutter app
export default mongoose.model("CentralPool", CentralPoolSchema, "centralpools");
