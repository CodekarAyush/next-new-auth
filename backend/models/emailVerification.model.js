const mongoose = require('mongoose');

const emailVerificationSchema  = new mongoose.Schema({
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
otp:{
    type:String,
    required:true,
},
createdAt:{
    type:Date,
    default:Date.now(),
    expired: '15m'
}
})

const EmailVerification = mongoose.model('emailVerification',emailVerificationSchema)

module.exports = EmailVerification