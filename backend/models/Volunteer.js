const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      maxlength: [20, "Phone number cannot be longer than 20 characters"],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: {
      type: String,
      required: [true, "Please describe your experience"],
      maxlength: [1000, "Experience cannot be more than 1000 characters"],
    },
    availability: {
      type: String,
      required: [true, "Please specify your availability"],
      enum: ["part-time", "full-time", "weekends", "flexible"],
    },
    motivation: {
      type: String,
      required: [true, "Please tell us why you want to volunteer"],
      maxlength: [1000, "Motivation cannot be more than 1000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
