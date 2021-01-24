import anecdoteServices from '../services/anecdotes'

// action creators
export const voteThis = (id, content, votes) => {
  return async dispatch => {
    await anecdoteServices.update(id, content, votes + 1)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const createNew = (data) => {
  return async dispatch => {
    const newAnecdote = {
      content: data,
      votes: 0
    }
    await anecdoteServices.create(newAnecdote)
    const newNotes = await anecdoteServices.getAll()
    dispatch({
      type: 'CREATE',
      data: newNotes
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

const aneReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newVoteFor = state.find(a => a.id === action.data)
      const changedAnec = {
        ...newVoteFor,
        votes: newVoteFor.votes + 1
      }
      return state.map(ane => ane.id !== action.data ? ane : changedAnec)
    case 'CREATE':
      const newData = action.data.filter( ane => !state.some( anec => ane.content === anec.content))
      return state.concat(newData)
    case 'INIT_NOTES':
      return state.concat(action.data)
    default: return state
  }
}

export default aneReducer
