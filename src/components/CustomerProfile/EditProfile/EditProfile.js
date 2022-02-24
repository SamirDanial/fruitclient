import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EDIT_PROFILE } from "../../hooks/Customer";
import { GET_CITY_NAMES, GET_SITES_BY_CITY_ID } from "../../hooks/Location";
import { useMutation, useLazyQuery } from "@apollo/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { customerActions } from "../../../store/customer";

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [alreadyCity, setAlreadyCity] = useState();
  const [alreadySite, setAlreadySite] = useState();
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState();
  const [cityValue, setCityValue] = useState("Islamabad");
  const [sites, setSites] = useState([]);
  const [site, setSite] = useState();
  const photoUrl = useSelector((state) => state.customer.photoUrl);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [getCityNames] = useLazyQuery(GET_CITY_NAMES, {
    onCompleted: (data) => data,
  });

  const [getSitesByCityId] = useLazyQuery(GET_SITES_BY_CITY_ID, {
    variables: {
      ID: cityId,
    },
    onCompleted: (data) => data,
  });

  useEffect(() => {
    getCityNames()
      .then((res) => {
        if (alreadyCity === "Islamabad") {
          setCityId(res.data.getCityNames.cityNames[0].ID);
        } else {
          setCityId(res.data.getCityNames.cityNames[1].ID);
        }

        setCities(res.data.getCityNames.cityNames);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alreadyCity]);

  useEffect(() => {
    getSitesByCityId()
      .then((res) => {
        setSites(res.data.getSitesByCityId.sites.split(","));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cityId]);

  const [customerToEdit, setCustomerToEdit] = useState({
    _id: "",
    name: "",
    lastName: "",
    photoUrl: "",
    phoneNumber: "",
    emailAddress: "",
    physicalAddress: "",
  });

  useEffect(() => {
    setAlreadyCity(customerToEdit.physicalAddress.split("/")[0]);
    setAlreadySite(customerToEdit.physicalAddress.split("/")[1]);
  }, [customerToEdit]);

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const [editProfile] = useMutation(EDIT_PROFILE, {
    variables: {
      ...customerToEdit,
      physicalAddress:
        cityValue + "/" + site + "/" + customerToEdit.physicalAddress,
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
        // physicalAddress: cityValue + '/' + site + '/' + customerToEdit.physicalAddress
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

                <select
                  style={{ width: "100%", marginBottom: "10px" }}
                  value={cityId}
                  onChange={(e) => {
                    setCityId(e.target.value);
                    setCityValue(
                      e.target.options[e.nativeEvent.target.selectedIndex].label
                    );
                  }}
                >
                  {cities.map((city, index) => {
                    return (
                      <option key={index} value={city.ID} name={city.cityName}>
                        {city.cityName}
                      </option>
                    );
                  })}
                </select>

                <select
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSite(e.target.value);
                    setAlreadySite(
                      e.target.options[e.nativeEvent.target.selectedIndex].label
                    );
                  }}
                  value={alreadySite}
                >
                  {sites.map((site, index) => {
                    return (
                      <option key={index} value={site}>
                        {site}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="text"
                  name="physicalAddress"
                  value={customerToEdit.physicalAddress.split("/")[2]}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Exact Address"
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
