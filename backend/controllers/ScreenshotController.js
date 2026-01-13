const Screenshot = require("../models/Screenshot");
const fs = require("fs");

/* ========= GET ALL ========= */
const getAllScreenshots = async (req, res) => {
  try {
    const screenshots = await Screenshot.find().sort({ createdAt: -1 });
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

    // delete old image if new one uploaded
    if (req.file && screenshot.image) {
      if (fs.existsSync(screenshot.image)) {
        fs.unlinkSync(screenshot.image);
      }
    }

    screenshot.alt = req.body.alt ?? screenshot.alt;
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

    if (screenshot.image && fs.existsSync(screenshot.image)) {
      fs.unlinkSync(screenshot.image);
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
