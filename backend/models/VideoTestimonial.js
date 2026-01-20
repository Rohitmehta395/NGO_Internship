const mongoose = require("mongoose");

const videoTestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ytLink: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("VideoTestimonial", videoTestimonialSchema);
