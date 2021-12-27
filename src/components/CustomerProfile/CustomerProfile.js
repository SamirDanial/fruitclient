import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer);

  return customer._id === "" ? (
    <div className="userProfilePage">
      <table className="userProfile">
        <tbody>
          <tr>
            <td>You haven't yet introduce your self to us</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button className="btn">Complete Profile</button>
      </div>
    </div>
  ) : (
    <div className="userProfilePage">
      <table className="userProfile">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{customer.name}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{customer.lastName}</td>
          </tr>
          <tr>
            <td>Phone Number:</td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td>Email Address:</td>
            <td>{customer.emailAddress}</td>
          </tr>
          <tr>
            <td>Physical Address:</td>
            <td>{customer.physicalAddress}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={() => navigate("/editProfile")} className="btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
