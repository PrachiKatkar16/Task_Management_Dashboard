const mongoose=require('mongoose')
const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const validator=require('validator')


async function registerUser(req,res){
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    if(!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" })
    }
    if(password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        })
    }
    const isAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isAlreadyExists){
        return res.status(409).json({
            message:"User already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({
        userId:user._id,
        username:user.username
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(201).json({
        message:"User registered sucessfully",
        user
    })

}

async function loginUser(req,res){
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in sucessfully",
        user
    })
}

module.exports={registerUser,loginUser}