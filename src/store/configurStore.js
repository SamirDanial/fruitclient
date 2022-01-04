import { configureStore } from "@reduxjs/toolkit";
import { authReducer, customerReducer, categoryReducer, productReducer } from "./index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export default store;
