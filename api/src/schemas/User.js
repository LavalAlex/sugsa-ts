const { Document, Schema, model } = require("mongoose");

const schemaUser = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  business: String,
});

module.exports = model("users", schemaUser);