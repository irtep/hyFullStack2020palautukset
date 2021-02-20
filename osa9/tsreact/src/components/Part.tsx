import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ coursePart: CoursePart}> = ({coursePart}) => {
  return(
    <li>
    {(() => {
      switch (coursePart.name) {
        case "Fundamentals":
          return(
            <p>{coursePart.name} <br/>
            Exercises: {coursePart.exerciseCount} <br/>
            Desc: {coursePart.description}
            </p>)
        case "Using props to pass data":
          return(
            <p> {coursePart.name} <br/>
            Exercises: {coursePart.exerciseCount} <br/>
            Group project: {coursePart.groupProjectCount}
            </p>)
        case "Deeper type usage":
          return(
            <p> {coursePart.name} <br/>Exercises: {coursePart.exerciseCount} <br/>
            Submissions: {coursePart.exerciseSubmissionLink}
            </p>)
        case "My super course":
          return(
            <p> {coursePart.name} <br/>Exercises: {coursePart.exerciseCount} <br/>
            Desc: {coursePart.description}
            </p>)
        default:
          assertNever(coursePart)
          break;
      }
    })()}
       </li>
  )
}

export default Part;
