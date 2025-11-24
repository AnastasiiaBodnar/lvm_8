const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  loanAmount: Number,
  commission: Number,
  issueDate: Date,
  dueDate: Date,
  isReturned: Boolean
});

module.exports = mongoose.model("Deal", DealSchema);
