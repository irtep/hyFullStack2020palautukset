import React from 'react';
import Header  from './Header';
// W I P     W I P
const style = {
  backgroundColor: "white",
  color: "black",
  width: "300px",
  padding: "2px 5px",
  borderRadius: "5px"
};

const AdderForm = ({ onSubmit, username, password, setUsername, setPassword }) => (
  <div style= { style } >
    <Header name= "create new"/>
    <form onSubmit={ onSubmit }>
      <div>
        title
          <input
          type="text"
          value={blogTitle}
          name="blogTitle"
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

export default AdderForm;
