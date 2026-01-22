const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, default: "Admin" },
    slug: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    link: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
