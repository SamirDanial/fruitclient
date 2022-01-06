import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT } from '../../hooks/Product';

const Product_Details = () => {
  const params = useParams();
  const [featuredImage, setFeaturedImage] = useState('');
  const [product, setProduct] = useState();
  const [getProductById] = useLazyQuery(GET_PRODUCT, {
    variables: {
      ID: params.id
    },
    onCompleted: data => data
  })

  useEffect(() => {
    getProductById().then(res => {
      setProduct(res.data.getProduct);
      const fm = res.data.getProduct.photos && res.data.getProduct.photos.find(x => x.featured === true).photoUrl;
      setFeaturedImage(fm);
    }).catch(error => {
      console.log(error.message);
    })
  }, [])
  return (
    <div>
      <div className="small-container single_product">
        <div className="row">
          <div className="col-2">
            <img src={`http://localhost:5000/${featuredImage}`} width="100%" id="productImg" alt="" />
            <div className="small-img-row">
              {
                product && product.photos.map((photo) => (
                  <img
                    className="small-img"
                    src={`http://localhost:5000/${photo.photoUrl}`}
                    onClick={() => setFeaturedImage(photo.photoUrl)}
                    width="20%"
                    alt=""
                  />
                ))
              }
              {/* <div className="small-img-col">
              </div>
              <div className="small-img-col">
                <img
                  className="small-img"
                  src={require('../../../img/gallery-2.jpg')}
                  width="100%"
                  alt=""
                />
              </div>
              <div className="small-img-col">
                <img
                  className="small-img"
                  src={require('../../../img/gallery-3.jpg')}
                  width="100%"
                  alt=""
                />
              </div>
              <div className="small-img-col">
                <img
                  className="small-img"
                  src={require('../../../img/gallery-4.jpg')}
                  width="100%"
                  alt=""
                />
              </div> */}
            </div>
          </div>
          <div className="col-2">
            <p>Home / {product && product.name}</p>
            <h1>{product && product.description}</h1>
            <h4>PKR{product && product.price}</h4>
            {/* <select>
              <option>Select Size</option>
              <option>XXL</option>
              <option>XL</option>
              <option>Large</option>
              <option>Medium</option>
              <option>Small</option>
            </select> */}
            <input type="number" defaultValue={1} />
            <a href="#" className="btn">
              Add To Cart
            </a>
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
      {/* <div className="small-container">
        <div className="row row-2">
          <h2>Related Products</h2>
          <p>View More</p>
        </div>
      </div> */}
      {/* <div className="small-container">
        <div className="row">
          <div className="col-4">
            <img  src={require('../../../img/product-1.jpg')} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-o" />
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require('../../../img/product-2.jpg')} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half-o" />
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img  src={require('../../../img/product-3.jpg')} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-o" />
            </div>
            <p>$50.00</p>
          </div>
          <div className="col-4">
            <img src={require('../../../img/product-4.jpg')} alt="" />
            <h4>Red Printed T-Shirt</h4>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-o" />
            </div>
            <p>$50.00</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Product_Details;
