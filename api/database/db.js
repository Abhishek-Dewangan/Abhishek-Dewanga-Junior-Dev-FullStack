const mongoose = require("mongoose");
require("dotenv").config();

const mongodburl = process.env.MONGODB_URL;

mongoose.set('strictQuery', false);

const connection = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongodburl, connectionParams);
    console.log('Application is connected to database');
  } catch (error) {
    console.log('Unable to connect with database', error);
  }
};

module.exports = connection;
