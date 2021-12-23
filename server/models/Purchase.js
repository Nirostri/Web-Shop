const mongoose = require("mongoose");

const PurchasesSchema = new mongoose.Schema({
  purchasePrice: {
    type: Number,
    required: true,
  },
  created: { type: Date, default: Date.now() },
});

const Purchase = mongoose.model("Purchase", PurchasesSchema);
module.exports = Purchase;
