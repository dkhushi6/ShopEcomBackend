const express = require("express");
const User = require("../user/user");
const Purchase = require("./purchase");
const Product = require("../product/product");
const router = express.Router();

// purchace route
router.post("/", async (req, res) => {
  const { userID } = req.body;
  const { productID } = req.body;
  const { quantity } = req.body;

  if (!userID || !productID || !quantity) {
    return res.json({ message: "enter all details" });
  }
  const purUser = await User.findOne({ _id: userID });
  const purProduct = await Product.findOne({ _id: productID });
  if (!purUser) {
    return res.json({ message: "user id dont match" });
  }
  if (!purProduct) {
    return res.json({ message: "product id dont match" });
  }

  if (purUser || purProduct) {
    const purchase = await Purchase.create({
      userID,
      productID,
      quantity,
    });
    return res.json({ message: "purchase successfully done", purchase });
  }
});
//see all the purchases
router.get("/all", async (req, res) => {
  const purchaseItems = await Purchase.find().populate("productID");
  if (!purchaseItems || purchaseItems.length === 0) {
    return res.json({ message: "purchse not found" });
  }
  if (purchaseItems) {
    return res.json({
      message: "purchase items are---",
      orders: purchaseItems,
    });
  }
});

module.exports = router;
