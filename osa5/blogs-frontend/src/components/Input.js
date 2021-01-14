import React from 'react';

const Input = ({}) => {
  <div>
    {label}
      <input
      type= {typeOfInput}
      value= {valueOfInput}
      name= {nameOfInput}
      onChange={({ target }) => onChangeAction(target.value)}
    />
  </div>
};
