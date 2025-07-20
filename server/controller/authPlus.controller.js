const { sendVerificationCode } = require("../middlewares/email");
const UserPlus = require("../models/userplus");
const jwtP = require("jsonwebtoken");


const signupPlus = async (req, res) =>{
    try{
        const {email , password , name} = req.body;
        if(!email || !password || !name){
            return res.status(400).json({success: false , message: "All fields are required"})
        }

        const ExiststingUser = await UserPlus.findOne({email});
        if(ExiststingUser){
            return res.status(400).json({success:false , message: "User Already exists!"})
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newUserPlus = new UserPlus({
            email, name , verificationCode, password 
        })
        await newUserPlus.save();
        sendVerificationCode(email,  verificationCode);
        return res.status(200).json({success: true , message : "Successfully registered UserPlus" })
    } catch (error) {
        console.error("Error in signupPlus:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}












const verification = async(req, res) =>  {
    try{
        const {code} = req.body;
        const user = await UserPlus.findOne({
            verificationCode: code
        });
        if(!user){
            return res.status(400).json({success: false , message: " Invalid or expired code!"})
        }
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        return res.status(200).json({success: true , message : "Successfully Verified" })
    }catch (error) {
        console.error("Error in PlusVerifucation:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}










const loginPlus = async(req, res) => {
     try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserPlus.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

    if(user.isVerified !== true){
        return res.status(401).json({ message: "You are not verified !!!" });
    }

    const token = jwtP.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwtP", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
    } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}











const logoutPlus =  async function logoutPlus(req, res) {
  res.clearCookie("jwtP");
  res.status(200).json({ success: true, message: "Logout successful" });
  // console.log(" Plus logout successfully");
}




module.exports = { signupPlus , verification , loginPlus , logoutPlus};