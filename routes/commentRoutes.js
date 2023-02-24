const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllComments,
  getByPostComments,
  getSingleComments,
  createComment,
  updateComment,
  deleteComments,
  likeComments,
} = require("../controllers/commentController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllComments)
  .post(authenticateUser, createComment);

router
  .route("/:id")
  .get(authenticateUser, getSingleComments)
  .patch(authenticateUser, updateComment)
  .delete(authenticateUser, deleteComments);

router.route("/:id/getPostComments").get(authenticateUser, getByPostComments);

router.route("/:id/likeComment").get(authenticateUser, likeComments);

module.exports = router;
