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
      imageUrl: `partners/${req.file.filename}`,
      order: 0,
    });
    res.status(201).json({ success: true, data: partner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* READ */
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: partners });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* UPDATE */
const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });

    if (req.file && partner.imageUrl) {
      const oldPath = path.join(__dirname, "..", "uploads", partner.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      partner.imageUrl = `partners/${req.file.filename}`;
    }

    partner.name = req.body.name ?? partner.name;
    partner.description = req.body.description ?? partner.description;

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
    if (!partner)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });

    if (partner.imageUrl) {
      const imagePath = path.join(__dirname, "..", "uploads", partner.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Partner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Partner deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* REORDER */
const reorderPartners = async (req, res) => {
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
      await Partner.bulkWrite(operations);
    }

    res.status(200).json({ success: true, message: "Reordered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPartner,
  getPartners,
  updatePartner,
  deletePartner,
  reorderPartners,
};
