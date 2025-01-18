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
        type : {String,
              require},
        enum : ["male","female"],
        required : true,
    },
    profilePhoto : {
        type : String,
        default : "",
    }
},{timestamps : true});

module.exports = mongoose.model("User",userSchema)