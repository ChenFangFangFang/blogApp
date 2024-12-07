import React from "react";
import PropTypes from "prop-types";
import { useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogListReducer";
import AddBlog from "../components/AddBlog";
import Togglable from "../components/Togglable";
import BlogList from "../components/BlogList";
const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs || []);
  const blogFormRef = createRef();

  useEffect(() => {
    console.log("Dispatching initializeBlogs...");
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div className="blog">
      {/* <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <AddBlog onBlogCreated={() => blogFormRef.current.toggleVisibility()} />
      </Togglable> */}
      <AddBlog onBlogCreated={blogFormRef} />
      <BlogList blogs={blogs} />
    </div>
  );
};

Blogs.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
  }).isRequired
};

export default Blogs;
