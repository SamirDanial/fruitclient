import React from 'react'
import { NavLink } from 'react-router-dom';

import fruitSabzi from '../../img/fruitsabzi.jpg'

import classes from './Login.module.css'

const Login = () => {
    return (
        <div className={classes.container2}>
            <form action="" className={classes.form}>
            <h2>SIGN IN</h2>
                <input type="text" name='username' className={classes.box} placeholder='Enter Username' />
                <input type="password" name='password' className={classes.box} placeholder='Enter Password' />
                <input type="submit" value='SIGN IN' className={classes.submit} />
                <NavLink className={classes.a} to='/forgetpassword'>Forget Password?</NavLink>
            </form>
            <div className={classes.side}>
                <img src={fruitSabzi} alt=""></img> 
            </div>
        </div>
    )
}

export default Login
