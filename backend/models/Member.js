const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    // This category matches your About Us sections
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
      ],
    },
    role: {
      type: String, // e.g. "Managing Trustee"
      required: false,
    },
    image: {
      type: String, // Will store "uploads/filename.jpg"
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
  }
);

module.exports = mongoose.model("Member", memberSchema);
