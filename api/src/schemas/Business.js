const { Document, Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const schemaBusiness = new Schema({
  name: { type: String, required: true },
  departament: [String],
  technicals: {
    type: [
      {
        _id: { type: Number },
        name: { type: String },
        last_name: { type: String },
        email: { type: String },
      },
    ],
    // default: "No hay técnicos cargados",
  },
  assignedTechnical: {
    type: {
      _id: { type: Number },
      name: { type: String },
      last_name: { type: String },
      email: { type: String },
    },

  },
});

schemaBusiness.plugin(autoIncrement.plugin, "business");
module.exports = model("business", schemaBusiness);
