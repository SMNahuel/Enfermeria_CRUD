const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    idClient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idNurse: {
      type: Schema.Types.ObjectId,
      ref: "Nurse",
      required: true,
    },
    who: {
      type: Schema.Types.Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Message", messageSchema);

module.exports = User;
