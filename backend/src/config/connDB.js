const mongoose = require("mongoose");

const connDB = async()=>{
  await mongoose.connect(
    "mongodb+srv://wcryto_db_user:9OY5oHq2vEQqo5tZ@webapp.gcfbfer.mongodb.net/",
  );
}

module.exports = connDB;