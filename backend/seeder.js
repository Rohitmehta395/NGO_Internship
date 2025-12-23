const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing users to avoid duplicates (Optional)
    await User.deleteMany();

    const adminUser = {
      name: "Admin User",
      email: "rohitmehtaddn@gmail.com", // <--- Admin Email
      password: "rohitmehta", // <--- Admin Password
      role: "admin",
      phone: "0000000000",
    };

    await User.create(adminUser);
    console.log("✅ Admin User Created!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
