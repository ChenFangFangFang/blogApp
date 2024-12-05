const Blog = require("../models/blog_model");

const getAllBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.status(200).json(blogs);
};

const getBlogById = async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate("user", {
      name: 1,
      username: 1
    })
    .populate("comments", { content: 1 }); // Populates the 'content' field from comments
  if (blog) {
    response.status(200).json(blog);
  } else {
    response.status(404).end();
  }
};
const postBlog = async (request, response) => {
  const blog = new Blog(request.body);
  const user = request.user;
  if (!user) {
    return response.status(403).json({ error: "user missing" });
  }
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" });
  }
  blog.likes = blog.likes | 0;
  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  await user.save();
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
};

const deleteBlogById = async (request, response, next) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end;
  }
  if (blog.user && blog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: "only the creator can delete this blog" });
  }

  await Blog.deleteOne();
  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  );

  await user.save();
  response.status(204).end();
};
const updateBlogById = async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  }).populate("comments");
  response.json(updatedBlog);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  postBlog,
  deleteBlogById,
  updateBlogById
};
