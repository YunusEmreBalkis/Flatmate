const mongoose = require("mongoose");
const validator = require("validator");


const DormitorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"],
        minlength:3,
        maxlength:50
    },
    executive:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    adress:{
        type:String
    },
    flatCount:{
        type:Number,
    }
})

module.exports = mongoose.model("Dormitory",DormitorySchema);