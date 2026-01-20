const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createPartner,
  getPartners,
  getAllPartners,
  updatePartner,
  deletePartner,
} = require("../controllers/partnersController");

/* ================= MULTER CONFIG ================= */

const uploadDir = path.join(__dirname, "../uploads/partners");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // ✅ 1 MB
  },
});

/* ================= ROUTES ================= */

/* PUBLIC */
router.get("/", getPartners);

/* ADMIN */
router.get("/admin", getAllPartners);

/* CREATE */
router.post("/", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "Image size must be less than 1 MB",
        });
      }
      return res.status(400).json({ message: err.message });
    }
    createPartner(req, res);
  });
});

/* UPDATE */
router.put("/:id", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "Image size must be less than 1 MB",
        });
      }
      return res.status(400).json({ message: err.message });
    }
    updatePartner(req, res);
  });
});

/* DELETE */
router.delete("/:id", deletePartner);

module.exports = router;
