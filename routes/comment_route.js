const express = require("express");
const commentController = require("../controllers/comment_controller");
const router = express.Router();

router.post("/:id", commentController.createComment);
module.exports = router;
