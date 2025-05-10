const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./user");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { phoneNumber } = req.body;
  const { password } = req.body;
  const { userImg } = req.body;
  const { shippingAddress } = req.body;
  const { userUsername } = req.body;

  if (
    !name ||
    !email ||
    !phoneNumber ||
    !password ||
    !userImg ||
    !shippingAddress ||
    !userUsername
  ) {
    return res.json({ message: "Enter all details" });
  }
  //email and pass restrictionss
  if (!email && email.includes("@")) {
    return res.json({ message: "Invalid email format" });
  }
  if (!phoneNumber && phoneNumber.startsWith("+")) {
    return res.json({ message: "Invalid phoneNumber format" });
  }
  const userEx = await User.findOne({ email });
  if (userEx) {
    return res.json({ message: "user already exist!" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
    shippingAddress,
    userImg,
    userUsername,
  });
  return res.json({ message: "user created successfully !!", user });
});

router.post("/login", async (req, res) => {
  const { email, phoneNumber, userUsername } = req.body;
  //  Email must contain @
  if (email && !email.includes("@")) {
    return res.json({ message: "Invalid email format" });
  }

  //  Phone must start with +
  if (phoneNumber && !phoneNumber.startsWith("+")) {
    return res.json({ message: "Phone number must start with +" });
  }

  const { password } = req.body;
  if ((!email && !phoneNumber && !userUsername) || !password) {
    return res.json({ message: "Enter all details" });
  }
  const ExUser = await User.findOne({
    $or: [{ email }, { phoneNumber }, { userUsername }],
  });

  if (ExUser) {
    const isMatch = await bcrypt.compare(password, ExUser.password);
    if (!isMatch) {
      return res.json({ message: "password doesn't match ..." });
    }
    if (isMatch) {
      return res.json({
        message: "login successfull !!!!!!!!!!",
        user: ExUser,
      });
    }
  }
  if (!ExUser) {
    return res.json({
      message: "user dont exist ...enter correct email n pass",
    });
  }
});

module.exports = router;
