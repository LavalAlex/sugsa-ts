const { Document, Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const schemaAdmin = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
});

schemaAdmin.plugin(autoIncrement.plugin, "admin");
module.exports = model("admin", schemaAdmin);
