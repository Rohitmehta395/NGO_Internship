const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    month: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    youtubeUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
