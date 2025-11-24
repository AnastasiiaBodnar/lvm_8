const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  surname: String,
  name: String,
  patronymic: String,
  passport: String
});

module.exports = mongoose.model("Client", ClientSchema);
