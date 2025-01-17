const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        enum : ["male","female"],
        required : true,
    },
    profilePhoto : {
        type : String,
        default : "",
    }
});

module.exports = mongoose.model("userModel",userSchema)