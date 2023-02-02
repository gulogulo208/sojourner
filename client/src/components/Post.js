import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutation";

const Post = ({ tripId }) => {
  const [post, setPost] = React.useState({
    postType: "",
    tripId: tripId,
    fromDate: "",
    toDate: "",
    price: 0,
    transportationType: "",
    lodgingType: "",
    activity: "",
    description: "",
  });

  const [showTransportationPost, setShowTransportationPost] =
    React.useState(false);
  const [showLodgingPost, setShowLodgingPost] = React.useState(false);
  const [showItineraryPost, setShowItineraryPost] = React.useState(false);
  const [createPost, { loading, error, data }] = useMutation(CREATE_POST);

  React.useEffect(() => {
    if (post.postType === "Transportation") {
      setShowTransportationPost(true);
      setShowLodgingPost(false);
      setShowItineraryPost(false);
    } else if (post.postType === "Lodging") {
      setShowLodgingPost(true);
      setShowTransportationPost(false);
      setShowItineraryPost(false);
    } else if (post.postType === "Itinerary") {
      setShowItineraryPost(true);
      setShowTransportationPost(false);
      setShowLodgingPost(false);
    }
  }, [post.postType]);

  const handleFromDate = (date) => {
    setPost({
      ...post,
      fromDate: dayjs(date.$d).format("MM/DD/YY hh:mm:ss A"),
    });
  };

  const handleToDate = (date) => {
    setPost({ ...post, toDate: dayjs(date.$d).format("MM/DD/YY hh:mm:ss A") });
  };

  const handlePost = async () => {
    try {
      await createPost({
        variables: {
          postType: post.postType,
          tripId: tripId,
          transportationType: post.transportationType,
          fromDate: post.fromDate,
          toDate: post.toDate,
          price: post.price,
          lodgingType: post.lodgingType,
          activity: post.activity,
          description: post.description,
        },
      });
      console.log(data);
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Create Post
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="post-type-label">Post Type</InputLabel>
            <Select
              labelId="post-type-label"
              id="post-type-select"
              value={post.postType}
              label="Post Type"
              onChange={(e) => setPost({ ...post, postType: e.target.value })}
            >
              <MenuItem value={"Transportation"}>Transportation</MenuItem>
              <MenuItem value={"Lodging"}>Lodging</MenuItem>
              <MenuItem value={"Itinerary"}>Itinerary</MenuItem>
            </Select>
            {showTransportationPost ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="From Date"
                  value={post.fromDate}
                  disablePast={true}
                  onChange={handleFromDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="To Date"
                  value={post.toDate}
                  disablePast={true}
                  onChange={handleToDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormControl fullWidth>
                  <InputLabel id="transportation-type-label">
                    Transportation Type
                  </InputLabel>
                  <Select
                    labelId="transportation-type-label"
                    id="transportation-type-select"
                    value={post.transportationType}
                    label="Transportation Type"
                    onChange={(e) =>
                      setPost({ ...post, transportationType: e.target.value })
                    }
                  >
                    <MenuItem value={"Plane"}>Plane</MenuItem>
                    <MenuItem value={"Car"}>Car</MenuItem>
                    <MenuItem value={"Boat"}>Boat</MenuItem>
                    <MenuItem value={"Train"}>Train</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="price">Price</InputLabel>
                  <OutlinedInput
                    id="price"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Price"
                    value={post.price}
                    onChange={(e) =>
                      setPost({ ...post, price: e.target.value })
                    }
                  />
                </FormControl>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="..."
                  value={post.description}
                  onChange={(e) =>
                    setPost({ ...post, description: e.target.value })
                  }
                />
              </LocalizationProvider>
            ) : (
              ""
            )}
            {showLodgingPost ? "Lodging" : ""}
            {showItineraryPost ? "Itinerary" : ""}
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handlePost}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
