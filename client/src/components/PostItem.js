import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PostItem = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 200, textAlign: "center", marginLeft: 50 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {post.postType}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{post.price}</Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
