import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const goldie = {
  color: 'gold',
  margin: '5px'
};
const bigNavy = {
  fontSize: '110%',
  color: 'navy'
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
    </div>
  );
};

export default BlogDetails;
