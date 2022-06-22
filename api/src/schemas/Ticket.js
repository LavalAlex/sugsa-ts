const { Document, Schema, model, plugin } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const schemaTicket = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  business: [{ type: String, required: true }],
  departament: [{ type: String, required: true }],
  description: {
    type: String,
    required: true,
    maxlength: [200, "La descripción no puede exceder los 200 caracteres"],
  },
  classification: {
    type: String,

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
  closeAt: {
    type: Date,
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
  // image: {
  //   name: { type: String },
  //   data: { type: Buffer },
  //   size: { type: Number },
  //   mimetype: { type: String },
  //   created_at: { type: Date, default: Date.now() },
  // },
});

schemaTicket.plugin(autoIncrement.plugin, "tickets");
module.exports = model("tickets", schemaTicket);
