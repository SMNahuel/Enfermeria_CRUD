const express = require("express");
const router = express.Router();

//Controller
const ReviewController = require("../controller/review");
const UserController = require("../controller/user");

//Middleware
const { verifyToken } = require("../middleware/auth");

router.post("/", async (req, res, next) => {
  try {
    const { idClient, idNurse, qualification, content } = req.body;

    if (!idClient) {
      return res.status(401).send("Error no se indico usuario");
    }

    if (!idNurse) {
      return res.status(401).send("Error no se indico enfermerp");
    }

    if (!qualification) {
      return res.status(401).send("Error no se indico calificacion");
    }

    if (!content) {
      return res.status(401).send("Error no se indico mensaje");
    }

    const newReview = await ReviewController.addReview(
      idNurse,
      idClient,
      content,
      qualification
    );

    return res
      .status(200)
      .json({ message: "Review crete successfull", review: newReview });
  } catch (err) {
    
    return res.status(500).send("Error servidor");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userNurse = await UserController.getUserById(id);

    const reviews = await ReviewController.getReview(userNurse.idNurse);

    return res.status(200).send(reviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error servidor");
  }
});

module.exports = router;
