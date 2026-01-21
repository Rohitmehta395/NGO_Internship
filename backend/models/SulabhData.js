const mongoose = require("mongoose");

const sulabhDataSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["mission", "core_module"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    learnMoreLink: { type: String },
    videoLink: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SulabhData", sulabhDataSchema);
