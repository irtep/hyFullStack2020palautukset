import React from 'react';
import { Parts } from '../types';

const Content: React.FC<{ courseParts: Array<Parts> }> = ({courseParts}) => {
  return(
    <div>
      <ul>
      {courseParts.map( course => {
        return(
        <li key= {course.name}>
          {course.name} {course.exerciseCount}
        </li>)
      })}
      </ul>
    </div>
  );
};

export default Content;
