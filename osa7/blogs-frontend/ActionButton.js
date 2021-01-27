import React from 'react';

const ActionButton = ({ id, action }) => {
  return(
    <>
      <button id= {id} onClick= {action}>
      show
      </button>
    </>
  );
};

export default ActionButton;
