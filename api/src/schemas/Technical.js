const { Document, Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");


const schemaTechnical = new Schema({
  name:  { type: String, required: true },
  last_name: { type: String, required: true },
  email:  { type: String, required: true, unique:true },
  business:  { type: String, required: true },
  password:{ type: String, required: true },
  is_enabled:{ type: Boolean, default:true}
});

schemaTechnical.plugin(autoIncrement.plugin, "technicals")
module.exports = model("technicals", schemaTechnical);