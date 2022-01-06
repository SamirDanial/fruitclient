import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY } from '../hooks/Product';

const CategorisedProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [categorisedProducts, setCategoriesedProducts] = useState([]);
    const [getProductsByCategory] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: {
            ID: params.id
        },
        fetchPolicy: "no-cache"
    })
    useEffect(() => {
        getProductsByCategory().then((res) => {
            setCategoriesedProducts(res.data.getProductByCategory.products)
        }).catch((error) => {
            console.log(error.message);
        })
    }, [])
  return (
    <div className="small-container">
      <div className="row row-2">
        {/* <h2>All Products </h2>
        <select>
          <option>Default Sorting</option>
          <option>Sort by price</option>
          <option>Sort by popularity</option>
          <option>Sort by rating</option>
          <option>Sort by sale</option>
        </select> */}
      </div>
      <div className="row">
        {
            categorisedProducts.map((product) => (
                <div className="col-4 eachProduct" key={product._id} onClick={() => navigate(`/product_detail/${product._id}`)}>
                    <img src={`http://localhost:5000/${product.photos[0].photoUrl}`} alt="" />
                    <h4 style={{textAlign: "center", color: 'green', marginTop: '20px'}}>{product.name}</h4>
                    <p style={{textAlign: "center", marginTop: '5px'}}>{product.description}</p>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default CategorisedProduct;
