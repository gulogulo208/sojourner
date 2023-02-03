import { useLazyQuery, useLazyQuery } from "@apollo/client";
import { Link, Navigate, useParams } from "react-router-dom";

import { GET_USER } from '../utils/queries';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import CircularProgress from "@mui/material/CircularProgress";
import Auth from "../utils/auth";

export function Profile() {
    const { username: userParams } = useParams();
    const [posts, setPosts] = useState({});

    const { loading, data } = useLazyQuery(
        GET_USER,
        {
            variables: {
                username: userParams
            },
        }
    );

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParams) {
        return <Navigate to='/profile/:username' />
    }

    if (loading) {
       return (
        <>
            <CircularProgress />
        </>
       )
    }

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://source.unsplash.com/random/?travel)] bg-cover	bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src="https://dynamicmedia.accenture.com/is/image/accenture/accenture-covid-travel-industry-recovery-400x400?qlt=85&ts=1666335022076&dpr=off"
                                alt="img"
                                size="xl"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    Jon Doe
                                </Typography>
                            </div>
                        </div>
                        <div className="w-96">
                            <Tabs value="app">
                                <TabsHeader>
                                    <Tab value="profile">

                                        profile
                                    </Tab>
                                    <Tab value="edit profile">

                                        edit profile
                                    </Tab>
                                </TabsHeader>
                            </Tabs>
                        </div>
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                        <div>
                            <div className="flex flex-col gap-12">
                                <div >
                                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                                        Current Prof Information
                                    </Typography>
                                    <div className="flex flex-col gap-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul className="flex flex-col gap-6">
                                Posts here
                            </ul>
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Trips
                        </Typography>
                        <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            your travel plans
                        </Typography>
                        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">

                            <Card color="transparent" shadow={false}>
                                <CardHeader
                                    floated={false}
                                    color="gray"
                                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                                >
                                    <img
                                        src='https://source.unsplash.com/random/?travel'
                                        alt='title'
                                        className="h-full w-full object-cover"
                                    />
                                </CardHeader>
                                <CardBody className="py-0 px-1">
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-500"
                                    >
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="mt-1 mb-2"
                                    >
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-500"
                                    >
                                    </Typography>
                                </CardBody>
                                <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                                    <Link to='#'>
                                        <Button variant="outlined" size="sm">
                                            view trip
                                        </Button>
                                    </Link>
                                    <div>
                                        <Tooltip >
                                            <Avatar
                                                src='https://source.unsplash.com/random/?travel'
                                                alt='name'
                                                size="xs"
                                                variant="circular"
                                            />
                                        </Tooltip>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Profile;