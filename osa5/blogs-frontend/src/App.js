import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AdderForm from './components/AdderForm';
import Notification from './components/Notification';
import ActionButton from './components/ActionButton';
import Header from './components/Header';
import Toggable from './components/Toggable';
import loginTools from './services/login';
import blogTools from './services/blogs';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = React.createRef();

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
      blogTools.setToken(user.token);
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
      blogTools.setToken(user.token);
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

  // log user out
  const logOutUser = () => {
    window.localStorage.removeItem('userDetails');
    setUser(null);
    blogTools.setToken('');
  }

  const showLoginForm = () => (
    <Toggable
      button1Label= "login"
      button2label= "cancel">
      <LoginForm
      submitAction= {handleLogin}
      username= {username}
      password= {password}
      setUsername = {setUsername}
      setPassword = {setPassword} />
    </Toggable>
  )

  const showBlogs = () => (
    <div>
    <Header name= 'Blogs'/>
    <div>{user.name} logged in
    <ActionButton
      id= "logoutButton"
      action= { logOutUser }
      name= "Logout"/>
    </div><br/>

    <Toggable
      button1Label= "create new"
      button2label= "don't create"
      ref= {blogFormRef}>
      <AdderForm
        blogFormRef= { blogFormRef}
        user= { user }
        blogTools= { blogTools }
        blogs= { blogs }
        setBlogs= { setBlogs }
        setErrorMessage= { setErrorMessage } / >
      </Toggable>
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
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
