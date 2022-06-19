const { Router } = require("express");

const router = Router();

const Auth = require("./auth");
const Ticket = require("./ticket");
const Admin = require("./admin.auth");
const AdminTicket = require("./admin.ticket");
const Business = require("./business");
const Technical = require("./technical");
const Departament = require("./departament");

const mock = require("./mock.utils");

//Middleware
router.use("/auth", Auth);
router.use("/ticket", Ticket);
router.use("/admin", Admin);
router.use("/admin", AdminTicket);
router.use("/business", Business);
router.use("/technical", Technical);
router.use("/departament", Departament);

router.use("/mock", mock);
module.exports = router;
