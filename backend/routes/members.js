const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");
const { protect, authorize } = require("../middleware/auth");

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to 'backend/uploads'
  },
  filename: (req, file, cb) => {
    // Rename file: member-TIMESTAMP.ext
    cb(null, `member-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

// --- Routes ---
router
  .route("/")
  .get(getMembers)
  .post(protect, authorize("admin"), upload.single("image"), addMember);

router
  .route("/:id")
  .put(protect, authorize("admin"), upload.single("image"), updateMember)
  .delete(protect, authorize("admin"), deleteMember);

module.exports = router;
