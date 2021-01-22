const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)


// action creators
export const voteThis = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}
export const createNew = (content) => {
  return {
    type: 'CREATE',
    data: asObject(content)
  }
}

const aneReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data
      const newVoteFor = state.find(a => a.id === id)
      const changedAnec = {
        ...newVoteFor,
      votes: newVoteFor.votes + 1}
      return state.map(ane => ane.id !== id ? ane : changedAnec)
    case 'CREATE':
      console.log('got create: ', action.data);
      const newList = state.concat([action.data])
      return newList
    default: return state
  }
}

export default aneReducer
