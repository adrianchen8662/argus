import { configureStore } from '@reduxjs/toolkit'
import currentEventReducer from './redux/eventReducer'
import currentAreaReducer from './redux/areaReducer'
import familyViewReducer from './redux/familyViewReducer'

export default configureStore({
  reducer: {
    currentEvent: currentEventReducer,
    currentArea: currentAreaReducer,
    currentFamilyView: familyViewReducer,
  },
})