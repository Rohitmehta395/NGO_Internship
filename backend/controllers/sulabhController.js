const SulabhData = require("../models/SulabhData");
const fs = require("fs");
const path = require("path");

// Get all items
exports.getSulabhData = async (req, res) => {
  try {
    const { category, sort } = req.query;
    let query = {};
    if (category) query.category = category;

    // Sort Logic
    let sortOption = { order: 1, createdAt: -1 }; // Default (Custom Order)

    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const data = await SulabhData.find(query).sort(sortOption);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new item
exports.createSulabhData = async (req, res) => {
  try {
    const { title, description, category, learnMoreLink, videoLink } = req.body;

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/sulabh/${req.file.filename}`;
    }

    // Get the highest order to append new item at the end
    const lastItem = await SulabhData.findOne({ category }).sort({ order: -1 });
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const newItem = new SulabhData({
      title,
      description,
      category,
      image: imagePath,
      learnMoreLink,
      videoLink,
      order: newOrder,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item
exports.updateSulabhData = async (req, res) => {
  try {
    const { title, description, category, learnMoreLink, videoLink } = req.body;
    const item = await SulabhData.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    let imagePath = item.image;
    if (req.file) {
      // Delete old image if it exists and is different
      if (item.image) {
        const oldPath = path.join(__dirname, "..", item.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      imagePath = `/uploads/sulabh/${req.file.filename}`;
    }

    item.title = title || item.title;
    item.description = description || item.description;
    item.category = category || item.category;
    item.learnMoreLink = learnMoreLink;
    item.videoLink = videoLink;
    item.image = imagePath;

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reorder Items
exports.reorderSulabhData = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const bulkOps = items.map((item, index) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { order: index },
      },
    }));

    await SulabhData.bulkWrite(bulkOps);
    res.status(200).json({ message: "Reordered successfully" });
  } catch (error) {
    console.error("Reorder Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete item
exports.deleteSulabhData = async (req, res) => {
  try {
    const item = await SulabhData.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.image) {
      const filePath = path.join(__dirname, "..", item.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await SulabhData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
