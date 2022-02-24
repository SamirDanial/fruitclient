import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import axios from "axios";
import { categoryActions } from "../../../../store/category";
import { EDIT_CATEGORY, GET_CATEGORY } from "../../../hooks/Category";

const EditCategory = () => {
  const params = useParams();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const imageUrl = useSelector((state) => state.category.imageUrl);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState({
    _id: "",
    name: "",
    description: "",
    imageUrl: "",
  });
  const [getCategory] = useLazyQuery(GET_CATEGORY, {
    variables: {
      ID: params.id,
    },
  });

  const [editCategory] = useMutation(EDIT_CATEGORY, {
    variables: {
      ID: categoryToEdit._id,
      name: categoryToEdit.name,
      description: categoryToEdit.description,
      imageUrl: imageUrl,
    },
  });

  useEffect(() => {
    getCategory().then((res) => {
      setPreviewImage(res.data.getCategory.imageUrl);
      setCategoryToEdit({
        ...res.data.getCategory,
      });
    });
  }, [getCategory]);

  const collectFormData = (e) => {
    setCategoryToEdit({
      ...categoryToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectPhoto = (e) => {
    setSelectedFile(e.target.files[0]);
    let f = e.target.files[0];
    setLocalImage(URL.createObjectURL(f));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    if (!selectedFile) {
      console.log('this is called');
      editCategory().then((res) => {
        dispatch(categoryActions.updateCategory({
          ...res.data
        }));
        navigate('/categoryManagement', { replace: true })
      });
      return;
    }
    console.log('that is called');
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
        editCategory().then((res) => {
          dispatch(categoryActions.updateCategory({
            ...res.data
          }));
          navigate('/categoryManagement', { replace: true })
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          {localImage ? (
            <div className="previewImage">
              <img src={localImage} alt="" />
            </div>
          ) : (
            previewImage && (
              <div className="previewImage">
                <img src={`http://localhost:5000/${previewImage}`} alt="" />
              </div>
            )
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
                  value={categoryToEdit.name}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Category Name"
                  required
                />

                <input
                  type="text"
                  name="description"
                  value={categoryToEdit.description}
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

export default EditCategory;
