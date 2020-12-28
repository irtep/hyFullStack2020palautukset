import React from 'react';

export const Total = ({parts}) => {
  let sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);

  return (
    <>
      <strong>
      Number of exercices {sum}
      </strong>
    </>
  )
}
export default Total;
