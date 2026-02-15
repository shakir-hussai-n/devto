const mongoose = require("mongoose");
const validator = require("validator");

const crtSignUpSchema = new mongoose.Schema({

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

const useSchemaModels = mongoose.model("newdbs" ,crtSignUpSchema);

module.exports = useSchemaModels;