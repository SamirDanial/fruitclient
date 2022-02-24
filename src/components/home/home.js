import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { MY_PROFILE } from "../hooks/Customer";
import { customerActions } from "../../store/customer";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { GET_CATEGORIES } from "../hooks/Category";
import { GET_FEATURED_PRODUCTS } from "../hooks/Product";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import c1 from "../../img/c1.jpg";
import c2 from "../../img/c2.jpg";
import c3 from "../../img/c3.jpg";
import banner1 from "../../img/banner1.jpg";
import banner2 from "../../img/bunner4.jpg";
import banner3 from "../../img/banner3.jpeg";

const Home = () => {
  const isAuth = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(6);
  const [allProducts, setAllProducts] = useState();
  const [pages, setPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoriesToShow, setCategoriesToShow] = useState([]);
  const dispatch = useDispatch();
  const [query] = useLazyQuery(MY_PROFILE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    console.log(products);
  }, [products]);

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => data,
  });

  const [getFeaturedProducts] = useLazyQuery(GET_FEATURED_PRODUCTS, {
    variables: {
      PageSize: pageSize,
      PageNumber: pageNumber,
    },
    // fetchPolicy: "no-cache",
    onCompleted: (data) => data,
  });

  useEffect(() => {
    getFeaturedProducts()
      .then((res) => {
        setAllProducts(res.data.getFeaturedProducts.allProductsCount);
        setProducts(res.data.getFeaturedProducts.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [pageNumber]);

  useEffect(() => {
    if (allProducts > pageSize) {
      let pagesToCreate = Math.ceil(allProducts / pageSize);
      for (let i = 0; i < pagesToCreate; i++) {
        setPages((preValues) => [...preValues, <h1>Hi</h1>]);
      }
    }
  }, [allProducts, pageSize]);

  const goToNewPage = (e) => {
    let targetNumber = e.target;
    const number = targetNumber.getAttribute("name");
    setPageNumber(parseInt(number));
  };

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
          <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
            <div>
              <img src={c1} alt="" className="sliderImage" />
            </div>
            <div>
              <img src={c2} alt="" className="sliderImage" />
            </div>
            <div>
              <img src={c3} alt="" className="sliderImage" />
            </div>
          </Carousel>
        </div>
      </div>
      <h1 style={{ color: "green", textAlign: "center", margin: "50px 0px" }}>
        Banners
      </h1>
      <div className="banner">
        <div className="bannerMain">
          <img src={banner2} alt="" />
        </div>
        <div className="bannerSecond">
          <img style={{ flexGrow: 1 }} src={banner1} alt="" />
          <img style={{ flexGrow: 1 }} src={banner3} alt="" />
        </div>
      </div>
      <h1 style={{ color: "green", textAlign: "center", margin: "50px 0px" }}>
        Categories
      </h1>
      <div className="categories">
        <div className="small-container2">
          <div className="row">
            {categoriesToShow.map((category) => (
              <div
                key={category._id}
                className="col-3 eachCategory"
                onClick={() => navigate(`/categorisedProduct/${category._id}`)}
              >
                <img
                  src={`http://localhost:5000/${category.imageUrl}`}
                  height="300px"
                  width="200px"
                  style={{ padding: "20px" }}
                  alt=""
                />
                <div>
                  <h1 style={{ textAlign: "center" }}>{category.name}</h1>
                  <p style={{ textAlign: "center" }}>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          <h1
            style={{ color: "green", textAlign: "center", margin: "50px 0px" }}
          >
            Featured Products
          </h1>
          <div className="row">
            {products.map((product, index) => {
              if (product.visible === true) {
                return (
                  <div key={index} className="col-4 eachProduct">
                    <img
                      src={`http://localhost:5000/${
                        product.photos.find((x) => x.featured === true).photoUrl
                      }`}
                      className="cImage"
                      onClick={() => navigate(`/product_detail/${product._id}`)}
                      alt=""
                    />
                    <h4>{product.name}</h4>
                    <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-o" />
                    </div>
                    <p>{product.price}</p>
                  </div>
                );
              }
            })}
          </div>
          <div className="page-btn">
            {pages.map((page, index) => {
              return (
                <span key={index} name={index + 1} onClick={goToNewPage}>
                  {index + 1}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
