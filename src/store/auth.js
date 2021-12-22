import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    username: '',
    token: '',
    roleName: '',
    authenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate : (state, action) => {
            state._id = action.payload._id
            state.username = action.payload.username
            state.token = action.payload.token
            state.roleName = action.payload.roleName
            state.authenticated = action.payload.authState
        },
        logout: (state) => {
            state._id = '';
            state.username = '';
            state.token = '';
            state.roleName = '';
            state.authenticated = false;
        }
    }

})

export const authActions = authSlice.actions;

export default authSlice.reducer;