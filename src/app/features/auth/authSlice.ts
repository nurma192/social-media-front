import {createSlice } from "@reduxjs/toolkit";
import  type {PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem("accessToken"),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('accessToken');
        },
    }
})

export const { setToken, clearToken} = authSlice.actions;
export default authSlice.reducer