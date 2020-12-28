import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
  return(
    <div>
      <div>
        <Header name= {course.name}/>
      </div>
      <div>
        <Content parts= {course.parts}/>
      </div>
      <div>
        <Total parts= {course.parts}/>
      </div>
    </div>
  );
}

export default Course;
