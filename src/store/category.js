import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    _id: "",
    name: "",
    imageUrl: "",
    description: "",
  },
];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearInitialState: (state, action) => {
        state = [];
    },
    getCategories: (state, action) => {
      action.payload.categories.forEach((category) => {
        state.push(category);
      });
    },
    updatePhotoUrl: (state, action) => {
      state[0].imageUrl = action.payload.imageUrl;
    },
    createCategory: (state, action) => {
      state.push(action.payload.createCategory);
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
