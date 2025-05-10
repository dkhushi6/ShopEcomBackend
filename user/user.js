const mongoose = require("mongoose");
//user schema and model
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    shippingAddress: String,
    userImg: String,
    userUsername: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
