import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { FILTER_PRODUCTS_BY_PRODUCT_NAME } from "../../hooks/Product";
import { useParams, useNavigate } from "react-router-dom";
import { cartActions } from "../../../store/cart";

const Filtered_Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [getFilteredProducts] = useLazyQuery(FILTER_PRODUCTS_BY_PRODUCT_NAME, {
    variables: {
      Name: params.name,
    },
    onCompleted: (data) => data,
  });

  useEffect(() => {
    getFilteredProducts()
      .then((res) => {
        setFilteredProducts(res.data.filterByNameProduct.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="small-container2" style={{ marginTop: "50px" }}>
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="col-4 eachProduct">
            <img
              src={`/${
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
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() =>
                  dispatch(cartActions.addToCart({ item: product }))
                }
                className="btn"
                style={{ cursor: "pointer" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filtered_Product;
