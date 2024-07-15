const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("Area", areaSchema);

module.exports = User;
