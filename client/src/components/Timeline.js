import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_POSTS,
  GET_TRIP,
  GET_USER,
  GET_USERS_OF_TRIP,
} from "../utils/queries";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  ADD_USER_TO_TRIP,
  REMOVE_TRIP,
  REMOVE_USER_FROM_TRIP,
} from "../utils/mutation";
import { useTripContext } from "../utils/globalState";
import { List, ListItem } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Auth from "../utils/auth";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Grid from "@mui/material/Grid";

const Timeline = ({ tripId }) => {
  const [state, dispatch] = useTripContext();
  const { currentTripId, tripPosts, refreshPosts } = state;
  const [getTrip, { loading: loadingTrip, data: tripData }] = useLazyQuery(
    GET_TRIP,
    {
      variables: {
        tripId: currentTripId,
      },
    }
  );

  const [getPosts, { loading: loadingPosts, data: postsData }] = useLazyQuery(
    GET_POSTS,
    {
      variables: { tripId: currentTripId },
      fetchPolicy: "cache-and-network",
    }
  );

  const [getUsersOfTrip, { loading: loadingUsers, data: usersData }] =
    useLazyQuery(GET_USERS_OF_TRIP, { variables: { tripId: currentTripId } });

  const [addUserToTrip, { data: newUserData }] = useMutation(ADD_USER_TO_TRIP);

  const [removeUserFromTrip, { data: updatedTripData }] = useMutation(
    REMOVE_USER_FROM_TRIP
  );

  const [trip, setTrip] = useState({});
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState([]);

  const handleOpenAddUserModal = () => setShowAddUserModal(true);
  const handleCloseAddUserModal = () => setShowAddUserModal(false);

  const handleAddUser = async () => {
    await addUserToTrip({
      variables: {
        email: friendEmail,
        tripId: currentTripId,
      },
    });

    window.location.reload();
  };

  const [removeTrip, { loading, error, data }] = useMutation(REMOVE_TRIP);

  const handleRemoveTrip = async (tripId) => {
    try {
      dispatch({
        type: REMOVE_TRIP,
        showTimeline: false,
      });
      await removeTrip({
        variables: {
          tripId: tripId,
        },
      });
      dispatch({
        type: REMOVE_TRIP,
        showTimeline: true,
      });
      window.location.reload();
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFriend = async (userId) => {
    await removeUserFromTrip({
      variables: {
        tripId: currentTripId,
        userId: userId,
      },
    });

    window.location.reload();
  };

  const addUserModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getTrip();
    getPosts();
    getUsersOfTrip();

    if (!tripData) return;
    if (!postsData) return;
    if (!usersData) return;
    setTrip(tripData.getTrip);
    // console.log("TIMELINE RERENDER");
    setPosts(tripPosts);
    dispatch({
      type: "UPDATE_TRIP_POSTS",
      tripPosts: postsData.getPosts,
    });
    setFriends(usersData.getUsersOfTrip);
    setShowPosts(true);
  }, [
    currentTripId,
    getPosts,
    getTrip,
    getUsersOfTrip,
    postsData,
    tripData,
    usersData,
    addUserToTrip,
    removeUserFromTrip,
    dispatch,
    tripPosts,
    refreshPosts,
  ]);

  if (loadingPosts || loadingTrip || loadingUsers) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  // console.log(trip);
  // console.log(posts);
  return (
    <>
      <Paper elevation={3} id="postPaper">
        {showPosts ? (
          <>
            <Typography
              variant="h3"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {trip.tripName}
              {trip.createdBy._id === Auth.getProfile().data._id ? (
                <EventBusyIcon
                  onClick={() => handleRemoveTrip(currentTripId)}
                ></EventBusyIcon>
              ) : (
                ""
              )}
            </Typography>
            {/* <h1>{trip.tripName}</h1> */}
            <Button
              size="small"
              sx={{
                color: "black",
                fontStyle: "bold",
                border: "2px solid black",
              }}
              onClick={handleOpenAddUserModal}
            >
              Add Friend
            </Button>
            <List>
              {friends.map((friend, i) => {
                if (trip.createdBy._id === Auth.getProfile().data._id) {
                  return (
                    <ListItem key={i}>
                      {friend.firstName} {friend.lastName}
                      {friend._id !== Auth.getProfile().data._id ? (
                        <ClearIcon
                          onClick={() => handleRemoveFriend(friend._id)}
                          sx={{ ":hover": { cursor: "pointer" } }}
                        />
                      ) : (
                        " (me)"
                      )}
                    </ListItem>
                  );
                } else {
                  return (
                    <ListItem key={i}>
                      {friend.firstName} {friend.lastName}
                      {friend._id === Auth.getProfile().data._id ? " (me)" : ""}
                    </ListItem>
                  );
                }
              })}
            </List>
            <Modal
              open={showAddUserModal}
              onClose={handleCloseAddUserModal}
              aria-labelledby="add-user-modal-title"
              aria-describedby="add-user-modal-description"
            >
              <Box sx={addUserModalStyle}>
                <Typography
                  id="add-user-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add a Friend to your Trip
                </Typography>
                <TextField
                  id="add-user-modal-description"
                  label="Friend's Email"
                  variant="outlined"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  fullWidth
                />
                <Button size="small" onClick={handleAddUser}>
                  Invite
                </Button>
              </Box>
            </Modal>
            <CreatePost tripId={currentTripId} />
            <List
              id="postList"
              sx={{
                // display: "grid",
                // flexDirection: "column",
                // justifyContent: "space-around",
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 450,
                "& ul": { padding: 0 },
                marginTop: 2,
                padding: 2,
              }}
            >
              <Grid container spacing={2}>
                {tripPosts.map((post, i) => {
                  return <PostItem key={i} posts={post} />;
                })}
              </Grid>
            </List>
          </>
        ) : (
          ""
        )}
      </Paper>
    </>
  );
};

export default Timeline;
