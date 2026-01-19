const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const programController = require("../controllers/programController");
const { protect, authorize } = require("../middleware/auth");

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/programs/");
  },
  filename: (req, file, cb) => {
    cb(null, `program-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", programController.getPrograms);

router.put(
  "/reorder",
  protect,
  authorize("admin"),
  programController.reorderPrograms,
);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  programController.createProgram,
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  programController.updateProgram,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  programController.deleteProgram,
);

module.exports = router;
