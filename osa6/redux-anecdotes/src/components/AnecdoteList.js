
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteThis } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ane}) => {
  const dispatch = useDispatch()
  return (
    <div className= "anecdotes">
      {ane.content}<br/>
      votes: {ane.votes}
      <button onClick= {e => {
        dispatch(voteThis(ane.id, ane.votes))
        dispatch(addNotification(`voted for: ${ane.id}`))
        window.setTimeout( () => {
          dispatch(clearNotification())
        }, 5000)
      }}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const filter = useSelector(state => state.filters)
  const anecList = useSelector(state => state.anecdotes)
  const sorted = anecList.sort( (a, b ) => b.votes - a.votes)
  let showing = sorted

  if (filter !== '') {
    showing = anecList.filter( entry => entry.content.toLowerCase().includes(filter));
  } else {
    showing = sorted
  }

  return(
  <div>
    {showing.map(ane =>
      <Anecdote
        key={ane.id}
        ane={ane}
        />
    )}
  </div>
  )
}

export default AnecdoteList
