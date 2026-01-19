const Screenshot = require("../models/Screenshot");
const fs = require("fs");
const path = require("path");

/* ========= GET ALL ========= */
const getAllScreenshots = async (req, res) => {
  try {
    const screenshots = await Screenshot.find().sort({ date: -1 });
    res.status(200).json(screenshots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========= CREATE ========= */
const createScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const screenshot = await Screenshot.create({
      alt: req.body.alt,
      image: req.file.path.replace(/\\/g, "/"),
      date: req.body.date || Date.now(),
    });

    res.status(201).json(screenshot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========= UPDATE ========= */
const updateScreenshot = async (req, res) => {
  try {
    const screenshot = await Screenshot.findById(req.params.id);
    if (!screenshot) {
      return res.status(404).json({ message: "Not found" });
    }

    if (req.file && screenshot.image) {
      const oldPath = path.resolve(screenshot.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    screenshot.alt = req.body.alt ?? screenshot.alt;

    if (req.body.date) {
      screenshot.date = req.body.date;
    }

    if (req.file) {
      screenshot.image = req.file.path.replace(/\\/g, "/");
    }

    await screenshot.save();
    res.status(200).json(screenshot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ========= DELETE ========= */
const deleteScreenshot = async (req, res) => {
  try {
    const screenshot = await Screenshot.findById(req.params.id);
    if (!screenshot) {
      return res.status(404).json({ message: "Not found" });
    }

    if (screenshot.image) {
      const imagePath = path.resolve(screenshot.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await screenshot.deleteOne();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllScreenshots,
  createScreenshot,
  updateScreenshot,
  deleteScreenshot,
};
