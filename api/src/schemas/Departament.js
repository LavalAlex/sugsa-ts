const { Document, Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const schemaDepartament = new Schema({
  name: { type: String, required: true },
});

schemaDepartament.plugin(autoIncrement.plugin, "departament");
module.exports = model("departament", schemaDepartament);
