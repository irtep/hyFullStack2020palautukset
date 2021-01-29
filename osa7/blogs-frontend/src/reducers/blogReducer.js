import blogTools from '../services/blogs';
//import { addNotification } from './notificationReducer';

// action creators
export const setBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogTools.getAll();
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
    dispatch({
      type: 'VOTE',
      data: blog
    });
  };
};

const blogReducer = ( state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    return state.map(a => a.id === action.data.id ? action.data : a).sort( (ax, b) => {
      return b.likes - ax.likes;
    });
  case 'CREATE':
  //  const newData = action.data.filter( ane => !state.some( anec => ane.content === anec.content))
  //  return state.concat(newData);
    break;
  case 'INITIATE':
    console.log('got initiate ', action);
    return state.concat(action.data);
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id);
  default: return state;
  }
};

export default blogReducer;
