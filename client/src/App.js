import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import Error from './components/Error';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
})

function App() {
  return (
    <>
    < ApolloProvider client={client}>

        <h1>HELLO</h1>
        <Navbar />
      <Router>
      <>
        <Routes>
          <Route 
            path='/' 
            element={<LandingPage/>} 
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
