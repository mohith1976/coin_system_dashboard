import CentralPool from "../models/CentralPool.js";
// 📌 0. Get Pool Balance & Status
export const getPoolStatus = async (req, res) => {
  try {
    const pool = await CentralPool.findOne();
    if (!pool) return res.status(404).json({ message: "Central Pool not found" });

    res.json(pool);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 1. Manually Generate Coins (Super Admin Only)
export const generateCoins = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const pool = await CentralPool.findOne();
    if (!pool) return res.status(404).json({ message: "Central Pool not found" });

    pool.totalCoins += amount;
    pool.lastUpdated = new Date();
    await pool.save();

    res.json({ message: `Successfully added ${amount} coins`, newBalance: pool.totalCoins });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 2. Start/Stop Coin Generation (Super Admin Only)
export const toggleCoinGeneration = async (req, res) => {
  try {
    const { status } = req.body;
    if (typeof status !== "boolean") return res.status(400).json({ message: "Invalid status value" });

    const pool = await CentralPool.findOne();
    if (!pool) return res.status(404).json({ message: "Central Pool not found" });

    pool.isGenerating = status;
    await pool.save();

    res.json({ message: `Coin generation ${status ? "started" : "stopped"}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 3. Set Daily & Weekly Coin Distribution Limits
export const updateCoinLimits = async (req, res) => {
  try {
    const { dailyLimit, weeklyLimit } = req.body;
    const pool = await CentralPool.findOne();
    if (!pool) return res.status(404).json({ message: "Central Pool not found" });

    if (dailyLimit) pool.dailyLimit = dailyLimit;
    if (weeklyLimit) pool.weeklyLimit = weeklyLimit;
    
    await pool.save();

    res.json({ message: "Coin distribution limits updated successfully", pool });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 4. Freeze/Unfreeze Pool Operations
export const togglePoolFreeze = async (req, res) => {
  try {
    const { freeze } = req.body;
    if (typeof freeze !== "boolean") return res.status(400).json({ message: "Invalid freeze value" });

    const pool = await CentralPool.findOne();
    if (!pool) return res.status(404).json({ message: "Central Pool not found" });

    pool.isFrozen = freeze;
    await pool.save();

    res.json({ message: `Pool operations ${freeze ? "frozen" : "unfrozen"}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 5. Coin Burn Mechanism (Auto Remove Excess Coins)
export const burnExcessCoins = async (req, res) => {
  try {
    const { maxLimit } = req.body;
    if (!maxLimit || maxLimit <= 0) return res.status(400).json({ message: "Invalid max limit" });

    const pool = await CentralPool.findOne();
    if (!pool) return res.status(404).json({ message: "Central Pool not found" });

    if (pool.totalCoins > maxLimit) {
      const burnAmount = pool.totalCoins - maxLimit;
      pool.totalCoins -= burnAmount;
      pool.lastUpdated = new Date();
      await pool.save();
      return res.json({ message: `Burned ${burnAmount} excess coins`, newBalance: pool.totalCoins });
    }

    res.json({ message: "No excess coins to burn" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
