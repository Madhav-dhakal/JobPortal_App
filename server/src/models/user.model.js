const mongoose= require("mongoose");
const validator = require("validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Invalid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required!"],
  },
  password: {
    type: String,
    required: [true, " Password is required!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength:32,
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{
     timestamps:true,
     autoCreate:true,
     autoIndex:true
});


//Encrypting/hashing  the password when the user register OR modifies the password
userSchema.pre("save", async function (next){
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//comparing the password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating a jwt token when a user registers or logins, it depends on our code that 
// when do we need to generate the jwt token when the user login or register or for both. 
userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, 
     process.env.JWT_SECRET_KEY, 
     {
    expiresIn: process.env.JWT_EXPIRE,
  }
);
};

const User = mongoose.model("User", userSchema);
module.exports=User;