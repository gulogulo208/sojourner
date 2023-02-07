import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTripContext } from "../utils/globalState";

const PostItem = ({ posts }) => {
  // console.log(tripPosts);
  const [state, dispatch] = useTripContext();
  const { tripPosts, refreshPosts } = state;

  console.log("POST ITEM RERENDER");
  return (
    <Card
      sx={{
        maxWidth: 500,
        textAlign: "center",
        marginLeft: 65,
        marginTop: 5,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {posts.firstName} {posts.lastName}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {posts.postType}
        </Typography>
        {posts.postType === "Transportation" ? (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {posts.transportationType}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              From: {posts.fromDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              To: {posts.toDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ${posts.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {posts.description}
            </Typography>
          </>
        ) : (
          ""
        )}
        {posts.postType === "Lodging" ? (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {posts.lodgingType}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              From: {posts.fromDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              To: {posts.toDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ${posts.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {posts.description}
            </Typography>
          </>
        ) : (
          ""
        )}
        {posts.postType === "Itinerary" ? (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {posts.activity}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              From: {posts.fromDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
            >
              To: {posts.toDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ${posts.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {posts.description}
            </Typography>
          </>
        ) : (
          ""
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Comment</Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
