const validator = require("validator");

const loginValidator = (req) =>{

  const {gmail,password}= req.body;
  if(!gmail || !validator.isEmail(gmail)){
    throw new Error("you have invalid email");
  }
  if(!password || !validator.isStrongPassword(password)){
    throw new Error("Entered wrong Password!");
  }
  return true;

}
module.exports = loginValidator;