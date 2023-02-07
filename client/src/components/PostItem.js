import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTripContext } from "../utils/globalState";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useMutation } from "@apollo/client";
import { REMOVE_POST } from "../utils/mutation";
import { REFRESH_POSTS } from "../utils/actions";
import Auth from "../utils/auth";
import Grid from "@mui/material/Grid";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';

const PostItem = ({ posts }) => {
  const [state, dispatch] = useTripContext();
  const { tripPosts, refreshPosts, currentTripId } = state;

  const [removePost, { loading, error, data }] = useMutation(REMOVE_POST);

  const handleRemovePost = async () => {
    try {
      dispatch({
        type: REFRESH_POSTS,
        refreshPosts: false,
      });
      await removePost({
        variables: {
          postId: posts._id,
          userId: Auth.getProfile().data._id,
          tripId: currentTripId,
        },
      });
      //   console.log(data);
      // window.location.reload();
      dispatch({
        type: REFRESH_POSTS,
        refreshPosts: true,
      });
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("POST ITEM RERENDER");
  return (
    <Grid item xs={8} md={6}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: 500,
          textAlign: "center",
          // marginLeft: 65,
          // marginTop: 5,
        }}
      >
        <CardContent>
          {posts.createdBy._id === Auth.getProfile().data._id ? (
            <Typography sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <DeleteForeverIcon onClick={handleRemovePost}></DeleteForeverIcon>
            </Typography>
          ) : (
            ""
          )}
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
        <CardActions>{/* <Button size="small">Comment</Button> */}</CardActions>
      </Card>
    </Grid>
  );
};

export default PostItem;
