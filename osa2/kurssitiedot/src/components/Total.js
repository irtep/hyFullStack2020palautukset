import React from 'react'
import ReactDOM from 'react-dom'

export const Total = (props) => {
  let exes = 0;
  props.parts.forEach((item, i) => {
    exes += item.exercises;
  });
  return (
    <>
      Number of exercices {exes}
    </>
  )
}
