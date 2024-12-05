const userController = require("../controllers/user_controller");
const express = require("express");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
module.exports = router;
