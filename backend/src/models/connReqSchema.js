const mongoose = require("mongoose");

const connReqSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} this value is wrong`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connReqSchema.pre("save", async function(){
  const validUser = this;
  

  if (validUser.fromUserId.equals(validUser.toUserId)) {
    return next(new Error("invalid connection !"));
  }
  
})

const connReqSchemaModel = mongoose.model("connreq", connReqSchema);

module.exports = connReqSchemaModel;
