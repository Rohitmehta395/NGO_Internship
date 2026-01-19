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

// --- Multer Config ---
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
    cb(
      null,
      `edu-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);

    cb(
      new Error(
        `File "${file.originalname}" is not a valid image. Only JPEG, JPG, PNG, and WEBP are allowed.`,
      ),
    );
  },
});

// --- Middleware Wrapper to Catch Upload Errors ---
const uploadMiddleware = (req, res, next) => {
  const uploadFunc = upload.array("images", 10);

  uploadFunc(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ success: false, message: `Upload Error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// Routes
router.get("/", getImages);
router.post(
  "/",
  protect,
  authorize("admin"),
  uploadMiddleware,
  uploadImage,
);
router.delete("/:id", protect, authorize("admin"), deleteImage);

module.exports = router;
