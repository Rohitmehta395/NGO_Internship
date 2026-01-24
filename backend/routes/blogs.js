const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  subscribe,
  reorderBlogs,
} = require("../controllers/blogController");
const { protect, authorize } = require("../middleware/auth");

// --- Multer Config for Articles ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure this folder exists manually or use fs.mkdirSync
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `blog-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb("Error: Images Only!");
  },
});

// Public Routes
router.get("/", getBlogs);
router.post("/subscribe", subscribe);

// Admin Routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createBlog,
);
router.put("/reorder", protect, authorize("admin"), reorderBlogs);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateBlog,
);
router.delete("/:id", protect, authorize("admin"), deleteBlog);

module.exports = router;
