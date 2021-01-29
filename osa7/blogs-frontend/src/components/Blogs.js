import React, { useState , useEffect } from 'react';
import ActionButton from './ActionButton';
import { useDispatch,  useSelector } from 'react-redux';
//import { addNotification } from '../reducers/notificationReducer';
import { likeThis, deleteThis } from '../reducers/blogReducer';

const yellowText = { color: 'yellow' };
const navyText = { color: 'navy' };
const showMore = {
  background: 'white',
  color: 'black',
  border: '5px solid green' };

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [showBlog, setShow] = useState(true);
  const [usersBlock, setUsersBlock] = useState(false);
  const toggleShow = () => {
    setShow(!showBlog);
  };
  //  setUsersBlock(false);

  // when this component is loaded
  useEffect(() => {
    if (blog.user.id === user.id) {
      setUsersBlock(true);
    }
  }, [blog.user.id, user.id]);

  // when liking the blog
  const liking = () => {
    console.log('dispachin like', blog);
    dispatch(likeThis({ blog }));
  };

  // delete blog
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

const Blogs = ({ user }) => {
  const allBlogs = useSelector(state => state.blogs);
  return (
    <div>
      {allBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog= {blog}
          user= {user} />
      )}
    </div>
  );
};

export default Blogs;
