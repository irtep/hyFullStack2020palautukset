import React, { useState, useEffect } from 'react';
import ActionButton from './ActionButton';

const yellowText = { color: 'yellow' };
const navyText = { color: 'navy' };
const showMore = {
  background: 'white',
  color: 'black',
  border: '5px solid green' };

const Blog = ({ blog, blogTools, setBlogs, setErrorMessage, sortBlogs, user, likeThis }) => {
  const [showBlog, setShow] = useState(true);
  const [usersBlock, setUsersBlock] = useState(false);

  const toggleShow = () => {
    setShow(!showBlog);
  };

  // when this component is loaded
  useEffect(() => {
    if (blog.user.id === user.id) {
      setUsersBlock(true);
    }
  }, [blog.user.id, user.id]);

  // when liking the blog
  const liking = () => {
    likeThis({ blog });
  };

  // delete blog
  const deleteBlog = () => {
    if (window.confirm(`really delete blog: ${blog.title}`)) {
      blogTools.erase(blog.id).then( () => {
        setErrorMessage({ msg: `deleted: ${blog.title}`, badNews: false });
        setTimeout(() => {
          setErrorMessage({ msg: null });
        }, 5000);
        // update view to see updated blogs in ui
        blogTools.getAll().then(blogs => {
          setBlogs(sortBlogs(blogs));
        }).catch( err => {
          console.log(err);
          setErrorMessage({ msg: 'error getting info from database', badNews: true });
          setTimeout(() => {
            setErrorMessage({ msg: null });
          }, 5000);
        });
      })
        .catch( err => {
          console.log(err);
          setErrorMessage({ msg: 'error in delete!', badNews: true });
          setTimeout(() => {
            setErrorMessage({ msg: null });
          }, 5000);
        });
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
      {blog.title}
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
      {usersBlock ? removeButton() : null}
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

export default Blog;
