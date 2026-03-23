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
  


  const toUser = await  useSchemaModels.findById(toUserId);
  console.log(toUser)
  if(!toUser){
    return res.status(401).send("user not exit!")
  }

  const exitUserId = await  connReqSchemaModel.findOne({
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

  const data =  await connReq.save();
  res.json({
    message: "connection requested successful !", 
    data,
  })

 }catch(error){
  res.status(401).send(error.message);

 }
});


sendConnectionRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{


  try{
    
  const loginUserId = req.user;
  const {status,requestId} = req.params;

  //validate status;
  const allowedStatus = ["accepted","rejected"];

  if(!allowedStatus.includes(status)){

    return res.status(401).json({
      message: "invalid status!"
    })
  };

  // validate  reviewing user;

  const reviewHandler = await connReqSchemaModel.findOne({
    _id: requestId,
    toUserId: loginUserId._id,
    status: "interested"
  });


  if(!reviewHandler){
    return res.status(404).json({
      message: "file not there!"
    })

  };

  //change the status;
  reviewHandler.status = status;

  // uploade the change info to database;

  const getRewData = await reviewHandler.save();

  // send response;

  return res.status(200).json({
    message: "you have accepted connection!",
    data: getRewData,
  })}catch(error){
    return res.status(401).json({
      message: "you have got error" + error,
    })

  }



})

module.exports = sendConnectionRouter;