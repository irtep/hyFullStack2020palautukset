import React from 'react';
import { Parts } from '../types';

const Total: React.FC<{ courseParts: Array<Parts> }> = ({courseParts}) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
