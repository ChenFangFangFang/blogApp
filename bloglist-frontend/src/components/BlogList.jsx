import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const byLikes = (a, b) => b.likes - a.likes;

const BlogList = ({ blogs }) => {
  return (
    <ul>
      {blogs
        .slice()
        .sort(byLikes)
        .map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
    </ul>
  );
};
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BlogList;
