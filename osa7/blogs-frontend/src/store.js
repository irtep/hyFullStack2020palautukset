import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer';
import notiReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import allUsersReducer from './reducers/allUsersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notiReducer,
  user: userReducer,
  allUsers: allUsersReducer
});
const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
