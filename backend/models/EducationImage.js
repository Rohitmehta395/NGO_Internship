const mongoose = require("mongoose");

const educationImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EducationImage", educationImageSchema);
