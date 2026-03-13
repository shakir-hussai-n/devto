const express = require("express");
const userAuth = require("../middleWares/userAuth");
const connReqSchemaModel = require("../models/connReqSchema");
const useSchemaModels = require("../models/signupSchema");
const sendConnectionRouter = express.Router();


sendConnectionRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
 try{
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  console.log(fromUserId,toUserId)



  const toUser = await useSchemaModels.findById(toUserId);
  console.log(toUser)
  if(!toUser){
    return res.status(401).send("user not exit!")
  }

  const exitUserId = await connReqSchemaModel.findOne({
   $or:[
    {fromUserId,
      toUserId
    },
    {fromUserId:toUserId,
      toUserId: fromUserId
    }
   ]
  });

   if(exitUserId){
    return res.status(401).send(" connection exits!")
   }

  const allowedStatus = ["interested","ignored"];
  if(!allowedStatus.includes(status)){
    return res.status(400).json({
      message: "wrong status input" + status,
    })

  }

  const connReq = new connReqSchemaModel({
    fromUserId,
    toUserId,
    status,

  });

  const data = await connReq.save();
  res.json({
    message: "connection requested successful !", 
    data,
  })

 }catch(error){
  res.status(401).send(error.message);

 }
});


module.exports = sendConnectionRouter;