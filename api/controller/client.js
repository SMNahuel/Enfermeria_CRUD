const { default: mongoose } = require("mongoose");
const Client = require("../schema/client");

module.exports = {
  getClientById: (id) => {
    return Client.findOne({
      _id: id,
    });
  },
  createClient: async function ( numberOfStreet, province, street ) {
    return Client.create({
      province,
      street,
      numberOfStreet,
      qualification: 0,
    });
  },
  deleteClient: async function (idClient) {
    return Client.deleteOne({ _id: idClient });
  },
  addNurse: async function (id, nurse) {
    nurse = new mongoose.Types.ObjectId(nurse);

    return Client.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: { idNurse: nurse },
      }
    );
  },
  updateClient: async function (id, item) {
    return Client.updateOne(
      {
        _id: id,
      },
      {
        province: item.province,
        street: item.address,
        numberOfStreet: item.numberOfStreet,
      }
    );
  },
};
