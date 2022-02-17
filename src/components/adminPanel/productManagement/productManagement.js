import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from '../../hooks/Product';
import { productActions } from '../../../store/product';

const ProductManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [allProducts, setAllProducts] = useState(0);
  const [pages, setPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [getProducts] = useLazyQuery(GET_PRODUCTS, {
    fetchPolicy: 'no-cache',
    variables: {
      PageNumber: pageNumber,
      PageSize: pageSize
    },
    onCompleted: (data) => {
      return data;
    }
  });

  useEffect(() => {
    dispatch(productActions.clearPhotoUrls())
  })

  useEffect(() => {
    getProducts().then(res => {
      setAllProducts(res.data.getProducts.allProductsCount)
      setProducts(res.data.getProducts.products);
    }).catch(error => {
      console.log(error.message);
    })
  }, [getProducts, pageNumber])

  useEffect(() => {
    if(allProducts > pageSize) {
      let pagesToCreate = Math.ceil(allProducts / pageSize);
      for (let i = 0; i < pagesToCreate; i++) {
        setPages((preValues) => [...preValues, <h1>Hi</h1>])
      }
    }
  }, [allProducts, pageSize])

  const goToNewPage = (e) => {
    let targetNumber = e.target;
    const number = targetNumber.getAttribute("name");
    setPageNumber(parseInt(number));
  }
  return (
    <div className="adminPanelItem">
      <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Visible</th>
            <th>Edit</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products
            .map((product, index) => (
              <tr className="customerTr" key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.visible ? "Visible" : "Unvisible"}</td>
                <td><div style={{cursor: 'pointer'}} className="btn" onClick={() => navigate (`/editProduct/${product._id}`)}>Edit</div></td>
                <td>
                  {product.photos.length > 0 && (
                    <img
                      src={"/" + product.photos[0].photoUrl}
                      alt=""
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="page-btn">
        {pages.map((page, index) => {
          return (
            <span key={index} name={index + 1} onClick={goToNewPage}>
              {index + 1}
            </span>
          );
        })}
        </div>
        <button onClick={() => navigate('/createProduct')} className="btn">+ Add Product</button>
      </div>
    </div>
  );
};

export default ProductManagement;
