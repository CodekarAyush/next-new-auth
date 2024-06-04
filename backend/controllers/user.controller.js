const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const sendEmailVerificationOTP = require("../utils/sendEmailVerificationOTP");
class UserController {
  //user reistration
  static userRegistration = async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (!name || !email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required !" });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Password and confirm password should be same !",
          });
        }
        
        const emailExist = await UserModel.findOne({email})
        if (emailExist) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Email already exists!",
          });
        
      }

      const salt  = await bcrypt.genSalt(Number(process.env.SALT))
      const hashedPassword = await bcrypt.hash(password,salt)
      const newUser = await new UserModel({
        name , email , password:hashedPassword
      }).save()
      sendEmailVerificationOTP(req,newUser)  
      res.status(200).json({ success: true, message: "user registration successful" , user:{
        userId:newUser._id,
        email:newUser.email
      }});
    } catch (error) { 
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  //user email verification
  static verifyEmail = async (req,res)=>{
    try {
      const {email , otp } = req.body
       
    } catch (error) {
      
      res.status(500).json({ success: false, message: error.message });
  }
}
  //user login
  // get new access token or refresh token
  // change password
  // profile or logged in user
  // send password reset email
}

module.exports = UserController