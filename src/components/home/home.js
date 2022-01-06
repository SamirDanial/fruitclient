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
  }, []);
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
        <div className="small-container">
          <div className="row">
            {categoriesToShow.map((category) => (
              <div key={category._id} className="col-3 eachCategory" onClick={() => navigate(`/categorisedProduct/${category._id}`)}>
                <img
                  src={`http://localhost:3005/${category.imageUrl}`}
                  height="300px"
                  width="200px"
                  style={{padding: '20px'}}
                />
                <div>
                  <h1 style={{textAlign: "center"}}>{category.name}</h1>
                  <p style={{textAlign: "center"}}>{category.description}</p>
                </div>
              </div>
            ))}
            {/* <div className="col-3">
              <img src={require("../../img/category-1.jpg")} alt="" />
            </div>
            <div className="col-3">
              <img src={require("../../img/category-2.jpg")} alt="" />
            </div>
            <div className="col-3">
              <img src={require("../../img/category-3.jpg")} alt="" />
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="small-container">
        <h2 className="title">Featured Products</h2>
        <div className="row">
          <div className="col-4">
            <img src={require("../../img/product-1.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-2.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-3.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-4.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
        <h2 className="title">Latest Products</h2>
        <div className="row">
          <div className="col-4">
            <img src={require("../../img/product-5.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-6.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-7.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-8.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <img src={require("../../img/product-9.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-10.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-11.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require("../../img/product-12.jpg")} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
      </div> */}
      {/* <div className="offer">
        <div className="small-container">
          <div className="row">
            <div className="col-2">
              <img
                src={require("../../img/exclusive.png")}
                className="offer-img"
                alt=""
              />
            </div>
            <div className="col-2">
              <p>Exclusive Available on RedStore</p>
              <h1>Smart Band 4</h1>
              <small>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, architecto enim dolorem tempore rerum ipsam eaque earum
                dolorum suscipit iste! Quod dolorum maiores at, obcaecati
                nostrum soluta placeat minima assumenda.
              </small>
              <div className="btn">Buy Now &#8594;</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="testimonial" style={{marginBottom: '20px'}}>
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <i className="fa fa-quote-left"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                exercitationem! Itaque fugiat aperiam minus error saepe,
                aspernatur aliquid sapiente. Optio eaque, tempore alias quidem
                harum nemo culpa magnam doloremque ullam?
              </p>
              <div className="rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <img src={require("../../img/user-1.png")} alt="" />
              <h3>Sean Parker</h3>
            </div>
            <div className="col-3">
              <i className="fa fa-quote-left"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                exercitationem! Itaque fugiat aperiam minus error saepe,
                aspernatur aliquid sapiente. Optio eaque, tempore alias quidem
                harum nemo culpa magnam doloremque ullam?
              </p>
              <div className="rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <img src={require("../../img/user-2.png")} alt="" />
              <h3>Mike Smith</h3>
            </div>
            <div className="col-3">
              <i className="fa fa-quote-left"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                exercitationem! Itaque fugiat aperiam minus error saepe,
                aspernatur aliquid sapiente. Optio eaque, tempore alias quidem
                harum nemo culpa magnam doloremque ullam?
              </p>
              <div className="rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <img src={require("../../img/user-3.png")} alt="" />
              <h3>Mobel Joe</h3>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="brands">
        <div className="small-container">
          <div className="row">
            <div className="col-5">
              <img src={require("../../img/logo-godrej.png")} alt="" />
            </div>
            <div className="col-5">
              <img src={require("../../img/logo-coca-cola.png")} alt="" />
            </div>
            <div className="col-5">
              <img src={require("../../img/logo-oppo.png")} alt="" />
            </div>
            <div className="col-5">
              <img src={require("../../img/logo-paypal.png")} alt="" />
            </div>
            <div className="col-5">
              <img src={require("../../img/logo-philips.png")} alt="" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
