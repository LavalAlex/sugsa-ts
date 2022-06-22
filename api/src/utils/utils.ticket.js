const User = require("../schemas/User");
const Ticket = require("../schemas/Ticket");
const Business = require("../schemas/Business");

const transporter = require("../Conf/Mailer");

const { EMAIL_USER } = process.env;

const multer = require("multer");
const TicketConfig = require("../schemas/TicketConfig");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const createTicket = async ({ email, description }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "Error, this user does not exits" };


  // let image = {};
  // if (file) {
  //   image = {
  //     name: file.name,
  //     data: file.toString("base64"),
  //     size: file.size,
  //     mimetype: file.mimetype,
  //   };
  // }
  let {newTech, newType} = await assignedTicket(user);

  const newTicket = await Ticket.create({
    email,
    name: user.name,
    last_name: user.last_name,
    description,
    business: user.business,
    departament: user.departament,
    assigned_technical: newTech,
    classification: newType,
    register: [
      {
        date_register: Date.now(),
        description: "Registro de nuevo caso",
      },
    ],

  });

  if (newTicket) {
    let info = await transporter.sendMail({
      from: `"Asignacion de Nuevo Ticket 👻" <${EMAIL_USER}>`, // sender address
      to: `${newTech.email}`, // list of receivers
      subject: "Nuevo-Ticket ✔", // Subject line
      // text: "Hello world?", // plain text body
      html: `<b>Se le acaba de asignar el ticket número: ${newTicket.id}</b>
      `, // html body
    });
    return { msg: "Created ticket successfully" };
  }
  return { error: "Error on create the ticket" };
};

const findAllTicket = async (email) => {
  const allTicket = await Ticket.find({ email });
  const tickets = allTicket.filter(
    (e) => e.status != "Cancel" && e.status != "Close"
  );
  tickets.sort((a, b) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  });
  return tickets;
};

const assignedTicket = async (user) => {
  let business = await Business.findOne({ name: user.business });
  let ticket = await TicketConfig.findOne({business: user.business})

  let newTech = {
    name: business.assignedTechnical.name,
    last_name: business.assignedTechnical.last_name,
    email: business.assignedTechnical.email,
  };

  let newType = ticket.classification_default
  return {newTech, newType}
};

const editTicket = async (id, { status, feedback }) => {
  const update = {
    status,
    feedback,
    closeAt: Date.now(),
  };
  let updateTicket = await Ticket.findByIdAndUpdate(id, update, {
    new: true,
  });
  return updateTicket;
};

module.exports = { createTicket, findAllTicket,  editTicket };
