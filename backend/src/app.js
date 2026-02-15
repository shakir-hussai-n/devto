const express = require("express");
const connDB = require("./config/connDB");
const useSchemaModels = require("./models/signupSchema");
const validateSignup = require("./utils/validateSignup");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // sanitize  data;
    validateSignup(req);
    const { firstName, lastName, gmail, password, gender, age } = req.body;

    //Password Hashing (bcrypt):
    const hasThePassword = await bcrypt.hash(password, 10);

    // new user document based on schema
    const signupUser = new useSchemaModels({
      firstName,
      lastName,
      gmail,
      password: hasThePassword,
      gender,
      age,
    });

    await signupUser.save();
    res.send("signup successfully !");
  } catch (error) {
    res.status(401).send(error.message)

  }
});

// startServer

const startServer = async () => {
  try {
    await connDB();
    console.log("database connected successfully!!");
    app.listen(3000, () => {
      console.log("server listening on 3000 port");
    });
  } catch (error) {
    console.error("server fail to connect!" + error.message);
    process.exit(1);
  }
};

startServer();
