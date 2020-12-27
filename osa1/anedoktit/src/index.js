import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Button, Anecdote, anecdotes } from './components.js'
import { callDice } from './functions.js'

const App = () => {
  const [showAne, setAne] = useState('')

  const showAnecdote = () => {
    const randomAne = callDice(anecdotes.length-1, showAne);
    setAne(randomAne);
  }

  return (
    <div id= "container">
      <div>
        <div>
        <br/>
        click that to get anecdote =>
        <Button name= "get anecdote" ifClicked= {showAnecdote}/>
        </div>
      </div>
      <div id= "anecsHere">
        <Anecdote chosen= {showAne}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
