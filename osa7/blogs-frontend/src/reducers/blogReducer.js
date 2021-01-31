import blogTools from '../services/blogs';
import { addNotification } from './notificationReducer';

// action creators
export const setBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogTools.getAll();
    dispatch(addNotification({ msg: 'Welcome!', badNews: false }, 5));
    dispatch({
      type: 'INITIATE',
      data: allBlogs
    });
  };
};
export const deleteThis = (blog) => {
  blog = blog.blog;
  console.log('delete: ', blog);

  return async dispatch => {
    await blogTools.erase(blog.id);
    dispatch(addNotification({ msg: `deleted blog: ${blog.id}`, badNews: false }, 5));
    dispatch({
      type: 'DELETE',
      data: blog
    });
  };
};

export const likeThis = (blog) => {
  blog = blog.blog;
  const newValue = blog.likes + 1;
  return async dispatch => {
    await  blogTools.update(blog.id, 'likes', newValue);
    blog.likes = newValue;
    dispatch(addNotification({ msg: `liked: ${blog.title}`, badNews: false }, 5));
    dispatch({
      type: 'VOTE',
      data: blog
    });
  };
};

export const createNew = (data) => {
  return async dispatch => {
    try {
      await blogTools.create(data);
      dispatch(addNotification({ msg: 'Successfully created a blog.', badNews: false }, 5));
      dispatch({
        type: 'CREATE'
      });
    }
    catch(err) {
      console.log(err);
      dispatch(addNotification({ msg: 'ERROR: no 1-2 characters or empty fields.', badNews: true }, 5));
    }

  };
};

const blogReducer = ( state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    return state.map(a => a.id === action.data.id ? action.data : a).sort( (ax, b) => {
      return b.likes - ax.likes;
    });
  case 'CREATE':/*
    const newStuff = blogTools.getAll().then( blogs => {
      return state.map( a => a.id === blogs.id);
    });*/
    return state;
  case 'INITIATE':
    return state.concat(action.data).sort( (ax, b) => {
      return b.likes - ax.likes;});
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id);
  default: return state;
  }
};

export default blogReducer;
