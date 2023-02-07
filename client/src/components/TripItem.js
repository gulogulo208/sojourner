import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { useTripContext } from "../utils/globalState";
import {
  SHOW_TIMELINE,
  UPDATE_CURRENT_TRIP_ID,
  UPDATE_USER_TRIPS,
} from "../utils/actions";

const TripItem = ({ }) => {
  const [state, dispatch] = useTripContext();
  const { userTrips } = state;
  const [trips, setTrips] = useState([]);

  const handleTripClick = (tripId) => {
    dispatch({
      type: SHOW_TIMELINE,
      showTimeline: true,
      currentTripId: tripId,
    });
  };

  useEffect(() => {
    dispatch({
      type: UPDATE_USER_TRIPS,
      userTrips: userTrips,
    });
    setTrips(userTrips);
  }, [userTrips]);

  return (
    <List sx={{ 
      display: "flex",
      flexDirection: "row"
    }}>
      {trips.map((trip, index) => (
        <Tooltip key={trip._id} title={trip.tripName} placement="right">
          <ListItem
            onClick={() => handleTripClick(trip._id)}
            style={{ cursor: "pointer" }}
            disablePadding
            sx={{ display: "block" }}
            id={trip._id}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
              }}
            >
              <Card sx={{ width: "100%", display: "block" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    minwidth='200'
                    width='200'
                    minheight='200'
                    height="200"
                    src={trip.tripPhoto}
                    alt="destination img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {trip.tripName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default TripItem;
