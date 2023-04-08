const express = require("express");
const router = express.Router();
const {createClean,getAllFlatCleans,getSingleClean,updateClean,deleteClean}  = require("../controllers/cleanController")
const {authenticateUser,authorizePermissions} = require("../middleware/authentication")


router.route("/").get(authenticateUser,getAllFlatCleans).post(authenticateUser,createClean)
router.route("/:id").get(authenticateUser,getSingleClean).patch(authenticateUser,updateClean).delete(authenticateUser,deleteClean);


module.exports = router;