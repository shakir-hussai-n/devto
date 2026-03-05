const express = require("express");
const userAuth = require("../middleWares/userAuth");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    return res.send(user);
  } catch (error) {
    return res.status(401).send(error.message);
  }
});

module.exports = profileRouter;