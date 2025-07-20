const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const groupchatSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("GroupChat", groupchatSchema);