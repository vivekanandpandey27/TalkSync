const express = require('express')
const dotenv = require('dotenv');
const dbConnect = require('./config/database');
const { connect } = require('mongoose');
const router = require('./routes/userRoutes');
const userRoutes = require("./routes/userRoutes")
const messageRoutes=require("./routes/messageRout")
var cookieParser = require('cookie-parser')
dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

//middleware to parse upcoming request
app.use(express.json());
app.use(cookieParser());

//routes or mounting url
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/message",messageRoutes);


app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`);
})

dbConnect();