import anecdoteServices from '../services/anecdotes'

/*
id, field, newValue
blogTools.update(blog.id, 'likes', newValue).then( () => {
      // update view to see updated blogs in ui
      blogTools.getAll().then(blogs => {
        setBlogs(sortBlogs(blogs));
        setErrorMessage({ msg: 'Like ok!.', badNews: false });
        setTimeout(() => {
          setErrorMessage({ msg: null });
        }, 5000);
      }).catch( err => {
        console.log(err);
        setErrorMessage({ msg: 'error getting info from database', badNews: true });
        setTimeout(() => {
          setErrorMessage({ msg: null });
        }, 5000);
*/
// action creators
export const voteThis = (id, votes) => {
  return async dispatch => {
    console.log('voting: ', id, votes);
    await anecdoteServices.update(id, 'votes', votes + 1)
    const notes = await anecdoteServices.getAll()
    /*
    const newVoteFor = notes.find(a => a.id === id)
    const changedAnec = {
      ...newVoteFor,
    votes: newVoteFor.votes + 1}
    const updated = notes.map(ane => ane.id !== id ? ane : changedAnec)
    */
    dispatch({
      type: 'VOTE',
      data: notes
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
      const updated = action.data.filter( ane => !state.some( anec => ane.content === anec.content))
      console.log('updated ', updated);
    /*
    const newVoteFor = notes.find(a => a.id === id)
    const changedAnec = {
      ...newVoteFor,
    votes: newVoteFor.votes + 1}
    const updated = notes.map(ane => ane.id !== id ? ane : changedAnec)
    */
      //const newUpdates = action.data.filter( ane => !state.some( anec => ane.content === anec.content))
      return state
    case 'CREATE':
      const newData = action.data.filter( ane => !state.some( anec => ane.content === anec.content))
      return state.concat(newData)
    case 'INIT_NOTES':
      return state.concat(action.data)
    default: return state
  }
}

export default aneReducer
