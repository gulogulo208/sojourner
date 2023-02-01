// import React, { useState, useEffect } from 'react';
// import ButtonAppBar from '../components/Navbar';
// import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
// import Nav from '../components/Navbar';
import LeftNav from '../components/LeftNav'



const Home = () => {
    console.log("I AM IN THE LANDING PAGE!")
    return (
        <div>
            <LeftNav />
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home;