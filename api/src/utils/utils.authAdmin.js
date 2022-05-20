const bcrypt = require("bcrypt");
const saltRounds = 10;

//Schemas
const Admin = require("../schemas/Admin");
const Ticket = require("../schemas/Ticket");
const { now } = require("mongoose");

const Status = {
  Active: "Active",
  Pending: "Pending",
  Pending_Feedback: "Pending_Feedback",
  Close: "Close",
};

const createAdmin = async (name, email, password) => {
  password = bcrypt.hashSync(password, saltRounds);
  const admin = await Admin.findOne({ email });
  if (admin) return { error: "Error, this admin does exits" };
  let newAdmin = new Admin({
    name,
    email,
    password,
  });
  newAdmin.save();
  return { msg: "Create Successfully" };
};

const findAll = async () => {
  var adminAll = await Admin.find({});
  if (!adminAll) return { error: `Error, no users information` };
  const users = adminAll.map((e) => {
    return { email: e.email, name: e.name, id: e._id };
  });
  return users;
};

const findAdmin = async (email, password) => {
  const adminAuth = await Admin.findOne({ email });
  if (!adminAuth) return { error: "Error, this admin does not exist" };
  const validate = await bcrypt.compare(password, adminAuth.password);
  if (!validate) return { error: "Error, this admin does not exist" };
  return { id: adminAuth._id, email: adminAuth.email, name: adminAuth.name };
};

const editTicketAdmin = async (ticketId, data) => {
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

module.exports = {
  createAdmin,
  findAll,
  findAdmin,
  editTicketAdmin,
  filterTicketStatus,
};
