import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthService from "./utils/auth";
// import Error from './components/Error';
import { TripProvider } from "./utils/globalState";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <TripProvider>
            <Routes>
              {AuthService.loggedIn() ? (
                <Route path="/" element={<Home />} />
              ) : (
                <Route path="/" element={<Login />} />
              )}
              <Route path="/" element={<Login />} />
              {AuthService.loggedIn() ? (
                <Route path="/" element={<Home />} />
              ) : (
                <Route path="/signup" element={<Signup />} />
              )}
            </Routes>
          </TripProvider>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
