import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_POSTS, GET_TRIP, GET_USER } from "../utils/queries";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ADD_USER_TO_TRIP } from "../utils/mutation";

const Timeline = ({ tripId }) => {
  const [getTrip, { loading: loadingTrip, data: tripData }] = useLazyQuery(
    GET_TRIP,
    {
      variables: {
        tripId: tripId,
      },
    }
  );

  const [getPosts, { loading: loadingPosts, data: postsData }] = useLazyQuery(
    GET_POSTS,
    {
      variables: { tripId: tripId },
    }
  );

  const {
    loading: loadingUser,
    error: userError,
    data: userData,
  } = useQuery(GET_USER);

  const [addUserToTrip, { data: newUserData }] = useMutation(ADD_USER_TO_TRIP);

  const [trip, setTrip] = useState({});
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");

  const handleOpenAddUserModal = () => setShowAddUserModal(true);
  const handleCloseAddUserModal = () => setShowAddUserModal(false);

  const handleAddUser = async () => {
    await addUserToTrip({
      variables: {
        email: friendEmail,
        tripId: tripId,
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
    async function handleTripId() {
      try {
        await getTrip();
        await getPosts();
      } catch (error) {
        console.error(error);
      }
    }
    handleTripId();

    if (!tripData) return;
    if (!postsData) return;
    setTrip(tripData.getTrip);
    setPosts(postsData.getPosts);
    setShowPosts(true);
  }, [tripId, getPosts, getTrip, postsData, tripData]);

  if (loadingPosts || loadingTrip || loadingUser) {
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
      {showPosts ? (
        <>
          <h1>{trip.tripName}</h1>
          <Button size="small" onClick={handleOpenAddUserModal}>
            Add Friend
          </Button>
          <Modal
            open={showAddUserModal}
            onClose={handleCloseAddUserModal}
            aria-labelledby="add-user-modal-title"
            aria-describedby="add-user-modal-description"
          >
            <Box sx={addUserModalStyle}>
              <Typography id="add-user-modal-title" variant="h6" component="h2">
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
          <CreatePost tripId={tripId} />
          {posts.map((post, i) => {
            return <PostItem key={i} post={post} user={userData.getUser} />;
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Timeline;
