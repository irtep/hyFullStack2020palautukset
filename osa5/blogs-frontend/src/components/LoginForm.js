import React from 'react';
import Header  from './Header';

const style = {
  backgroundColor: "indigo",
  color: "gray",
  width: "300px",
  padding: "2px 5px",
  borderRadius: "5px",
  border: "2px solid black"
};

const LoginForm = ({ submitAction, username, password, setUsername, setPassword }) => (
  <div style= { style } >
  <Header name= "login"/>
  <form onSubmit={submitAction}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  </div>
)

export default LoginForm;
