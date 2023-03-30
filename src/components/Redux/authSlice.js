import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("token");
const userLocal = localStorage.getItem("user")
const initialState = {
    user: userLocal,
    token: userToken,
    isLogin: userToken ? true : false

}
const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getToken: (state, action) => {
            state.token = localStorage.getItem('token')
        },
        isLogin: (state, action) => {
            state.user = localStorage.getItem('user')
            state.isLogin = true
        },
        isLogout: (state, action) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.user = null
            state.token = null
            state.isLogin = false
        }
    },
});



export const selectToken = (state) => state.auth.token;
export const selectSucccess = (state) => state.auth.isLogin;
export const selectUser = (state) => state.auth.user;


export const authActions = auth.actions;
export default auth.reducer;
