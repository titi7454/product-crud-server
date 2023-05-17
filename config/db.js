const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Successfully connected to DB");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
