// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate("roles");

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "User not found or inactive" });
    }

    // Flatten permissions from all roles
    const permissions = user.roles.flatMap((role) => role.permissions);

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles.map((r) => r.name),
      permissions
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
