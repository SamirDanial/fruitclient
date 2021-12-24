import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import classes from "./CustomerProfile.module.css";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer);
  console.log(customer);

  return customer._id === '' ? (
    <div className={classes.container2}>
        <ul>
            <li>
                <span  className={classes.fieldName}>You haven't yet introduce your self to us</span>
            </li>
        </ul>
        <div>
            <button className={classes.completeProfile}>Complete Profile</button>
        </div>
    </div>
  ) : (
    <div className={classes.container2}>
      <ul>
        <li>
          <span className={classes.fieldName}>Name:</span>
          <span className={classes.fieldValue}>{customer.name}</span>
        </li>
        <li>
          <span className={classes.fieldName}>Last Name:</span>
          <span className={classes.fieldValue}>{customer.lastName}</span>
        </li>
        <li>
          <span className={classes.fieldName}>Phone Number:</span>
          <span className={classes.fieldValue}>{customer.phoneNumber}</span>
        </li>
        <li>
          <span className={classes.fieldName}>Email Address:</span>
          <span className={classes.fieldValue}>{customer.emailAddress}</span>
        </li>
        <li>
          <span className={classes.fieldName}>Physical Address:</span>
          <span className={classes.fieldValue}>{customer.physicalAddress}</span>
        </li>
      </ul>
      <div>
      <div>
            <button onClick={() => navigate('/editProfile')} className={classes.completeProfile}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
