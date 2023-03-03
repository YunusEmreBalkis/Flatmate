const Comment = require("../models/Comment");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions,assetCheck } = require("../utils");

const getAllComments = async (req, res) => {
  const comment = await Comment.find({}).populate({
    path: 'post',
    select: 'content',
  }).populate({ path: "author", select: "name" });

  res.status(StatusCodes.OK).json({ comment });
};
const getSingleComments = async (req, res) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId }).populate({
    path: 'post',
    select: 'content',
  });
  assetCheck(comment,commentId,"comment");
  res.status(StatusCodes.OK).json({ comment });
};
const getByPostComments = async (req, res) => {
  const { id: postId } = req.params;

  const comment = await Comment.findOne({ post: postId });

  res.status(StatusCodes.OK).json({ comment });
};
const createComment = async (req, res) => {
  req.body.author = req.user.userId;
  const comment = await Comment.create(req.body);

  res.status(StatusCodes.CREATED).json({ comment });
};
const updateComment = async (req, res) => {
  const { id: commentId } = req.params;
  const comment = await Comment.findOne({ _id: commentId });
  assetCheck(comment,commentId,"comment");
  checkPermissions(req.user, comment.author);
   await Comment.findByIdAndUpdate(
    { _id: commentId },
    req.body,
    { new: true, runValidators: true }
  );


  res.status(StatusCodes.OK).json({ msg: "Success! Comment updated." });
};
const deleteComments = async (req, res) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId });
  assetCheck(comment,commentId,"comment");
  checkPermissions(req.user, comment.author);
  comment.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Comment removed" });
};
const likeComments = async (req, res) => {
  const user = req.user.userId;
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId });
  assetCheck(comment,commentId,"comment");
  comment.likes.push(user);
  comment.save();

  res.status(StatusCodes.OK).json({ comment });
};


module.exports = {getAllComments,getByPostComments,getSingleComments,createComment,updateComment,deleteComments,likeComments}
