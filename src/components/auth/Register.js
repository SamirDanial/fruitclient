import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth';
import setAuthToken from '../../utils/setAuthToken';

import classes from "./Register.module.css";

const {REACT_APP_SERVER_URL} = process.env

const Register = () => {
  const [username, setUsername] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameLength, setUsernameLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    let graphqlQuery = {
      query: `
        mutation {
          createUser(userInput: {username: "${username}", password: "${password}", userRole: "Customer"}) {
            _id
            username
            token
            userRole {
              name
            }
          }
        }
      `
    }

    axios.post(REACT_APP_SERVER_URL, JSON.stringify(graphqlQuery), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const resData = res.data;
      if(resData.errors) {
        throw new Error(resData.errors[0].message);
      }
      dispatch(authActions.authenticate({
        _id: resData.data.createUser._id,
        username: resData.data.createUser.username,
        token: resData.data.createUser.token,
        roleName: resData.data.createUser.userRole.name,
        authState: true
      }));
      localStorage.setItem('User', JSON.stringify({
        _id: resData.data.createUser._id,
        username: resData.data.createUser.username,
        token: resData.data.createUser.token,
        roleName: resData.data.createUser.userRole.name,
        authState: true
    }));
      setAuthToken(resData.data.createUser.token);
      !resData.errors && navigate('/', { replace: true })
    }).catch(error => {
      alert(error)
    })
  };
  return (
    <div className={classes.container2}>
      <form action="" className={classes.form} onSubmit={onSubmitForm}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          onChange={(e) => {setUsernameLength(e.target.value.length);setUsername(e.target.value)}}
          onFocus={() => setUsernameFocused(true)}
          value={username}
          className={classes.box}
          placeholder="Enter Username"
        />
        { (usernameLength < 6 && usernameFocused) && <p style={{fontWeight: 'bold', fontSize: '10px', color: 'red'}}>Username must be more then 6 character</p> }
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
        { !passwordMatch && <p style={{fontWeight: 'bold', fontSize: '10px', color: 'red'}}>Password and confirm password don't match</p> }
        <input type="submit" disabled={usernameLength < 6 } value="Submit" className={classes.submit} />
        <NavLink className={classes.a} to="/login">
          Do you have account?
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
