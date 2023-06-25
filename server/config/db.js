const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongoose connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error occured: ${error.message}`);
  }
};

module.exports = connectDB;
