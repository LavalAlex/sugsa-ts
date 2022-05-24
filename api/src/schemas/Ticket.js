const { Document, Schema, model } = require("mongoose");

const schemaTicket = new Schema({
  id: Number,
  email: String,
  name: String,
  business:String,
  departament:String,
  description: String,
  classification: String,
  assigned_technician: {
    type: String,
    default: false,
  },
  feedback: {
    type: String,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type: String,
    default: "Pending"
  }
});

module.exports = model("tickets", schemaTicket);
