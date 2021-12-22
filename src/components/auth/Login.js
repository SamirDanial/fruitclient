import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth'

import fruitSabzi from "../../img/fruitsabzi.jpg";

import classes from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();
    let graphqlQuery = {
        query: `
        {
            loginUser(credintialInput: {username: "${username}", password: "${password}"}) {
              _id,
              username,
              token,
              userRole {
                name
              }
            }
          }
        `
    }
    fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    }).then((res) => {
        return res.json();
    }).then((resData) => {
        try{
            resData.data && dispatch(authActions.authenticate({
                _id: resData.data.loginUser._id,
                username: resData.data.loginUser.username,
                token: resData.data.loginUser.token,
                roleName: resData.data.loginUser.userRole.name,
                authState: true
            }))
            localStorage.setItem('User', JSON.stringify({
                _id: resData.data.loginUser._id,
                username: resData.data.loginUser.username,
                token: resData.data.loginUser.token,
                roleName: resData.data.loginUser.userRole.name,
                authState: true
            }));
            navigate('/', {replace: true})
        } catch {
            alert('Username or password is wrong')
        }
    })
  };
  return (
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
