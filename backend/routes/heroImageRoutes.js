const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getHeroImage,
  updateHeroImage,
} = require("../controllers/heroImageController");
const { protect, authorize } = require("../middleware/auth");

// --- Multer Config ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/hero/");
  },
  filename: (req, file, cb) => {
    // Create a unique filename: hero-{page}-{timestamp}.ext
    cb(
      null,
      `hero-${req.params.page}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Error: Images Only (jpeg, jpg, png, webp)!"));
  },
});

// Public Route to get the image
router.get("/:page", getHeroImage);
router.post(
  "/:page",
  protect,
  authorize("admin"),
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: err.message });
      } else if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  updateHeroImage,
);

module.exports = router;
