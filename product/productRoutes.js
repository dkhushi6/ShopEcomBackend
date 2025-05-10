const express = require("express");
const Product = require("./product");
const product = require("./product");
const router = express.Router();

//adding products
router.post("/add", async (req, res) => {
  const {
    title,
    description,
    price,
    discountprice,
    color,
    category,
    media,
    size,
    adminId,
    inStock = true, // default to true
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !color ||
    !category ||
    !media ||
    !size ||
    inStock === undefined
  ) {
    return res.json({
      message: "enter all details",
    });
  }
  if (!adminId) {
    return res.json({
      message: "enter admin id",
    });
  }
  const productEx = await Product.findOne({ title });
  if (productEx) {
    return res.json({ message: "product already exists" });
  }

  const product = await Product.create({
    title,
    description,
    price,
    discountprice,
    color,
    category,
    media,
    size,
    adminId,
    inStock,
  });
  return res.json({ message: "product created successufully ", product });
});

// edit product
router.post("/edit", async (req, res) => {
  const {
    pID,
    adminId,
    newTitle,
    newDescription,
    newPrice,
    newColor,
    newCategory,
    newMedia,
    newSize,
    newInStock,
    newDiscountPrice,
  } = req.body;

  if (
    !pID ||
    !adminId ||
    !newTitle ||
    !newDescription ||
    !newPrice ||
    !newColor ||
    !newCategory ||
    !newMedia ||
    !newSize
  ) {
    return res.json({
      message: "enter all details",
    });
  }
  const oldProduct = await Product.findOne({ _id: pID, adminId });
  if (!oldProduct) {
    return res.json({ message: "couldn't find the product" });
  }
  if (oldProduct) {
    oldProduct.title = newTitle;
    oldProduct.description = newDescription;
    oldProduct.price = newPrice;
    oldProduct.color = newColor;
    oldProduct.category = newCategory;
    oldProduct.media = newMedia;
    oldProduct.size = newSize;
    oldProduct.inStock =
      newInStock !== undefined ? newInStock : oldProduct.inStock;
    oldProduct.discountprice = newDiscountPrice ?? oldProduct.discountprice;
    oldProduct.save();
    return res.json({ message: "changes updated successfully ", oldProduct });
  }
});

//delete product
router.delete("/delete", async (req, res) => {
  const { pID } = req.body;
  const productDel = await Product.findByIdAndDelete(pID);
  if (!productDel) {
    return res.json({ message: "product not found !!" });
  }
  if (productDel) {
    return res.json({ message: "product deleted successfully !!" }, productDel);
  }
});
//see products
router.get("/all", async (req, res) => {
  const allProduct = await Product.find();
  return res.json({
    message: "all products are desplayed here---",
    allProduct,
  });
});

//see only admin created product
router.post("/adminSpecific", async (req, res) => {
  const { adminId } = req.body;
  console.log("adminId", adminId);
  const allAProducts = await Product.find({ adminId });

  if (allAProducts) {
    return res.json({
      message: "product by this admin are down below--",
      allAProducts,
    });
  } else {
    return res.json({ message: "user not found" });
  }
});
//see newly made products
router.get("/newlymade", async (req, res) => {
  const newProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
  if (!newProducts) {
    return res.json({ message: "products not found" });
  }
  if (newProducts) {
    return res.json({
      message: "product in descending order---",
      products: newProducts,
    });
  }
});

//category sort --
router.post("/category", async (req, res) => {
  const { category } = req.body;
  const catProduct =
    category === "all"
      ? await Product.find()
      : await Product.find({ category });
  if (catProduct) {
    return res.json({
      message: "the specific category products are--",
      catProduct,
    });
  } else {
    return res.json({ message: "category not found" });
  }
});
module.exports = router;
