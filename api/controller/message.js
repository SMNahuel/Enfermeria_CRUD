const Message = require("../schema/message");

module.exports = {
  createMessage: (idClient, idNurse, msj, who) => {
    return Message.create({
      idClient: idClient,
      idNurse: idNurse,
      content: msj,
      who,
    });
  },
  getMessage: (idClient, idNurse) => {
    return Message.find({
      idClient: idClient,
      idNurse: idNurse,
    });
  },
};
