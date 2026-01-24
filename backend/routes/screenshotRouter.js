const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getAllScreenshots,
  createScreenshot,
  updateScreenshot,
  deleteScreenshot,
  reorderScreenshots,
} = require("../controllers/ScreenshotController");

const router = express.Router();

/* ========= MULTER ========= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/screenshots";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `screenshot-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Images only"));
  },
});

/* ========= ROUTES ========= */
router.get("/", getAllScreenshots);
router.put("/reorder", reorderScreenshots);
router.post("/", upload.single("image"), createScreenshot);
router.put("/:id", upload.single("image"), updateScreenshot);
router.delete("/:id", deleteScreenshot);

module.exports = router;
