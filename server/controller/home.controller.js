const Review = require("../models/reviews");
const User = require("../models/user");
const Contact = require("../models/contact");
const Post = require("../models/posts");
const Certificate = require("../models/certificate");
const CommunityPost = require("../models/communityPosts");
const WorkWithUs = require("../models/workwithus");
const FriendReq = require("../models/friendReq");
const Codes = require("../models/codes");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;


const dotenv = require('dotenv');
dotenv.config();













const specificPost = async function (req, res) {
  const { id } = req.params;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    let post = await Post.findById(id);
    
    if (!post) {
      post = await CommunityPost.findById(id);          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found in any source" });
    }

    res.status(200).json({ success: true, postData: post });

  } catch (error) {
    console.log("Error in specificPost controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};









const recomended = async (req , res) =>{
  try{
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId);

    const recomendedUsers = await User.find({
      $and :[
        {_id : {$ne: currentUserId}},
        {_id :{$nin: currentUser.friends}},
        // { location: currentUser.location }  // if want only same location
      ]
    });
    res.status(200).json(recomendedUsers)
  }catch (error) {
    console.log("Error in recomended controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}








const sendFriendReq = async (req, res) =>  {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const existingRequest = await FriendReq.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists between you and this user" });
    }

    const friendRequest = await FriendReq.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}






const  acceptFriendReq = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendReq.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}







const getFriendReq =  async (req, res) => {
  try {
    const incomingReqs = await FriendReq.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic");

    const acceptedReqs = await FriendReq.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendReq controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}







const  getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingRequests = await FriendReq.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}






const getUserWithFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friends", "fullName profilePic gender age");
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch friends", error });
  }
};















