const validator = require("validator");

//Input Validation
const validateSignup = (req) => {
  const { firstName, lastName, gmail, password, gender, age } = req.body;
if(!firstName ||!lastName){
  throw new Error("Enter first and last Name!");
}
if(!gmail || !validator.isEmail(gmail)){
  throw new Error("Invalid gmail!");
}
if(!password || !validator.isStrongPassword(password)){
throw new Error("weak password !");
}
if(!gender || !["male","female","other"].includes(gender)){
  throw new Error("wrong input");
}
if(!age || age < 4 || age > 40){
  throw new Error("Enter age greater then 4 and less then 40");
}
return true;
 
};

module.exports = validateSignup;
