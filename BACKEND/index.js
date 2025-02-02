const express = require('express')
const dotenv = require('dotenv');
const dbConnect = require('./config/database');
const { connect } = require('mongoose');
const router = require('./routes/userRoutes');
const userRoutes = require("./routes/userRoutes")
const messageRoutes=require("./routes/messageRout")
var cookieParser = require('cookie-parser')
const cors = require('cors');
const { app, server } = require("./socket/socket");

dotenv.config();




const PORT = process.env.PORT || 5000;
const corsOption={
   origin: ["http://localhost:3000", "http://192.168.46.48:3000","*"],
   credentials:true
};

//middleware to parse upcoming request
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsOption));
//routes or mounting url
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/message",messageRoutes);


server.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`);
})

dbConnect();