import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GET_CATEGORIES } from "../../../hooks/Category";
import { CREATE_PRODUCT } from "../../../hooks/Product";
import { productActions } from "../../../../store/product";
import axios from "axios";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();
  const [categoryToSelect, setCategoryToSelect] = useState([]);
  const [visibality, setVisibality] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [featureName, setFeatureName] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const photoUrls = useSelector((state) => state.product.photoUrls);
  const [productToCreate, setProductToCreate] = useState({
    name: "",
    description: "",
    price: 0,
    visible: visibality,
    category: "",
    imageUrls: [],
  });

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    variables: {
      name: productToCreate.name,
      description: productToCreate.description,
      price: parseInt(productToCreate.price),
      visible: visibality,
      categoriesID: categoryToSelect,
      photos: photoUrls,
    },
    onCompleted: (data) => data,
  });

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.getCategories.categories);
    });
  }, [getCategories]);

  const onSelectCategory = (e) => {
    const value = e.target.value;
    setCategoryToSelect([value]);
    setProductToCreate({
      ...productToCreate,
      category: value,
    });
  };

  const CollectFormData = (e) => {
    setProductToCreate({ ...productToCreate, [e.target.name]: e.target.value });
  };

  const onSelectPhotos = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      setSelectedFiles((preValue) => [...preValue, files[i]]);
      const f = e.target.files[i];
      setPreviewImages((preState) => [
        ...preState,
        {
          imagePath: URL.createObjectURL(f),
          featured: i === 0 ? true : false,
          name: f.name,
        },
      ]);
    }
  };

  const changeFeaturedImage = (e) => {
    setFeatureName(e);
    const newArray = [...previewImages];
    const index = newArray.findIndex((x) => x.name === e);
    newArray.forEach((array) => {
      array.featured = false;
    });
    newArray[index].featured = true;
    setPreviewImages(newArray);
  };

  useEffect(() => {
    if (photoUrls.length === selectedFiles.length && photoUrls.length > 0) {
      createProduct()
        .then((_) => {
          navigate("/productManagement", { replace: true });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [photoUrls, selectedFiles, createProduct, navigate]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFiles) {
      createProduct()
        .then((res) => {
          console.log(res);
          navigate("/productManagement", { replace: true });
        })
        .catch((error) => {
          console.log(error.message);
        });
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      const fd = new FormData();
      fd.append("image", selectedFiles[i], selectedFiles[i].name);
      axios
        .put("http://localhost:5000/fruit-images", fd, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          const path = res.data.filePath;
          dispatch(
            productActions.updatePhotoUrls({
              photoUrls: {
                photoUrl: path,
                featured:
                  featureName !== ""
                    ? path.includes(featureName)
                    : i === 0
                    ? true
                    : false,
              },
            })
          );
        });
    }
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          {previewImages &&
            previewImages.map((image, index) => (
              <div key={index} className="previewImage">
                <img src={image.imagePath} alt="" />
                <div
                  style={{
                    background: image.featured ? "lightgreen" : "",
                    textAlign: "center",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => changeFeaturedImage(image.name)}
                >
                  <span>Featured</span>
                </div>
              </div>
            ))}
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
                  value={visibality}
                  onChange={(e) =>
                    setVisibality(e.target.value === "true" ? true : false)
                  }
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

                <input
                  type="file"
                  onChange={onSelectPhotos}
                  multiple="multiple"
                />

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
