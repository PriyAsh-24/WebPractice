var User=require("../models/userModel");
var jwt=require("jsonwebtoken");
var bcrypt=require("bcryptjs");
const Project= require('../models/projectModel');

const handleSignUp=async (req,res)=>{
  const {username, name, email, password} = req.body;
  const emailCheck= await User.findOne({email :email});

  if(emailCheck){
    return res.json({success : false , message : "Email already Exist"});
  }else {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          const user=User.create({
            username:username,
            name : name,
            email:email,
            password:hash,
          })


          return res.json({success : true ,message : "User Created SuccesFully"}); 
      });
    });
  }
}


const handleLogin=async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ email: user.email, userId: user._id }, secret);
        return res.json({ success: true, message: "Login Successfully", token: token });
      } else {
        return res.json({ success: false, message: "Incorrect Email or Password" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
  }

module.exports ={
    handleSignUp,
    handleLogin
}