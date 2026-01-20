const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // To clear existing admin users
    // await User.findOneAndDelete({ email: "arvind@sharadatrust.org" });

    const adminUser = {
      name: "Ayush Kumar",
      email: "arvind@sharadatrust.org", // <--- Admin Email
      password: "SharadaTrust@123", // <--- Admin Password
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
