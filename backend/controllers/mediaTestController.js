const MediaTestimonial = require("../models/MediaTestimonial");

const getAllMedia = async (req, res) => {
  try {
    // Sort by Order ASC, then Created DESC
    const media = await MediaTestimonial.find().sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET by ID
const getMediaById = async (req, res) => {
  try {
    const media = await MediaTestimonial.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Not found" });
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createMedia = async (req, res) => {
  try {
    const media = new MediaTestimonial({
      ...req.body,
      image: req.file ? req.file.filename : null,
      order: 0,
    });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
const updateMedia = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.filename;

    const updatedMedia = await MediaTestimonial.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    if (!updatedMedia) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updatedMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteMedia = async (req, res) => {
  try {
    const deletedMedia = await MediaTestimonial.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedMedia) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REORDER
const reorderMedia = async (req, res) => {
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
      await MediaTestimonial.bulkWrite(operations);
    }

    res.status(200).json({ message: "Reordered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  reorderMedia,
};
