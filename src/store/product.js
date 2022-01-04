import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    photoUrls: [],
    categories: [],
    visible: true
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updatePhotoUrls: (state, action) => {
            state.photoUrls.push(action.payload.photoUrls)
        },
        clearPhotoUrls: (state, action) => {
            state.photoUrls = [];
        }
    }
})

export const productActions = productSlice.actions;

export default productSlice.reducer;