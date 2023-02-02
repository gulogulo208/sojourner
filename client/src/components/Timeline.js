import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POSTS } from "../utils/queries";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Timeline = ({ tripId }) => {
  const [getPosts, { loading, data }] = useLazyQuery(GET_POSTS, {
    variables: { tripId: tripId },
  });

  let posts = [];
  useEffect(() => {
    getPosts({
      variables: {
        tripId: tripId,
      },
    });
    posts = data?.getPosts;
    console.log(posts);
  }, [tripId]);

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

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
