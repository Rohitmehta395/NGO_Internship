const mongoose = require("mongoose");

const mediaTestimonialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    source: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    link: { type: String },
  },
  { timestamps: true }
);

const MediaTestimonial = mongoose.model("MediaTestimonial", mediaTestimonialSchema);

module.exports = MediaTestimonial;