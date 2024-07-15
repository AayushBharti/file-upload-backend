const mongoose = require("mongoose");

require("dotenv").config();

exports.DBconnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("Db connection successfull"))
    .catch((err) => {
      console.log("DB connection issue");
      console.error(err);
      process.exit(0);
    });
};
