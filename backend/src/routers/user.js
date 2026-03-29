const express = require("express");
const userAuth = require("../middleWares/userAuth");
const connReqSchemaModel = require("../models/connReqSchema");
const useSchemaModels = require("../models/signupSchema")
const { default: mongoose } = require("mongoose");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;

    const user = await connReqSchemaModel
      .find({
        toUserId: logInUser._id,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName");

    res.json({
      message: "data fetched successfully!",
      data: user,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;

    const user = await connReqSchemaModel
      .find({
        $or: [
          { toUserId: logInUser._id, status: "accepted" },
          { fromUserId: logInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", "firstName lastName");

    res.json({
      message: "user connection successful fatch!",
      data: user,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const logInUser = req.user;

    // list of sender and receiver user;

    const user = await connReqSchemaModel
      .find({
        $or: [
          {
            fromUserId: logInUser._id,
          },
          {
            toUserId: logInUser._id,
          },
        ],
      })
      .select("fromUserId toUserId");

    const hideUser = new Set();
    user.forEach((item) => {
      hideUser.add(item.fromUserId.toString());
      hideUser.add(item.toUserId.toString());
    });
   const  strHideUser = Array.from(hideUser).map(item => new mongoose.Types.ObjectId(item));
console.log(Array.from(hideUser))

console.log(strHideUser)

 const findUserList = await useSchemaModels
   .find({
     _id: { $nin: strHideUser },
   }).select("firstName lastName");



console.log(findUserList)
res.send(findUserList);
  } catch (error) {
    res.send(error);
  }
});

module.exports = userRouter;
