import React, { useState } from 'react';
const yellowText = { color: "yellow"};

const Blog = ({ blog }) => {
  const [showBlog, setShow] = useState(true);
  console.log('blog: ', showBlog);
  const toggleShow = () => {
    console.log('toggling');
    setShow(!showBlog);
  };

  const showBrief = () => (
    <div>{blog.title}
    <div>
    <span style= { yellowText }>{blog.author}</span>
    </div>
    <div>
    <button onClick= {toggleShow}>show</button>
    </div>
    </div>
  );

  const showLong = () => (
    <>{blog.url} <span style= { yellowText }>{blog.author}</span></>
  );

  return(
  <div>
    { showBlog === true ?
      showBrief() :
      showLong() }
  </div>
  )
};

export default Blog;
