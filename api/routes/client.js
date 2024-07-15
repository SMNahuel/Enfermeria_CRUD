const express = require("express");
const router = express.Router();

const UserController = require("../controller/user");
const ClientController = require("../controller/client");
const { verifyToken } = require("../middleware/auth");

router.put("/", verifyToken, async function (req, res, next) {
  try {
    const { user, client } = req.body;

    await ClientController.updateClient(user.idClient, client);
    await UserController.updateUser(user._id, user);

    const userClient = await UserController.getClient();

    return res.status(200).json(userClient);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Hubo un error en tu solicitud");
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const user = await UserController.getUserById(id);
    console.log(user)
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Hubo un error en tu solicitud");
  }
});

router.get("/client/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const user = await UserController.getUserByIdClient(id);
    console.log(user)
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Hubo un error en tu solicitud");
  }
});



module.exports = router;
