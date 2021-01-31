import { addNotification } from './notificationReducer';
import loginTools from '../services/login';
import blogTools from '../services/blogs';

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginTools.login({
        username, password,
      });
      console.log('login ok! ', user);

      blogTools.setToken(user.token);
      window.localStorage.setItem(
        'userDetails', JSON.stringify(user)
      );
      dispatch({
        type: 'USER',
        data: user
      });
    } catch (exception) {
      dispatch(addNotification({ msg: 'wrong credentials', badNews: true }, 5));
    }
  };

};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('userDetails');
    blogTools.setToken('');
    dispatch(addNotification({ msg: 'logged out', badNews: false }, 5));
    dispatch({
      type: 'LOGOUT'
    });
  };
};

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'USER',
      data: user
    });
  };
};

const usersReducer = ( state = null, action) => {
  switch (action.type) {
  case 'USER':
    return { ...state,
      id: action.data.id,
      username: action.data.username,
      name: action.data.name,
      passwordHash: action.data.passwordHash
    };
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export default usersReducer;
