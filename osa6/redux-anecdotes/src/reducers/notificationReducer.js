
export const addNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    data: (content)
  }
}
export const clearNotification = (content) => {
  return {
    type: 'CLEAR',
    data: ''
  }
}

const notiReducer = (state = 'welcome!', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export default notiReducer
