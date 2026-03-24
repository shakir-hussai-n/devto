const express = require("express");
const userAuth = require("../middleWares/userAuth");
const connReqSchemaModel = require("../models/connReqSchema");
const userRouter = express.Router();


userRouter.get("/user/request/received",userAuth, async(req ,res)=>{
 try{

  const logInUser = req.user;


  const user = await connReqSchemaModel.find({
    toUserId: logInUser._id,
    status: "interested",

  }).populate("fromUserId","firstName lastName");


  res.json({
    message: "data fetched successfully!",
    data: user
  })

 }catch(error){
 
  res.status(401).send(error)

 }



})


userRouter.get("/user/connection", userAuth, async (req,res)=>{

 try{ const logInUser = req.user;

  const user = await connReqSchemaModel.find({
    toUserId: logInUser._id,
    status: "accepted"
  }).populate("fromUserId", "firstName lastName");

  res.json({
    message: "user connection successful fatch!",
    data: user,
  })}catch(error){
    res.status(401).send(error)

  }
})

module.exports = userRouter;