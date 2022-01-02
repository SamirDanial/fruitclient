import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import axios from "axios";
import { categoryActions } from '../../../../store/category';
import { CREATE_CATEGORY } from '../../../hooks/Category';

const CreateCategory = () => {
  const imageUrl = useSelector((state) => state.category.imageUrl);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryToCreate, setCategoryToCreate] = useState({
    ID: "",
    name: "",
    imageUrl: "",
    description: "",
  });

  const [createCategory] = useMutation(CREATE_CATEGORY, {
      variables: {
        ...categoryToCreate,
        imageUrl: imageUrl
      }
  })



  useEffect(() => {
    setCategoryToCreate({
      ID: "",
      name: "",
      imageUrl: imageUrl ? imageUrl : "",
      description: "",
    });
  }, [imageUrl]);

  const collectFormData = (e) =>
    setCategoryToCreate({
      ...categoryToCreate,
      [e.target.name]: e.target.value,
    });

  const onSelectPhoto = (e) => {
    setSelectedFile(e.target.files[0]);
    let f = e.target.files[0];
    setPreviewImage(URL.createObjectURL(f));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .put("http://localhost:5000/fruit-images", fd, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        dispatch(
          categoryActions.updatePhotoUrl({
            imageUrl: res.data.filePath,
          })
        );
        createCategory().then(res => {
            console.log(res);
            dispatch(categoryActions.createCategory({
                ...res.data
            }))
            navigate('/categoryManagement', {replace: true})
        }).catch(error => {
            console.log(error.message)
        })
      }).catch(error => {
          console.log(error.message);
      })
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          {previewImage && (
            <div className="previewImage">
              <img src={previewImage} alt="" />
            </div>
          )}
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <h2> Category Register Form </h2>
              </div>
              <form className="editRegForm" onSubmit={onFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={categoryToCreate.name}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Category Name"
                  required
                />

                <input
                  type="text"
                  name="description"
                  value={categoryToCreate.description}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Category Description"
                  required
                />

                <input type="file" onChange={onSelectPhoto} />

                <input type="submit" value="Save" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
