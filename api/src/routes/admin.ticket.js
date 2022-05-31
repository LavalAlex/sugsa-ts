const { Router } = require("express");
const jwt = require("jsonwebtoken");
const  transporter  = require("../Conf/Mailer");
const Ticket = require("../schemas/Ticket");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

const {
  editTicketAdmin,
  filterTicketStatus,
  adminCreateTicket,
  orderTickets,
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
    const allTicket = await orderTickets();
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

router.post("/ticket/create", async (req, res) => {
  try {
    const newTicket = await adminCreateTicket(req.body);
    if (newTicket.msg) res.status(200).send(newTicket);
    else res.status(404).send(newTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(newTicket);
  }
})



router.post('/feedback', async (req, res) => {

  const {id} = req.body
  let info = await transporter.sendMail({
    from: '"Feedback  Ticket 👻" <lavalalexander@gmail.com>', // sender address
    to: "lavalalexander@gmail.com", // list of receivers
    subject: "Feedback ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Click en el siguiente link para realizar su devolución!</b>
    <a href="http://localhost:3000/feedback/${id}> Feedback</a>`, // html body
  });

  res.send({msg: 'Readed email'}).status(200)
})

module.exports = router;
