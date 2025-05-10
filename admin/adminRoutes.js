const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("./admin");

const router = express.Router();

// Authentication routes
router.post("/signup", async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { phoneNumber } = req.body;
  const { password } = req.body;
  const { adminImg } = req.body;
  const { adminUsername } = req.body;
  //  Email must contain @
  if (email && !email.includes("@")) {
    return res.json({ message: "Invalid email format" });
  }

  // Phone must start with +
  if (phoneNumber && !phoneNumber.startsWith("+")) {
    return res.json({ message: "Phone number must start with +" });
  }

  if (
    !name ||
    !email ||
    !phoneNumber ||
    !password ||
    !adminImg ||
    !adminUsername
  ) {
    return res.json({ message: "Enter all details" });
  }
  const adminEx = await Admin.findOne({ email });
  if (adminEx) {
    return res.json({ message: "admin already exist!" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  const admin = await Admin.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
    adminImg,
    adminUsername,
  });
  return res.json({ message: "Admin created successfully !!", admin });
});

router.post("/login", async (req, res) => {
  const { email, phoneNumber, adminUsername } = req.body;
  //  Email must contain @
  if (email && !email.includes("@")) {
    return res.json({ message: "Invalid email format" });
  }

  //  Phone must start with +
  if (phoneNumber && !phoneNumber.startsWith("+")) {
    return res.json({ message: "Phone number must start with +" });
  }

  const { password } = req.body;
  if ((!email && !phoneNumber && !adminUsername) || !password) {
    return res.json({ message: "Enter all details" });
  }
  const ExAdmin = await Admin.findOne({
    $or: [{ email }, { phoneNumber }, { adminUsername }],
  });

  if (ExAdmin) {
    const isMatch = await bcrypt.compare(password, ExAdmin.password);
    if (!isMatch) {
      return res.json({ message: "password doesn't match ..." });
    }
    if (isMatch) {
      return res.json({
        message: "login successfull !!!!!!!!!!",
        admin: ExAdmin,
      });
    }
  }
  if (!ExAdmin) {
    return res.json({
      message: "admin dont exist ...enter correct email n pass",
    });
  }
});

module.exports = router;
