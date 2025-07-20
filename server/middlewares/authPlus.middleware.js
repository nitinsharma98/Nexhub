const jwtP = require("jsonwebtoken");
const userplus = require("../models/userplus");

module.exports.protectPlusRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwtP;
   

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwtP.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await userplus.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - UserP not found" });
    }

    req.userP = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
