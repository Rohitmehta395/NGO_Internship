const EducationImage = require("../models/EducationImage");
const fs = require("fs");
const path = require("path");

// @desc    Get all education images
// @route   GET /api/education-images
const getImages = async (req, res) => {
  try {
    // Sort by order (ascending) first, then by newest (descending)
    const images = await EducationImage.find({}).sort({
      order: 1,
      createdAt: -1,
    });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload new image(s)
// @route   POST /api/education-images
const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    const createdImages = [];

    for (const file of req.files) {
      const imagePath = file.path.replace(/\\/g, "/");
      const newImage = await EducationImage.create({
        image: imagePath,
      });
      createdImages.push(newImage);
    }

    res.status(201).json({ success: true, data: createdImages });
  } catch (error) {
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete image
// @route   DELETE /api/education-images/:id
const deleteImage = async (req, res) => {
  try {
    const img = await EducationImage.findById(req.params.id);
    if (!img)
      return res.status(404).json({ success: false, message: "Not found" });

    // Delete file from server
    const filePath = path.join(__dirname, "..", img.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await img.deleteOne();
    res.json({ success: true, message: "Image removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reorder images
// @route   PUT /api/education-images/reorder
const reorderImages = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const operations = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));

    if (operations.length > 0) {
      await EducationImage.bulkWrite(operations);
    }

    res.status(200).json({ success: true, message: "Reordered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getImages, uploadImage, deleteImage, reorderImages };
