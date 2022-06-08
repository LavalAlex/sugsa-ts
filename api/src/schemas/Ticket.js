const { Document, Schema, model, plugin } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

let counter = 1;
let CountedId = { type: Number, default: () => counter++ };

const schemaTicket = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  business: { type: String, required: true },
  departament: { type: String, required: true },
  description: {
    type: String,
    required: true,
    maxlength: [200, "La descripción no puede exceder los 200 caracteres"],
  },
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
  closeAt:{
    type:Date
  },
  status: {
    type: String,
    default: "Active",
  },
  register: [
    {
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
    },
  ],
});

schemaTicket.plugin(autoIncrement.plugin, "tickets");
module.exports = model("tickets", schemaTicket);
