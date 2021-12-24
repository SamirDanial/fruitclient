import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_REGISTER } from "../hooks/LoginAndRegister";
import { useMutation } from "@apollo/client";
import { authActions } from "../../store/auth";
import setAuthToken from "../../utils/setAuthToken";
import Loader from "react-loader-spinner";

import classes from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameLength, setUsernameLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userRegister] = useMutation(USER_REGISTER, {
    variables: {
      username,
      password,
      userRole: "Customer",
    },
    onCompleted: (data) => {
      return data;
    },
  });
  let loading = false;
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    if (usernameLength < 6) {
      return;
    }
    setPasswordMatch(true);
    loading = true;

    userRegister().then((res) => {
      loading = false;
      const data = res.data;

      if (data) {
        dispatch(
          authActions.authenticate({
            _id: data.createUser._id,
            username: data.createUser.username,
            token: data.createUser.token,
            roleName: data.createUser.userRole.name,
            authState: true,
          })
        );

        localStorage.setItem(
          "User",
          JSON.stringify({
            _id: data.createUser._id,
            username: data.createUser.username,
            token: data.createUser.token,
            roleName: data.createUser.userRole.name,
            authState: true,
          })
        );
        setAuthToken(data.createUser.token);
        navigate("/", { replace: true });
      }
    }).catch((error) => {
      alert(error);
    })
  };
  return (
    <div className={classes.container2}>
      {loading && (
        <div className={classes.spinner}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        </div>
      )}
      <form action="" className={classes.form} onSubmit={onSubmitForm}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          onChange={(e) => {
            setUsernameLength(e.target.value.length);
            setUsername(e.target.value);
          }}
          onFocus={() => setUsernameFocused(true)}
          value={username}
          className={classes.box}
          placeholder="Enter Username"
        />
        {usernameLength < 6 && usernameFocused && (
          <p style={{ fontWeight: "bold", fontSize: "10px", color: "red" }}>
            Username must be more then 6 character
          </p>
        )}
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={classes.box}
          placeholder="Enter Password"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          className={classes.box}
          placeholder="Confirm Password"
        />
        {!passwordMatch && (
          <p style={{ fontWeight: "bold", fontSize: "10px", color: "red" }}>
            Password and confirm password don't match
          </p>
        )}
        <input
          type="submit"
          disabled={usernameLength < 6}
          value="Submit"
          className={classes.submit}
        />
        <NavLink className={classes.a} to="/login">
          Do you have account?
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
