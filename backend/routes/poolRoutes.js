import express from "express";
import { 
  getPoolStatus, 
  generateCoins, 
  toggleCoinGeneration, 
  updateCoinLimits, 
  togglePoolFreeze,
  burnExcessCoins
} from "../controllers/poolController.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 1. Get Pool Balance & Status
router.get("/", authMiddleware, checkRole(["superadmin"]), getPoolStatus);

// 📌 2. Manually Generate Coins
router.post("/generate", authMiddleware, checkRole(["superadmin"]), generateCoins);

// 📌 3. Start/Stop Coin Generation
router.post("/toggle-generation", authMiddleware, checkRole(["superadmin"]), toggleCoinGeneration);

// 📌 4. Update Coin Limits
router.post("/update-limits", authMiddleware, checkRole(["superadmin"]), updateCoinLimits);

// 📌 5. Freeze/Unfreeze Pool
router.post("/freeze", authMiddleware, checkRole(["superadmin"]), togglePoolFreeze);

// 📌 6. Burn Excess Coins (Anti-Inflation)
router.post("/burn", authMiddleware, checkRole(["superadmin"]), burnExcessCoins);

export default router;
