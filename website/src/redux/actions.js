/* eslint no-return-assign: 0 */
import { INCREMENT_EVENT, DECREMENT_EVENT, CHANGE_AREA, CHANGE_FAMILY_VIEW } from "./actionTypes";

export const incrementEvent = () => ({
  type: INCREMENT_EVENT,
  payload: {
  }
});

export const decrementEvent = () => ({
  type: DECREMENT_EVENT,
  payload: {
  }
});

export const changeArea = (newArea) => ({
  type: CHANGE_AREA,
  payload: {
    newArea
  }
});

export const changeFamilyView = (newView) => ({
  type: CHANGE_FAMILY_VIEW,
  payload: {
    newView
  }
});

