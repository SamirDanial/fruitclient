import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth";
import cart from "../../img/cart.png";

import menu from "../../img/menu.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const username = useSelector((state) => state.auth.username);

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("User");
  };
  let checkAuthenticate = (
      <div className="container">
        <div className="navbar">
          <nav>
            {isAuthenticated === true ? (
              <ul>
                <li>
                  <NavLink to="/userprofile">{username}</NavLink>
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
              <ul id="MenuItems">
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
          <img src={menu} className="menu-icon" alt="" />
        </div>
      </div>
    );
  return <>{checkAuthenticate}</>;
};

export default Navbar;
