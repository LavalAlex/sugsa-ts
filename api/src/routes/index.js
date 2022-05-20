const { Router } = require("express");

const router = Router();

const Auth = require("./auth");
const Ticket = require("./ticket");
const Admin =  require('./admin.auth')
const AdminTicket = require('./admin.ticket')

//Middleware
router.use("/auth", Auth);
router.use("/ticket", Ticket);
router.use('/admin', Admin )
router.use('/admin', AdminTicket)

module.exports = router;
