const { Document, Schema, model, plugin } = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const schemaTicketConfig = new Schema({
  business: { type: String, required: true },
  classification: [String],
  classification_default: {
    type: String,
  },
});

schemaTicketConfig.plugin(autoIncrement.plugin, "ticket_config");
module.exports = model("ticket_config", schemaTicketConfig);
