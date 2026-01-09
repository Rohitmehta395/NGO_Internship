const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const events = require("./routes/eventRoute");

dotenv.config();
connectDB();

const app = express();

// --- Create uploads folders if missing ---
const uploadDirs = ["uploads", "uploads/educationImages"];
uploadDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

const auth = require("./routes/auth");
const members = require("./routes/members");
const blogs = require("./routes/blogs");
const educationImg = require("./routes/educationImages");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", auth);
app.use("/api/members", members);
app.use("/api/blogs", blogs);
app.use("/api/education-images", educationImg);
app.use("/api/events", events);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
