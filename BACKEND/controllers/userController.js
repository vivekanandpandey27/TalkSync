const User = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        // Data Validation 
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                success: false,
                message: "All Data Fields are required !!",
            });
        }

        // Checking Password and Confirm Password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Confirm Password and Password are Different",
            });
        }

        // Checking if userName already exist or not
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "UserName Already Exist",
            });
        }

        // Generate profile photo based on gender
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;


        // Hashing  the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        
        // Saving user in DB
        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePhoto: (gender === "male") ? maleProfilePhoto : femaleProfilePhoto, 
        });

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully!",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error While Registering User",
            error: error.message,
        });
    }
};
