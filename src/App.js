import React, { useEffect } from 'react';
import { authActions } from './store/auth';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, Navbar, Login, Register, CustomerProfile } from "./components";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('User'));
    if(auth) {
      dispatch(authActions.authenticate({
        _id: auth._id,
        username: auth.username,
        token: auth.token,
        roleName: auth.name,
        authState: auth.authState
      }))
    }
  }, [dispatch])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<CustomerProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
