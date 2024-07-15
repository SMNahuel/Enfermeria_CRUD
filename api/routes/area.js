var express = require("express");
var router = express.Router();
const AreaController = require("../controller/area");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
/* GET users listing. */
router.get("/", verifyToken, async function (req, res, next) {
  const data = await AreaController.getArea();
  return res.status(200).json(data);
});

router.put("/:id", verifyToken, verifyAdmin, async function (req, res, next) {
  if (!req.params.id) {
    return res.status(404).send("Peticion incompleta");
  }

  if (!req.body.name) {
    return res.status(400).send("Falta el campo nombre");
  }
  await AreaController.putArea(req.body);
  const data = await AreaController.getArea();
  return res.status(200).json(data);
});

module.exports = router;
