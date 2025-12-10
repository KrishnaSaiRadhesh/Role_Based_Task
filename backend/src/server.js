require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
const seedAdmin = require("./utils/seedAdmin");

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await seedAdmin(); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
