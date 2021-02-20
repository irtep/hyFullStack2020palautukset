import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({courseParts}) => {
  return(
    <div>
      <ul>
      {courseParts.map( course => {
        return(
          <div key= {course.name}>
            <Part coursePart= {course}/>
          </div>
      )})}
      </ul>
    </div>
  );
};

export default Content;
