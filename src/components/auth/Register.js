import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameLength, setUsernameLength] = useState(7);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
        setPasswordMatch(false);
        return;
    }
    if (usernameLength < 6) {
        return;
    }
    setPasswordMatch(true);
    console.log(username);
  };
  return (
    <div className={classes.container2}>
      <form action="" className={classes.form} onSubmit={onSubmitForm}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          onChange={(e) => {setUsernameLength(e.target.value.length);setUsername(e.target.value)}}
          value={username}
          className={classes.box}
          placeholder="Enter Username"
        />
        { usernameLength < 6 && <p style={{fontWeight: 'bold', fontSize: '10px', color: 'red'}}>Username must be more then 6 character</p> }
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
        <input type="submit" value="Submit" className={classes.submit} />
        <NavLink className={classes.a} to="/login">
          Do you have account?
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
