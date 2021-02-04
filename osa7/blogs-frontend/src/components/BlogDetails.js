import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const goldie = {
  color: 'gold',
  margin: '5px'
};
const bigNavy = {
  fontSize: '130%',
  color: 'navy'
};
const commentStyle = {
  fontFamily: 'cursive',
  color: 'black'
};

const BlogDetails = () => {
  const allBlogs = useSelector(state => state.blogs);
  const id = useParams().id;
  const detailsOf = allBlogs.find( blog => blog.id === id);
  if (!detailsOf) {
    return null;
  }

  return(
    <div>
      <span style= {bigNavy}>
        {detailsOf.title}
      </span>
      <div style= {goldie}>
        likes: {detailsOf.likes}
      </div>
      <div>
       added by: {detailsOf.user.username}
      </div>
      <div>
        <div style= { goldie }>
         comments:
        </div>
        <ul>
          {detailsOf.comments.map( str => {
            if (str !== null) {
              return <li
                key= {str}
                style= {commentStyle}>{str}</li>;
            }}
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
