const Clean = require("../models/Clean")
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const { checkPermissions,assetCheck } = require("../utils");

const createClean = async (req,res)=>{

    const userId = req.user.userId;
    const currentUser = await User.findOne({_id:userId})
    const users = await User.find({flat:currentUser.flat});

    if (!currentUser) {
        throw new Error("User not found");
    }
    const nextuserroom = currentUser.room +1
    let nextuser = users.filter(user=>user.room === nextuserroom);
    
    if (nextuser.length == 0) {
        nextuser = users.filter(user=>user.room === 1)
    }
    const lastuser = await User.findOne({_id:nextuser[0]._id})
    
    currentUser.nextClean = false;
    lastuser.nextClean = true
    currentUser.save();
    lastuser.save();
    req.body.fromWho = userId
    req.body.dormitory = currentUser.dormitory;
    req.body.flat = currentUser.flat;
    const clean = await Clean.create(req.body)


    res.status(StatusCodes.CREATED).json({currentUser,lastuser,clean});
    
}

const getAllFlatCleans = async (req,res) => {
    const userId = req.user.userId;
    const currentUser = await User.findOne({_id:userId})
    const cleans = await Clean.find({dormitory:currentUser.dormitory,flat:currentUser.flat})
    res.status(StatusCodes.OK).json({cleans});
}
const getSingleClean = async (req,res) => {
    const { id: cleanId } = req.params;
    const userId = req.user.userId;
    const clean = await Clean.findOne({_id:cleanId}).populate({
        path: 'dormitory',
        select: 'name',
      })
    res.status(StatusCodes.OK).json({clean});
};
const updateClean = async (req,res) => {
    const { id: cleanId } = req.params;
    const userId = req.user.userId;
    const clean = await Clean.findOne({_id:cleanId})
    assetCheck(clean,cleanId,"clean");
    checkPermissions(req.user, clean.fromWho);
    await Clean.findByIdAndUpdate(
        { _id: cleanId },
        req.body,
        { new: true, runValidators: true }
      );
      res.status(StatusCodes.OK).json({ msg: "Success! Clean updated." });
};
const deleteClean = async (req,res) => {
    const { id: cleanId } = req.params;
    const userId = req.user.userId;
    const clean = await Clean.findOne({_id:cleanId})
    assetCheck(clean,cleanId,"clean");
    checkPermissions(req.user, clean.fromWho);
    clean.remove();
      res.status(StatusCodes.OK).json({ msg: "Success! Clean deleted." });
};



module.exports = {createClean,getAllFlatCleans,getSingleClean,updateClean,deleteClean}
 