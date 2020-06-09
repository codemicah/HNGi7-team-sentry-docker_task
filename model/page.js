const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
