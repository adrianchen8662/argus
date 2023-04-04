const initialState = {
  currentEvent: 0
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_EVENT": {
      return {
        ...state,
        currentEvent: state.currentEvent + 1,
      }
    }
    case "DECREMENT_EVENT": {
      return {
        ...state,
        currentEvent: state.currentEvent - 1,
      }
    }
    default:
      return state
  }
}