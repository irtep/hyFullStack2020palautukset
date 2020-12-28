import React from 'react';
import Course from './components/Course';
import Total from './components/Total'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <div>
        <Course course= {course} />
      </div>
      <div>
        <Total parts= {course.parts}/>
      </div>
    </div>
  )
}

export default App;
