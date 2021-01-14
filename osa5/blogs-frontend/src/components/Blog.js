import React from 'react';
const yellowText = { color: "yellow"};

const Blog = ({ blog }) => (
  <div>
    {blog.title} <span style= { yellowText }>{blog.author}</span>
  </div>
)

export default Blog;
