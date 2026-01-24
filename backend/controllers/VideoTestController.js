const VideoTestimonial = require("../models/VideoTestimonial");

const getAllVideos = async (req, res) => {
  try {
    const videos = await VideoTestimonial.find().sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await VideoTestimonial.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const video = new VideoTestimonial({ ...req.body, order: 0 });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const updated = await VideoTestimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const deleted = await VideoTestimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const reorderVideos = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const operations = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));
    if (operations.length > 0) {
      await VideoTestimonial.bulkWrite(operations);
    }
    res.status(200).json({ message: "Reordered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  reorderVideos,
};
