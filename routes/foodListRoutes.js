const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllFoodList,
  getSingleFoodList,
  createFoodList,
  updateFoodList,
  deleteFoodList,
} = require("../controllers/foodListController");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllFoodList)
  .post(authenticateUser, createFoodList);

router
  .route("/:id")
  .get(authenticateUser, getSingleFoodList)
  .patch(authenticateUser, updateFoodList)
  .delete(authenticateUser, deleteFoodList);

module.exports = router;
