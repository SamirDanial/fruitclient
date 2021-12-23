import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    lastName: "",
    active: false,
    photoUrl: "",
    physicalAddress: "",
    phoneNumber: "",
    emailAddress: "",
    coordinates: "",
    favoriteCategories: [{}],
    userId: {}
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        getCustomerProfile: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.lastName = action.payload.lastName
            state.active = action.payload.active
            state.photoUrl = action.payload.photoUrl
            state.physicalAddress = action.payload.physicalAddress
            state.phoneNumber = action.payload.phoneNumber
            state.emailAddress = action.payload.emailAddress
            state.coordinates = action.payload.coordinates
            state.favoriteCategories = action.payload.favoriteCategories
            state.userId = action.payload.userId
        },
        updateCustomerProfile: (state, action) => {
            state.name = action.payload.name
            state.lastName = action.payload.lastName
            state.physicalAddress = action.payload.physicalAddress
            state.phoneNumber = action.payload.phoneNumber
            state.emailAddress = action.payload.emailAddress
            state.coordinates = action.payload.coordinates
        },
        changePhoto: (state, action) => {
            state.photoUrl = action.payload.photoUrl
        }
    }
});

export const customerActions = customerSlice.actions;


export default customerSlice.reducer;

