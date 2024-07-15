const Service = require("../schema/service");

module.exports = {
  createService: ({ name }) => {
    return Service.create({ name });
  },
  getService: () => {
    return Service.find();
  },
  deleteService: ({ name }) => {
    return Service.deleteOne({ name });
  },
  putService: (item) => {
    return Service.updateOne(
      {
        _id: item._id,
      },
      {
        name: item.name,
      }
    );
  },
};
