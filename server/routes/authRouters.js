const express = require("express");
const {login , signup , logout , editme}  = require("../controller/auth.controller");
const { protectRoute } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/editme",protectRoute , editme);
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

module.exports = router;