import React from 'react';
import Header  from './Header';
//import PropTypes from 'prop-types';
import { useField } from '../hooks';
import { login } from '../reducers/usersReducer';
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
  const username = useField('text');
  const password = useField('text');

  const submitAction = (e) => {
    e.preventDefault();
    console.log('e ', username.value);
    console.log('submitting');
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
          <input{...password} />
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
