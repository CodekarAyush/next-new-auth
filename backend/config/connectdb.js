const { default: mongoose } = require("mongoose");
require('dotenv').config()
exports.dbConnect =async()=>{
    try {
        await mongoose.connect(process.env.DB_URI),
        console.log("db connected");
    } catch (error) {
        console.log("error ---->"+ error);
    }
}