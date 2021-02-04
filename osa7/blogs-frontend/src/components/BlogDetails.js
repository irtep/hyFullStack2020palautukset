import React from 'react';
import ActionButton from './ActionButton';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeThis, deleteThis, commentThis } from '../reducers/blogReducer';
import { useField } from '../hooks';
const goldie = {
  color: 'gold',
  margin: '5px'
};

const commentStyle = {
  fontFamily: 'cursive',
  color: 'black'
};

const navyText = { color: 'navy' };
const showMore = {
  background: 'white',
  color: 'black',
  border: '5px solid green' };

const BlogDetails = () => {
  const newComment = useField('text', 'commentInput');
  const history = useHistory();
  const user = useSelector( state => state.user);
  const allBlogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = allBlogs.find( blo => blo.id === id);

  const liking = () => {
    dispatch(likeThis({ blog }));
  };

  const backToBlogs = () => {
    history.push('/blogs/');
  };

  const deleteBlog = () => {
    if (window.confirm(`really delete blog: ${blog.title}`)) {
      dispatch(deleteThis({ blog }));
    }
  };

  if (!blog) {
    return null;
  }

  const commentBlog = (e) => {
    e.preventDefault();
    const data = { blog: blog, newComment: newComment.value };
    if (newComment.value !== '') {
      dispatch(commentThis(data));
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

  if (!user) {
    return null;
  }

  return (
    <div style= {showMore}>
      <p>id: <span style= {navyText}>{blog.id}</span></p>
      <p>title: <span style= {navyText}>{blog.title}</span></p>
      <p>author: <span style= {navyText}>{blog.author}</span></p>
      <p>url: <span style= {navyText}>{blog.url}</span></p>
      <p>likes: <span style= {navyText}>{blog.likes}</span></p>
      <p>added by: <span style= {navyText}>{blog.user.name}</span></p>
      <div style= { goldie }>
       comments:
      </div>
      <ul>
        {blog.comments.map( str => {
          if (str !== null) {
            return <li
              key= {str}
              style= {commentStyle}>{str}</li>;
          }}
        )}
      </ul>
      {blog.user.id === user.id ? removeButton() : null}
      <ActionButton
        name= 'Like'
        action= {liking}
        textColor= 'white'
        bgColor= "darkGreen"
        hoverText= "navy"
        hoverBg= "dodgerBlue"/>
      <ActionButton
        name= 'Back'
        action= {backToBlogs}
        textColor= 'white'
        bgColor= "dodgerBlue"
        hoverText= "navy"
        hoverBg= "darkGreen"/>
      <div>
        <form onSubmit= {commentBlog}>
          <input{ ...newComment } />
          <button type= "submit">send comment</button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
