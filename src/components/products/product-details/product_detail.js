import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../hooks/Product";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../store/cart';

const Product_Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [featuredImage, setFeaturedImage] = useState("");
  const [product, setProduct] = useState();
  const [getProductById] = useLazyQuery(GET_PRODUCT, {
    variables: {
      ID: params.id,
    },
    onCompleted: (data) => data,
  });

  useEffect(() => {
    getProductById()
      .then((res) => {
        setProduct(res.data.getProduct);
        const fm =
          res.data.getProduct.photos &&
          res.data.getProduct.photos.find((x) => x.featured === true).photoUrl;
        setFeaturedImage(fm);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [getProductById]);

  const addToCart = () => {
    dispatch(cartActions.addToCart({item: product}));
  }
  return (
    <div>
      <div className="small-container single_product">
        <div className="row">
          <div className="col-2">
            <img
              src={`http://localhost:3005/${featuredImage}`}
              width="100%"
              id="productImg"
              alt=""
            />
            <div className="small-img-row">
              {product &&
                product.photos.map((photo, index) => (
                  <img
                    key={index}
                    className="small-img"
                    src={`http://localhost:3005/${photo.photoUrl}`}
                    onClick={() => setFeaturedImage(photo.photoUrl)}
                    width="20%"
                    alt=""
                  />
                ))}
            </div>
          </div>
          <div className="col-2">
            <p>Home / {product && product.name}</p>
            <h1>{product && product.description}</h1>
            <h4>PKR{product && product.price}</h4>
            <div className="btn" style={{ cursor: "pointer" }} onClick={addToCart}>
              Add To Cart
            </div>
            <h3>
              Product Details <i className="fa fa-indent" />
            </h3>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              delectus officia commodi vel soluta accusantium placeat non quo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Details;
