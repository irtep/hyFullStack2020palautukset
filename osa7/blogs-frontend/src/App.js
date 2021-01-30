import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import AdderForm from './components/AdderForm';
import Notification from './components/Notification';
import ActionButton from './components/ActionButton';
import Header from './components/Header';
import Togglable from './components/Togglable';
import blogTools from './services/blogs';
import { setUser, logout } from './reducers/usersReducer';
import { setBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector( state => state.users );
  const blogFormRef = React.createRef();
  console.log('loggedUser ', loggedUser);
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

  // login
  /*
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginTools.login({
        username, password,
      });
      dispatch(setUser(user));
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
*/
  // log user out
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
    <div>
      <Notification />
      {loggedUser === null?
        showLoginForm() :
        showBlogs()
      }
    </div>
  );
};

export default App;
