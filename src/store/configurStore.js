import { configureStore } from '@reduxjs/toolkit';
import { authReducer, customerReducer } from './index';

const store = configureStore({
    reducer: {auth: authReducer, customer: customerReducer}
});

export default store;