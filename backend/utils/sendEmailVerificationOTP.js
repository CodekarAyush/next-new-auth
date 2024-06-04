
const transporter = require("../config/nodemailer");
const EmailVerification = require("../models/emailVerification.model");
const sendEmailVerificationOTP = async (req, user) => {
  // generating a random 4 digit number
  const otp = Math.floor(1000 + Math.random() * 9000);
  await new EmailVerification({
    userId:user._id,otp:otp
  }).save()

  const otpVerificationLink = `${process.env.BASE_URL}/account/verify-email`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "verify your account with OTP ",
    html: `<p>
    dear , ${user.name} , thank u for register , 
</p>  
<p>verify the email adress by entering the follong OTP </p>
<h2>${otpVerificationLink}</h2>
<h2>${otp} </h2>`,
  });
  return otp
};

module.exports= sendEmailVerificationOTP;
