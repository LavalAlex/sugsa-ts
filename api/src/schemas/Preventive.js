const { Schema, model } = require("mongoose");

const schemaPreventive = new Schema({
  id: Number,
  email: String,
  description: String,
  classification: String,
  assigned_technician: String,
});

module.exports = model("preventive", schemaPreventive);