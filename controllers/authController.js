const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse, createtokenUser} = require("../utils")

const register = async (req,res) =>{
    const {name,email,password,flat} = req.body;
    const emailAlreadyExists = await User.findOne({email});
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError("Email already exist");
    }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({email,name,password,role,flat}); 
    const tokenUser = createtokenUser(user)
    attachCookiesToResponse({res,user:tokenUser})
   
    res.status(StatusCodes.CREATED).json({user:tokenUser});
}

const login = async (req,res) =>{
   const {email,password} = req.body;

   if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password")
   }

   const user = await User.findOne({email})

   if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials")
   }

   const isPasswordCorrect = await user.comparePassword(password);
   if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials")
   }

    const tokenUser = {name:user.name,userId:user._id,role:user.role}
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser});

}

const logout = async (req,res) =>{
    res.cookie("token","logout",{
        httpOnly:true,
        expires: new Date(Date.now() + 5* 1000),
    })
    res.status(StatusCodes.OK).json({msg:"user logged out"})
}

module.exports = {register,login,logout};