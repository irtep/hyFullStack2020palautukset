import React from 'react'

const StatisticsLine = ({text, value}) => {
  return(
    <>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
    </>
  );
}

export default StatisticsLine
