import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../utils/queries";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Timeline = () => {
  const { loading, data } = useQuery(GET_POSTS, {
    variables: { tripId: "63d9e868db5cebacf5be2da5" },
  });

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  const posts = data.getPosts;

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
