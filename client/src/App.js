import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LeftNav from './components/LeftNav'
// import Error from './components/Error';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
})

function App() {
  return (
    <>
    < ApolloProvider client={client}>
      <Router>
        <Routes>
        <Route
            path='/'
            element={<><Login /></>}
          />
          <Route 
            path='/landing' 
            element={<><Home/></>} 
          />
          <Route
            path='/signup'
            element={<Signup />}
          />
        </Routes>
    </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
