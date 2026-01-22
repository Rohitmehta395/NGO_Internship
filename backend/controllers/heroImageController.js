const HeroImage = require("../models/HeroImage");
const fs = require("fs");
const path = require("path");

// @desc    Get Hero Image for a specific page
// @route   GET /api/hero-images/:page
// @access  Public
const getHeroImage = async (req, res) => {
  try {
    const { page } = req.params;
    const heroImage = await HeroImage.findOne({ page });

    if (!heroImage) {
      return res.status(404).json({ success: false, message: "Image not set" });
    }

    res.status(200).json({ success: true, data: heroImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update Hero Image
// @route   POST /api/hero-images/:page
// @access  Private/Admin
const updateHeroImage = async (req, res) => {
  try {
    const { page } = req.params;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }

    let heroImage = await HeroImage.findOne({ page });

    // If an image exists, delete the old file to save space
    if (heroImage && heroImage.imageUrl) {
      // Construct absolute path to the old file
      const oldPath = path.join(__dirname, "..", heroImage.imageUrl);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }
    }

    const imageUrl = `/uploads/hero/${req.file.filename}`;

    if (heroImage) {
      heroImage.imageUrl = imageUrl;
      await heroImage.save();
    } else {
      heroImage = await HeroImage.create({
        page,
        imageUrl,
      });
    }

    res.status(200).json({
      success: true,
      message: `${page} hero image updated successfully`,
      data: heroImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getHeroImage, updateHeroImage };
