const { Document, Schema, model } = require("mongoose");

const schemaAdmin = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
});

module.exports = model("admin", schemaAdmin);