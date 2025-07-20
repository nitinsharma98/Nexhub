const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    profilePic:{
        type: String,
        url:String,
        default: "https://up.yimg.com/ib/th?id=OIP.APpCqApSNfwxDHwPHzjX2QHaHa&pid=Api&rs=1&c=1&qlt=95&w=106&h=106"
    },
    fullName:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
     gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    tags:{
        type: [String],  // An array of strings
        default: []      // Default is empty if not provided
    },
    bio:{
        type:String,
        default: ""
    },
    location: {
      type: String,
      required: true      
    },
    age: {
        type: Number,
        required: true,
        // min: [12, 'Age must be at least 12']    // if want validation
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts:[
       {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    ]
} , {timestamps: true},{ collection: "users" });

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await (enteredPassword === this.password);
  return isPasswordCorrect;
}; 

module.exports = mongoose.model("User", userSchema);






































































































// for enter dob and get age 
//  dob: {
//         type: Date,
//         required: true,
//         validate: {
//           validator: function(value) {
//             const today = new Date();
//             const birthDate = new Date(value);
//             let age = today.getFullYear() - birthDate.getFullYear();
//             const monthDiff = today.getMonth() - birthDate.getMonth();
//             const dayDiff = today.getDate() - birthDate.getDate();

//             if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//                 age--; // Adjust age if birthday hasn't occurred yet this year
//             }

//         return age >= 12 && age <= 80;
//       },
//       message: 'Age must be between 12 and 80 years'
//     }
//   }