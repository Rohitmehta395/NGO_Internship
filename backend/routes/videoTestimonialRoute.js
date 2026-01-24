const express = require("express");
const {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  reorderVideos,
} = require("../controllers/VideoTestController");

const router = express.Router();

router.get("/", getAllVideos);
router.put("/reorder", reorderVideos);

router.get("/:id", getVideoById);
router.post("/", createVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

module.exports = router;
