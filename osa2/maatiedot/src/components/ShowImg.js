import React from 'react';

const ShowImg = ({url, alt}) => {
  return(
    <div>
      <img
        src={url}
        alt= {alt}
        className= "flags"/>
    </div>
  );
}

export default ShowImg;
