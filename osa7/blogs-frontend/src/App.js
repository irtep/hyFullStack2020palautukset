import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import AdderForm from './components/AdderForm';
import Notification from './components/Notification';
import ActionButton from './components/ActionButton';
import UsersList from './components/UsersList';
import Header from './components/Header';
import Togglable from './components/Togglable';
import Menu from './components/Menu';
import blogTools from './services/blogs';
import { setUser, logout } from './reducers/usersReducer';
import { setBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  //  Switch,
  Route,
//  Link,
//  Redirect,
//  useRouteMatch,
//  useHistory,
} from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector( state => state.users );
  const blogFormRef = React.createRef();

  // when app is loaded
  useEffect(() => {
    dispatch(setBlogs());
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userDetails');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogTools.setToken(user.token);
    }
  }, []);

  const logOutUser = () => {
    dispatch(logout());
  };

  const showLoginForm = () => (
    <LoginForm />
  );

  const showBlogs = () => {
    return(
      <div>
        <Header name= 'Blogs'/>
        <div>{loggedUser.name} logged in
          <ActionButton
            id= "logoutButton"
            action= { logOutUser }
            name= "Logout"/>
        </div><br/>
        <Togglable
          button1label= "create new"
          button2label= "don't create"
          ref= {blogFormRef}>
          <AdderForm
            blogFormRef= { blogFormRef }
          />
        </Togglable>
        <div>
          <Blogs />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Menu/>
      <Notification />
      <Route path= "/">
      </Route>
      <Route path= "/blogs">
        {loggedUser === null?
          showLoginForm() :
          showBlogs()
        }
      </Route>
      <Route path= "/users">
        <Header name= "Users" />
        <UsersList />
      </Route>
    </Router>
  );
};

export default App;
