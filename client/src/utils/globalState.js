import React, { createContext, useContext } from "react";
import { useTripReducer } from "./reducers";

const TripContext = createContext();
const { Provider } = TripContext;

const TripProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useTripReducer({
    posts: [],
    users: [],
    userTrips: [],
    showTimeline: false,
    currentTripId: "",
    currentTripName: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext };
