const { Document, Schema, model } = require("mongoose");

const schemaBusiness = new Schema({
  id: Number,
  name: String,
  departament: [String],
});

module.exports = model("business", schemaBusiness);