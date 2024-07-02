const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log("Error in Connecting To DB");
  }
};

module.exports = { connectToDB };
