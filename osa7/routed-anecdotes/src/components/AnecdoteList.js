import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === id)

  return (
    <div>
      <h2>{anecdote.content}</h2>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
           </Link>
        </li>
      )}
    </ul>
  </div>
)

export default AnecdoteList
