import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const username = useSelector((state) => state.auth.username)

  const logout = () => {
    dispatch(authActions.logout());
  };
  let checkAuthenticate =
    isAuthenticated === true ? (
      <ul>
        <li>
          <NavLink to="/">
            {username}
          </NavLink>
          <NavLink onClick={logout} to="/">
            Logout
          </NavLink>
        </li>
      </ul>
    ) : (
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/register"
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/login"
          >
            Login
          </NavLink>
        </li>
      </ul>
    );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/">Fruit Sabzi</NavLink>
      </h1>
      {checkAuthenticate}
    </nav>
  );
};

export default Navbar;
