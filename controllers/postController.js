const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({ posts });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });
  res.status(StatusCodes.OK).json({ post });
};

const getPostByUserId = async (req, res) => {
  const { id: userId } = req.params;
  const posts = await Post.find({ author: userId });

  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  req.body.author = req.user.userId;

  const post = await Post.create(req.body);

  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findByIdAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    throw new CustomError.NotFoundError(`No post with that id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError(`No post with that id ${postId}`);
  }

  checkPermissions(req.user, post.user);
  await post.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Post removed" });
};

const likePost = async (req, res) => {
  const user = req.user;
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  post.likes.push(user);

  post.save();

  res.status(StatusCodes.OK).json({ post });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  getPostByUserId,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
