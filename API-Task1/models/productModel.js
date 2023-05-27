const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Event name is required"],
  },
  tagline: {
    type: String,
    required: [true, "Tagline is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  moderator: {
    type: String,
    required: [true, "Moderator name is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  sub_category: {
    type: Buffer,
    required: [true, "Sub-category is required"],
  },
  photo: {
    type: String,
    required: [true, "Image path is required"],
  },
  schedule: {
    type: Date,
    default: Date.now,
    required: true,
  },
  rigor_rank: {
    type: Number,
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
