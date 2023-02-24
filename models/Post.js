const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
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
    comments:{
        type:String,
        type:mongoose.Types.ObjectId,
        ref:"Comment",
    },
    likes: [{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Post",PostSchema);