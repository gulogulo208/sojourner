import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActionArea, CircularProgress } from "@mui/material";
import { GET_POSTS, GET_TRIPS } from "../utils/queries";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CREATE_TRIP } from "../utils/mutation";
import Container from "@mui/material/Container";
// import StickyFooter from "./Footer";
import { useTripContext } from "../utils/globalState";
import {
    UPDATE_USER_TRIPS,
    ADD_USER_TRIP,
} from "../utils/actions";
import TripItem from "./TripItem";

const TripsContainer = () => {
    const [state, dispatch] = useTripContext();
    const [showTrips, setShowTrips] = React.useState(null);
    const [openTripModal, setOpenTripModal] = React.useState(false);
    const [tripName, setTripName] = React.useState("");

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
            },
        });
        handleCloseTripModal();
        window.location.reload();
    };

    const handleOpenTripModal = () => setOpenTripModal(true);
    const handleCloseTripModal = () => setOpenTripModal(false);

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

            return setShowTrips(<TripItem />)
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
            return setShowTrips(
                <TripItem />
            );
        }
    }, [dispatch, loadingCreateTrip, createTripError, createTripData]);

    return (
        <Container sx={{ display: "flex " }}>
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
            {showTrips}
            <Box sx={{
                display: "flex",
                alignItems: "flex-end",
            }}>
                <Button onClick={handleOpenTripModal} variant="contained" sx={{
                    height: '50px',
                    mb: '15px'
                }}>
                    Add a Trip
                </Button>
            </Box>
        </Container>
    );
};

export default TripsContainer;