const mongoose = require("mongoose");
require("dotenv").config();

//connecting MDB--
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB connected ");
  } catch (error) {
    console.error(`error:${error.message}`);
  }
};
module.exports = connectDB;
