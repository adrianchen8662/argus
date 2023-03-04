import { Areas } from "../constants"

const initialState = {
  currentArea: Areas.frame_area
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_AREA": {
      return {
        ...state,
        currentArea: action.newArea,
      }
    }
    default:
      return state
  }
}