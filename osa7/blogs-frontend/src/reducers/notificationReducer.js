var timeouts = [];

export const addNotification = (content, timer) => {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  return async dispatch => {
    await dispatch(showNotification(content));
    timeouts.push(window.setTimeout( () => {
      dispatch(clearNotification());
    }, timer * 1000));
  };
};

const showNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    data: content
  };
};

const clearNotification = () => {
  return {
    type: 'CLEAR',
    data: ''
  };
};

const notiReducer = (state = { msg: null, badNews: false }, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.data;
  case 'CLEAR':
    return '';
  default:
    return state;
  }
};

export default notiReducer;
