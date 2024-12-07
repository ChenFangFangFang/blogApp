const Blog = require("../models/blog_model");
const Comment = require("../models/comment_model");

const createComment = async (request, response) => {
  try {
    const { content } = request.body;
    const blogId = request.params.blogId;

    // Validate input
    if (!content) {
      return response.status(400).json({ error: "Content is required" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    const comment = new Comment({ content, blogs: blogId });
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    response.status(201).json(savedComment);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error saving comment", details: error.message });
  }
};

module.exports = { createComment };
