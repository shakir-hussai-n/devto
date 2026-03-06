const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const crtSchema = new mongoose.Schema({

  firstName:{
    type:String,
    required: true,
    minLength:5,
    maxLength: 40,
  },
  lastName:{
    type:String,
  },
  gmail:{
    type:String,
    required: true,
    unique:true,
    trim:true,
    validate:{
      validator: validator.isEmail,
      message: "invalid Email!"
    }
  },
  password:{
    type: String,
    required: true,
    validate:{
      validator: validator.isStrongPassword,
      message:"Entered wrong password!"
    }
  },
 gender:{
  type:String,
  required:true,
  validate(value){
if(!["male","female","other"].includes(value)){
  throw new Error(" Enter wrong gender!")
}
  }
 },
 age:{
  type: Number,
  required:true,
  min: 18,
  max: 40,
 }

});
crtSchema.methods.validatePwd = async function (inputPwd){
const user = this;
const isPwdValid = await bcrypt.compare(inputPwd,user.password);
return isPwdValid;

};

crtSchema.methods.setPwd = async function(oldPwd){
   const user = this;
   const setNewPwd = await bcrypt.compare(oldPwd , user.password)
 return setNewPwd;
}


crtSchema.methods.getJWT = async function (){
  const user = this;

  const token = await jwt.sign({ _id: user.id }, "manYadav@123",{expiresIn: "1d"});
  return token;
}

const useSchemaModels = mongoose.model("newdbs" ,crtSchema);

module.exports = useSchemaModels;