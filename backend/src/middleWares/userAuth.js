const jwt = require("jsonwebtoken");
const User = require("../models/signupSchema");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("unauthorized access");
    }

    //validate token;

    const decodeData = jwt.verify(token, "manYadav@123");

    const { _id } = decodeData;
    const user = await User.findById(_id);
    
    if (!user) {
      res.status(401).send("user unauthorized");
    }
    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).send("Authentication Failed");
  }
};

module.exports = userAuth;