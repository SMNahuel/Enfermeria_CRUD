const jwt = require("jsonwebtoken");

const TOKEN_KEY = "!dsadsa";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send("Token requerido");
  }

  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Token invalido");
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const data = jwt.decode(token);
  if (!data.user.rol === 2) {
    return res.status(401).send("No autorizado");
  }

  next();
};

const getData = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const data = jwt.decode(token);
  return data;
};

module.exports = {
  verifyToken,
  getData,
  verifyAdmin,
};
