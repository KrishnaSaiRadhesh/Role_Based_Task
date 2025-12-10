// src/controllers/roleController.js
const Role = require("../models/Role");

const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body; // permissions: string[]
    const role = await Role.create({ name, permissions });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: "Error creating role" });
  }
};

const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Error updating role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting role" });
  }
};

module.exports = { createRole, getRoles, updateRole, deleteRole };
