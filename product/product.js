const mongoose = require("mongoose");
// product schema and model
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    color: String,
    category: String,
    media: Array,
    size: String,
    adminId: String,
    discountprice: Number,
    inStock: {
      type: Boolean,
      default: true, //  in stock by default
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
