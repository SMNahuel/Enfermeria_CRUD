const express = require("express");
const router = express.Router();

// Controler
const UserController = require("../controller/user");
const NurseController = require("../controller/nurse");

const { verifyToken, getData } = require("../middleware/auth");


router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  
  const nurseData = await UserController.getNurseById(id);
  
  return res.status(200).json(nurseData);
});

router.get("/nurse/:id", async function (req, res, next) {
  const { id } = req.params;
  
  const nurseData = await UserController.getUserByIdNurse(id);
  
  return res.status(200).json(nurseData);
})


router.get("/", async function (req, res, next) {
  const nurseData = await UserController.getNurse();

  return res.status(200).json(nurseData);
});


router.post("/", verifyToken, async function (req, res, next) {
  try {
    const data = getData(req);
    const newNurse = await NurseController.createNurse(req.body);
    const userModify = await UserController.getUserByEmail(data.user.email);

    const userNurse = await UserController.registerNurse(
      userModify._id,
      newNurse,
      req.body.photo
    );

    return res.status(200).json(userNurse);
  } catch (err) {
    return res.status(400).send("Hubo un error en tu solicitud");
  }
});

router.put("/", verifyToken, async function (req, res, next) {
  try {
    const { user, nurse } = req.body;

    await NurseController.updateNurse(user.idNurse, nurse);
    await UserController.updateUser(user._id, user);

    const userNurse = await UserController.getNurse();

    return res.status(200).json(userNurse);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Hubo un error en tu solicitud");
  }
});

module.exports = router;
