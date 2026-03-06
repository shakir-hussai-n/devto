const express = require("express");
const userAuth = require("../middleWares/userAuth");
const profileRouter = express.Router();
const profileEditValidation = require("../utils/profileEditValidation")
const validateEditPwd = require("../utils/editPwdValidate");
const bcrypt = require("bcrypt")

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    return res.send(user);
  } catch (error) {
    return res.status(401).send(error.message);
  }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
 
   profileEditValidation(req);

   const getUserData = req.user;
   

   Object.keys(req.body).forEach((key) => {getUserData[key] = req.body[key]});
   
   await getUserData.save();
   res.status(200).send(getUserData);
 
});

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
  const getdata = req.user;
  validateEditPwd(req);
  const {oldPwd,newPwd}= req.body;
  const setPwd =  await getdata.setPwd(oldPwd)
  if(!setPwd){
    return res.status(401).send("wrong password Input")
  }
const hasNewPwd = await bcrypt.hash(newPwd,10);
   getdata.password = hasNewPwd;

 await  getdata.save();

  

res.send("successful password changed!");

})

module.exports = profileRouter;