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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../utils/mutation";
import { useTripContext } from "../utils/globalState";
import Auth from "../utils/auth";
import { REFRESH_POSTS, UPDATE_TRIP_POSTS } from "../utils/actions";

const CreatePost = () => {
  const [state, dispatch] = useTripContext();
  const { currentTripId, tripPosts, refreshPosts } = state;

  const [post, setPost] = React.useState({
    postType: "",
    tripId: currentTripId,
    firstName: Auth.getProfile().data.firstName,
    lastName: Auth.getProfile().data.lastName,
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

  // conditionally effects the type of post you will be making based on the initial postType
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

  React.useEffect(() => {
    setPost({ ...post, tripId: currentTripId });
  }, [currentTripId]);

  // when handlePost function is executed, refreshPosts global state is changed
  // resets the local state for inputing post values
  React.useEffect(() => {
    setShowItineraryPost(false);
    setShowLodgingPost(false);
    setShowTransportationPost(false);
    post.postType = '';
    post.fromDate = "";
    post.toDate = "";
    post.price = 0;
    post.transportationType = "";
    post.lodgingType = "";
    post.activity = "";
    post.description = "";
  }, [refreshPosts])

  const handleFromDate = (date) => {
    setPost({
      ...post,
      fromDate: dayjs(date.$d).format("MM/DD/YY hh:mm:ss A"),
    });
  };

  const handleToDate = (date) => {
    setPost({ ...post, toDate: dayjs(date.$d).format("MM/DD/YY hh:mm:ss A") });
  };

  /* sets refreshPosts to true. vital for telling the timeline to re-render
     and display the most updated post without needing to refresh the page */
  const handlePost = async () => {
    try {
      dispatch({
        type: REFRESH_POSTS,
        refreshPosts: false,
      });
      await createPost({
        variables: {
          postType: post.postType,
          tripId: post.tripId,
          firstName: Auth.getProfile().data.firstName,
          lastName: Auth.getProfile().data.lastName,
          transportationType: post.transportationType,
          fromDate: post.fromDate,
          toDate: post.toDate,
          price: post.price,
          lodgingType: post.lodgingType,
          activity: post.activity,
          description: post.description,
        },
      });
      dispatch({
        type: REFRESH_POSTS,
        refreshPosts: true,
      });
      console.log(tripPosts);
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
        <Box sx={{ minWidth: 120, margin: 2 }}>
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
            {showLodgingPost ? (
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
                  <InputLabel id="lodging-type-label">Lodging Type</InputLabel>
                  <Select
                    labelId="lodging-type-label"
                    id="lodging-type-select"
                    value={post.lodgingType}
                    label="Lodging Type"
                    onChange={(e) =>
                      setPost({ ...post, lodgingType: e.target.value })
                    }
                  >
                    <MenuItem value={"Hotel"}>Hotel</MenuItem>
                    <MenuItem value={"Vacation Rental"}>
                      Vacation Rental
                    </MenuItem>
                    <MenuItem value={"Hostel"}>Hostel</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
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
            {showItineraryPost ? (
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
                  id="activity"
                  label="Activity"
                  placeholder="..."
                  value={post.activity}
                  onChange={(e) =>
                    setPost({ ...post, activity: e.target.value })
                  }
                />
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

export default CreatePost;
