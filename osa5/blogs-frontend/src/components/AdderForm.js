import React from 'react';
import Header  from './Header';

const style = {
  backgroundColor: "crimson",
  color: "silver",
  width: "300px",
  padding: "2px 5px",
  borderRadius: "5px",
  border: "2px solid black"
};

const AdderForm = ({ onSubmit, blogTitle, author, url, setBlogTitle, setAuthor, setUrl }) => (
  <div style= { style } >
    <Header name= "create new blog"/>
    <form onSubmit={ onSubmit }>
      <div>
        title
          <input
          type="text"
          value={ blogTitle }
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={ author }
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={ url }
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">send new blog</button>
    </form>
  </div>
)

export default AdderForm;
