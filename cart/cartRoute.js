const express = require("express");
const User = require("../user/user");
const AddToCart = require("./cart");
const Product = require("../product/product");
const cart = require("./cart");
const router = express.Router();

// add to cart route
router.post("/", async (req, res) => {
  const { userID } = req.body;
  const { productID } = req.body;
  const { quantity } = req.body;

  if (!userID || !productID || !quantity) {
    return res.json({ message: "enter all details" });
  }
  const ExPID = await AddToCart.findOne({ productID });
  if (ExPID) {
    return res.json({ message: "product is already added in cart" });
  }

  const cartUser = await User.findOne({ _id: userID });
  const cartProduct = await Product.findOne({ _id: productID });

  if (!cartUser) {
    return res.json({ message: "user id dont match" });
  }
  if (!cartProduct) {
    return res.json({ message: "product id dont match" });
  }

  if (cartUser || cartProduct) {
    const cart = await AddToCart.create({
      userID,
      productID,
      quantity,
    });
    return res.json({ message: "item added to cart successfully ", cart });
  }
});
router.get("/all", async (req, res) => {
  const cartItems = await AddToCart.find().populate("productID");
  if (!cartItems || cartItems.length === 0) {
    return res.json({ message: "couldnt find the cart iteams" });
  } else {
    return res.json({ message: "alll cart items are---", cartItems });
  }
});
router.delete("/delete", async (req, res) => {
  const { cartID } = req.body;
  console.log(cartID);
  const findCart = await AddToCart.findByIdAndDelete(cartID);
  if (!findCart) {
    return res.json({ message: "cart item not found" });
  }
  if (findCart) {
    return res.json({
      message: "cart item deleted successfully",
      deletedItem: findCart,
    });
  }
});
router.post("/changequantity", async (req, res) => {
  var { newQuantity } = req.body;
  const { cartID } = req.body;
  const Excart = await AddToCart.findOne({ _id: cartID });
  if (!Excart) {
    return res.json({ message: "cart not found" });
  }
  if (Excart) {
    Excart.quantity = newQuantity;
    Excart.save();
    return res.json({ message: "cart quantity updated", updatedCart: Excart });
  }
});

module.exports = router;
