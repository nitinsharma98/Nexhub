const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userPlusSchema = new Schema({
    name : String,
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String
}, {timestamps : true});


userPlusSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userPlusSchema.methods.matchPassword = async function (enteredPassword) {
 const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
}; 

module.exports = mongoose.model("UserPlus", userPlusSchema);