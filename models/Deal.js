const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema({
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Client",
    required: true 
  },
  item: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Item",
    required: true 
  },
  loanAmount: { 
    type: Number, 
    required: true 
  },
  commission: { 
    type: Number, 
    required: true 
  },
  issueDate: { 
    type: Date, 
    default: Date.now 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  isReturned: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model("Deal", DealSchema);
