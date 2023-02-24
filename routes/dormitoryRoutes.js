const express = require("express");
const router = express.Router();
const {authenticateUser,authorizePermissions} = require("../middleware/authentication")

const {
    createDormitory,
    updateDormitory,
    deleteDormitory,
    getallDormitories,
    getDormitoryById,
  } = require("../controllers/dormitoryController")

router.route("/")
    .get([authenticateUser,authorizePermissions("admin")],getallDormitories)
    .post([authenticateUser,authorizePermissions("executive")],createDormitory);

router.route("/:id")    
    .get(getDormitoryById)
    .patch([authenticateUser,authorizePermissions("executive")],updateDormitory)
    .delete([authenticateUser,authorizePermissions("executive","admin")],deleteDormitory);

module.exports = router;