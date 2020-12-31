import React from 'react'

const PersonForm = ({addNew, handleNameChange, handleNumberChange}) => {
  return (
    <>
    <form onSubmit= {addNew}>
      <div>name: <input id= "nameField" onChange= {handleNameChange}/></div>
      <div>number: <input id= "numberField" type= "number" onChange= {handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

export default PersonForm;
