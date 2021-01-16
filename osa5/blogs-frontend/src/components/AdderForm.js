import React, { useState } from 'react';
import Header  from './Header';

const style = {
  backgroundColor: "crimson",
  color: "silver",
  width: "300px",
  padding: "2px 5px",
  borderRadius: "5px",
  border: "2px solid black"
};

const AdderForm = ({ blogFormRef, user, blogTools, blogs, setBlogs, setErrorMessage }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  // add new blog
  const addNewBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title: blogTitle,
      author: author,
      url: url,
      user: user.id
    };
    blogTools.create(newBlog).then( () => {
      setBlogTitle('');
      setAuthor('');
      setUrl('');
      const updatedBlogs = blogs.concat(newBlog);
      setBlogs(updatedBlogs);
    }).catch( err => {
      setErrorMessage({msg: 'error creating blog, check all fields', badNews: true})
      setTimeout(() => {
        setErrorMessage({msg: null});
      }, 5000);
    });
  };
  return(
  <div style= { style } >
    <Header name= "create new blog"/>
    <form onSubmit={ addNewBlog }>
      <div>
        title
          <input
          type="text"
          value={ blogTitle }
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={ author }
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={ url }
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">send new blog</button>
    </form>
  </div>
)}

export default AdderForm;
