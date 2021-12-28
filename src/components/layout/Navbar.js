import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth";
import { customerActions } from '../../store/customer';
import { useWindowSize } from '../hooks/useWindowSize';
import cart from "../../img/cart.png";

import menu from "../../img/menu.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [toggle, setToggle] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const username = useSelector((state) => state.auth.username);

  const logout = () => {
    dispatch(authActions.logout());
    dispatch(customerActions.logout());
    localStorage.removeItem("User");
  };

  const toggleMenu = () => {
    setToggle(prevState => !prevState);
  }
  let checkAuthenticate = (
      <div className="container">
        <div className="navbar">
          <nav>
            {isAuthenticated === true ? (
              <ul style={{display: width > 800 ? 'block' : toggle ? "block" : "none"}}>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink className="username" to="/userprofile">{username}</NavLink>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    onClick={logout}
                    to="/"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul style={{display: width > 800 ? 'block' : toggle ? "block" : "none"}}>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/Login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </nav>
          <img src={cart} onClick={() => navigate('/cart')} width="30px" height="30px" alt="" />
          <img src={menu} className="menu-icon" alt="" onClick={ toggleMenu } />
        </div>
      </div>
    );
  return <>{checkAuthenticate}</>;
};

export default Navbar;
