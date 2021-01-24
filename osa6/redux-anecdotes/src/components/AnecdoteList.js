
import React from 'react'
//import { useSelector, useDispatch } from 'react-redux' // disabled to use connect
import { connect } from 'react-redux'
import { voteThis } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

/* this works with useSelector and useDispatch
const Anecdote = ({ane}) => {
  const dispatch = useDispatch()
  return (
    <div className= "anecdotes">
      {ane.content}<br/>
      votes: {ane.votes}
      <button onClick= {e => {
        dispatch(voteThis(ane.id, ane.content, ane.votes))
        dispatch(addNotification(`voted for: '${ane.id}'`, 5))
      }}>vote</button>
    </div>
  )

const AnecdoteList = () => {
  const filter = useSelector(state => state.filters)
  const anecList = useSelector(state => state.anecdotes)
  */

  // these with connect
const AnecdoteList = (props) => {
  const filter = props.filter  // with connect
  const anecList = props.anecdotes  // with connect
  const sorted = anecList.sort( (a, b ) => b.votes - a.votes)
  let showing = sorted

  if (filter !== '') {
    showing = anecList.filter( entry => entry.content.toLowerCase().includes(filter));
  } else {
    showing = sorted
  }
/* this with useDispatch and useSelector
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
*/
// this with connect
  return(
    <div>
      {showing.map(ane =>
        <div key={ane.id} className= "anecdotes">
          <div>
            {ane.content}
            votes: {ane.votes}
            <button onClick={e => {
             props.voteThis(ane.id, ane.content, ane.votes)
             props.addNotification(`voted for: '${ane.id}'`, 5)
            }}>vote</button>
          </div>
        </div>
       )}
    </div>
  )
}
/*  this with useSelector and useDispatch
export default AnecdoteList
*/

// these with connect
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filters,
  }
}

const mapDispatchToProps = {
  voteThis,
  addNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes
