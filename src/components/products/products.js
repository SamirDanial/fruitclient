import React from "react";
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
  return (
    <div className="small-container">
      <div className="row row-2">
        <h2>All Products</h2>
        <select>
          <option>Default Sorting</option>
          <option>Sort by price</option>
          <option>Sort by popularity</option>
          <option>Sort by rating</option>
          <option>Sort by sale</option>
        </select>
      </div>
      <div className="row">
        <div className="col-4" onClick={() => navigate('/product_detail')}>
          <img src={require('../../img/product-1.jpg')} alt="" />
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
          <img src={require('../../img/product-2.jpg')} alt="" />
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
          <img src={require('../../img/product-3.jpg')} alt="" />
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
          <img src={require('../../img/product-4.jpg')} alt="" />
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
      <div className="row">
        <div className="col-4">
          <img src={require('../../img/product-5.jpg')} alt="" />
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
          <img src={require('../../img/product-6.jpg')} alt="" />
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
          <img src={require('../../img/product-7.jpg')} alt="" />
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
          <img src={require('../../img/product-8.jpg')} alt="" />
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
      <div className="row">
        <div className="col-4">
          <img src={require('../../img/product-9.jpg')} alt="" />
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
          <img src={require('../../img/product-10.jpg')} alt="" />
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
          <img src={require('../../img/product-11.jpg')} alt="" />
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
          <img src={require('../../img/product-12.jpg')} alt="" />
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
      <div className="page-btn">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>→</span>
      </div>
    </div>
  );
};

export default Products;
