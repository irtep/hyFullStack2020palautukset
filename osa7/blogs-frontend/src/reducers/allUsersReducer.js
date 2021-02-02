import userTools from '../services/users';

// action creators
export const setUsers = () => {
  return async dispatch => {
    const allUsers = await userTools.getAll();
    dispatch({
      type: 'START',
      data: allUsers
    });
  };
};

const allUsersReducer = ( state = [], action) => {
  switch (action.type) {
  case 'START':
    return state.concat(action.data);
  default: return state;
  }
};

export default allUsersReducer;
