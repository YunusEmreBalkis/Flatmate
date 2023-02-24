const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    content: {
        type:String,
        required:[true,"Please provide a title"],
        minlength:3,
        maxlength:500
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    likes: [{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Comment",CommentSchema)