const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("Service", serviceSchema);

module.exports = User;
