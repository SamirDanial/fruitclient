import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { authActions } from "../../store/auth";
import { USER_LOGIN } from "../hooks/LoginAndRegister";
import { useLazyQuery } from "@apollo/client";

import fruitSabzi from "../../img/fruitsabzi.jpg";

import classes from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser /*, { loading, data, error, called }*/] = useLazyQuery(
    USER_LOGIN,
    {
      variables: {
        username,
        password,
      },
      onCompleted: (data) => {
        return data;
      },
    }
  );

  let loading = false;

  const onSubmitForm = (e) => {
    e.preventDefault();
    loading = true;
    setInterval(() => {console.log('Hello')}, 2000);
    loginUser().then((res) => {
      loading = false;
      const data = res.data;
      const error = res.error;
      if (error) {
        alert("Username or password is incorrect");
      }
      if (data) {
        dispatch(
          authActions.authenticate({
            _id: data.loginUser._id,
            username: data.loginUser.username,
            token: data.loginUser.token,
            roleName: data.loginUser.userRole.name,
            authState: true,
          })
        );

        localStorage.setItem(
          "User",
          JSON.stringify({
            _id: data.loginUser._id,
            username: data.loginUser.username,
            token: data.loginUser.token,
            roleName: data.loginUser.userRole.name,
            authState: true,
          })
        );
        setAuthToken(data.loginUser.token);
        navigate("/", { replace: true });
      }
    });
  };

  return loading ? <div><h1>Loading</h1></div> : (
    <div className={classes.container2}>
      <form action="" className={classes.form} onSubmit={onSubmitForm}>
        <h2>SIGN IN</h2>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.box}
          placeholder="Enter Username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.box}
          placeholder="Enter Password"
        />
        <input type="submit" value="SIGN IN" className={classes.submit} />
        <NavLink className={classes.a} to="/forgetpassword">
          Forget Password?
        </NavLink>
      </form>
      <div className={classes.side}>
        <img src={fruitSabzi} alt=""></img>
      </div>
    </div>
  );
};

export default Login;
