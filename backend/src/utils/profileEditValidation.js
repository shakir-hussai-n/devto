

const profileEditValidation = (req)=>{


  const editField = ["firstName","lastName","age","gender"];
  const allowEdit = Object.keys(req.body).every((field)=> editField.includes(field));
  
  return allowEdit;

}


module.exports = profileEditValidation;