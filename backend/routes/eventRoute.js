const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  reorderEvents,
} = require("../controllers/eventController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer storage for events
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/events/";
    const fs = require("fs");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `event-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File filter (images only)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only images are allowed"));
  },
});


router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/reorder", protect, authorize("admin"), reorderEvents);
// Create Event with image upload
router.post("/", upload.single("image"), (req, res, next) => {
  console.log("File received by backend:", req.file);
  createEvent(req, res, next);
});
// Update Event with image upload
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;

