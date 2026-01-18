const Program = require("../models/Program");
const fs = require("fs");
const path = require("path");

// Get all programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a program
exports.createProgram = async (req, res) => {
  try {
    const { title, description, type, category, route, videoUrl, slug } =
      req.body;
    let source = "";

    if (type === "image") {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Image is required" });
      }
      source = `uploads/programs/${req.file.filename}`;
    } else {
      source = videoUrl;
    }

    const newProgram = new Program({
      title,
      description,
      type,
      category,
      source,
      route,
      slug,
    });

    await newProgram.save();
    res.status(201).json({ success: true, data: newProgram });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a program
exports.updateProgram = async (req, res) => {
  try {
    const { title, description, type, category, route, videoUrl, slug } =
      req.body;
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }

    let source = program.source;

    // Handle Image Update
    if (type === "image" && req.file) {
      if (program.type === "image" && program.source.startsWith("uploads")) {
        const oldPath = path.join(__dirname, "..", program.source);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      source = `uploads/programs/${req.file.filename}`;
    }
    // Handle Video Update
    else if (type === "video" && videoUrl) {
      source = videoUrl;
    }

    program.title = title || program.title;
    program.description = description || program.description;
    program.type = type || program.type;
    program.category = category || program.category;
    program.source = source;
    program.route = route || program.route;

    if (slug) program.slug = slug;

    await program.save();
    res.status(200).json({ success: true, data: program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }

    if (program.type === "image" && program.source.startsWith("uploads")) {
      const filePath = path.join(__dirname, "..", program.source);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await program.deleteOne();
    res.status(200).json({ success: true, message: "Program deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
