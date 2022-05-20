const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Ticket = require("../schemas/Ticket");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const {
  createAdmin,
  findAll,
  findAdmin,
  editTicketAdmin,
  filterTicketStatus,
} = require("../utils/utils.authAdmin");

const router = Router();

router.put("/update/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const update = req.body;
    const ticketUpdate = await editTicketAdmin(ticketId, update);
    res.status(200).send({ ticket: ticketUpdate });
  } catch (e) {
    console.log("Error on update ticket", e);
    res.status(500).send({ error: "Error on ticket update" });
  }
});

router.get("/status/:status", async (req, res) => {
  try{
    
    const allTicket = await filterTicketStatus(req.params.status)
    res.status(200).send(allTicket)
  }catch(e){
    console.log("Error on filter ticket", e);
    res.status(500).send({ error: "Error on filter update" });
  }
})

module.exports = router;
