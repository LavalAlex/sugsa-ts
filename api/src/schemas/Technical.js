const { Document, Schema, model } = require("mongoose");

const schemaTechnical = new Schema({
  id: Number,
  name: String,
  last_name: String,
  email: String,
  business: String
});

module.exports = model("technicals", schemaTechnical);