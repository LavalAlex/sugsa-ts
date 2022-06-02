const Business = require("../schemas/Business");
const Ticket = require("../schemas/Ticket");
const User = require("../schemas/User");
const transporter = require("../Conf/Mailer");
const Status = {
  Active: "Active",
  Pending: "Pending",
  Pending_Feedback: "Pending Feedback",
  Close: "Close",
  Cancel: "Cancel",
};

const editTicketAdmin = async (ticketId, data) => {
  if (data.feedback) {
    let ticket = await Ticket.findOne({ id: ticketId });
    let update ={
      feedback: data.feedback,
      status: "Close"
    }
    if (ticket.feedback === "true") {
      const ticketUpdate = await Ticket.findByIdAndUpdate(ticket._id, update, {
        new: true,
      });
      return ticketUpdate;
    } else return "";
  }
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
      status: "Pending Feedback",
      feedback: true,
      createdAt: Date.now(),
    };
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true,
    });

    feedbackTicket(ticketId, ticketUpdate);
    return ticketUpdate;
  }
  if (data.assigned) {
    const update = {
      status: "Active",
      assigned_technician: data.assigned,
      classification: data.classification,
    };
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true,
    });
    return ticketUpdate;
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
    return allTicket;
  } else {
    const allTicket = await Ticket.find({ status: Status[status] });
    return allTicket;
  }
};

const adminCreateTicket = async ({ email, description }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "Error, this user does not exits" };
  let technical = await assignedTechnical(user);
  const newTicket = await Ticket.create({
    email,
    name: user.name,
    description,
    last_name:user.last_name,
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
  if (newTicket) return { msg: "Created ticket successfully" };
  return { error: "Error on create the ticket" };
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
  let orderTicket = [];
  for (var i = tickets.length - 1; i >= 0; i--) {
    orderTicket.push(tickets[i]);
  }
  orderTicket = orderTicket.filter((e) => e.status != "Pending Feedback");
  return orderTicket;
};

const feedbackTicket = async (id, ticket) => {
  let info = await transporter.sendMail({
    from: '"Feedback  Ticket 👻" <lavalalextest@gmail.com>', // sender address
    to: ticket.email, // list of receivers
    subject: "Feedback ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Click en el siguiente link para realizar su devolución!</b>
    <a href="http://localhost:3000/feedback/${ticket.id}> Feedback</a>`, // html body
  });
};

module.exports = {
  editTicketAdmin,
  filterTicketStatus,
  adminCreateTicket,
  orderTickets,
};
