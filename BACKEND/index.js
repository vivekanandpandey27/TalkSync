const express = require('express')
const dotenv = require('dotenv');
const dbConnect = require('./config/database');
const { connect } = require('mongoose');
dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`);
})

dbConnect();