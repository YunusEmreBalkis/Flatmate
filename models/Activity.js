const mongoose = require("mongoose");
const validator = require("validator")

const ActivitySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"],
        minlength:3,
        maxlength:50
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content:{
        type:String,
        required:[true,"Please provide a content"],
        minlength:10
    },
    time:{
        type:Date
    },
    whoAttend: [{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Activity",ActivitySchema)