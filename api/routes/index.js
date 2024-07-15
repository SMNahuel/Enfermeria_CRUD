const express = require("express");
const router = express.Router();

const CrudRouter = require("./crud");
const AuthRouter = require("./auth");
const NurseRouter = require("./nurse");
const ClientRouter = require("./client");

const UserRouter = require("./users");
const AreaRouter = require("./area");
const ReviewRouter = require("./review");
const ServiceRouter = require("./service");
const MessageRouter = require("./message");

/* GET home page. */
router.use("/auth", AuthRouter);
router.use("/crud", CrudRouter);
router.use("/nurse", NurseRouter);
router.use("/client", ClientRouter);
router.use("/review", ReviewRouter);

router.use("/area", AreaRouter);
router.use("/user", UserRouter);
router.use("/service", ServiceRouter);
router.use("/message", MessageRouter);

module.exports = router;
