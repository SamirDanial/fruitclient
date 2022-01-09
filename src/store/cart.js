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
                existingItem.totalPriceForThis =  existingItem.totalPriceForThis + existingItem.price;
                existingItem.quantity++;
            } else {
                const item = {...action.payload.item, quantity: 1, totalPriceForThis: action.payload.item.price};
                state.itemsInCart.push(item);
            }
            state.totalItemsInCart = state.totalItemsInCart + 1;
            state.totalPrice = state.totalPrice + action.payload.item.price;
        },
        removeSingleItem: (state, action) => {
            const existingItem = state.itemsInCart.find(x => x._id === action.payload.item._id);
            if (existingItem.quantity > 0) {
                existingItem.quantity--;
                existingItem.totalPriceForThis = existingItem.totalPriceForThis - existingItem.price;
            }
            state.totalItemsInCart--;
            state.totalPrice = state.totalPrice - action.payload.item.price;
        },
        removeTotalItem: (state, action) => {
            const itemsToRemove = state.itemsInCart.filter(x => x._id === action.payload.item._id)[0];
            state.totalItemsInCart = state.totalItemsInCart - itemsToRemove.quantity;
            state.totalPrice = state.totalPrice - itemsToRemove.totalPriceForThis;
            const existingItemsInCart = state.itemsInCart.filter(x => x._id !== action.payload.item._id);
            state.itemsInCart = existingItemsInCart;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;