const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  reorderMembers,
} = require("../controllers/memberController");
const { protect, authorize } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `member-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Public
router.get("/", getMembers);
router.put("/reorder", protect, authorize("admin"), reorderMembers);

router
  .route("/")
  .post(protect, authorize("admin"), upload.single("image"), addMember);

router
  .route("/:id")
  .put(protect, authorize("admin"), upload.single("image"), updateMember)
  .delete(protect, authorize("admin"), deleteMember);

module.exports = router;
