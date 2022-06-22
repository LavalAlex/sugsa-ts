const { Router } = require("express");
const jwt = require("jsonwebtoken");
const transporter = require("../Conf/Mailer");
const Ticket = require("../schemas/Ticket");
const TicketConfig = require("../schemas/TicketConfig");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const {
  editTicketAdmin,
  filterTicketStatus,
  adminCreateTicket,
  orderTickets,
  feedbackTicketUser,
} = require("../utils/utils.ticket.admin");
const { createTicketConfig } = require("../utils/utils.ticketConfig.admin");
const { verifyToken } = require("../utils/verifyToken");

const router = Router();

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
    const ticketId = req.params.id;
    const update = req.body;
    const ticketUpdate = await editTicketAdmin(ticketId, update);
    res.status(200).send({ ticket: ticketUpdate });
  } catch (e) {
    console.log("Error on update ticket", e);
    res.status(500).send({ error: "Error on ticket update" });
  }
});

router.get("/status/:status", verifyToken, async (req, res) => {
  try {
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
    const allTicket = await filterTicketStatus(req.params.status);
    res.status(200).send(allTicket);
  } catch (e) {
    console.log("Error on filter ticket", e);
    res.status(500).send({ error: "Error on filter update" });
  }
});

router.get("/alltickets", verifyToken, async (req, res) => {
  try {
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
    const allTicket = await orderTickets();
    if (!allTicket)
      res.status(404).send({ error: "this tickets does not exist" });
    res.status(200).send(allTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(allTicket);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
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

router.post("/ticket/create", verifyToken, async (req, res) => {
  try {
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
    const newTicket = await adminCreateTicket(req.body);
    if (newTicket.msg) res.status(200).send(newTicket);
    else res.status(404).send(newTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(newTicket);
  }
});

router.put("/ticket/feedback/:id", async (req, res) => {
  const ticketId = req.params.id;
  const data = req.body;
  if (data.feedback) {
    try {
      const ticket = await feedbackTicketUser(ticketId, data);
      if (!ticket.error) {
        res.send({ msg: "Feedback creado con éxito!" }).status(200);
      } else {
        res.status(404).send({ msg: "No se pudo crear el feedback al ticket" });
      }
    } catch (e) {
      console.log("Error al crear feedback-ticket", e);
      res.status(404).send({ error: "Error al crear feedback-ticket" });
    }
  } else {
    res.status(404).send({ error: "Error al crear feedback-ticket" });
  }
});

router.get("/ticket/ticketconfig/:name", async (req, res) => {
  try {
    const name = req.params.name
    if(!name)  res.status(404).send({ msg: "No hay tickets-config cargados" });
    const tickets = await TicketConfig.findOne({business:name});
    if (!tickets)
      res.status(200).send([{ msg: "No hay tickets-config cargados" }]);
    else res.status(200).send(tickets);
  } catch (e) {
    console.log("Error al buscar ticket-config", e);
    res.status(200).send({ error: "Error al buscar ticket-config" });
  }
});

router.put("/ticket/createTicketConfig", async (req, res) => {
  try{
    const newTicket = await createTicketConfig(req.body)
    if(newTicket.error) res.status(500).send(newTicket)
    else res.status(200).send(newTicket)
  }catch(e){
    console.log("Error al crear ticket-config", e);
    res.status(200).send({ error: "Error al crear ticket-config" });
  }
})
module.exports = router;
