const express = require("express");
const router = express.Router();

//Controller
const AreaController = require("../controller/area");
const UserController = require("../controller/user");
const NurseController = require("../controller/nurse");
const ClientController = require("../controller/client");
const ServiceController = require("../controller/service");

//Middleware
const { verifyToken, verifyAdmin } = require("../middleware/auth");

/* Obetenemos todos los datos para el front */

router.get("/", verifyToken, verifyAdmin, async function (req, res, next) {
  const data = {
    service: [],
    nurse: [],
    client: [],
    area: [],
  };

  data.area = await AreaController.getArea();
  data.nurse = await UserController.getNurse();
  data.client = await UserController.getClient();
  data.service = await ServiceController.getService();

  return res.status(200).json(data);
});

/* AREA CRUD */

router.post("/area", verifyToken, verifyAdmin, async function (req, res, next) {
  if (!req.body.name) {
    return res.status(400).send("Body must have a name for create area");
  }

  await AreaController.createArea(req.body);
  const areas = await AreaController.getArea();

  return res.status(200).json(areas);
});

router.delete(
  "/area/:name",
  verifyToken,
  verifyAdmin,
  async function (req, res, next) {
    if (!req.params.name) {
      return res.status(400).send("Body must have a name for delete area");
    }

    await AreaController.deleteArea(req.params);
    const areas = await AreaController.getArea();

    return res.status(200).json(areas);
  }
);

/* SERVICE CRUD */

router.post(
  "/service",
  verifyToken,
  verifyAdmin,
  async function (req, res, next) {
    if (!req.body.name) {
      return res.status(400).send("Body must have a name for create Service");
    }

    await ServiceController.createService(req.body);
    const servicedata = await ServiceController.getService();

    return res.status(200).json(servicedata);
  }
);

router.delete(
  "/service/:name",
  verifyToken,
  verifyAdmin,
  async function (req, res, next) {
    if (!req.params.name) {
      return res.status(400).send("Body must have a name for delete Service");
    }

    await ServiceController.deleteService(req.params);
    const services = await ServiceController.getService();

    return res.status(200).json(services);
  }
);

/* NURSE CRUD */

router.post("/nurse", verifyToken, verifyAdmin, async function () {});

router.delete(
  "/nurse/:idUser",
  verifyToken,
  verifyAdmin,
  async function (req, res, next) {
    console.log(req.params);
    if (!req.params.idUser) {
      return res.status(401).send("Body must have a id for delete Nurse");
    }
    const userData = await UserController.getUserById(req.params.idUser);
    console.log("informacion de usuario", userData);
    const nurseDelete = await NurseController.deleteNurse(userData.idNurse);
    console.log("enfermero eliminado", nurseDelete);
    const userDelete = await UserController.deleteUser(userData.email);
    console.log("usuario eliminado", userDelete);
    const nurse = await UserController.getNurse();
    return res.status(200).json(nurse);
  }
);

router.put("/nurse", verifyToken, verifyAdmin, async function () {});


/* USER CRUD */
router.delete(
  "/client/:idUser",
  verifyToken,
  verifyAdmin,
  async function (req, res, next) {
    console.log(req.params);
    if (!req.params.idUser) {
      return res.status(401).send("Body must have a id for delete Nurse");
    }
    const userData = await UserController.getUserById(req.params.idUser);
    console.log("informacion de usuario", userData);
    const clientDelete = await ClientController.deleteClient(userData.idNurse);
    console.log("enfermero eliminado", clientDelete);
    const userDelete = await UserController.deleteUser(userData.email);
    console.log("usuario eliminado", userDelete);
    const client = await UserController.getClient();
    return res.status(200).json(client);
  }
);


module.exports = router;
