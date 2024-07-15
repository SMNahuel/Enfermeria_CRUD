const mongoose = require("mongoose");
const { Schema } = mongoose;
const nurseSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  area: {
    type: Schema.Types.ObjectId,
    ref: "Area",
  },
  service: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  price: {
    type: Number,
  },
});

const User = mongoose.model("Nurse", nurseSchema);

module.exports = User;
