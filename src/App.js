import React, { useEffect } from "react";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {
  Landing,
  Navbar,
  Login,
  Register,
  CustomerProfile,
  EditProfile,
} from "./components";
import ProtectedRoutes from "./protectedRoutes";
import "./App.css";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = JSON.parse(localStorage.getItem('User')) || '';
  const token = authToken !== '' ? authToken.token : '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-auth-token': token
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  const isAuth = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      dispatch(
        authActions.authenticate({
          _id: user._id,
          username: user.username,
          token: user.token,
          roleName: user.name,
          authState: user.authState,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes isAuthen={isAuth} />}>
            <Route path="/userprofile" element={<CustomerProfile />} />
            <Route path="/editProfile" element={<EditProfile />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
