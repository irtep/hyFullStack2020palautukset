import blogTools from '../services/blogs';
//import { addNotification } from './notificationReducer';

// sort blogs
/*
const sortBlogs = (receivedBlogs) => {
  const sorted = receivedBlogs.sort( (a, b) => {
    return b.likes - a.likes;
  });
  return sorted;
};
*/
// action creators
export const setBlogs = () => {
  return async dispatch => {
    console.log('setting:');
    const allBlogs = await blogTools.getAll();
    console.log('got all blogs: ', allBlogs);
    dispatch({
      type: 'INITIATE',
      data: allBlogs
    });
  };
};
export const deleteThis = (blog) => {
  return async dispatch => {
    await blogTools.erase(blog.id);
    dispatch({
      type: 'DELETE',
      data: blog
    });
  };
};

export const likeThis = (blog) => {
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
    return action.data;
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id);
  default: return state;
  }
};

export default blogReducer;
/*
import anecdoteServices from '../services/anecdotes'

// action creators
export const voteThis = (id, content, votes) => {
  return async dispatch => {
    await anecdoteServices.update(id, content, votes + 1)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const createNew = (data) => {
  return async dispatch => {
    const newAnecdote = {
      content: data,
      votes: 0
    }
    await anecdoteServices.create(newAnecdote)
    const newNotes = await anecdoteServices.getAll()
    dispatch({
      type: 'CREATE',
      data: newNotes
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

const aneReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newVoteFor = state.find(a => a.id === action.data)
      const changedAnec = {
        ...newVoteFor,
        votes: newVoteFor.votes + 1
      }
      return state.map(ane => ane.id !== action.data ? ane : changedAnec)
    case 'CREATE':
      const newData = action.data.filter( ane => !state.some( anec => ane.content === anec.content))
      return state.concat(newData)
    case 'INIT_NOTES':
      return state.concat(action.data)
    default: return state
  }
}

export default aneReducer
*/
