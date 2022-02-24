import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS, AUTO_FILL_NAME_PRODUCT } from "../hooks/Product";
import { cartActions } from "../../store/cart";

const Products = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [allProducts, setAllProducts] = useState();
  const [pages, setPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [dataNames, setDataNames] = useState([]);
  const [showDataNames, setShowDataNames] = useState(true);
  const dispatch = useDispatch();
  const [getProducts] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      PageSize: pageSize,
      PageNumber: pageNumber,
    },
    // fetchPolicy: "no-cache",
    onCompleted: (data) => data,
  });
  const [autoFill] = useLazyQuery(AUTO_FILL_NAME_PRODUCT, {
    variables: {
      Name: productName,
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

  useEffect(() => {
    if (productName.length > 2) {
      autoFill()
        .then((res) => {
          setDataNames(res.data.autoFillNameProduct);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [productName]);

  const fillSeachBox = (d) => {
    setProductName(d);
    setShowDataNames(false);
  };

  const doSearch = () => {
    navigate(`/filter_product/${productName}`);
  };

  return (
    <div className="small-container2" style={{ marginTop: "50px" }}>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
            setShowDataNames(true);
          }}
        />
        <button className="btn" onClick={doSearch}>
          Search
        </button>
        <div className="data">
          {showDataNames &&
            dataNames.length > 0 &&
            productName.length > 2 &&
            dataNames.map((d, i) => (
              <div
                className="data_field"
                key={i}
                name={d}
                onClick={() => fillSeachBox(d)}
              >
                <span>{d}</span>
              </div>
            ))}
        </div>
      </div>
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
  );
};

export default Products;
