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
            const existingItem = state.itemsInCart.find(x => x._id === action.payload.item._id);
            if(existingItem){
                existingItem.totalPriceForThis = existingItem.totalPriceForThis || existingItem.price;
                existingItem.totalPriceForThis =  existingItem.totalPriceForThis + existingItem.price;
                existingItem.quantity = existingItem.quantity || 1;
                existingItem.quantity++;
            } else {
                state.itemsInCart.push(action.payload.item);
            }
            state.totalItemsInCart = state.totalItemsInCart + 1;
            state.totalPrice = state.totalPrice + action.payload.item.price;
        },
        removeSingleItem: (state, action) => {
            const existingItem = state.itemsInCart.find(x => x._id === action.payload.item._id);
            if (existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPriceForThis = existingItem.totalPriceForThis - existingItem.price;
            } else {
                existingItem.quantity--;
                existingItem.totalPriceForThis = existingItem.totalPriceForThis - existingItem.price;
                state.itemsInCart = state.itemsInCart.filter(x => x._id !== action.payload._id);
            }
        },
        removeTotalItem: (state, action) => {

        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;