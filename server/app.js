const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouters = require("./routes/authRouters");
const homeRouters = require("./routes/homeRouters");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const path = require('path');

// const __dirname = path.resolve();

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use("/api/auth" , authRouters);
app.use("/api/home" , homeRouters); 

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../client/dist")));

  app.get("/", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../client", "dist" , "index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
