import React from 'react';
import Header  from './Header';
import { useField } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { createNew } from '../reducers/blogReducer';

const style = {
  backgroundColor: 'crimson',
  color: 'silver',
  width: '300px',
  padding: '2px 5px',
  borderRadius: '5px',
  border: '2px solid black'
};

const AdderForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const inputTitle = useField('text', 'inputTitle');
  const author = useField('text', 'author');
  const url = useField('text', 'url');
  const user = useSelector( state => state.users);

  // add new blog
  const addNewBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title: inputTitle.value,
      author: author.value,
      url: url.value,
      user: user.id
    };
    dispatch(createNew(newBlog));
    /*
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
    */
  };

  return(
    <div style= { style } >
      <Header name= "create new blog"/>
      <form id= "addBlogForm" onSubmit={ addNewBlog }>
        <div>
        title
          <input{ ...inputTitle } />
        </div>
        <div>
        author
          <input { ...author } />
        </div>
        <div>
        url
          <input { ...url }/>
        </div>
        <button id= "submitNew" type="submit">send new blog</button>
      </form>
    </div>
  );};

export default AdderForm;
