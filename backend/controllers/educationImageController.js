const EducationImage = require("../models/EducationImage");
const fs = require("fs");
const path = require("path");

// @desc    Get all education images
// @route   GET /api/education-images
const getImages = async (req, res) => {
  try {
    const images = await EducationImage.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload new image
// @route   POST /api/education-images
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const imagePath = req.file.path.replace(/\\/g, "/");

    const newImage = await EducationImage.create({
      image: imagePath,
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); // Clean up if error
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

module.exports = { getImages, uploadImage, deleteImage };
