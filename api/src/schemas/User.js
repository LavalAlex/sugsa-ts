const { Document, Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment")

const schemaUser = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  business: [{ type: String, required: true }],
  departament: [{ type: String, required: true }],
  is_enabled:{ type: Boolean, default:true}
});

schemaUser.plugin(autoIncrement.plugin, "users")
module.exports = model("users", schemaUser);
