const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Ticket = require("../schemas/Ticket");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const {
  editTicketAdmin,
  filterTicketStatus,
} = require("../utils/ticket.admin");

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

router.get("/alltickets", async (req, res) => {
  try {
    const allTicket = await Ticket.find({});
    if (!allTicket)
      res.status(404).send({ error: "this tickets does not exist" });
    res.status(200).send(allTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(allTicket);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticketDeleted = await Ticket.findByIdAndDelete(ticketId);
    if (ticketDeleted)
      res.status(200).send({ msg: "Deleted ticket successfully" });
    res.status(404).send({ error: "Error on delete ticket" });
  } catch (e) {
    console.log("Error on delete ticket", e);
    res.status(404).send({ error: "Error on delete ticket" });
  }
});

module.exports = router;
