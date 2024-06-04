const express = require('express');
const app = express();
 require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./config/connectdb');
const passport = require('passport');
const userRouter = require('./routes/user.route');
app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true,
    optionsSuccessStatus:200
}))
app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())
dbConnect() 

app.use("/api/user",userRouter)
app.get('/', (req, res) => { 
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});
