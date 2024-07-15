const { default: mongoose } = require("mongoose");
const Nurse = require("../schema/nurse");

module.exports = {
  createNurse: async function ({
    description,
    registrationNumber,
    area,
    service,
    price,
  }) {
    return Nurse.create({
      rating: 0,
      description,
      registrationNumber,
      clients: [],
      area,
      service,
      price,
    });
  },
  deleteNurse: async function (idNurse) {
    return Nurse.deleteOne({ _id: idNurse });
  },
  updateNurse: async function (id, item) {
    return Nurse.updateOne(
      {
        _id: id,
      },
      {
        service: item.service,
        area: item.area,
      }
    );
  },
  getNurse: async function (id) {
    id = new mongoose.Types.ObjectId(id);
    return Nurse.findOne({ _id: id });
  },
  addClient: async function (id, client) {
    return Nurse.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $addToSet: { clients: client },
      }
    );
  },
};
