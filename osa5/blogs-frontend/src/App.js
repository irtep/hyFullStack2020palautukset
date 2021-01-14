import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ActionButton from './components/ActionButton';
import Header from './components/Header';
import loginTools from './services/login';
import blogTools from './services/blogs';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // get blogs from db
  useEffect(() => {
    blogTools.getAll().then(blogs => {
      setBlogs( blogs );
    }).catch( err => console.log(err))
  }, []);

  // log in if remembers login
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userDetails');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //noteService.setToken(user.token);
    }
  }, []);

  // login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginTools.login({
        username, password,
      })
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem(
        'userDetails', JSON.stringify(user)
      );
    } catch (exception) {
      setErrorMessage({msg: 'wrong credentials', badNews: true})
      setTimeout(() => {
        setErrorMessage({msg: null});
      }, 5000);
    }
  };

  // log use out
  const logOutUser = () => {
    window.localStorage.removeItem('userDetails');
    setUser(null);
  }

  const showLoginForm = () => (
    <LoginForm
    submitAction= {handleLogin}
    username= {username}
    password= {password}
    setUsername = {setUsername}
    setPassword = {setPassword} />
  )

  const showBlogs = () => (
    <div>
    <Header name= 'Blogs'/>
    <p>{user.name} logged in
    <ActionButton
      id= "logoutButton"
      action= { logOutUser }
      name= "Logout"/></p><br/>
    <p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </p>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null?
        showLoginForm() :
        showBlogs()
      }
    </div>
  )
}

export default App;
/*
handleLogin, username, target, password, setUsername, setPassword
window.localStorage.setItem('joo', 'jee')
getItem('joo')
removeItem('joo')
*/
