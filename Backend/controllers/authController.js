const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already Present");
    }
    const hashPassowrd = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password: hashPassowrd
    });
    if(user) {
        res.status(200).json({message:"User Created", _id:user.id,username:user.username,email:user.email,password:user.password});
    }
    else{
        res.status(400)
        throw new Error("User data is not Valid");
    }
});

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const presentUser = await User.findOne({email});
    if(presentUser && await bcrypt.compare(password, presentUser.password)) {
            const accessToken = jwt.sign({
                user: {
                    username: presentUser.userName,
                    email: presentUser.email,
                    id: presentUser.id
                }
            },process.env.ACCESS_TOKEN_SECRET, {expiresIn:"300m"});
            console.log("Login Success");
            res.status(200).send({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Wrong Email or Passowrd");
    }
}); 

const homeAccess = asyncHandler(async (req, res) => {
    if (req.user) {
        res.status(200).json({message: "Welcome to home page",id: req.user.id, email: req.user.email})
    } else {
        res.status(401).json({ message: "Unauthorized: User is not authenticated" });
    }
});

module.exports = {registerUser, loginUser, homeAccess};