const User = require("../schemas/User")
const Ticket = require("../schemas/Ticket");

const createTicket = async ({
  email,
  description,
  classification,
}) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "Error, this user does not exits" };

  const newTicket = await Ticket.create({
    email,
    name:user.name,
    description,
    classification,
    business: user.business,
    departament: user.departament
  });
  if (newTicket) return { msg: "Created ticket successfully" };
  return { error: "Error on create the ticket" };
};

const findAllTicket = async (email) => {
  const allTicket = await Ticket.find({ email });
    const tickets = allTicket.filter((e) => (e.status != "Cancel" ) && (e.status != "Close"));
    return tickets;
};

module.exports = { createTicket, findAllTicket };
