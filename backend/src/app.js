const express = require("express");
const connDB = require("./config/connDB");
const cookieParser = require("cookie-parser")
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const sendConnectionRouter = require("./routers/request")

const app = express();

app.use(express.json());
app.use(cookieParser());

 

app.use("/",authRouter)
app.use("/", profileRouter);
app.use("/", sendConnectionRouter);





// startServer

const startServer = async () => {
  try {
    await connDB();
    console.log("database connected successfully!!");
    app.listen(3000, () => {
      console.log("server listening on 3000 port");
    });
  } catch (error) {
    console.error("server fail to connect!" + error.message);
    process.exit(1);
  }
};

startServer();
