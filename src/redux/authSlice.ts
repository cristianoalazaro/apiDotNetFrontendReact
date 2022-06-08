import { createSlice } from '@reduxjs/toolkit';

/*export interface AuthState {
    user: string,
    isLogged: boolean
};*/

/*const initialState: AuthState = {
    user: '',
    isLogged: false
};*/

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user:'',
        token: ''
    },
    reducers: {
        setAuth: (state, action ) => {
            state.user = action.payload.user;
            state.token = `Bearer ${action.payload.token}`;
            localStorage.setItem('token', state.token)
        },
    }
})

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;