const mongoose = require('mongoose');

const connectDB = async () => {
  const URI = process.env.DB_URI;
  try {
    await mongoose.connect(URI);
    console.log('Connected to the database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
