const UserPlus = require("../models/userplus");
const User = require("../models/user");
const masterData = require("../models/masterData");
const GroupChat = require("../models/groupChat");
const Details = require("../models/details");
const Codes = require("../models/codes");
const dotenv = require('dotenv');
dotenv.config();


module.exports.start = async (req , res)=>{
    try {
    const exists = await masterData.findOne({ ssxz: "ssxz" });
    if (exists) {
      // console.log("MasterData already exists. Skipping creation.");
      return;
    }

    const data = {
      ssxz: "ssxz",
      instagram: "https://instagram.com/nexhub",
      telegram: "https://t.me/nexhub",
      whatsapp: "https://wa.me/911234567890",
      gmail: "nexhub@gmail.com",
      contact: "+91-1234567890",
      github: "https://github.com/nexhub",
      linkdin: "https://linkedin.com/in/nexhub",
      naukri: "https://naukri.com/nexhub"
    };

    await masterData.create(data);
    // console.log("MasterData inserted successfully.");
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error inserting MasterData:", err);
  } 
};





module.exports.linksFill = async (req, res) => {
    const data = req.body;

    const master = process.env.MASTER_USERNAME;
    const userId = req.user._id;
    const user =await User.findById(userId);
    if(user.fullName !== master) return res.status(401).json({message: "you have not access to this feature"});

    try {
        const updatedDoc = await masterData.findOneAndUpdate(
            { ssxz: "ssxz" },    // find the document where ssxz === "ssxz"
            { $set: data },      // update all fields from req.body
            { new: true, upsert: false } // return updated doc, don't insert if not found
        );

        if (!updatedDoc) {
            return res.status(404).json({ message: "Document with ssxz='ssxz' not found" });
        }

        res.status(200).json({ success: true, updated: updatedDoc });
    } catch (error) {
        console.error("Error in linksFill controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};







module.exports.getLinks = async (req , res)=> {
    try{
        const links = await masterData.findOne({ ssxz: "ssxz"});
         res.status(200).json({ success: true, links });
    } catch (error) {
        console.error("Error in getLinks controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}






module.exports.sendGroupChat = async (req, res) => {
    const { text } = req.body;
   const userId = req.userP._id; 
    try {
        if (!text) return res.status(401).json({ message: "Please enter your message" });

        const existingUserN = await UserPlus.findById( userId );
        if (!existingUserN) return res.status(401).json({ message: "Invalid user" });
        const username = existingUserN.name;

        const newchat = await GroupChat.create({
            text,
            username
        });

        res.status(201).json({ success: true, chat: newchat });

    } catch (error) {
        console.error("Error in sendGroupChat controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};










module.exports.getGroupChat = async (req, res) => {
    try{
        const chats = await GroupChat.find({});
        res.status(201).json({success: true , chats : chats});
    }catch (error) {
        console.error("Error in getGroupChat controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}










module.exports.details = async (req,res) =>{
    const {col} = req.body;

     const master = process.env.MASTER_USERNAME;
    const userId = req.user._id;
    const user =await User.findById(userId);
    if(user.fullName !== master) return res.status(401).json({message: "you have not access to this feature"});


    try{
        const newDetail = await Details.create({col});
        res.status(201).json({success: true });
    }catch(error){
        console.error("error in details" , error);
        res.status(500).json({message: "internal server error"})
    }
}



module.exports.getdetails = async (req,res) =>{
     const master = process.env.MASTER_USERNAME;
    const userId = req.user._id;
    const user =await User.findById(userId);
    if(user.fullName !== master) return res.status(401).json({message: "you have not access to this feature"});

    
    try{
        const allDetails = await Details.find({});
        res.status(201).json({success: true , chats : allDetails});
    }catch(error){
        console.error("error in getdetails" , error);
        res.status(500).json({message: "internal server error"})
    }
}




module.exports.getpaidcodes = async (req, res) => {
    try{
        const paidCodes = await Codes.find({ isFree: false });
        res.status(200).json({ success: true, data: paidCodes });
      }catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}




module.exports.uploadCode = async (req, res) => {
   const {
    title, code, about, images,author , instructions, links, tags, isFree } = req.body;


  try {
    if (!title || !code || !about || !instructions) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newCode = await Codes.create({
      title, code, about, author, images, instructions, links, tags, isFree
    });

    res.status(201).json({ success: true, message: "Code uploaded", data: newCode });
  } catch (error) {
    console.error("Error in uploadfreeCode:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}