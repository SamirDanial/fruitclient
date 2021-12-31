import { configureStore } from "@reduxjs/toolkit";
import { authReducer, customerReducer, categoryReducer } from "./index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    categories: categoryReducer,
  },
});

export default store;
