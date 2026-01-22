const mongoose = require("mongoose");

const HeroImageSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "home",
        "sulabh",
        "about",
        "programs",
        "partners",
        "events",
        "blogs",
        "testimonials",
      ],
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("HeroImage", HeroImageSchema);
