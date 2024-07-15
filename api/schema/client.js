const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new mongoose.Schema({
  idNurse: {
    type: [{ type: Schema.Types.ObjectId, ref: "Nurse" }],
  },
  province: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  numberOfStreet: {
    type: Number,
    required: true,
  },
  qualification: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5],
  },
});

const User = mongoose.model("Client", clientSchema);

module.exports = User;
