import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from 'react-redux';
import { GET_PRODUCTS_BY_CATEGORY } from "../hooks/Product";
import { cartActions } from '../../store/cart'

const CategorisedProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categorisedProducts, setCategoriesedProducts] = useState([]);
  const [getProductsByCategory] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      ID: params.id,
    },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    getProductsByCategory()
      .then((res) => {
        setCategoriesedProducts(res.data.getProductByCategory.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [getProductsByCategory]);
  return (
    <div className="small-container2">
      <div className="row row-2"></div>
      <div className="row">
        {categorisedProducts.map((product) => (
          <div
            className="col-4 eachProduct"
            key={product._id}
          >
            <img
              src={`http://localhost:5000/${product.photos[0].photoUrl}`}
              alt=""
              onClick={() => navigate(`/product_detail/${product._id}`)}
            />
            <h4
              style={{ textAlign: "center", color: "green", marginTop: "20px" }}
            >
              {product.name}
            </h4>
            <p style={{ textAlign: "center", marginTop: "5px" }}>
              {product.description}
            </p>
            <div style={{textAlign: "center"}}>
              <button onClick={() => dispatch(cartActions.addToCart({item: product}))} className="btn" style={{cursor: "pointer"}}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorisedProduct;
