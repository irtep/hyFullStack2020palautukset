import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogcdoteReducer';
import notiReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notiReducer,
  users: usersReducer
});
const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
