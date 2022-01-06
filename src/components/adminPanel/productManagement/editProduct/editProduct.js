import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_PRODUCT,
  EDIT_PRODUCT,
  ADD_IMAGE_TO_PRODUCT,
} from "../../../hooks/Product";
import { GET_CATEGORIES } from "../../../hooks/Category";
import { productActions } from "../../../../store/product";
import axios from "axios";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [visibality, setVisibality] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrlsToSend, setImageUrlsToSend] = useState([]);
  const photoUrls = useSelector((state) => state.product.photoUrls);
  const [singlePhoto, setSiglePhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productToEdit, setProductToEdit] = useState({
    ID: "",
    name: "",
    description: "",
    price: 0,
    visible: null,
    category: "",
    imageUrls: [],
  });
  const [getProduct] = useLazyQuery(GET_PRODUCT, {
    variables: {
      ID: params.id,
    },
    fetchPolicy: "no-cache"
  });

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      return data;
    },
  });

  const [editProduct] = useMutation(EDIT_PRODUCT, {
    variables: {
      ID: productToEdit.ID,
      name: productToEdit.name,
      description: productToEdit.description,
      price: parseInt(productToEdit.price),
      visible: visibality,
      categoriesID: [selectedCategory],
      photos: photoUrls,
    },
    fetchPolicy: 'no-cache'
  });

  const [addPhotoToProduct] = useMutation(ADD_IMAGE_TO_PRODUCT, {
    variables: {
      ID: productToEdit.ID,
      photoInput: singlePhoto,
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.getCategories.categories);
    });
  }, [getCategories]);

  useEffect(() => {
    getProduct()
      .then((res) => {
        const product = res.data.getProduct;
        setVisibality(product.visible);
        setSelectedCategory(product.categories[0]._id);
        setImageUrls(product.photos);
        setProductToEdit({
          ID: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          visible: product.visible,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [params, getProduct]);

  useEffect(() => {
    if (singlePhoto) {
      setImageUrls((preState) => [...imageUrls, singlePhoto]);
    }
  }, [singlePhoto]);

  useEffect(() => {
    const imagesToSend = [];
    imageUrls.forEach((image) => {
      imagesToSend.push({
        photoUrl: image.photoUrl,
        featured: image.featured,
      });
    });
    setImageUrlsToSend(imagesToSend);
  }, [imageUrls]);

  useEffect(() => {
    dispatch(productActions.clearPhotoUrls());
    imageUrlsToSend.forEach((image) => {
      dispatch(
        productActions.updatePhotoUrls({
          photoUrls: {
            photoUrl: image.photoUrl,
            featured: image.featured,
          },
        })
      );
    });
  }, [imageUrlsToSend, dispatch]);

  const changeFeaturedImage = (e) => {
    const newArray = [...imageUrls];

    const preIndex = newArray.findIndex((x) => x.featured === true);
    const preObj = { ...newArray[preIndex], featured: false };
    newArray[preIndex] = preObj;

    const index = newArray.findIndex((x) => x._id === e);
    const newObj = { ...newArray[index], featured: true };
    newArray[index] = newObj;

    setImageUrls(newArray);
  };

  const deleteImage = (e) => {
    const newArray = imageUrls.filter((x) => x._id !== e);
    setImageUrls(newArray);
  };

  const CollectFormData = (e) => {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
  };

  const AddNewPhoto = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (selectedFile) {
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);
      axios
        .put("http://localhost:3005/fruit-images", fd, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
            setSiglePhoto({
              _id: res.data._id,
              photoUrl: res.data.filePath,
              featured: false,
            });
          addPhotoToProduct()
            .then((res) => {
              dispatch(
                productActions.updatePhotoUrls({
                  photoUrls: {
                    photoUrl: res.data.filePath,
                    featured: false,
                  },
                })
              );
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    }
  }, [selectedFile, dispatch, addPhotoToProduct, token]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    editProduct()
      .then((res) => {
        navigate("/productManagement", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          {imageUrls.length > 0 &&
            imageUrls.map((image, index) => (
              <div
                key={index}
                style={{ position: "relative" }}
                className="previewImage"
              >
                <span
                  className="deleteImage"
                  onClick={() => deleteImage(image._id)}
                >
                  X
                </span>
                <img src={`http://localhost:3005/${image.photoUrl}`} alt="" />
                <div
                  style={{
                    background: image.featured ? "lightgreen" : "",
                    textAlign: "center",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => changeFeaturedImage(image._id)}
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
                  value={productToEdit.name}
                  onChange={(e) => CollectFormData(e)}
                  placeholder="Product Name"
                />

                <input
                  type="text"
                  name="description"
                  value={productToEdit.description}
                  onChange={(e) => CollectFormData(e)}
                  placeholder="Description"
                />

                <input
                  type="number"
                  name="price"
                  value={productToEdit.price}
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="createProductCategorySelector"
                >
                  <option value="0">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <input type="file" onChange={AddNewPhoto} />

                <input type="submit" value="Save" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
