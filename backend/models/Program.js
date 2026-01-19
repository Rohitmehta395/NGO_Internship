const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
    category: { type: String, required: true },
    slug: { type: String, required: false },
    source: { type: String, required: true },
    route: { type: String, required: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Program", programSchema);
