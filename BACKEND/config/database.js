const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log("Error While Connecting to DB");
        console.error(error);
    }
};

module.exports = dbConnect;