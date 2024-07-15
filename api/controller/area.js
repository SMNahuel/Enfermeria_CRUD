const Area = require("../schema/area");

module.exports = {
  createArea: ({ name }) => {
    return Area.create({ name });
  },
  deleteArea: ({ name }) => {
    return Area.deleteOne({ name });
  },
  getArea: () => {
    return Area.find();
  },
  putArea: (item) => {
    return Area.updateOne(
      {
        _id: item._id,
      },
      {
        name: item.name,
      }
    );
  },
};
