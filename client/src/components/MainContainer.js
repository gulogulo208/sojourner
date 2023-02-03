import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CircularProgress } from "@mui/material";
import LandscapeRoundedIcon from "@mui/icons-material/LandscapeRounded";
import Tooltip from "@mui/material/Tooltip";
import { GET_TRIPS } from "../utils/queries";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import HikingRoundedIcon from "@mui/icons-material/HikingRounded";
import { Link } from "react-router-dom";
import Timeline from "./Timeline";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Modal from "@mui/material/Modal";
import tripModal from "./addTripModal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import LuggageIcon from "@mui/icons-material/Luggage";
import Button from "@mui/material/Button";
import { textAlign } from "@mui/system";
import { CREATE_TRIP } from "../utils/mutation";
import CreatePost from "./CreatePost";
import StickyFooter from "./Footer";

// MUI HELPERS
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainContainer() {
  // VARIABLES
  const theme = useTheme();
  const tripModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
  };

  // STATE
  const [open, setOpen] = React.useState(false);
  const [openTripModal, setOpenTripModal] = React.useState(false);
  const [tripName, setTripName] = React.useState("");
  const [tripId, setTripId] = React.useState("");
  const [showTimeline, setShowTimeline] = React.useState(false);

  // QUERIES & MUTATIONS
  const [createTrip, { loading, data, error }] = useMutation(CREATE_TRIP);
  const [
    getTrips,
    { loading: tripsLoading, error: tripsError, data: tripsData },
  ] = useLazyQuery(GET_TRIPS);

  // HELPER FUNCTIONS
  const handleAddTrip = async () => {
    await createTrip({
      variables: {
        tripName: tripName,
      },
    });

    window.location.reload();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTripClick = (tripId) => {
    setTripId(tripId);
    setShowTimeline(true);
  };

  const handleOpenTripModal = () => setOpenTripModal(true);
  const handleCloseTripModal = () => setOpenTripModal(false);

  // USE EFFECT
  React.useEffect(() => {
    getTrips();
  }, [getTrips]);

  // IF LOADING
  if (tripsLoading) {
    return "Still loading...";
  }

  if (!tripsData) {
    return "No trips data...";
  }

  const tripList = tripsData.getTrips || [];

  return (
    <Box sx={{ display: "flex" }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={handleCloseTripModal}
        open={openTripModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openTripModal}>
          <Box sx={tripModalStyle}>
            <Typography sx={{ textAlign: "center", marginBottom: "1rem" }}>
              Your Next Destination
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TextField
                id="input-with-sx"
                label="Milan, Italy"
                variant="standard"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.5rem",
              }}
            >
              <Button sx={{ textAlign: "center" }} onClick={handleAddTrip}>
                Add Trip{" "}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome, Sojourner
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{}}>
        <DrawerHeader>
          <Typography variant="h6">Your Trips</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tripList.map((trip, index) => (
            <Tooltip key={trip._id} title={trip.tripName} placement="right">
              <ListItem
                onClick={() => handleTripClick(trip._id)}
                style={{ cursor: "pointer" }}
                disablePadding
                sx={{ display: "block" }}
                id={trip._id}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Card
                    sx={{ width: "100%", display: open ? "block" : "none" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={trip.tripPhoto}
                        alt="destination img"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {trip.tripName}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography> */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <LandscapeRoundedIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      display: open ? "none" : "block",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleOpenTripModal}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddLocationAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Add A Trip"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Link to={{ pathname: "/profile" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HikingRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Your Profile"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, mb: 2 }}>
        <DrawerHeader />
        <Box sx={{id: "contentContainer"}}>
        {showTimeline && <Timeline tripId={tripId} />}
        </Box>
        <StickyFooter />
      </Box>
      
    </Box>
  );
}
