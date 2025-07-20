const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code:{
    type:String,
    required: true
  },
  about: {
    type: String,
    required: true,
  },
  author:{
    type:String,
    default: "By NexHub Community"
  },
  images: [String], // multiple image URLs
  instructions: {
    type: String,
    require:true
  },
  links: {
    github: String,
  },
  tags: [String], // for search/filter
  isFree:{
    type:Boolean,
    default: true
  },
  path:{
    type:String,
  }
});

module.exports = mongoose.model("Codes", codeSchema);
