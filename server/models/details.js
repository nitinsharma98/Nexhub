const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    col:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("Details", detailsSchema);