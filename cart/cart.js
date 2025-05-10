const mongoose = require("mongoose");

// add to cart schema and model .....AddToCart
const cartSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddToCart", cartSchema);
