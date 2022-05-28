const Ticket = require("../schemas/Ticket");

const Status = {
  Active: "Active",
  Pending: "Pending",
  Pending_Feedback: "Pending Feedback",
  Close: "Close",
  Cancel: "Cancel",
};

const editTicketAdmin = async (ticketId, data) => {
  if(data.close){
    const update = {
      status: "Pending Feedback",
      feedback:true,
      createdAt: Date.now()

    }
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true,
    });
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

module.exports = {
  editTicketAdmin,
  filterTicketStatus,
};
