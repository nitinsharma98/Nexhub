const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username:{
        type:String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    comment : {
        type:String,
        require: true
    },
    rating : {
        type : Number,
        min : 1 , max : 5 ,
        default: 3
    }
});

module.exports = mongoose.model("Reviews", reviewSchema);