import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS } from "../hooks/Product";
import { cartActions } from '../../store/cart';

const Products = () => {
  const navigate = useNavigate();
  const [pageSize] = useState(20);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState([]);
  const [allProducts, setAllProducts] = useState();
  const [products, setProducts] = useState([]);
  const [getProducts] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      PageSize: pageSize,
      PageNumber: pageNumber,
    },
    onCompleted: (data) => data,
  });

  useEffect(() => {
    getProducts()
      .then((res) => {
        setAllProducts(res.data.getProducts.allProductsCount);
        setProducts(res.data.getProducts.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [pageNumber]);

  const goToNewPage = (e) => {
    let targetNumber = e.target;
    const number = targetNumber.getAttribute("name");
    setPageNumber(parseInt(number));
  };

  useEffect(() => {
    if (allProducts > pageSize) {
      let pagesToCreate = Math.ceil(allProducts / pageSize);
      for (let i = 0; i < pagesToCreate; i++) {
        setPages((preValues) => [...preValues, <h1>Hi</h1>]);
      }
    }
  }, [allProducts, pageSize]);
  return (
    <div className="small-container2" style={{ marginTop: "50px" }}>
      <div className="row">
        {products.map((product, index) => (
          <div
            key={index}
            className="col-4 eachProduct"
          >
            <img
              src={`http://localhost:5000/${
                product.photos.find((x) => x.featured === true).photoUrl
              }`}
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
            <div style={{textAlign: "center"}}>
              <button onClick={() => dispatch(cartActions.addToCart({item: product}))} className="btn" style={{cursor: "pointer"}}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
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
  );
};

export default Products;
