const { Document, Schema, model } = require("mongoose");

const schemaBusiness = new Schema({
  id: Number,
  name: String,
  departament: [String],
  technicals: {
    type: [{
      id:Number,
      name: String,
      last_name: String,
      email: String,
    }],
  },
});

module.exports = model("business", schemaBusiness);
