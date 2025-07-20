const mongoose = require("mongoose");                   /////////////////////////////////////////////////////////////////////////////////////////////////////////////// not used for saving data 
const Schema = mongoose.Schema;

const communityPostsSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    about:{
        type:String,
    },
    pic:{
        type: String,
        url:String,
        default: "https://up.yimg.com/ib/th?id=OIP.APpCqApSNfwxDHwPHzjX2QHaHa&pid=Api&rs=1&c=1&qlt=95&w=106&h=106"
    },
    likes:[
        {
            _id: false, 
            likeBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
        }
    ],
    comments:[ 
        {
            comment: String,
            createdAt:{
                type: Date,
                default: Date.now(),
            },
            username: String,
            postedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
        },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("CommunityPosts", communityPostsSchema);