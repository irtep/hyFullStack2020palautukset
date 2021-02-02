import React from 'react';
import Header  from './Header';
//import PropTypes from 'prop-types';
import { useField } from '../hooks';
import { login } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const style = {
  backgroundColor: 'indigo',
  color: 'gray',
  width: '300px',
  padding: '2px 5px',
  borderRadius: '5px',
  border: '2px solid black'
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text', 'username');
  const password = useField('text', 'password');

  const submitAction = (e) => {
    e.preventDefault();
    dispatch(login(username.value, password.value));
  };

  return (
    <div id= "loginFormX" style= { style } >
      <Header name= "login"/>
      <form onSubmit={submitAction}>
        <div>
        username
          <input {...username} />
        </div>
        <div>
        password
          <input {...password} />
        </div>
        <button id= "loginButton" type="submit">login</button>
      </form>
    </div>
  );
};
/*
LoginForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};
*/
export default LoginForm;
