const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
   name: {
    type:String,
    required:true
   },
   address: {
    type:String,
    required:true
   },
   phone:{
    type: Number,
    required: true
   },
   budget:{
    type:Number,
    required:true
   },
   usefor:{
    type: String,
    enum: ['Personal use' , 'Organization' , 'local use'],
    required: true
   },
   email:{
    type:String,
    required: true
   },
   tillWeeks:{
    type: Number,
    required:true
   },
   createdAt:{
    type: Date,
    default: Date.now(),
   },
   about:{
    type:String,
   }
});

module.exports = mongoose.model("Contact", contactSchema);