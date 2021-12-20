import React from "react";
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
           Fruit Sabzi
        </a>
      </h1>
      <ul>
        <li>
          <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/register'>Register</NavLink>
        </li>
        <li>
          <NavLink className={(navData) => navData.isActive ? classes.active : ''} to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
