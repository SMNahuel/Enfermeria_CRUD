const express = require("express");
const router = express.Router();
const user = require("../controller/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TOKEN_KEY = "!dsadsa";

/* GET users listing. */
router.post("/register", async function (req, res, next) {
  var { name, lastName, email, password, phone, rol } = req.body;
  req.body.password = await bcrypt.hash(password, 10);
  if (!email) {
    return res.status(400).send("Body must have a email for register");
  }
  if (!name) {
    return res.status(400).send("Body must have a name for register");
  }
  if (!lastName) {
    return res.status(400).send("Body must have a lastName for register");
  }
  if (!password) {
    return res.status(400).send("Body must have a password for register");
  }
  if (!phone) {
    return res.status(400).send("Body must have a phone for register");
  }
  if (!rol) {
    return res.status(400).send("Body must have a rol for register");
  }

  const userExist = await user.getUserByEmail(email);

  if (userExist) {
    return res.status(401).send("User exist email");
  }
  const newUseR = user.registerUser(req.body);
  const token = jwt.sign(
    {
      user: {
        email,
        name,
        rol,
        onBoarding: newUseR.onBoarding,
        photo: newUseR.photo,
        lastName,
      },
    },
    TOKEN_KEY,
    {
      expiresIn: "12h",
    }
  );
  res.status(200).json({ message: "Usuario registrado", token: token });
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const userLogin = await user.getUserByEmail(email);

    if (!email) {
      return res.status(400).send("Body must have a email for login");
    }

    if (!password) {
      return res.status(400).send("Body must have a password for login");
    }

    if (!userLogin) {
      return res.status(401).send("User not exist");
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        user: {
          email,
          name: userLogin.name,
          rol: userLogin.rol,
          onBoarding: userLogin.onBoarding,
          lastName: userLogin.lastName,
          photo: userLogin.photo,
        },
      },
      TOKEN_KEY,
      {
        expiresIn: "12h",
      }
    );

    const userClient = await user.getNurseOfUser(userLogin._id);

    return res
      .status(200)
      .json({ message: "Succesfull Login", token: token, user: userClient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", err: error });
  }
});

module.exports = router;
