import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  imageUrl: "",
  description: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearInitialState: (state, action) => {
        state = [];
    },
    updatePhotoUrl: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
    },
    createCategory: (state, action) => {
      state.name = action.payload.createCategory.name;
      state.description = action.payload.createCategory.description;
      state.imageUrl = action.payload.createCategory.imageUrl;
      state._id = action.payload.createCategory._id;
    },
    updateCategory: (state, action) => {
      state.name = action.payload.editCategory.name;
      state.description = action.payload.editCategory.description;
      state.imageUrl = action.payload.editCategory.imageUrl;
      state._id = action.payload.editCategory._id;
    }
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
