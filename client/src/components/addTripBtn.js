import * as React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useTripContext } from "../utils/globalState";
import {CircularProgress, Button} from "@mui/material";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_TRIP } from "../utils/mutation";
import { GET_TRIPS } from "../utils/queries";
import { UPDATE_USER_TRIPS, ADD_USER_TRIP } from "../utils/actions";
import TripItem from "./TripItem";

export default function AddTripBtn() {
  const [state, dispatch] = useTripContext();
  const { userTrips } = state;
  const [showTrips, setShowTrips] = React.useState(null);
  const [openTripModal, setOpenTripModal] = React.useState(false);
  const [tripName, setTripName] = React.useState("");
  const [tripDate, setTripDate] = React.useState("");

  const handleCloseTripModal = () => setOpenTripModal(false);
  const handleOpenTripModal = () => setOpenTripModal(true);

  const tripModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
  };

  const [
    createTrip,
    {
      loading: loadingCreateTrip,
      data: createTripData,
      error: createTripError,
    },
  ] = useMutation(CREATE_TRIP);

  const {
    loading: loadingTrips,
    error: tripsError,
    data: tripsData,
  } = useQuery(GET_TRIPS);

  const handleAddTrip = async () => {
    await createTrip({
      variables: {
        tripName: tripName,
        tripDate: tripDate,
      },
    });
    handleCloseTripModal();
    window.location.reload();
  };

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

      return setShowTrips(<TripItem />);
    }
  }, [dispatch, loadingTrips, tripsError, tripsData]);

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
      return setShowTrips(<TripItem />);
    }
  }, [dispatch, loadingCreateTrip, createTripError, createTripData]);

  return (
    <Container sx={{ display: "flex", justifyContent: "center"}}>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Pick Your Date"
                  inputFormat="MM/DD/YYYY"
                  value={tripDate ? dayjs(tripDate) : null}
                  onChange={(date) => setTripDate(date.format("MM/DD/YYYY"))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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
      {userTrips.length <= 0 ? (
        <Box
          id="textId"
          sx={{
            display: "block",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleOpenTripModal}
            variant="contained"
            sx={{
              textAlign: "center",
              height: "50px",
              mb: "15px",
            }}
          >
            Add a Trip
          </Button>{" "}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Button
            onClick={handleOpenTripModal}
            variant="contained"
            sx={{
              textAlign: "center",
              height: "50px",
              mb: "15px",
            }}
          >
            Add a Trip
          </Button>{" "}
        </Box>
      )}
    </Container>
  );
}
