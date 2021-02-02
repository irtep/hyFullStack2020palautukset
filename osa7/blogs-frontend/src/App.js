import React, { useEffect, useState } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import AdderForm from './components/AdderForm';
import Notification from './components/Notification';
import ActionButton from './components/ActionButton';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import Header from './components/Header';
import Togglable from './components/Togglable';
import Menu from './components/Menu';
import blogTools from './services/blogs';
import userTools from './services/users';
import { setUser, logout } from './reducers/userReducer';
import { setBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //  Link,
  //  Redirect,
//  useRouteMatch,
//  useHistory,
} from 'react-router-dom';

const App = () => {
  const [ allUsers, setUsers ] = useState([{
    name: 'wait',
    id: 'xxxxx',
    notes: []
  }]);
  const dispatch = useDispatch();
  const loggedUser = useSelector( state => state.user );
  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(setBlogs());
    // get users list
    userTools.getAll().then( users => {
      setUsers(users);
    });
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
        <div>
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
  /*
  const match = useRouteMatch('/users/:id');
  const userDetails = match
    ? allUsers.find(note => note.id === Number(match.params.id))
    : null;
  console.log('match, userDetails', match);
  console.log('user details', userDetails);
  */
  return (
    <Router>
      <Menu/>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <UserDetails />
        </Route>
        <Route path= "/blogs">
          {loggedUser === null?
            showLoginForm() :
            showBlogs()
          }
        </Route>
        <Route path= "/users">
          <Header name= "Users" />
          <UsersList users = {allUsers}/>
        </Route>
        <Route path= "/">
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
