const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    idClient: {
      type: String,
      required: true,
    },
    idNurse: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    qualification: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Review", reviewSchema);

module.exports = User;
