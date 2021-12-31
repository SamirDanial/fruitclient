import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { categoryActions } from "../../../../store/category";
import { EDIT_CATEGORY } from "../../../hooks/Category";

const EditCategory = () => {
  const params = useParams();
  const imageUrl = useSelector(
    (state) => state.categories.length > 0 && state.categories[0].imageUrl
  );
  const dispatch = useDispatch();
  const targetCategory = useSelector(state => state.categories.filter(x => x._id === params.id)[0]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState({
    ID: "",
    name: "",
    imageUrl: "",
    description: "",
  });

  const [editCategory] = useMutation(EDIT_CATEGORY, {
    variables: {
      ...categoryToEdit,
      imageUrl: imageUrl,
    },
  });

  useEffect(() => {
    setPreviewImage(targetCategory.imageUrl);
    setCategoryToEdit({
      ID: targetCategory._id,
      name: targetCategory.name,
      imageUrl: localImage ? localImage : targetCategory.imageUrl,
      description: targetCategory.description,
    });
  }, [imageUrl, previewImage]);

  useEffect(() => {
    console.log(categoryToEdit);
  }, [categoryToEdit]);

  const collectFormData = (e) =>
    setCategoryToEdit({
      ...categoryToEdit,
      [e.target.name]: e.target.value,
    });

  const onSelectPhoto = (e) => {
    setSelectedFile(e.target.files[0]);
    let f = e.target.files[0];
    setLocalImage(URL.createObjectURL(f));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(!selectedFile) {
        editCategory()
          .then((res) => {
            console.log(res);
            dispatch(
              categoryActions.createCategory({
                ...res.data,
              })
            );
            // navigate("/categoryManagement", { replace: true });
          })
          .catch((error) => {
            console.log(error.message);
          });
          return;
    }
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .put("http://localhost:5000/fruit-images", fd, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        // dispatch(
        //   categoryActions.updatePhotoUrl({
        //     imageUrl: res.data.filePath,
        //   })
        // );
        editCategory()
          .then((res) => {
            console.log(res);
            dispatch(
              categoryActions.createCategory({
                ...res.data,
              })
            );
            // navigate("/categoryManagement", { replace: true });
          })
          .catch((error) => {
            console.log(error.message);
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
          {localImage ? <div className="previewImage">
              <img src={localImage} alt="" />
            </div>  : previewImage && (
            <div className="previewImage">
              <img src={`http://localhost:5000/${previewImage}`} alt="" />
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
