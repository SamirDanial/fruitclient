import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemsInCart: [],
    totalItemsInCart: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state, action) => {
            state.itemsInCart = [];
            state.totalItemsInCart = 0;
            state.totalPrice = 0;
        },
        addToCart: (state, action) => {
            state.itemsInCart.push(action.payload.item);
            state.totalItemsInCart = state.totalItemsInCart + 1;
            state.totalPrice = state.totalPrice + action.payload.item.price;
        },
        updateCart: (state, action) => {
            state.itemsInCart++;
            state.totalPrice = state.totalPrice + action.payload.item.price;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;