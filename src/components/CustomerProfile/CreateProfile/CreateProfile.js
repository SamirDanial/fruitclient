import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_PROFILE } from "../../hooks/Customer";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { customerActions } from "../../../store/customer";

const CreateProfile = () => {
  const userId = useSelector((state) => state.auth._id);
  const token = useSelector((state) => state.auth.token);
  const photoUrl = useSelector((state) => state.customer.photoUrl);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [customerToCreate, setCustomerToCreate] = useState({
    _id: "",
    name: "",
    lastName: "",
    photoUrl: "",
    phoneNumber: "",
    emailAddress: "",
    physicalAddress: "",
  });
  const dispatch = useDispatch();
  const [createProfile] = useMutation(CREATE_PROFILE, {
    variables: {
      ...customerToCreate,
      photoUrl: photoUrl,
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
      photoUrl: photoUrl,
      physicalAddress: "",
      phoneNumber: "",
      emailAddress: "",
      coordinates: "",
      favoritesCategory: [],
      userId: userId,
    });
  }, [userId, photoUrl]);

  const collectFormData = (e) =>
    setCustomerToCreate({
      ...customerToCreate,
      [e.target.name]: e.target.value,
    });

  const onSelectPhoto = (e) => {
    setSelectedFile(e.target.files[0]);
    let f = e.target.files[0];
    setPreviewImage(URL.createObjectURL(f));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if(!selectedFile) {
      createProfile()
          .then((res) => {
            {
              dispatch(
                customerActions.createCustomerProfile({
                  ...res.data,
                })
              );
            }
            navigate("/home", {
              replace: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
          return;
    }

    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .put("http://localhost:5000/fruit-images", fd, {
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
        createProfile()
          .then((res) => {
            {
              dispatch(
                customerActions.createCustomerProfile({
                  ...res.data,
                })
              );
            }
            navigate("/home", {
              replace: true,
            });
          })
          .catch((error) => {
            console.log(error);
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
                <h2> Customer Register Form </h2>
              </div>
              <form className="editRegForm" onSubmit={onFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={customerToCreate.name}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={customerToCreate.lastName}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Last Name"
                />

                <input type="file" onChange={onSelectPhoto} />
                <input
                  type="text"
                  name="phoneNumber"
                  value={customerToCreate.phoneNumber}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  name="emailAddress"
                  value={customerToCreate.emailAddress}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Email Address"
                />
                <input
                  type="text"
                  name="physicalAddress"
                  value={customerToCreate.physicalAddress}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Physical Address"
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
