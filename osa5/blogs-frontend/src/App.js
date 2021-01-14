import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import loginService from './services/login';
import { getAll } from './services/blogs';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [errorMessage, setMessage] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getAll().then(blogs => {
      setBlogs( blogs )
    }).catch( err => console.log(err))
  }, []);

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <LoginForm
        handleLogin= {handleLogin}
        username= {username}
        password= {password}
        setUsername = {setUsername}
        setPassword = {setPassword} />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App;
/*
handleLogin, username, target, password, setUsername, setPassword
*/
