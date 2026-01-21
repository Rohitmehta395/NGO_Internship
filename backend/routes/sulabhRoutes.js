const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/auth");
const {
  getSulabhData,
  createSulabhData,
  updateSulabhData,
  deleteSulabhData,
  reorderSulabhData,
} = require("../controllers/sulabhController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/sulabh/");
  },
  filename: (req, file, cb) => {
    cb(null, `sulabh-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Public
router.get("/", getSulabhData);

// Protected (Admin)
router.post("/", protect, upload.single("image"), createSulabhData);
router.put("/reorder", protect, reorderSulabhData);
router.put("/:id", protect, upload.single("image"), updateSulabhData);
router.delete("/:id", protect, deleteSulabhData);

module.exports = router;
