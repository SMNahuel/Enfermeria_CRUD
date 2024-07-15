const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "No cumple con la estructura de un email",
    ],
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rol: {
    type: Number,
    required: true,
    enum: [0, 1, 2],
  },
  photo: {
    type: String,
  },
  onBoarding: {
    type: Boolean,
    required: true,
  },
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  idNurse: {
    type: Schema.Types.ObjectId,
    ref: "Nurse",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
