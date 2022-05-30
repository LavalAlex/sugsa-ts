const { Document, Schema, model } = require("mongoose");

const schemaTicket = new Schema({
  id: Number,
  email: String,
  name: String,
  business: String,
  departament: String,
  description: String,
  classification: {
    type: String,
    default: "Menor a 48hs",
  },
  assigned_technical: {
    type: {
      name: String,
      last_name: String,
      email: String,
    },
  },
  feedback: {
    type: String,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Activo",
  },
  register: [{
    type: {
      date_register: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
      },
    },
    default: {
      description: "Registro de nuevo caso",
    },
  }],
});

module.exports = model("tickets", schemaTicket);
