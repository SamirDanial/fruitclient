import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    username: '',
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate : (state, action) => {
            state._id = action.payload._id
            state.username = action.payload.username
            state.token = action.payload.token
        }
    }

})

export const authActions = authSlice.actions;

export default authSlice.reducer;