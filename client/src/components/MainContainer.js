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
import Container from "@mui/material/Container";
// import StickyFooter from "./Footer";
import GitHubIcon from "@mui/icons-material/GitHub";
import MUILink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useTripContext } from "../utils/globalState";
import {
  UPDATE_USER_TRIPS,
  UPDATE_CURRENT_TRIP_NAME,
  UPDATE_CURRENT_TRIP_ID,
  ADD_USER_TRIP,
} from "../utils/actions";
import TripItem from "./TripItem";
import Auth from "../utils/auth";

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

const MainStyle = () => ({
  padding: 0,
  marginBottom: 0,
});

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
  const [state, dispatch] = useTripContext();
  const { userTrips, showTimeline } = state;
  const [open, setOpen] = React.useState(false);
  const [openTripModal, setOpenTripModal] = React.useState(false);
  const [tripName, setTripName] = React.useState("");
  const [tripId, setTripId] = React.useState("");
  const [renderTimeline, setRenderTimeline] = React.useState(false);
  const [showTrips, setShowTrips] = React.useState(null);

  // QUERIES & MUTATIONS
  const [
    createTrip,
    {
      loading: loadingCreateTrip,
      data: createTripData,
      error: createTripError,
    },
  ] = useMutation(CREATE_TRIP);
  // const [
  //   getTrips,
  //   { loading: tripsLoading, error: tripsError, data: tripsData },
  // ] = useLazyQuery(GET_TRIPS);

  const {
    loading: loadingTrips,
    error: tripsError,
    data: tripsData,
  } = useQuery(GET_TRIPS);

  // HELPER FUNCTIONS
  const handleAddTrip = async () => {
    await createTrip({
      variables: {
        tripName: tripName,
      },
    });
    handleCloseTripModal();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleTripClick = (tripId) => {
  //   setTripId(tripId);
  //   setShowTimeline(true);
  // };

  const handleOpenTripModal = () => setOpenTripModal(true);
  const handleCloseTripModal = () => setOpenTripModal(false);

  const handleLogout = () => {
    Auth.logout();
  };

  // USE EFFECT
  React.useEffect(() => {
    if (loadingTrips) {
      return;
    } else if (tripsError) {
      return;
    } else if (!tripsData) {
      return;
    } else if (tripsData) {
      dispatch({
        type: UPDATE_USER_TRIPS,
        userTrips: tripsData.getTrips,
      });
      return setShowTrips(<TripItem open={open} />);
    }
  }, [dispatch, loadingTrips, tripsError, tripsData, open]);

  React.useEffect(() => {
    setRenderTimeline(true);
  }, [showTimeline]);

  React.useEffect(() => {
    if (loadingCreateTrip) {
      return;
    } else if (createTripError) {
      return;
    } else if (!createTripData) {
      return;
    } else if (createTripData) {
      dispatch({
        type: ADD_USER_TRIP,
        userTrip: createTripData.createTrip,
      });
      return setShowTrips(
        <TripItem
          // tripList={[...tripsData.getTrips, createTripData.createTrip]}
          open={open}
        />
      );
    }
  }, [dispatch, loadingCreateTrip, createTripError, createTripData, open]);

  // React.useEffect(() => {
  //   getTrips();
  // }, [getTrips]);

  // IF LOADING
  // if (tripsLoading) {
  //   return "Still loading...";
  // }

  // if (!tripsData) {
  //   return "No trips data...";
  // }

  // const tripList = tripsData.getTrips || [];

  if (loadingTrips) {
    return <CircularProgress />;
  }

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
                label="City, Country or City, State"
                variant="standard"
                fullWidth
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
              {loadingCreateTrip ? (
                <CircularProgress />
              ) : (
                <Button sx={{ textAlign: "center" }} onClick={handleAddTrip}>
                  Add Trip{" "}
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          id="toolBar"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
            Welcome, {Auth.getProfile().data.firstName}
          </Typography>
          <Button variant="small" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer id="drawer" variant="permanent" open={open} sx={{}}>
        <DrawerHeader id="drawerHeader">
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
        {showTrips}
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mt: 2,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
        id="mainContainer"
      >
        {/* <DrawerHeader /> */}
        <Container
          component="main"
          // sx={{ mt: 8, mb: 2, mr: 0, ml: 0, width: "100%" }}
          id="postContainer"
        >
          {showTimeline && <Timeline />}
        </Container>
        <Box
          component="footer"
          id="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {/* <Container maxWidth="lg"> */}
          <Typography variant="body1" classes={"footerTypography"}>
            <MUILink
              color="inherit"
              href="https://github.com/gulogulo208/sojourner"
            ></MUILink>
            <Typography
              variant="body2"
              // color="text.secondary"
              style={{ display: "block" }}
            >
              {"Copyright © "}
              <MUILink
                color="inherit"
                href="https://github.com/gulogulo208/sojourner"
              >
                Sojourner
              </MUILink>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            classes={"footerTypography"}
            // color="text.secondary"
            style={{ display: "block" }}
          >
            <GitHubIcon sx={{ mr: 1 }} />
            Created by: Jackson Farren, Theodore Elgee, Naveed Mahmoudian &
            James Porter
          </Typography>
          {/* <Copyright /> */}
          {/* </Container> */}
        </Box>
      </Box>
      {/* </Box> */}
      {/* <StickyFooter /> */}
      {/* </Box> */}
    </Box>
  );
}
