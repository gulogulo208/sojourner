// import React, { useState, useEffect } from 'react';
// import ButtonAppBar from '../components/Navbar';
// import Auth from '../utils/auth';
import { Link } from "react-router-dom";
import Nav from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import Timeline from "../components/Timeline";

const Home = () => {
  return (
    <div>
      <LeftNav />
      <Link to="/login">Login</Link>
      {/* <Timeline /> */}
    </div>
  );
};

export default Home;
