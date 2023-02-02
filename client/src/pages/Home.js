// import React, { useState, useEffect } from 'react';
// import ButtonAppBar from '../components/Navbar';
// import Auth from '../utils/auth';
import { Link } from "react-router-dom";
import LeftNav from "../components/LeftNav";

const Home = () => {
  return (
    <div>
      <LeftNav />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
