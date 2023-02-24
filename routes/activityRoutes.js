const express = require("express");
const router = express.Router();
const {authenticateUser,authorizePermissions} = require("../middleware/authentication")

const {
    createActivity,
    getAllActivities,
    getSingleActivity,
    updateActivity,
    deleteActivity,
    joinActivity
  } = require("../controllers/activityController")


  router.route("/")
        .get(authenticateUser,getAllActivities)
        .post(authenticateUser,createActivity);

  router.route("/:id")
        .get(authenticateUser,getSingleActivity)
        .patch(authenticateUser,updateActivity)
        .delete(authenticateUser,deleteActivity)

  router.route("/:id/join").patch(authenticateUser,joinActivity)


module.exports = router;