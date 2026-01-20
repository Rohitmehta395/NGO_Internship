const Partner = require("../models/Partner");
const fs = require("fs");
const path = require("path");

/* CREATE */
const createPartner = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const partner = await Partner.create({
      name: req.body.name,
      description: req.body.description,
      order: req.body.order || 0,
      isActive: req.body.isActive ?? true,
      imageUrl: `partners/${req.file.filename}`,
    });

    res.status(201).json({ success: true, data: partner });
  } catch (err) {
    console.error("CREATE PARTNER ERROR:", err);
    res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
  }
};

/* READ – PUBLIC */
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: partners });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* READ – ADMIN */
const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1 });
    res.json({ success: true, data: partners });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* UPDATE */
const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    if (req.file && partner.imageUrl) {
      const oldPath = path.join(__dirname, "..", "uploads", partner.imageUrl);
      fs.unlink(oldPath, (err) => {
        if (err) console.error("Image delete failed:", err);
      });

      partner.imageUrl = `partners/${req.file.filename}`;
    }

    partner.name = req.body.name ?? partner.name;
    partner.description = req.body.description ?? partner.description;
    partner.order = req.body.order ?? partner.order;
    partner.isActive = req.body.isActive ?? partner.isActive;

    await partner.save();
    res.json({ success: true, data: partner });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* DELETE */
const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    if (partner.imageUrl) {
      const imagePath = path.join(__dirname, "..", "uploads", partner.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await Partner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Partner deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createPartner,
  getPartners,
  getAllPartners,
  updatePartner,
  deletePartner,
};
