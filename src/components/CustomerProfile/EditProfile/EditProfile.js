import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EDIT_PROFILE } from "../../hooks/Customer";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { customerActions } from "../../../store/customer";

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const photoUrl = useSelector((state) => state.customer.photoUrl);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [customerToEdit, setCustomerToEdit] = useState({
    _id: "",
    name: "",
    lastName: "",
    photoUrl: "",
    phoneNumber: "",
    emailAddress: "",
    physicalAddress: "",
  });
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const [editProfile] = useMutation(EDIT_PROFILE, {
    variables: {
      ...customerToEdit,
      photoUrl: photoUrl,
    },
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    customer._id !== "" &&
      setCustomerToEdit({
        ...customer,
        ID: customer._id.toString(),
        favoriteCategories: customer.favoriteCategories.map((category) => {
          return {
            categoryId: category._id.toString(),
          };
        }),
        userId: customer.userId._id.toString(),
      });
  }, [customer]);

  const collectFormData = (e) =>
    setCustomerToEdit({
      ...customerToEdit,
      [e.target.name]: e.target.value,
    });

  const onSelectPhoto = (e) => {
    if (e.target) {
      setSelectedFile(e.target.files[0]);
      let f = e.target.files[0];
      setPreviewImage(URL.createObjectURL(f));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      editProfile()
        .then((res) => {
          dispatch(
            customerActions.updateCustomerProfile({
              ...res.data,
            })
          );
          navigate("/home", { replace: false });
        })
        .catch((error) => {
          console.log(error.message);
        });
      return;
    }
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .put("http://localhost:3005/fruit-images", fd, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        dispatch(
          customerActions.updatePhotoUrl({
            photoUrl: res.data.filePath,
          })
        );
        editProfile()
          .then((res) => {
            dispatch(
              customerActions.updateCustomerProfile({
                ...res.data,
              })
            );
            navigate("/home", { replace: false });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          {previewImage && (
            <div className="previewImage">
              <img src={previewImage} alt="" />
            </div>
          )}
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <h2> Customer Edit Form </h2>
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

                <input type="file" onChange={onSelectPhoto} />
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
