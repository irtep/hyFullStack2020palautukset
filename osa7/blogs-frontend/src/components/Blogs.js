import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const yellowText = { color: 'yellow' };

const Blog = ({ blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
      <span style= {yellowText}>{blog.author}</span>
    </div>
  );
};

const Blogs = () => {
  const allBlogs = useSelector(state => state.blogs);
  return (
    <div>
      {allBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog= {blog} />
      )}
    </div>
  );
};

export default Blogs;
