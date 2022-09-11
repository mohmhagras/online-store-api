const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  console.log("ll", process.env.DATABASE_URI);
  try {
    return await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;
