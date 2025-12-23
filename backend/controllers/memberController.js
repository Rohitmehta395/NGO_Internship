const Member = require("../models/Member");
const fs = require("fs");
const path = require("path");

// @desc    Get all members
// @route   GET /api/members
const getMembers = async (req, res) => {
  try {
    const members = await Member.find({}).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a member with Image
// @route   POST /api/members
const addMember = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      // Normalize path for Windows/Linux compatibility
      imagePath = req.file.path.replace(/\\/g, "/");
    }

    const member = await Member.create({
      ...req.body,
      image: imagePath,
    });

    res.status(201).json({ success: true, data: member });
  } catch (error) {
    // If error, delete uploaded file to save space
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a member
// @route   PUT /api/members/:id
const updateMember = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Only update image if a new file is uploaded
    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const member = await Member.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!member)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: member });
  } catch (error) {
    if (req.file) require("fs").unlinkSync(req.file.path);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a member
// @route   DELETE /api/members/:id
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res.status(404).json({ success: false, message: "Not found" });

    // Delete associated image file
    if (member.image) {
      const filePath = path.join(__dirname, "..", member.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await member.deleteOne();
    res.json({ success: true, message: "Member removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMembers, addMember, updateMember, deleteMember };
