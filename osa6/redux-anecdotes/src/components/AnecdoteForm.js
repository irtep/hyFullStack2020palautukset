import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

  const AnecdoteForm = (props) => {
//  const AnecdoteForm = () => {
  //const dispatch = useDispatch()

  const addNew = async (e) => {
    e.preventDefault()
    const newAneStr = e.target.newAnec.value
    //dispatch(createNew(newAneStr))
    //dispatch(addNotification(`created '${newAneStr}'`, 5))
    // with connect:
    props.createNew(newAneStr)
    props.addNotification(`created '${newAneStr}'`, 5)
  }

  return(
    <div>
      <form onSubmit = {addNew}>
        <input type= "text" id= "newAne" name= "newAnec"/>
        <button type= "submit">send new</button>
      </form>
    </div>
  )
}

//export default AnecdoteForm  with useDispatch

// with connect
const mapDispatchToProps = {
  createNew,
  addNotification
}

const ConnectedAnecForms = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecForms
