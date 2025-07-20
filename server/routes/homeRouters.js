const express = require("express");
const {specificPost , recomended , sendFriendReq , acceptFriendReq , getFriendReq , getOutgoingFriendReqs , getUserWithFriends , reviews , showreviews , contact , showcontact , createpost , showpost , postcomment , showcomment , like , unlike , certification , viewCertificate , workwithus , getApplies, deleteReview, deletePost, deleteComment, getfreecodes, uploadFreeCode }  = require("../controller/home.controller");
const { getLinks , details , getdetails } = require("../controller/community.controller");
const { protectRoute } = require("../middlewares/auth.middleware");
const { authPlusRouter } = require('./authplusRouter');
const router = express.Router();
router.use(protectRoute);


router.use("/community", authPlusRouter);

//need to make a post route for community post 
router.get("/showpost/:id", specificPost);          // make frontend which uses same design for both type in share link route so that data got will use in fields $

router.get("/recomended", recomended);  // // 
router.post("/friend-request/:id" , sendFriendReq );  // // 
router.put("/friend-request/:id/accept" , acceptFriendReq );  // // 
router.get("/friend-requests", getFriendReq);  // // 
router.get("/outgoing-friend-requests", getOutgoingFriendReqs); // // 
router.get("/getmyfriends", getUserWithFriends);


router.post("/reviews", reviews);    // 
router.get("/deletereviews/:reviewId" , deleteReview); // 
router.get("/showreviews", showreviews); // 

router.post("/contact", contact);   //
router.get("/showcontact", showcontact);    //

router.post("/createpost", createpost);  // 
router.get("/deletepost" , deletePost); 
router.get("/showpost" , showpost);  // 

router.put("/comment", postcomment);      //      
router.get("/deletecomment" , deleteComment); //
router.get("/showcomment/:postId" , showcomment); //

router.put("/like/:postId", like); // 
router.put("/unlike/:postId", unlike); // 

router.post("/certification", certification);      // 
router.get("/certificate/:id" , viewCertificate);  //  

router.get("/getmasterlinks" , getLinks);

router.post("/workwithus" , workwithus); //
router.get("/getapplies" , getApplies); // 

router.post("/details" , details);  // 
router.get("/getdetails" , getdetails); // 

router.get("/codes", getfreecodes);  //
router.post("/uploadffreecodes" , uploadFreeCode); // 





module.exports = router;