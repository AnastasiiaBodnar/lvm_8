const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  estimatedPrice: Number,
  loanAmount: Number,
  commission: Number,
  returnDate: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  status: { type: String, default: "pledged" },
  priceHistory: [
    {
      date: Date,
      price: Number
    }
  ]
});

module.exports = mongoose.model("Item", ItemSchema);
