import React, { useState } from 'react';
import Header  from './Header';

const style = {
  backgroundColor: 'crimson',
  color: 'silver',
  width: '300px',
  padding: '2px 5px',
  borderRadius: '5px',
  border: '2px solid black'
};

const AdderForm = ({ blogFormRef, user, blogTools, setBlogs, setErrorMessage, sortBlogs }) => {
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
      // update view to see updated blogs in ui
      blogTools.getAll().then(blogs => {
        setBlogs(sortBlogs(blogs));
        setErrorMessage({ msg: 'Successfully created a blog.', badNews: false });
        setTimeout(() => {
          setErrorMessage({ msg: null });
        }, 5000);
      }).catch( err => console.log(err));
    }).catch( err => {
      console.log(err);
      setErrorMessage({ msg: 'ERROR: no 1-2 char or empty fields.', badNews: true });
      setTimeout(() => {
        setErrorMessage({ msg: null });
      }, 5000);
    });
  };

  return(
    <div style= { style } >
      <Header name= "create new blog"/>
      <form id= "addBlogForm" onSubmit={ addNewBlog }>
        <div>
        title
          <input
            id= "inputTitle"
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
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={ url }
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id= "submitNew" type="submit">send new blog</button>
      </form>
    </div>
  );};

export default AdderForm;
