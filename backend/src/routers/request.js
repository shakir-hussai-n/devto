const express = require("express");
const userAuth = require("../middleWares/userAuth")
const sendConnectionRouter = express.Router();


sendConnectionRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " connection request");
});











module.exports = sendConnectionRouter;