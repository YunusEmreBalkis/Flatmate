const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    content: {
        type:String,
        required:[true,"Please provide a content"],
        minlength:3,
        maxlength:500
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    likes: [{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

PostSchema.virtual("comments",{
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
    justOne: false,
})

module.exports = mongoose.model("Post",PostSchema);