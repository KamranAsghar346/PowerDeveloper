const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL_OFFLINE);
    console.log("Connected to mongoDB...");
  } catch (error) {
    console.error("Could not connect to MongoDB...");
  }
}
module.exports = connectDB;


// mongodb://localhost:27017/power