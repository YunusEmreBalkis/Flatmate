const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {getAllMachines,getSingleMachine,getCurrentUser,createMachine,updateMachine,deleteMachine,useMachine,emptytomachine,addmetothequeue} = require("../controllers/laundrycontroller")

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllMachines)
  .post([authenticateUser, authorizePermissions("admin","executive")], createMachine);

router
  .route("/:id")
  .get(authenticateUser, getSingleMachine)
  .patch(authenticateUser, updateMachine)
  .delete(authenticateUser, deleteMachine);

router
  .route("/:id/getcurrentuser")
  .get(authenticateUser, getCurrentUser)
router
  .route("/:id/useMachine")
  .get(authenticateUser, useMachine)
router
  .route("/:id/emptyMachine")
  .get(authenticateUser, emptytomachine)
router
  .route("/:id/addqueue")
  .get(authenticateUser, addmetothequeue)


module.exports = router;