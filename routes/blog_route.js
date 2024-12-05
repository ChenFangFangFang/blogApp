const express = require("express");
const blogController = require("../controllers/blog_controller");
const router = express.Router();
const userExtractor = require("../utils/middleware").userExtractor;

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", userExtractor, blogController.postBlog);
router.delete("/:id", userExtractor, blogController.deleteBlogById);
router.put("/:id", blogController.updateBlogById);

module.exports = router;
