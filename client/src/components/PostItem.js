import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PostItem = ({ post, user }) => {
  return (
    <Card
      sx={{ maxWidth: 500, textAlign: "center", marginLeft: 65, marginTop: 5 }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {post.postType}
        </Typography>
        {post.postType === "Transportation" ? (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.transportationType}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              From: {post.fromDate}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              To: {post.toDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ${post.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.description}
            </Typography>
          </>
        ) : (
          ""
        )}
        {post.postType === "Lodging" ? (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.lodgingType}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              From: {post.fromDate}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              To: {post.toDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ${post.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.description}
            </Typography>
          </>
        ) : (
          ""
        )}
        {post.postType === "Itinerary" ? (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.activity}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              From: {post.fromDate}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              To: {post.toDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ${post.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.description}
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
