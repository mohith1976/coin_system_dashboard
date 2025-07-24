import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "moderator", "support"], required: true },
});

export default mongoose.model("Admin", AdminSchema);
