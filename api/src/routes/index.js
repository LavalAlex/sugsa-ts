const { Router } = require("express");

const router = Router();

const Auth = require("./auth");
const Ticket = require("./ticket");

//Middleware
router.use("/auth", Auth);
router.use("/ticket", Ticket);

module.exports = router;
