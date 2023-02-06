import { useReducer } from "react";
import {
  UPDATE_POSTS,
  UPDATE_USERS,
  UPDATE_USER_TRIPS,
  ADD_USER_TRIP,
  SHOW_TIMELINE,
  UPDATE_CURRENT_TRIP_NAME,
  UPDATE_CURRENT_TRIP_ID,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return { ...state, posts: action.posts };
    case UPDATE_USERS:
      return { ...state, users: action.users };
    case UPDATE_USER_TRIPS:
      return { ...state, userTrips: action.userTrips };
    case ADD_USER_TRIP:
      return { ...state, userTrips: [...state.userTrips, action.userTrip] };
    case SHOW_TIMELINE:
      return {
        ...state,
        showTimeline: action.showTimeline,
        currentTripId: action.currentTripId,
      };
    case UPDATE_CURRENT_TRIP_NAME:
      return { ...state, currentTripName: action.currentTripName };
    case UPDATE_CURRENT_TRIP_ID:
      return { ...state, currentTripId: action.currentTripId };
    default:
      return state;
  }
};

export function useTripReducer(initialState) {
  return useReducer(reducer, initialState);
}
