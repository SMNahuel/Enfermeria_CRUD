const { default: mongoose } = require("mongoose");
const User = require("../schema/user");

module.exports = {
  deleteUser: async function (email) {
    return User.deleteOne({ email });
  },
  registerUser: async function ({
    email,
    password,
    phone,
    name,
    lastName,
    rol,
  }) {
    return User.findOne({
      attributes: ["id"],
      where: { email },
    })
      .then((user) => {
        if (user) throw `User ${email} already exists`;
        return User.create({
          email,
          password,
          phone,
          name,
          lastName,
          rol: parseInt(rol),
          onBoarding: false,
        });
      })
      .then((user) => this.getById(user.id));
  },
  registerNurse: async function (id, nurse, urlPhoto) {
    return User.findByIdAndUpdate(id, {
      idNurse: nurse._id,
      photo: urlPhoto,
      onBoarding: true,
    });
  },
  registerClient: async function (id, client, urlPhoto) {
    return User.findByIdAndUpdate(
      { _id: id },
      {
        idClient: client._id,
        photo: urlPhoto,
        onBoarding: true,
      }
    );
  },
  loginUser: async function ({ email, password }) {
    if (email) {
      return User.findOne({
        email,
      });
    }
  },
  getUserByEmail: async function (email) {
    return User.findOne({ email });
  },
  getUserById: (id) => {
    return User.findOne({ _id: id });
  },
  getById: async function (email) {
    return User.aggregate([
      {
        $match: { email: email },
      },
      {
        $lookup: {
          from: "clients",
          localField: "idClient",
          foreignField: "_id",
          as: "Cliente",
        },
      },
    ]);
  },
  getUserByIdClient: (id) => {
    return User.findOne({
      idClient: id,
    });
  },
  getUserByIdNurse: (id) => {
    return User.findOne({
      idNurse: id,
    });
  },
  getClient: async function () {
    return User.aggregate([
      {
        $match: { rol: 0 },
      },
      {
        $lookup: {
          from: "clients",
          localField: "idClient",
          foreignField: "_id",
          as: "Cliente",
        },
      },
    ]);
  },
  getUserWithClient: (id) => {
    return User.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "clients",
          localField: "idClient",
          foreignField: "_id",
          as: "Cliente",
        },
      },
    ]);
  },
  getNurse: () => {
    return User.aggregate([
      {
        $match: { rol: 1, onBoarding: true },
      },
      {
        $lookup: {
          from: "nurses",
          localField: "idNurse",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "services",
                localField: "service",
                foreignField: "_id",
                as: "Servicios",
              },
            },
            {
              $lookup: {
                from: "areas",
                localField: "area",
                foreignField: "_id",
                as: "Area",
              },
            },
          ],
          as: "Enfermero",
        },
      },
    ]);
  },
  getNurseById: (id) => {
    id = new mongoose.Types.ObjectId(id);
    return User.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "nurses",
          localField: "idNurse",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "services",
                localField: "service",
                foreignField: "_id",
                as: "Servicios",
              },
            },
            {
              $lookup: {
                from: "areas",
                localField: "area",
                foreignField: "_id",
                as: "Area",
              },
            },
          ],
          as: "Enfermero",
        },
      },
    ]);
  },
  getNurseOfUser: (id) => {
    id = new mongoose.Types.ObjectId(id);
    return User.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "clients",
          localField: "idClient",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "nurses",
                localField: "idNurse",
                foreignField: "_id",
                pipeline: [
                  {
                    $lookup: {
                      from: "services",
                      localField: "service",
                      foreignField: "_id",
                      as: "Servicios",
                    },
                  },
                  {
                    $lookup: {
                      from: "areas",
                      localField: "area",
                      foreignField: "_id",
                      as: "Area",
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      localField: "_id",
                      foreignField: "idNurse",
                      as: "Usuario",
                    },
                  },
                ],
                as: "Enfermero",
              },
            },
          ],
          as: "Cliente",
        },
      },
      {
        $lookup: {
          from: "nurses",
          localField: "idNurse",
          foreignField: "_id",
          pipeline: [
            {
              $lookup: {
                from: "clients",
                localField: "clients",
                as: "Clientes",
              },
              $lookup: {
                from: "users",
                localField: "clients",
                foreignField: "idClient",
                as: "Usuario",
              },
            },
          ],
          as: "Enfermero",
        },
      },
    ]);
  },
  updateUser: async function (id, user) {
    return User.updateOne(
      {
        _id: id,
      },
      {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        rol: user.rol,
      }
    );
  },
};
