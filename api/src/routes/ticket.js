const { Router } = require("express");
const Ticket = require("../schemas/Ticket");
const { createTicket } = require("../utils/utils.auth");
const router = Router();

router.post("/create", async (req, res) => {
  try {
    const newTicket = await createTicket(req.body);
    if (newTicket.msg) res.status(200).send(newTicket);
    res.status(404).send(newTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(newTicket);
  }
});

router.get("/allticket", async (req, res) => {
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

router.put("/update/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const update = req.body;
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true,
    });
    res.status(200).send({ ticket: ticketUpdate });
  } catch (e) {
    console.log("Error on update ticket", e);
    res.status(500).send({ error: "Error on ticket update" });
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