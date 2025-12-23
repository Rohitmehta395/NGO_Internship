const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect, authorize } = require("../middleware/auth");
const {
  getImages,
  uploadImage,
  deleteImage,
} = require("../controllers/educationImageController");

// --- Multer Config for Specific Folder ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/educationImages/";
    const fs = require("fs");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `edu-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb("Error: Images Only!");
  },
});

// Routes
router.get("/", getImages);
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  uploadImage
);
router.delete("/:id", protect, authorize("admin"), deleteImage);

module.exports = router;
