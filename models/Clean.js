const mongoose = require("mongoose")


const CleanSchema = new mongoose.Schema({
    cleanPlace:{
        type:String,
        required:[true,"Please provide a cleanPlace"],
        minlength:3,
        maxlength:50
    },
    fromWho:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    time:{
        type:Date
    },
    flat:{
        type:Number
    },
    room:{
        type:Number
    },
    dormitory:{
        type:mongoose.Types.ObjectId,
        ref:"Dormitory",
        required:true
    }
})


module.exports = mongoose.model("Clean",CleanSchema);