const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    console.log(req.body);
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

    console.log("Line 44")
    // Saving user in DB
    await User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
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
    const token = jwt.sign(payload, process.env.secret_code, {
      expiresIn: "1d",
    });

    // Send token as a cookie
    return res
      .status(200)
      .cookie("token", token, { maxAge: 3600000, httpOnly: true })
      .json({
         userName : user.userName,
         id : user._id,
         profilePhoto : user.profilePhoto,
         gender : user.gender,
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

exports.logout=(req,res)=>{
    try{
        return res
        .status(200)
        .cookie("token", "", { maxAge:0 })
        .json({
        
          message: "Logout successfully ",
        });
    }
    catch(err){
        console.log(err);
    }
}

 exports.otheruser=async(req,res)=>{
      try{
           const loggedinID=req.ID;
           const otherthanloginUser= await User.find({_id:{$ne:loggedinID}}).select("-password");
           return res.status(201).json(
            otherthanloginUser
           )
      }
      catch(err){
        console.log(err);
      }
}
