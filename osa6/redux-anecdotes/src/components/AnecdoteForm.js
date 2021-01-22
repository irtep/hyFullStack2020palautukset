import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const preventDefault = (e) => e.preventDefault()

  return(
    <div>
      <form onSubmit = {preventDefault}>
        <input type= "text" id= "newAne" />
        <button type= "submit" onClick= {
          e => {
            dispatch(createNew(document.getElementById('newAne').value))
            dispatch(addNotification(`created ${document.getElementById('newAne').value}`))
            window.setTimeout( () => {
              dispatch(clearNotification())
            }, 5000)
          }
        }>send new</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
