// src/models/Role.js
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g. "admin"
    permissions: [{ type: String, required: true }]       // e.g. "users:create"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
