const { Schema, model } = require("mongoose");

const schemaCorrective = new Schema({
  id: Number,
  email: String,
  description: String,
  classification: String,
  assigned_technician: String,
});

module.exports = model("corrective", schemaCorrective);