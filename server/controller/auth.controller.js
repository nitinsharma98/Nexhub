const User = require("../models/user");
const jwt = require("jsonwebtoken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dp="data:image/jpeg;base64,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";

const signup =  async function signup(req, res) {
  const { email, password, fullName , gender , location , age  , profilePic} = req.body;
  try {
    if (!email || !password || !fullName || !gender || !location || !age ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if(gender != "male" && gender != "female" ){
        return res.status(400).json({message: "Gender not valid"})
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }
    const existingUserN = await User.findOne({ fullName });
    if (existingUserN) {
      return res.status(400).json({ message: "Username aquired by someone, please use a diffrent one" });
    }
    // const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    // const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      age,
      gender, 
      location,
      profilePic: (profilePic ? profilePic :  dp),                                     
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, users: newUser });    
    // console.log(`${newUser.fullName} is signup as new user.`)
  }catch(error){
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}











const login =  async function login(req, res) {
  const { emailORfullName , password } = req.body;
  try{
    if(!emailORfullName || !password ){
    return res.status(400).json({ message: "All fields are required" });
    }

      if (!emailRegex.test(emailORfullName)) {
      const fullName = emailORfullName;
      const user = await User.findOne({ fullName });
      if (!user) return res.status(401).json({ message: "Invalid email or username or password" });
      const isPasswordCorrect = await user.matchPassword(password);
      if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or username or password" });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "7d",});
      res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure : true,
      // secure: process.env.NODE_ENV === "production",
    });     

      res.status(200).json({ success: true, user });
      // console.log(`${user.fullName} has logged in.`)
    }else{
      const email = emailORfullName;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid email or username or password" });
      const isPasswordCorrect = await user.matchPassword(password);
      if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or username or password" });
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "7d",});
      res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks,
      secure:true,
      // secure: process.env.NODE_ENV === "production",
      });     

      res.status(200).json({ success: true, user });
      // console.log(`${user.fullName} has logged in.`);
     }
    }catch(error){
      console.log("Error in login controller", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}   // optimize double code                                                                                                        










const logout =  async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
  // console.log("logout successfully");
}










const editme = async function editme(req, res) {
  const { fullName , gender , location , age  , profilePic , tags , bio} = req.body;
  const userId = req.user._id;                                                                                              // meaning of this geting id of current user from cookie ?
  try {
    if (  !fullName || !gender || !location || !age ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // if (password.length < 6) {
    //   return res.status(400).json({ message: "Password must be at least 6 characters" });
    // }
    if(gender != "male" && gender != "female" ){
        return res.status(400).json({message: "Gender not valid"})
    }
    const existingUserN =await User.findOne({ fullName, _id: { $ne: userId } });          // await User.findOne({ fullName });    -- that by gpt
    if (existingUserN ) {
      return res.status(400).json({ message: "Username aquired by someone, please use a diffrent one" });
    }
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body
    });

    res.status(201).json({ success: true, users: updateUser });    
    // console.log(`${fullName } updated successfully`);
  }catch(error){
      console.log("Error in editme controller", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}



module.exports = {signup , login , logout , editme};