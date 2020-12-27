import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Button, Statistics, Anecdote, anecdotes } from './components.js'
import { callDice } from './functions.js'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [showAne, setAne] = useState('')

  const newGood = () => {
    setGood(good + 1);
  }
  const newNeutral = () => {
    setNeutral(neutral + 1);
  }
  const newBad = () => {
    setBad(bad + 1);
  }
  const showAnecdote = () => {
    const randomAne = callDice(anecdotes.length-1, showAne);
    setAne(randomAne);
  }

  return (
    <div id= "container">
      <div className= "headers">
        Give feedback
      </div>
      <div className= "headers">
        <Button name= "good" ifClicked= {newGood}/>
        <Button name= "neutral" ifClicked= {newNeutral}/>
        <Button name= "bad" ifClicked= {newBad}/>
      </div>
      <div>
        <Statistics goods= {good} neutrals= {neutral} bads= {bad}/>
      </div>
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
