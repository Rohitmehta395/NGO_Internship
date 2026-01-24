const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createPartner,
  getPartners,
  updatePartner,
  deletePartner,
  reorderPartners,
} = require("../controllers/partnersController");

/* --- Multer Config --- */
const uploadDir = path.join(__dirname, "../uploads/partners");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 } });

/* --- ROUTES --- */

// GET Routes
router.get("/", getPartners);
router.get("/admin", getPartners);

router.put("/reorder", reorderPartners);

// Create
router.post("/", upload.single("image"), (req, res) => {
  createPartner(req, res);
});

// Update
router.put("/:id", upload.single("image"), (req, res) => {
  updatePartner(req, res);
});

// Delete
router.delete("/:id", deletePartner);

module.exports = router;
