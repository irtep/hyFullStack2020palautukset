import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ActionButton from './ActionButton';
import { logout } from '../reducers/userReducer';

const style = {
  margin: '10px',
  padding: '5px',
  backgroundColor: 'white',
  borderRadius: '5px',
  color: 'black'
};


const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useSelector( state => state.user );
  const [ user, setUser ] = useState(' logged out.');
  const [ logged, setLogged] = useState(false);

  const logOutUser = () => {
    history.push('/blogs/');
    dispatch(logout());
  };

  useEffect( () => {
    if (loggedUser !== null && loggedUser !== undefined) {
      setUser(` ${loggedUser.name} logged in.`);
      setLogged(true);
    } else {
      setUser(' logged out.');
      setLogged(false);
    }
    return () => {};
  }, [loggedUser]);


  return (
    <div style= {style}>
      <Link to= "/"> HOME </Link>
      <Link to= "/blogs"> BLOGS </Link>
      <Link to= "/users"> USERS </Link>
      {user}
      {logged ?
        <ActionButton
          id= "logoutButton"
          action= { logOutUser }
          name= "Logout"/> : null}
    </div>
  );
};

export default Menu;
