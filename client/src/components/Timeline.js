import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POSTS, GET_TRIP } from "../utils/queries";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import Paper from '@mui/material/Paper';

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

  const [trip, setTrip] = useState({});
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);

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

  if (loadingPosts || loadingTrip) {
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
          <CreatePost tripId={tripId} />
          {posts.map((post, i) => {
            return <PostItem key={i} post={post} />;
          })}
        </>
      ) : (
        ""
      )}
    </Paper>
    </>
  );
};

export default Timeline;
