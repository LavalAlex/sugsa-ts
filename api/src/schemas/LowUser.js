const { Document, Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment")

const schemaLowUser = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  business: [{ type: String, required: true }],
  departament: [{ type: String, required: true }],
});

schemaLowUser.plugin(autoIncrement.plugin, "lowusers")
module.exports = model("lowusers", schemaLowUser);
