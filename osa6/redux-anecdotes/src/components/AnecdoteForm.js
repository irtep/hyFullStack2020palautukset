import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (e) => {
    e.preventDefault()
    const newAneStr = e.target.newAnec.value
    dispatch(createNew(newAneStr))
    dispatch(addNotification(`created ${newAneStr}, refresh browser to see it`))
    window.setTimeout( () => {
      dispatch(clearNotification())
    }, 5000)
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

export default AnecdoteForm
