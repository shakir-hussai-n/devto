const express = require("express");
const useSchemaModels = require("../models/signupSchema");
const validateSignup = require("../utils/validateSignup");
const loginValidator = require("../utils/loginValidator");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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
    res.send("signup successfully ");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    //sanitize gmail and password;

    loginValidator(req);
    const { gmail, password } = req.body;

    //Find user;
    const userData = await useSchemaModels.findOne({ gmail: gmail });
    if (!userData) {
      return res.status(401).send("Invalid gmail and password");
    }

    //compare password;
    const isPasswordValid = await userData.validatePwd(password);

    if (isPasswordValid) {
      //create jwt token;
      const token = await userData.getJWT();

      // add token into the cookie and send reponse back to the user;

      res.cookie("token", token);

      return res.status(200).send("login successful!");
    } else {
      return res.status(401).send("Invalid gmail and password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = authRouter;