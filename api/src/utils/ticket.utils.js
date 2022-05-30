const User = require("../schemas/User");
const Ticket = require("../schemas/Ticket");
const Business = require("../schemas/Business");

const createTicket = async ({ email, description }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "Error, this user does not exits" };
  let technical = await assignedTechnical(user);
  const newTicket = await Ticket.create({
    email,
    name: user.name,
    description,
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

const findAllTicket = async (email) => {
  const allTicket = await Ticket.find({ email });
  const tickets = allTicket.filter(
    (e) => e.status != "Cancel" && e.status != "Close"
  );
  return tickets;
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
module.exports = { createTicket, findAllTicket };
