const { Router } = require("express");
const path = require("path");
const { unlink } = require("fs-extra");

// const Ticket = require("../schemas/ThandleImageicket");
const {
  createTicket,
  findAllTicket,
  editTicket,
} = require("../utils/utils.ticket");
const { verifyToken } = require("../utils/verifyToken");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

router.post("/create", verifyToken, async (req, res) => {
  try {
    // const {file} = req.files
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
  

    const newTicket = await createTicket(req.body);
    if (newTicket.msg) res.status(200).send(newTicket);
    else res.status(404).send(newTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(newTicket);
  }
});

router.post("/allticket", verifyToken, async (req, res) => {
  try {
    // console.log(req.token)
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
    const { email } = req.body;
    const allTicket = await findAllTicket(email);
    if (!allTicket) res.status(404).send({ error: "No existen tickets" });
    else res.status(200).send(allTicket);
  } catch (e) {
    console.log("Error on create", e);
    res.status(404).send(allTicket);
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    var decoded = jwt.verify(req.token, JWT_SECRET);
    if (!decoded.user) res.status(403).send({ error: "Token invalido" });
    const ticketId = req.params.id;
    const update = req.body;

    const ticketUpdate = await editTicket(ticketId, req.body);

    res.status(200).send({ msg: "Ticket editado con éxito!" });
  } catch (e) {
    console.log("Error en la actualización de ticket", e);
    res.status(500).send({ error: "Error en la actualización de ticket" });
  }
});

// router.post("/upload", async (req, res) => {
//   const ticket = new Ticket();
//   const image = {};

//   image.filename = req.file.filename;
//   image.path = "/img/uploads/" + req.file.filename;
//   image.originalname = req.file.originalname;
//   image.mimetype = req.file.mimetype;
//   image.size = req.file.size;

//   // ticket.img = image;
 
//   console.log(image)
//   // await ticket.save();
//   res.status(200).send(image);
// });

module.exports = router;
