const mongoose = require("mongoose");

const ScreenshotSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Screenshot", ScreenshotSchema);
