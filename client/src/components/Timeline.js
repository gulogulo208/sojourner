import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POSTS, GET_TRIP } from "../utils/queries";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

  useEffect(() => {
    async function handleTripId() {
      try {
        console.log(tripId);
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
  }, [tripId]);

  if (loadingPosts || loadingTrip) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  console.log(trip);
  console.log(posts);
  return (
    <>
      {posts.map((post, i) => {
        return (
          <Card
            key={i}
            sx={{ maxWidth: 200, textAlign: "center", marginLeft: 50 }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {post.postType}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{post.price}</Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default Timeline;
