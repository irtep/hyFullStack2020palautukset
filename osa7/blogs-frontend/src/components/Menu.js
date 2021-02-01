import React from 'react';
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
  borderRadius: '5px'
};


const Menu = () => {
  return (
    <div style= {style}>
      <Link to= "/blogs"> BLOGS </Link>
      <Link to= "/users"> USERS </Link>
    </div>
  );
};

export default Menu;
