import React from 'react'
import ReactDOM from 'react-dom'

export const Total = ({parts}) => {
  let sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);

  return (
    <>
      Number of exercices {sum}
    </>
  )
}
export default Total;
