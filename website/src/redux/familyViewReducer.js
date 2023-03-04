import { FamilyAreaViews } from "../constants"
import { CHANGE_FAMILY_VIEW } from "./actionTypes"

const initialState = {
  currentFamilyView: FamilyAreaViews.all_members
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FAMILY_VIEW: {
      return {
        ...state,
        currentFamilyView: action.newView,
      }
    }
    default:
      return state
  }
}