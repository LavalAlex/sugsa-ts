const Business = require("../schemas/Business");
const Ticket = require("../schemas/Ticket");
const User = require("../schemas/User");
const transporter = require("../Conf/Mailer");
const Technical = require("../schemas/Technical");

const { EMAIL_USER } = process.env;

const Status = {
  Active: "Active",
  Pending: "Pending",
  Pending_Feedback: "Pending_Feedback",
  Close: "Close",
  Cancel: "Cancel",
};

const editTicketAdmin = async (ticketId, data) => {
  if (data.tech_descrip) {
    let ticket = await Ticket.findById(ticketId);
    let tech = ticket.register;
    tech.push({ description: data.tech_descrip });
    const ticketUpdate = await Ticket.findByIdAndUpdate(
      ticketId,
      { register: tech },
      {
        new: true,
      }
    );
    return ticketUpdate;
  }
  if (data.close) {
    const update = {
      status: "Pending_Feedback",
      feedback: true,
      closeAt: Date.now(),
    };
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true,
    });

    sendEmailFeedback(ticketId, ticketUpdate);
    return ticketUpdate;
  }
  if (data.assigned) {
    const tech = await Technical.findOne({ _id: data.assigned });
    if (data.classification) {
      const ticketUpdate = await Ticket.findByIdAndUpdate(
        ticketId,
        {
          assigned_technical: tech,
          classification: data.classification ? data.classification : "",
        },
        {
          new: true,
        }
      );
      sendEmailTechnical(ticketUpdate.id, tech.email);
      return ticketUpdate;
    } else {
      const ticketUpdate = await Ticket.findByIdAndUpdate(
        ticketId,
        { assigned_technical: tech },
        {
          new: true,
        }
      );
      sendEmailTechnical(ticketUpdate.id, tech.email);
      return ticketUpdate;
    }
  } else {
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, data, {
      new: true,
    });
    return ticketUpdate;
  }
};

const filterTicketStatus = async (status) => {
  if (status === "Status") {
    const allTicket = await Ticket.find({});
    allTicket.sort((a, b) => {
      if (a._id < b._id) return 1;
      if (a._id > b._id) return -1;
      return 0;
    });
    return allTicket;
  } else {
    const allTicket = await Ticket.find({ status: Status[status] });
    allTicket.sort((a, b) => {
      if (a._id < b._id) return 1;
      if (a._id > b._id) return -1;
      return 0;
    });
    return allTicket;
  }
};

const adminCreateTicket = async ({ email, description }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "Error, El usuario no existe!" };
  let technical = await assignedTechnical(user);
  const newTicket = await Ticket.create({
    email,
    name: user.name,
    description,
    last_name: user.last_name,
    business: user.business,
    departament: user.departament,
    assigned_technical: technical,
    register: [
      {
        date_register: Date.now(),
        description: "Registro de nuevo caso",
      },
    ],
  });
  if (newTicket) {
    sendEmailTechnical(newTicket.id, technical.email);
    return { msg: "Ticket creado exitosamente!" };
  }
  return { error: "Error no se pudo crear el ticket!" };
};

const assignedTechnical = async (user) => {
  let business = await Business.findOne({ name: user.business });
  let newTech = {
    name: business.technicals[business.technicals.length - 1].name,
    last_name: business.technicals[business.technicals.length - 1].last_name,
    email: business.technicals[business.technicals.length - 1].email,
  };
  return newTech;
};

const orderTickets = async () => {
  const tickets = await Ticket.find({});
  tickets.sort((a, b) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  });
  // const orderTicket = orderTicket.filter((e) => e.status != "Pending Feedback");
  return tickets;
};

const sendEmailFeedback = async (id, ticket) => {
  let info = await transporter.sendMail({
    from: `"Feedback  Ticket 👻" <${EMAIL_USER}>`, // sender address
    to: ticket.email, // list of receivers
    subject: "Feedback ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Click en el siguiente link para realizar su devolución!</b>
    <a href="http://localhost:3000/feedback/${id}> Feedback</a>`, // html body
  });
};

const sendEmailTechnical = async (id, emailTech) => {
  let info = await transporter.sendMail({
    from: `"Asignacion de Nuevo Ticket 👻" <${EMAIL_USER}>`, // sender address
    to: `${EMAIL_USER}`, // list of receivers
    subject: "Nuevo-Ticket ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Se le acaba de asignar el ticket número: ${id}</b>
    `, // html body
  });

  return { msg: "Email enviado exitosamente!" };
};

const feedbackTicketUser = async (id, data) => {
  let ticket = await Ticket.findOne({ _id: id });
  let update = {
    feedback: data.feedback,
    status: "Close",
    closeAt: Date.now(),
  };
  if (ticket.feedback === "true") {
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticket._id, update, {
      new: true,
    });
    return ticketUpdate;
  } else return { error: "Error al crear Feedback-Ticket" };
};

module.exports = {
  editTicketAdmin,
  filterTicketStatus,
  adminCreateTicket,
  orderTickets,
  feedbackTicketUser,
};
