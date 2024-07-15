var express = require("express");
var router = express.Router();

//Controller
const messageController = require("../controller/message");

// Middleware
const { verifyToken } = require("../middleware/auth");

router.get("/:idClient/:idNurse", async function (req, res, next) {
  try {
    const { idClient, idNurse } = req.params;
    if (!idClient) {
      return res.status(400);
    }
    if (!idNurse) {
      return res.status(400);
    }
    const message = await messageController.getMessage(idClient, idNurse);

    return res.status(200).send(message);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.post(
  "/:idClient/:idNurse",

  async function (req, res, next) {
    try {
      const { idClient, idNurse } = req.params;
      const { content, who } = req.body;
      if (!idClient) {
        return res.status(400);
      }
      if (!idNurse) {
        return res.status(400);
      }
      if (!content) {
        return res.status(400);
      }
      const message = await messageController.createMessage(
        idClient,
        idNurse,
        content,
        who
      );

      const AllMessage = await messageController.getMessage(idClient, idNurse);

      return res.status(200).send(AllMessage);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
);

module.exports = router;
