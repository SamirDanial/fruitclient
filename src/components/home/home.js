import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { MY_PROFILE } from "../hooks/Customer";
import { customerActions } from "../../store/customer";
import { useDispatch, useSelector } from "react-redux";
import { GET_CATEGORIES } from "../hooks/Category";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isAuth = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();
  const [categoriesToShow, setCategoriesToShow] = useState([]);
  const dispatch = useDispatch();
  const [query] = useLazyQuery(MY_PROFILE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      return data;
    },
  });

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => data,
  });

  useEffect(() => {
    if (isAuth) {
      query().then((res) => {
        const data = res.data;
        if (data) {
          dispatch(
            customerActions.getCustomerProfile({
              ...data.getCustomerProfile,
            })
          );
        }
      });
    }
  }, [query, dispatch, isAuth]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        const cts = res.data.getCategories.categories;
        setCategoriesToShow(cts);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [getCategories]);
  return (
    <div>
      <div className="header">
        <div className="contaner">
          <div className="row">
            <div className="col-2">
              <h1>
                Give your work <br />a new style!
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore
                <br />
                consectetur nam at tempore
              </p>
              <div className="btn">Explore Now &#8594;</div>
            </div>
            <div className="col-2">
              <img src={require("../../img/image1.png")} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="small-container2">
          <div className="row">
            {categoriesToShow.map((category) => (
              <div key={category._id} className="col-3 eachCategory" onClick={() => navigate(`/categorisedProduct/${category._id}`)}>
                <img
                  src={`http://localhost:5000/${category.imageUrl}`}
                  height="300px"
                  width="200px"
                  style={{padding: '20px'}}
                  alt=""
                />
                <div>
                  <h1 style={{textAlign: "center"}}>{category.name}</h1>
                  <p style={{textAlign: "center"}}>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
