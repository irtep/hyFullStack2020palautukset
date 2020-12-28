import React from 'react'

const Filter = ({actions}) => {
  return (
    <>
      filter shown with: <input onChange= {actions}/>
    </>
  )
}

export default Filter;
