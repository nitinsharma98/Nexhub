const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const workwithusSchema = new Schema({
    Tuser:{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
   name: {
    type:String,
    required:true
   },
   phone:{
    type: Number,
    required: true
   },
   email:{
    type:String,
    required: true
   },
   work:{
    type: String,
    enum: ['Training' , 'Internship' , 'Join us' , 'Course'],
    required: true
   },
   domain:{
    type:String,
    required: true
   },
   experience:{
    type:String,
    default: "none"
   },
   lastLPA:{
     type:String,
         default: ""
   },
   college:{
    type: String,
    default: ""
   },
   currentCGPA:{
    type: Number,
    default: 0 
   },
   passingYear:{
    default:Date.now(),
    type:Date
   },
   createdAt:{
    type: Date,
    default: Date.now(),
   },
   about:{
    type:String,
    default:""
   }
});

module.exports = mongoose.model("WorkWithUs", workwithusSchema);