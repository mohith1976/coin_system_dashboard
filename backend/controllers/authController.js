import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Admin Login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create Admin (Super Admin Only)
export const createAdmin = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword, role });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
