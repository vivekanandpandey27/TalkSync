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
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if userName and password are provided
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "All Data Fields are required !!",
            });
        }

        // Find the user in the database
        const user = await User.findOne({ userName }); // Use 'await' to resolve the promise
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password); // Await the result
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            });
        }

        // Generate JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.secret_code, { expiresIn: '1d' });

        // Send token as a cookie
        return res.status(200).cookie('token', token, { maxAge: 3600000, httpOnly: true }).json({
            success: true,
            message: "Login successful! Cookies sent.",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "An error occurred during login.",
            error: err.message,
        });
    }
};