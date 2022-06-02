const { Document, Schema, model } = require("mongoose");

let counter = 1;
let CountedId = {type: Number, default: () => counter++};

const schemaBusiness = new Schema({
  id: CountedId,
  name:  { type: String, required: true },
  departament: [String],
  technicals: {
    type: [{
      id:Number,
      name:  { type: String, required: true },
      last_name:  { type: String, required: true },
      email:  { type: String, required: true },
    }],
  },
});

module.exports = model("business", schemaBusiness);
