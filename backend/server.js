const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? "https://yourdomain.com"
//         : "https://ngo-82p8.onrender.com",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      process.env.FRONTEND_URL, // Production Vercel URL
    ],
    credentials: true,
  })
);

// Static folder
app.use("/uploads", express.static("uploads"));

// Route files
const auth = require("./routes/auth");
const programs = require("./routes/programs");
const volunteers = require("./routes/volunteers");

// Mount routers
app.use("/api/auth", auth);
app.use("/api/programs", programs);
app.use("/api/volunteers", volunteers);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// Handle 404 - CORRECTED: Remove the problematic '*' route
app.use((req, res) => {
  // Changed from app.use('*', ...) to app.use(...)
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
