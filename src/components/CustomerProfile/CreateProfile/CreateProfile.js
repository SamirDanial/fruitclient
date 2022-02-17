import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_PROFILE } from "../../hooks/Customer";
import { GET_CITY_NAMES, GET_SITES_BY_CITY_ID } from "../../hooks/Location";
import { useMutation, useLazyQuery } from "@apollo/client";
import axios from "axios";
import { customerActions } from "../../../store/customer";

const CreateProfile = () => {
  const userId = useSelector((state) => state.auth._id);
  const token = useSelector((state) => state.auth.token);
  const photoUrl = useSelector((state) => state.customer.photoUrl);
  const [previewImage, setPreviewImage] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState();
  const [cityValue, setCityValue] = useState('Islamabad');
  const [sites, setSites] = useState([]);
  const [site, setSite] = useState();
  const navigate = useNavigate();
  const [getCityNames] = useLazyQuery(GET_CITY_NAMES, {
    onCompleted: data => data
  });

  const [getSitesByCityId] = useLazyQuery(GET_SITES_BY_CITY_ID, {
    variables: {
      ID: cityId
    },
    onCompleted: data => data
  })

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
      physicalAddress: cityValue + '/' + site + '/' + customerToCreate.physicalAddress,
      photoUrl: photoUrl,
    },
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    getCityNames().then(res => {
      setCityId(res.data.getCityNames.cityNames[0].ID)
      setCities(res.data.getCityNames.cityNames)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  
  useEffect(() => {
    getSitesByCityId().then((res) => {
      setSites(res.data.getSitesByCityId.sites.split(','))
    }).catch(error => {
      console.log(error);
    })
  }, [cityId])

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
  {
    setCustomerToCreate({
      ...customerToCreate,
      [e.target.name]: e.target.value,
    });
  }

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
      .put("/fruit-images", fd, {
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

                <input type="file" onChange={onSelectPhoto} />
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
                />
                <select style={{width: "100%", marginBottom: "10px"}} onChange={(e) => {
                  setCityId(e.target.value);
                  setCityValue(e.target.options[e.nativeEvent.target.selectedIndex].label);
                  }}>
                  {
                    cities.map((city, index) => {
                      return (
                        <option key={index} value={city.ID} name={city.cityName}>
                          {city.cityName}
                        </option>
                      )
                    })
                  }
                </select>

                <select style={{width: "100%"}} onChange={(e) => setSite(e.target.value)}>
                  {
                    sites.map((site, index) => {
                      return (
                        <option key={index} value={site}>
                          {site}
                        </option>
                      )
                    })
                  }
                </select>

                <input
                  type="text"
                  name="physicalAddress"
                  value={customerToCreate.physicalAddress}
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

export default CreateProfile;
