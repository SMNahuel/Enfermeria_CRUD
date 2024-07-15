var express = require("express");
var router = express.Router();
const ServiceController = require("../controller/service");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.get("/", verifyToken, async function (req, res, next) {
  const data = await ServiceController.getService();
  return res.status(200).json(data);
});

router.put("/:id", verifyToken, verifyAdmin, async function (req, res, next) {
  if (!req.params.id) {
    return res.status(404).send("Peticion incompleta");
  }

  if (!req.body.name) {
    return res.status(400).send("Falta el campo nombre");
  }

  await ServiceController.putService(req.body);

  const data = await ServiceController.getService();
  return res.status(200).json(data);
});

module.exports = router;
