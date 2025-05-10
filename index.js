const express = require("express");
const connectDB = require("./mdb");

const app = express();
const port = 4010;

app.use(express.json());

const cors = require("cors");
app.use(cors());

// of admin , user , purchase , cart and products
const adminRoutes = require("./admin/adminRoutes");
const userRoutes = require("./user/userRoutes");
const purchaseRoute = require("./purchase/purchaseRoute");
const cartRoute = require("./cart/cartRoute");
const productRoutes = require("./product/productRoutes");
connectDB();

// routes----
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/purchase", purchaseRoute);
app.use("/cart", cartRoute);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
