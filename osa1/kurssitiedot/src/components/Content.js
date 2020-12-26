import React from 'react'
import ReactDOM from 'react-dom'
import { Part } from './Parts.js'

export const Content = (props) => {
  return(
    <>
      <Part name= {props.parts[0].name} exercises= {props.parts[0].exercises}/>
    <br/><br/>
      <Part name= {props.parts[1].name} exercises= {props.parts[1].exercises}/>
    <br/><br/>
      <Part name= {props.parts[2].name} exercises= {props.parts[2].exercises}/>
    </>
  );
}
