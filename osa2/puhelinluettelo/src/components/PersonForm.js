import React from 'react'

const PersonForm = ({addNew, handleNameChange, handleNumberChange}) => {
  return (
    <>
    <form onSubmit= {addNew}>
      <div>name: <input onChange= {handleNameChange}/></div>
      <div>number: <input type= "number" onChange= {handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

export default PersonForm;
