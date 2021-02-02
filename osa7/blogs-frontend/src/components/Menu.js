import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
//  BrowserRouter as Router,
  //  Switch,
  //  Route,
  Link,
//  Redirect,
//  useRouteMatch,
//  useHistory,
} from 'react-router-dom';

const style = {
  margin: '10px',
  padding: '5px',
  backgroundColor: 'white',
  borderRadius: '5px',
  color: 'black'
};


const Menu = () => {
  const loggedUser = useSelector( state => state.user );
  const [ user, setUser ] = useState(' logged out.');

  useEffect( () => {
    console.log('logged user: ', loggedUser);
    if (loggedUser !== null && loggedUser !== undefined) {
      setUser(` ${loggedUser.name} logged in.`);
    } else {
      setUser(' logged out.');
    }
    return () => {};
  }, [loggedUser]);

  return (
    <div style= {style}>
      <Link to= "/blogs"> BLOGS </Link>
      <Link to= "/users"> USERS </Link>
      {user}
    </div>
  );
};

export default Menu;
