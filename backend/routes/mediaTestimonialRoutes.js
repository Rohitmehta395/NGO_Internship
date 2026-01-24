const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  reorderMedia,
} = require("../controllers/mediaTestController");
const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/media/";
    const fs = require("fs");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `media-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only images are allowed"));
  },
});

router.get("/", getAllMedia);
router.put("/reorder", reorderMedia);

router.get("/:id", getMediaById);
router.post("/", upload.single("image"), createMedia);
router.put("/:id", upload.single("image"), updateMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
