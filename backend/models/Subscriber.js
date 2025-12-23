const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
