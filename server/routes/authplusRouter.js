const express = require("express");
const { protectRoute } = require("../middlewares/auth.middleware");
const {signupPlus, verification , loginPlus , logoutPlus} = require("../controller/authPlus.controller");
const { communityRouter } = require("./communityRouter");
const { protectPlusRoute } = require("../middlewares/authPlus.middleware");


const router = express.Router();

router.use(protectRoute);

router.use("/comV" , communityRouter);


router.post("/signupplus", signupPlus); //
router.post("/verification" , verification);    //
router.post("/loginplus", loginPlus);   //  
router.post("/logoutplus", logoutPlus);     // unused cuz logout once in that but i created for ... 
router.get("/me", protectRoute,protectPlusRoute ,  (req, res) => {
  res.status(200).json({ success: true, user: req.userP });
});




module.exports = { authPlusRouter: router }; 



// complete used by fe