const mongoose = require("mongoose");

//admin schema and model
const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    adminImg: String,
    adminUsername: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", adminSchema);
