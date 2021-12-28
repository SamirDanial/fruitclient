import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_PROFILE } from "../../hooks/Customer";
import { useMutation } from "@apollo/client";
import { customerActions } from "../../../store/customer";

const CreateProfile = () => {
  const userId = useSelector((state) => state.auth._id);
  const [customerToCreate, setCustomerToCreate] = useState({
    _id: "",
    name: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    physicalAddress: "",
  });
  const dispatch = useDispatch();
  const [createProfile] = useMutation(CREATE_PROFILE, {
    variables: {
      ...customerToCreate,
    },
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    setCustomerToCreate({
      _id: "",
      name: "",
      lastName: "",
      active: true,
      photoUrl: "",
      physicalAddress: "",
      phoneNumber: "",
      emailAddress: "",
      coordinates: "",
      favoritesCategory: [],
      userId: userId,
    });
  }, [userId]);

  const collectFormData = (e) =>
    setCustomerToCreate({
      ...customerToCreate,
      [e.target.name]: e.target.value,
    });

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(customerToCreate);
    createProfile()
      .then((res) => {
        dispatch(
          customerActions.updateCustomerProfile({
            ...res.data,
          })
        );
        alert("Data Saved Successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <h2> Customer Register Form </h2>
              </div>
              <form className="editRegForm" onSubmit={onFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={customerToCreate.name}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={customerToCreate.lastName}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={customerToCreate.phoneNumber}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="text"
                  name="emailAddress"
                  value={customerToCreate.emailAddress}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Email Address"
                  required
                />
                <input
                  type="text"
                  name="physicalAddress"
                  value={customerToCreate.physicalAddress}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Physical Address"
                  required
                />

                <input type="submit" value="Saved" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
