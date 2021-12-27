import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EDIT_PROFILE } from '../../hooks/Customer';
import { useMutation } from '@apollo/client';

const EditProfile = () => {
  const [customerToEdit, setCustomerToEdit] = useState({});
  const customer = useSelector((state) => state.customer);
  const [editProfile] = useMutation(EDIT_PROFILE, {
    variables: {
        ...customerToEdit
    },
    onCompleted: (data) => {
        return data;
      },
  })

  useEffect(() => {
    setCustomerToEdit({
      ...customer,
      ID: customer._id.toString(),
      favoriteCategories: customer.favoriteCategories.map(category => {
        return {
          categoryId: category._id.toString(),
        }
      }),
      userId: customer.userId._id.toString()
    });
  }, []);

  const collectFormData = (e) => setCustomerToEdit({
      ...customerToEdit,
      [e.target.name]: e.target.value
  })

  const onFormSubmit = (e) => {
    e.preventDefault();
    editProfile().then((res) => {
        console.log(res);
    });
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <h2>Edit Detail Form </h2>
              </div>
              <form className="editRegForm" onSubmit={onFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={customerToEdit.name}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={customerToEdit.lastName}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={customerToEdit.phoneNumber}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="text"
                  name="emailAddress"
                  value={customerToEdit.emailAddress}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Email Address"
                  required
                />
                <input
                  type="text"
                  name="physicalAddress"
                  value={customerToEdit.physicalAddress}
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

export default EditProfile;
