require("dotenv").config();
const connectDB = require("./src/config/db");
const express = require("express");
const cors = require("cors");
const seedAdmin = require("./src/utils/seedAdmin");
const authRoutes = require("./src/routes/authRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await seedAdmin(); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
