const express = require("express");
const { protectRoute } = require("../middlewares/auth.middleware");
const { protectPlusRoute} = require("../middlewares/authPlus.middleware");
const { start , linksFill, sendGroupChat , getGroupChat, getpaidcodes, uploadCode } = require("../controller/community.controller");
const router = express.Router();


router.use(protectRoute);
router.use(protectPlusRoute);

router.post("/start" , start);   // req once in app.js
router.post("/updatelinks", linksFill );

router.post("/sendgroupchat", sendGroupChat);
router.get("/getgroupchat", getGroupChat);    

router.get("/codes", getpaidcodes);
router.post("/uploadpaidcodes" , uploadCode);   


module.exports = { communityRouter: router }; 
