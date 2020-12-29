import React from 'react';

const Finder = ({actions}) => {
  return(
    <div>
      find countries: <input onChange= {actions} />
    </div>
  );
}

export default Finder;
