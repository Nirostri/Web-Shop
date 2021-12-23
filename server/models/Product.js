const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  numberOfPurchases: {
    type: Number,
    default: 0,
  },
  created: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
