// src/controllers/userController.js
const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  res.json(users);
};

const assignRoles = async (req, res) => {
  // Admin gives access here
  try {
    const { roleIds } = req.body; // array of Role ObjectIds
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { roles: roleIds },
      { new: true }
    ).populate("roles");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error assigning roles" });
  }
};

module.exports = { getUsers, assignRoles };
