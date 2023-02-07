import { useReducer } from "react";
import {
  UPDATE_TRIP_POSTS,
  UPDATE_USER_TRIPS,
  ADD_USER_TRIP,
  SHOW_TIMELINE,
  UPDATE_CURRENT_TRIP_ID,
  REFRESH_POSTS,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TRIP_POSTS:
      return { ...state, tripPosts: action.tripPosts };
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
    case UPDATE_CURRENT_TRIP_ID:
      return { ...state, currentTripId: action.currentTripId };
    case REFRESH_POSTS:
      return { ...state, refreshPosts: action.refreshPosts };
    default:
      return state;
  }
};

export function useTripReducer(initialState) {
  return useReducer(reducer, initialState);
}
