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
            state.name = action.payload.editCustomer.name
            state.lastName = action.payload.editCustomer.lastName
            state.physicalAddress = action.payload.editCustomer.physicalAddress
            state.phoneNumber = action.payload.editCustomer.phoneNumber
            state.emailAddress = action.payload.editCustomer.emailAddress
        },
        createCustomerProfile: (state, action) => {
            state._id = action.payload.createCustomer._id
            state.name = action.payload.createCustomer.name
            state.lastName = action.payload.createCustomer.lastName
            state.active = action.payload.createCustomer.active
            state.coordinates = action.payload.createCustomer.coordinates
            state.photoUrl = action.payload.createCustomer.photoUrl
            state.physicalAddress = action.payload.createCustomer.physicalAddress
            state.phoneNumber = action.payload.createCustomer.phoneNumber
            state.emailAddress = action.payload.createCustomer.emailAddress
            state.favoriteCategories = action.payload.createCustomer.favoriteCategories
            state.userId = action.payload.createCustomer.userId
        },
        changePhoto: (state, action) => {
            state.photoUrl = action.payload.photoUrl
        },
        logout: (state) => {
            state._id = "";
            state.name= "";
            state.lastName = "";
            state.active = false;
            state.photoUrl = "";
            state.physicalAddress = "";
            state.phoneNumber = "";
            state.emailAddress = "";
            state.coordinates = "";
            state.favoriteCategories = [{}];
            state.userId = {};
        }
    }
});

export const customerActions = customerSlice.actions;


export default customerSlice.reducer;

