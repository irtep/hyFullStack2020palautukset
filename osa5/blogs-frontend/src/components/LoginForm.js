import React from 'react';
import Header  from './Header';
import PropTypes from 'prop-types';

const style = {
  backgroundColor: 'indigo',
  color: 'gray',
  width: '300px',
  padding: '2px 5px',
  borderRadius: '5px',
  border: '2px solid black'
};

const LoginForm = ({ submitAction, username, setUsername, password, setPassword }) => {

  return (
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
    </div>);
};

LoginForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
