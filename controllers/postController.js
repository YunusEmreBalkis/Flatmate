const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions,assetCheck } = require("../utils");

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({ posts });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId }).populate("comments")
  assetCheck(post,postId,"post")
  res.status(StatusCodes.OK).json({ post });
};

const getPostByUserId = async (req, res) => {
  const { id: userId } = req.params;
  const posts = await Post.find({ author: userId });
  assetCheck(posts,userId,"user")
  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  req.body.author = req.user.userId;

  const post = await Post.create(req.body);

  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findById({_id:postId});
  
  assetCheck(post,postId,"post");
  checkPermissions(req.user, post.author);
  await Post.findByIdAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  

  res.status(StatusCodes.OK).json({ msg: "Success! Post updated" });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  assetCheck(post,postId,"post");

  checkPermissions(req.user, post.author);
  await post.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Post removed" });
};

const likePost = async (req, res) => {
  const user = req.user.userId;
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });
  assetCheck(post,postId,"post");

  if (post.likes.includes(user)) {
    post.likes.splice(post.likes.indexOf(user),1)
  }
  else{
    post.likes.push(user);
  }

  

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
