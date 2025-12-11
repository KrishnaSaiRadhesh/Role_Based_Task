
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");

const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: "admin@example.com" });
  if (existingAdmin) return;

  // Create admin role with ALL permissions
  const allPermissions = [
    "users:read", "users:update",
    "roles:create", "roles:read", "roles:update", "roles:delete",
    "tasks:create", "tasks:read", "tasks:update", "tasks:delete"
  ];

  const adminRole = await Role.create({
    name: "admin",
    permissions: allPermissions
  });

  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: passwordHash,
    roles: [adminRole._id]
  });

  console.log("Admin user created: admin@example.com / Admin@123");
};

module.exports = seedAdmin;
