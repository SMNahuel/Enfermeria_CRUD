const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();

// Controller
const userController = require("../controller/user");
const clientController = require("../controller/client");
const messageController = require("../controller/message");
const nurseController = require("../controller/nurse");

// Middleware
const { verifyToken } = require("../middleware/auth");

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await userController.getById(id);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", verifyToken, async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const data = jwt.decode(token);

  try {
    const user = await userController.getUserByEmail(data.user.email);
    const userClient = await userController.getNurseOfUser(user._id);

    return res.status(200).json(userClient);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error en la solicitud");
  }
});

router.post("/request", verifyToken, async function (req, res, next) {
  try {
    const { idNurse, msj, idClient } = req.body;

    if (!idNurse) {
      return res.status(400).send("No selecciono su enfermero");
    }

    if (!msj) {
      return res.status(400).send("No creo un mensaje para el enfermero");
    }

    if (!idClient) {
      return res.status(400).send("No hay un usuario");
    }
    //Agregar enfermero al cliente
    await clientController.addNurse(idClient, idNurse);

    // Agregar cliente al enfermero
    await nurseController.addClient(idNurse, idClient);

    // Creamos el mensaje en el chat
    await messageController.createMessage(idClient, idNurse, msj, true);

    return res.status(200).send("Solicitud realizada");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error en la solicitud");
  }
});

router.post("/onboarding/client", async function (req, res, next) {
  try {
    const { numberOfStreet, province, street, photo, email } = req.body;
    const newClient = await clientController.createClient(
      numberOfStreet,
      province,
      street,
    );
    const userModify = await userController.getUserByEmail(email);

    const userClient = await userController.registerClient(
      userModify._id,
      newClient,
      photo
    );

    const user = await userController.getNurseOfUser(userModify._id);
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error en la solicitud");
  }
});

router.post("/onboarding/nurse", verifyToken, async function (req, res, next) {
  try {
    const newNurse = await Nurse.createNurse(req.body);
    const userModify = await User.getUserByEmail(req.user.user.email);

    const userNurse = await User.registerNurse(
      userModify._id,
      newNurse,
      req.body.photo
    );

    return res.status(200).json(userNurse);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error en la solicitud");
  }
});

module.exports = router;
