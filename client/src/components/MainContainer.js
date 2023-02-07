import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HikingRoundedIcon from "@mui/icons-material/HikingRounded";
import { Link } from "react-router-dom";
import Timeline from "./Timeline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import StickyFooter from "./Footer";
import GitHubIcon from "@mui/icons-material/GitHub";
import MUILink from "@mui/material/Link";
import { useTripContext } from "../utils/globalState";
import Auth from "../utils/auth";
import TripsContainer from "./TripsContainer";

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
  const [renderTimeline, setRenderTimeline] = React.useState(false);

  // HELPER FUNCTIONS

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    Auth.logout();
  };

  // USE EFFECT

  React.useEffect(() => {
    setRenderTimeline(true);
  }, [showTimeline]);

  return (
    <Box sx={{ display: "flex" }}>
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
        <List>
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
          id="postContainer"
        >
          <Box sx={{
            
          }}>
            <Typography variant="h2" color='white' sx={{
              textAlign: 'center'
            }}>
              Your Trips 
            </Typography>
          </Box>
          <TripsContainer />
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
