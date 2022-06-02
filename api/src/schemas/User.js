const { Document, Schema, model } = require("mongoose");

let counter = 1;
let CountedId = { type: Number, default: () => counter++ };

const schemaUser = new Schema({
  id: CountedId,
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  business: { type: String, required: true },
  departament: { type: String, required: true },
});

module.exports = model("users", schemaUser);
