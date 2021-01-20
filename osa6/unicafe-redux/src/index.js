import React from 'react';
import ReactDOM from 'react-dom'
import Statistics from './components/Statistics'
import { createStore } from 'redux'
import reducer from './reducer'
import './index.css'

const store = createStore(reducer)

const App = () => {

  const dispatch = (event) => {
    store.dispatch({
      type: event.target.value
    })
  }

  return (
    <div>
      <button onClick={dispatch} className= "goodButton" value= "GOOD">good</button>
      <button onClick={dispatch} className= "okButton" value= "OK">neutral</button>
      <button onClick={dispatch} className= "badButton" value= "BAD">bad</button>
      <button onClick={dispatch} value= "ZERO">reset stats</button>
      <div>
        <Statistics goods= {store.getState().good} neutrals= {store.getState().ok} bads= {store.getState().bad}/>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
