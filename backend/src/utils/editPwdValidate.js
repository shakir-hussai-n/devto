const validator = require("validator");

const validateEditPwd = (req)=>{
const {oldPwd,newPwd} = req.body;
if(!oldPwd || !validator.isStrongPassword(oldPwd)){
  throw new Error("weak password");
}
if(!newPwd || !validator.isStrongPassword(newPwd)){
  throw new Error("weak password!")
}
 return true;
};

module.exports = validateEditPwd;