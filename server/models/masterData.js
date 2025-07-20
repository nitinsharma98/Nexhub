const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const masterDataSchema = new Schema({
    ssxz: {
        type:String,
        default:""
    },
    instagram:String,
    telegram:String, 
    whatsapp:String,
    gmail:String,
    contact:String,
    github:String,
    linkdin:String,
    naukri:String,
});

module.exports = mongoose.model("MasterData", masterDataSchema);