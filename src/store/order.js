import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    order: {}
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrders: (state, action) => {
            state.orders = action.payload;
        },
        updateOrder: (state, action) => {
            state.orders.filter(x => x.id === action.payload.id)[0].Approved = action.payload.Approved;
        },
        getOrder: (state, action) => {
            state.order = action.payload;
        },
        selectedOrderUpdate: (state, action) => {
            state.order = action.payload
        }
    }
})

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;