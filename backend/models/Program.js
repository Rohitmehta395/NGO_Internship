const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a program title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "online-academy",
        "project-salaam",
        "project-journalism",
        "others",
      ],
    },
    icon: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "default-program.jpg",
    },
    participants: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", programSchema);
