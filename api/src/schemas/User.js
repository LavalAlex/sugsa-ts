const { Document, Schema, model } = require("mongoose");

const schemaUser = new Schema({
  name: String,
  last_name : String,
  email: String,
  password: String,
  business: String,
  departament: String
});

module.exports = model("users", schemaUser);