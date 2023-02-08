import React, { createContext, useContext } from "react";
import { useTripReducer } from "./reducers";

const TripContext = createContext();
const { Provider } = TripContext;

// global state initialization
const TripProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useTripReducer({
    tripPosts: [],
    refreshPosts: false,
    userTrips: [],
    showTimeline: false,
    currentTripId: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext };
