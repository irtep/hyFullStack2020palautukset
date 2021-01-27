import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import AdderForm from './components/AdderForm';
import Notification from './components/Notification';
import ActionButton from './components/ActionButton';
import Header from './components/Header';
import Togglable from './components/Togglable';
import blogTools from './services/blogs';
import loginTools from './services/login';
import { addNotification } from './reducers/notificationReducer';
import { setBlogs } from './reducers/blogReducer';
import { useDispatch } from 'react-redux';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const blogFormRef = React.createRef();

  // when app is loaded
  useEffect(() => {
    dispatch(setBlogs());
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userDetails');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogTools.setToken(user.token);
    }
  }, []);

  // login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginTools.login({
        username, password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
      blogTools.setToken(user.token);
      window.localStorage.setItem(
        'userDetails', JSON.stringify(user)
      );
    } catch (exception) {
      dispatch(addNotification({ msg: 'wrong credentials', badNews: true }, 5));
    }
  };

  // log user out
  const logOutUser = () => {
    window.localStorage.removeItem('userDetails');
    setUser(null);
    blogTools.setToken('');
  };

  const showLoginForm = () => (
    <LoginForm
      submitAction= {handleLogin}
      username= {username}
      password= {password}
      setUsername = {setUsername}
      setPassword = {setPassword} />
  );

  const showBlogs = () => (
    <div>
      <Header name= 'Blogs'/>
      <div>{user.name} logged in
        <ActionButton
          id= "logoutButton"
          action= { logOutUser }
          name= "Logout"/>
      </div><br/>

      <Togglable
        button1label= "create new"
        button2label= "don't create"
        ref= {blogFormRef}>
        <AdderForm/ >
      </Togglable>
      <div>
        <Blogs user= {user} />
      </div>
    </div>
  );

  return (
    <div>
      <Notification />
      {user === null?
        showLoginForm() :
        showBlogs()
      }
    </div>
  );
};

export default App;
