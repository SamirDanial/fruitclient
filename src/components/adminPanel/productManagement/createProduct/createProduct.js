import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from 'react-redux';
import { GET_CATEGORIES } from "../../../hooks/Category";
import { CREATE_PRODUCT } from "../../../hooks/Product";
import axios from 'axios';

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoryToSelect, setCategoryToSelect] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [productToCreate, setProductToCreate] = useState({
    name: "",
    description: "",
    price: 0,
    visible: true,
    category: "",
    imageUrls: [],
  });

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    variables: {
      ...productToCreate
    },
    onCompleted: data => data
  })

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    setProductToCreate({
      ...productToCreate,
      [productToCreate.imageUrls]: photoUrls
    })
  }, [photoUrls])



  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.getCategories.categories);
    });
  }, []);

  const onSelectCategory = (e) => {
    const value = e.target.value;
    setCategoryToSelect([value]);
  }

  const CollectFormData = (e) => {
    setProductToCreate({ ...productToCreate, [e.target.name]: e.target.value });
  };

  const onSelectPhotos = (e) => {
      const files = e.target.files
        for(let i = 0; i < files.length; i++) {
            setSelectedFiles(preValue => [...preValue, files[i]]);
        }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    selectedFiles.forEach(eachFile => {
        const fd = new FormData();
    fd.append("image", eachFile, eachFile.name);
    axios
      .put("http://localhost:5000/fruit-images", fd, {
        headers: {
          "x-auth-token": token,
        },
      }).then((res) => {
        setPhotoUrls(preValue => [...preValue, res.data.filePath]);
      })
    })
    console.log(productToCreate);
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <h2> Product Registeration Form </h2>
              </div>
              <form className="editRegForm" onSubmit={onFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={productToCreate.name}
                  onChange={(e) => CollectFormData(e)}
                  placeholder="Product Name"
                />

                <input
                  type="text"
                  name="description"
                  value={productToCreate.description}
                  onChange={(e) => CollectFormData(e)}
                  placeholder="Description"
                />

                <input
                  type="number"
                  name="price"
                  value={productToCreate.price}
                  onChange={(e) => CollectFormData(e)}
                  placeholder="Price"
                />

                <select
                  name="visible"
                  value={productToCreate.visible}
                  onChange={(e) => CollectFormData(e)}
                  className="createProductSelector"
                >
                  <option value="0">Select Visibility</option>
                  <option value={true}>Visible</option>
                  <option value={false}>Unvisible</option>
                </select>

                <select
                  name="category"
                  value={productToCreate.category}
                  onChange={(e) => onSelectCategory(e)}
                  className="createProductCategorySelector"
                >
                  <option value="0">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <input type="file" onChange={onSelectPhotos} multiple="multiple" />

                <input type="submit" value="Save" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
