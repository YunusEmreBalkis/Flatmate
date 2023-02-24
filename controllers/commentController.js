const Comment = require("../models/Comment");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");

const getAllComments = async (req, res) => {
  const comment = await Comment.find({});

  res.status(StatusCodes.OK).json({ comment });
};
const getSingleComments = async (req, res) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId });

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
  const comment = await Comment.findByIdAndUpdate(
    { _id: commentId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!comment) {
    throw new CustomError.NotFoundError(`No comment with that id ${commentId}`);
  }

  res.status(StatusCodes.OK).json({ comment });
};
const deleteComments = async (req, res) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId });

  checkPermissions(req.user, comment.user);
  comment.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Comment removed" });
};
const likeComments = async (req, res) => {
  const user = req.user;
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId });

  comment.likes.push(user);
  comment.save();

  res.status(StatusCodes.OK).json({ comments });
};

module.exports = {getAllComments,getByPostComments,getSingleComments,createComment,updateComment,deleteComments,likeComments}
