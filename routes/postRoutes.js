const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllPosts,
  getSinglePost,
  getPostByUserId,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");

router
  .route("/")
  .get(authenticateUser, getAllPosts)
  .post(authenticateUser, createPost);

router
  .route("/:id")
  .get(authenticateUser, getSinglePost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost);

router.route("/:id/getUserPosts").get(authenticateUser, getPostByUserId);

router.route("/:id/likePost").get(authenticateUser, likePost);

module.exports = router;
