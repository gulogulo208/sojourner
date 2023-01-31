// import React, { useState, useEffect } from 'react';
// import ButtonAppBar from '../components/Navbar';
// import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import Nav from '../components/Navbar';



const Landing = () => {
    console.log("I AM IN THE LANDING PAGE!")
    return (
        <div>
            <Nav />
            <Link to="/login">Login</Link>
        </div>
    )

}

export default Landing;