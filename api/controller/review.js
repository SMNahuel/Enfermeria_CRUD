const { default: mongoose } = require("mongoose");
const Review = require("../schema/review");

module.exports = {
  addReview: async function (idNurse, idClient, content, qualification) {
    return Review.create({
      idNurse: idNurse,
      idClient: idClient,
      content: content,
      qualification: qualification,
    });
  },
  getReview: (id) => {
    id = new mongoose.Types.ObjectId(id);
    return Review.find({
      idNurse: id,
    });
  },
};
