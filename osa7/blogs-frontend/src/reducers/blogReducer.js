import blogTools from '../services/blogs';
import { addNotification } from './notificationReducer';

const sortByLikes = (blogs) => {
  return blogs.sort((a,b) =>  b.likes - a.likes);
};

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
export const deleteThis = ({ blog }) => {
  return async dispatch => {
    await blogTools.erase(blog.id);
    dispatch(addNotification({ msg: `deleted blog: ${blog.id}`, badNews: false }, 5));
    dispatch({
      type: 'DELETE',
      data: blog
    });
  };
};

export const likeThis = ({ blog }) => {
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

export const commentThis = ({ blog, newComment }) => {
  return async dispatch => {
    await  blogTools.sendComment(newComment, blog.id);
    blog.comments.push(newComment);
    dispatch(addNotification({ msg: 'Comment sent, thanks!', badNews: false }, 5));
    dispatch({
      type: 'COMMENT',
      data: blog
    });
  };
};

export const createNew = (data) => {
  return async dispatch => {
    try {
      await blogTools.create(data);
      const allBlogs = await blogTools.getAll();
      const newData = allBlogs.filter( a => a.title === data.title);
      dispatch(addNotification({ msg: 'Successfully created a blog.', badNews: false }, 5));
      dispatch({
        type: 'CREATE',
        data: newData[0]
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
    return sortByLikes(state.map(a => a.id === action.data.id ? action.data : a));
  case 'CREATE':
    return sortByLikes([ ...state, action.data ]);
  case 'INITIATE':
    return sortByLikes(state.concat(action.data));
  case 'COMMENT':
    return sortByLikes(state.map(a => a.id === action.data.id ? action.data : a));
  case 'DELETE':
    return sortByLikes(state.filter(blog => blog.id !== action.data.id));
  default: return state;
  }
};

export default blogReducer;
