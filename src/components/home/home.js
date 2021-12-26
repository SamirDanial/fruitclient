import { isRequiredArgument } from "graphql";
import React from "react";

const Home = () => {
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
              <a href="#" className="btn">
                Explore Now &#8594;
              </a>
            </div>
            <div className="col-2">
              <img src={require("../../img/image1.png")} />
            </div>
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <img src={require('../../img/category-1.jpg')} />
            </div>
            <div className="col-3">
              <img src={require('../../img/category-2.jpg')} />
            </div>
            <div className="col-3">
              <img src={require('../../img/category-3.jpg')} />
            </div>
          </div>
        </div>
      </div>
      <div className="small-container">
      <h2 className="title">Featured Products</h2>
      <div className="row">
        <div className="col-4">
          <img src={require('../../img/product-1.jpg')} />
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
          <img src={require('../../img/product-2.jpg')} />
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
          <img src={require('../../img/product-3.jpg')} />
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
          <img  src={require('../../img/product-4.jpg')} />
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
          <img src={require('../../img/product-5.jpg')} />
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
          <img src={require('../../img/product-6.jpg')} />
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
          <img src={require('../../img/product-7.jpg')} />
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
          <img src={require('../../img/product-8.jpg')} />
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
          <img src={require('../../img/product-9.jpg')} />
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
          <img src={require('../../img/product-10.jpg')} />
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
          <img src={require('../../img/product-11.jpg')} />
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
          <img src={require('../../img/product-12.jpg')} />
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
    </div>
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img src={require("../../img/exclusive.png")} className="offer-img" />
          </div>
          <div className="col-2">
            <p>Exclusive Available on RedStore</p>
            <h1>Smart Band 4</h1>
            <small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              architecto enim dolorem tempore rerum ipsam eaque earum dolorum
              suscipit iste! Quod dolorum maiores at, obcaecati nostrum soluta
              placeat minima assumenda.
            </small>
            <a className="btn">Buy Now &#8594;</a>
          </div>
        </div>
      </div>
    </div>

    <div className="testimonial">
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
            <img src={require('../../img/user-1.png')} />
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
            <img src={require('../../img/user-2.png')} />
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
            <img src={require('../../img/user-3.png')} />
            <h3>Mobel Joe</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="brands">
      <div className="small-container">
        <div className="row">
          <div className="col-5">
            <img src={require('../../img/logo-godrej.png')} />
          </div>
          <div className="col-5">
            <img src={require('../../img/logo-coca-cola.png')}/>
          </div>
          <div className="col-5">
            <img src={require('../../img/logo-oppo.png')} />
          </div>
          <div className="col-5">
            <img src={require('../../img/logo-paypal.png')} />
          </div>
          <div className="col-5">
            <img src={require('../../img/logo-philips.png')} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
