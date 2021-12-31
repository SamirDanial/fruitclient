import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GET_CATEGORIES } from "../../hooks/Category";
import { categoryActions } from "../../../store/category";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      return data;
    },
  });
  useEffect(() => {
    dispatch(categoryActions.clearInitialState());
    getCategories().then((res) => {
      setCategories(res.data.getCategories.categories);
      dispatch(
        categoryActions.getCategories({
          ...res.data.getCategories,
        })
      );
    });
  }, [dispatch, getCategories]);
  return (
    <div className="adminPanelItem">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => navigate(`/editCategory/${category._id}`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button className="btn">Delete</button>
              </td>
              <td>
                {category.imageUrl && (
                  <img
                    src={"http://localhost:5000/" + category.imageUrl}
                    alt=""
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="btn add_category"
          onClick={() => navigate("/createCategory")}
        >
          + Add Category
        </button>
      </div>
    </div>
  );
};

export default CategoryManagement;
