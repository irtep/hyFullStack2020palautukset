import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { useDispatch,  useSelector } from 'react-redux';
import { likeThis, deleteThis } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';

const yellowText = { color: 'yellow' };
const navyText = { color: 'navy' };
const showMore = {
  background: 'white',
  color: 'black',
  border: '5px solid green' };

const Blog = ({ blog }) => {
  const user = useSelector( state => state.user);
  const dispatch = useDispatch();
  const [showBlog, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!showBlog);
  };

  const liking = () => {
    dispatch(likeThis({ blog }));
  };

  const deleteBlog = () => {
    if (window.confirm(`really delete blog: ${blog.title}`)) {
      dispatch(deleteThis({ blog }));
    }
  };

  const removeButton = () => (
    <ActionButton
      name= 'DELETE'
      textColor= 'white'
      bgColor= "pink"
      hoverText= "gold"
      hoverBg= "red"
      action= {deleteBlog}/>
  );

  const showBrief = () => (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
      <span style= {yellowText}>{blog.author}</span>
      <button onClick= {toggleShow}>show</button>
    </div>
  );

  const showLong = () => (
    <div style= {showMore}>
      <p>id: <span style= {navyText}>{blog.id}</span></p>
      <p>title: <span style= {navyText}>{blog.title}</span></p>
      <p>author: <span style= {navyText}>{blog.author}</span></p>
      <p>url: <span style= {navyText}>{blog.url}</span></p>
      <p>likes: <span style= {navyText}>{blog.likes}</span>
        <ActionButton
          name= 'Like'
          action= {liking}
          textColor= 'white'
          bgColor= "darkGreen"
          hoverText= "navy"
          hoverBg= "dodgerBlue"/></p>
      <p>added by: <span style= {navyText}>{blog.user.name}</span></p>
      <button onClick= {toggleShow}>hide</button>
      {blog.user.id === user.id ? removeButton() : null}
    </div>
  );

  return(
    <div className= "blogNote">
      { showBlog === true ?
        showBrief() :
        showLong() }
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