const reviews = async function reviews(req, res) {
    const { comment , rating } = req.body;
    const userId = req.user._id;  

    try{
        if (!comment || !rating ) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const existingUserN = await User.findById( userId );
        const username = existingUserN.fullName;

        const newReview = await Review.create({
             username,
             comment, 
             rating
            });

        res.status(201).json({ success: true, reviews: newReview });
    
    }catch(error){
    console.log("Error in review controller", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}




const deleteReview = async function (req, res) {
  const { reviewId } = req.params;
  const userId = req.user._id;

  try {
    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const user = await User.findById(userId);
    if (review.username !== user.fullName) {
      return res.status(403).json({ message: "You are not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ success: true, message: "Review deleted successfully" });

  } catch (error) {
    console.error("Error in deleteReview controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};






const showreviews = async function showreviews(req, res) {
    const allreview =await Review.find({});
    res.send(allreview);
}















const contact = async function contact(req,res){
    const { name , address , budget , usefor , phone , email , tillWeeks , about } = req.body;
    const userId = req.user._id; 

    try{
        if (!name || !address || !budget || !usefor || !phone || !email || !tillWeeks || !about) {
        return res.status(400).json({ message: "All fields are required" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number" });
        }

        const existingUserN = await User.findById( userId );
        const username = existingUserN.fullName;

        const newcontact = await Contact.create({
             username, name, address, budget , usefor , phone , email , tillWeeks , about
            });

        res.status(201).json({ success: true, contact: newcontact });
    
    }catch(error){
    console.log("Error in contact controller", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}



const showcontact = async function showcontact(req, res) {

   const master = process.env.MASTER_USERNAME;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(user.fullName !== master) return res.status(401).json({message: "you have not access to this feature"});

    const allcontact =await Contact.find({});
    res.send(allcontact);
}











const createpost = async function createpost(req, res){
    const { about , pic } = req.body;
    const userId = req.user._id; 

    try{
        if(!about && !pic){
            return res.status(400).json({ message: "Please fill inputs for post" });
        }

        const existingUserN = await User.findById( userId );
        const username = existingUserN.fullName;

        const newpost = await Post.create({
            username , about , pic , user: userId,
        });

        await User.findByIdAndUpdate(userId, {
            $push: { posts: newpost._id }                       // gpt 
        });

        res.status(201).json({ success: true, post: newpost });


    }catch(error){
    console.log("Error in createpost controller", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}





const deletePost = async function deletePost(req, res) {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    await User.findByIdAndUpdate(userId, {
      $pull: { posts: postId }
    });

    res.status(200).json({ success: true, message: "Post deleted successfully" });

  } catch (error) {
    console.error("Error in deletePost controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





// const showpost =  async function showpost(req, res) {
//     const allpost =await Post.find({});
//     res.send(allpost);
// }



const showpost = async function showpost(req, res) {
  try {
    const allpost = await Post.find({}).sort({ createdAt: -1 }); // newest first
    res.status(200).json(allpost);
  } catch (error) {
    console.error("Error in showpost controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


























const postcomment = async function postcomment(req, res) {
    const { comment , postId } = req.body;                                        // can i get id fro here // same for lower
    const userId = req.user._id;  

    try{
        if (!comment) {
        return res.status(400).json({ message: "Comment can not be empty!" });
        }

        if(!postId) {
             return res.status(400).json({ message: "No post !" });
        }

        const existingUserN = await User.findById( userId );
        const username = existingUserN.fullName;

        await Post.findByIdAndUpdate(postId , {                                       //enter post id from frontend  ######################################################################## 
            $push : { comments :{ comment , username , postedBy: userId  }   },  
        },{
            new: true       // yes this is new update
        })

        res.status(201).json({ success: true, comment : comment });

    }catch(error){
    console.log("Error in Postcomment controller", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}





const deleteComment = async function (req, res) {
  const { postId, commentId } = req.params;
  const userId = req.user._id;

  try {
    if (!postId || !commentId) {
      return res.status(400).json({ message: "Post ID and Comment ID are required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this comment" });
    }

    comment.remove();
    await post.save();

    res.status(200).json({ success: true, message: "Comment deleted successfully" });

  } catch (error) {
    console.error("Error in deleteComment controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};






const showcomment = async function showcomment(req, res) {
  const { postId } = req.params;
  if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid Post ID format" });
  }

  try {
    const currentpost = await Post.findById(postId);

    if (!currentpost) {                             // only work for valid id formate but that id does not exists
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ success: true, comments: currentpost.comments });
  } catch (error) {
    console.error("Error in showcomment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};















const like = async function like(req,res) {                         // if i use like unlike in one in frontend like icon have some difficulty
    const userId = req.user._id;
    const { postId } = req.params;
    try{
       const post = await Post.findById(postId);

      // Check if user has already liked the post
      const alreadyLiked = post.likes.some(like => like.likeBy.toString() === userId.toString());
      if (alreadyLiked) {
        return res.status(200).json({ success: true, message: "Already liked" });
      }

      // If not already liked, push the like
      post.likes.push({ likeBy: userId });
      await post.save();

      res.status(200).json({ success: true, message: "Liked" });
    } catch (error) {
        console.error("Error in like post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const unlike = async function unlike(req,res) {
    const userId = req.user._id;
    const { postId } = req.params;
    try{
        await Post.findByIdAndUpdate(postId, {
        $pull: { likes: { likeBy: userId } }
        });
        res.status(200).json({ success: true, message: "unliked" });
    } catch (error) {
        console.error("Error in like post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
























const certification = async function (req, res) {
    const { name, course, work , startDate, weeks } = req.body;

     const master = process.env.MASTER_USERNAME;
    

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(user.fullName !== master) return res.status(401).json({message: "you have not access to this feature"});

    const newCertificate = await Certificate.create({ name, course, work , startDate, weeks });

    //  Send back the newly created document's _id
    res.status(201).json({
      success: true,
      message: "Certificate generated",
      certificateId: newCertificate._id, // send the _id            to frontend in phone pic i save code for frntend 
      name : name
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}



const viewCertificate = async function (req , res){
    const {id} = req.params;
    if(!id) return res.status(404).json({ message: "Please enter your id!" });

    try{
        const person = await Certificate.findById(id);
        res.send(person);
    } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}









const workwithus = async function (req, res) {
  const { name , phone , email , work , domain , experience , lastLPA , college , currentCGPA , passingYear , about}  = req.body;
  const userId = req.user._id;
  try{
    if(!name || !phone || !email || !work || !domain ) return res.status(404).json({ message: "Please enter required details!" });

    const Tuser = userId;
    const newWorkwithus = await WorkWithUs.create({
      Tuser , name , phone , email , work , domain , experience ,  lastLPA , college , currentCGPA , passingYear , about
    });

    res.status(201).json({
      success: true,
      message: "Apply Done",
      applies : newWorkwithus
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}








const getApplies = async function (req, res) {

    const master = process.env.MASTER_USERNAME;
    const userId = req.user._id;
    const user =await  User.findById(userId);
    if(user.fullName !== master) return res.status(401).json({message: "you have not access to this feature"});

    const allApplies = await WorkWithUs.find({});
    res.status(201).json( data = allApplies);
}










const getfreecodes = async (req, res) => {
  try{
    const freeCodes = await Codes.find({ isFree: true });
    res.status(200).json({ success: true, data: freeCodes });
  }catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}







const uploadFreeCode = async (req, res) => {
   const {
    title, code, about, images, instructions, links, tags, path } = req.body;

    const author = req.user.fullName;

  try {
    if (!title || !code || !about || !instructions || !images) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newCode = await Codes.create({
      title, code, about, author, images, instructions, links, tags , path
    });

    res.status(201).json({ success: true, message: "Code uploaded", data: newCode });
  } catch (error) {
    console.error("Error in uploadfreeCode:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}












module.exports = { specificPost ,recomended , sendFriendReq , acceptFriendReq , getFriendReq , getOutgoingFriendReqs , getUserWithFriends , reviews , deleteReview , showreviews , contact , showcontact , createpost , deletePost , showpost , postcomment, deleteComment , showcomment , like , unlike , certification , viewCertificate , workwithus , getApplies , getfreecodes , uploadFreeCode};