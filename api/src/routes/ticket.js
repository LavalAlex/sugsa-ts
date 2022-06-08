const { Router } = require("express");

const Ticket = require("../schemas/Ticket");
const { createTicket, findAllTicket, editTicket } = require("../utils/ticket.utils");
const router = Router();

router.post("/create", async (req, res) => {
  try {
    const newTicket = await createTicket(req.body);
    if (newTicket.msg) res.status(200).send(newTicket);
    else res.status(404).send(newTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(newTicket);
  }
});

router.post("/allticket", async (req, res) => {
  try {
    const { email } = req.body;
    const allTicket = await findAllTicket(email);
    if (!allTicket)
      res.status(404).send({ error: "this tickets does not exist" });
    else res.status(200).send(allTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(allTicket);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const update = req.body;
  
    const ticketUpdate = await editTicket(ticketId,req.body)

    res.status(200).send({msg: "Ticket editado con éxito!" });
  } catch (e) {
    console.log("Error en la actualización de ticket", e);
    res.status(500).send({ error: "Error en la actualización de ticket" });
  }
});

module.exports = router;
