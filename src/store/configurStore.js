import { configureStore } from "@reduxjs/toolkit";
import { authReducer, customerReducer, categoryReducer, productReducer, cartReducer, orderReducer } from "./index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    orders: orderReducer
  },
});

export default store;
