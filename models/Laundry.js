const mongoose = require("mongoose");

const LaundrySchema = new mongoose.Schema({

    machine:{
        type: String,
        required: [true, "Please provide a content"],
        minlength: 3,
        maxlength: 40,
    },
    executive:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    emptyInfo:{
        type:Boolean
    },
    brokenInfo:{
        type:Boolean
    },
    queue:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    currentUser :{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Laundry",LaundrySchema)