import React from "react";
import iosApp from '../../img/app-store.png';
import androidApp from '../../img/play-store.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-1">
            <h3>Download Our App</h3>
            <p>Download App for Android and IOS</p>
            <div className="app-logo">
              <img src={androidApp} alt="" />
              <img src={iosApp} alt="" />
            </div>
          </div>
          <div className="footer-col-2">
            
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
              repellendus.
            </p>
          </div>
          <div className="footer-col-3">
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div className="footer-col-4">
            <h3>Follow us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2022 - Vappar Software House Company</p>
      </div>
    </div>
  );
};

export default Footer;
