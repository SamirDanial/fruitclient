import { configureStore } from "@reduxjs/toolkit";
import { authReducer, customerReducer, categoryReducer } from "./index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    category: categoryReducer,
  },
});

export default store;
