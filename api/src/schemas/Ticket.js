const { Document, Schema, model } = require("mongoose");


let counter = 1;
let CountedId = {type: Number, default: () => counter++};

const schemaTicket = new Schema({
  id: CountedId,
  email: { type: String, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  business: { type: String, required: true },
  departament: { type: String, required: true },
  description: { type: String, required: true },
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

module.exports = model("tickets", schemaTicket);
