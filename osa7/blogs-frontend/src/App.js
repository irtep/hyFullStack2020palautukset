import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import AdderForm from './components/AdderForm';
import Notification from './components/Notification';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import Header from './components/Header';
import Togglable from './components/Togglable';
import Menu from './components/Menu';
import blogTools from './services/blogs';
import { setUser } from './reducers/userReducer';
import { setBlogs } from './reducers/blogReducer';
import { setUsers } from './reducers/allUsersReducer';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector( state => state.user );
  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(setBlogs());
    dispatch(setUsers());
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userDetails');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogTools.setToken(user.token);
    }
  }, []);

  const showLoginForm = () => (
    <LoginForm />
  );

  const showBlogs = () => {
    return(
      <div>
        <Header name= 'Blogs'/>
        <div>
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
      <Switch>
        <Route path="/users/:id">
          <UserDetails />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails />
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
        <Route path= "/">
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
