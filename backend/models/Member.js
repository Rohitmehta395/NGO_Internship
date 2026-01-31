// backend/models/Member.js
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: [
        "guiding-spirit",
        "trustee",
        "advisor",
        "patron",
        "volunteer",
        "team",
        "guest-speaker",
        "storyteller",
      ],
    },
    role: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Member", memberSchema);
